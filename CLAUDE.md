# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing + blog + admin CMS site for **Quali Clínica Escola** (Brazilian diabetes-focused training clinic). All user-facing copy is **pt-BR** — keep it that way.

Stack: Next.js 15 (App Router, React 19), TypeScript, Tailwind v4, Firebase (Auth + Firestore + Storage), Resend (+ `react-email`) for contact emails, TipTap for the blog editor, `react-hook-form` + `zod` for forms, `sonner` for toasts, shadcn/ui (`new-york` style, `neutral` base, Lucide icons).

## Commands

```bash
npm run dev     # next dev — start the site
npm run build   # next build
npm start       # next start (post-build)
npm run lint    # next lint (ESLint flat config: next/core-web-vitals + next/typescript)
npm run email   # email dev --dir src/emails (live preview react-email templates at localhost:3000 — do not run alongside `next dev`)
```

No test runner is configured. Don't invent one; verify behavior in the browser.

## Environment

All Firebase/Resend config is read from `NEXT_PUBLIC_*` env vars (see `src/firebase/firebase-config.ts` and `src/server/send-email.ts`). A `.env.local` must provide:

- `NEXT_PUBLIC_API_KEY`, `NEXT_PUBLIC_AUTH_DOMAIN`, `NEXT_PUBLIC_PROJECT_ID`, `NEXT_PUBLIC_STORAGE_BUCKET`, `NEXT_PUBLIC_APP_ID`, `NEXT_PUBLIC_MEASUREMENT_ID`, `NEXT_PUBLIC_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_RESEND_API_KEY`, `NEXT_PUBLIC_EMAIL_FROM`, `NEXT_PUBLIC_EMAIL_TO`

Note: `NEXT_PUBLIC_RESEND_API_KEY` is only consumed inside a `"use server"` module (`src/server/send-email.ts`), so it is not actually shipped to the client despite the prefix. If you ever import `@/server/send-email` from a client component, that invariant holds only because Next strips server actions — don't move the `Resend` instance out of the server module.

`next.config.ts` allow-lists `next/image` remotes to `firebasestorage.googleapis.com/v0/b/qualiclinica-escola.firebasestorage.app/o/images**`. New image hosts must be added there, or stick `unoptimized` on the `<Image>` (most existing usages already do).

## Architecture

### Routing

`src/app/` uses App Router with one route group: `(pages)` (hides the segment from URLs). All live pages live under `src/app/(pages)/…`:

- Public: `/` (in `src/app/page.tsx`), `/a-qualiclinica`, `/cursos`, `/profissionais`, `/blog`, `/blog/[id]`, `/contate-nos`, `/login`
- Admin (guarded): `/admin/home`, `/admin/blog/view|write`, `/admin/cursos/view|write`, `/admin/profissionais/view|write`, `/admin/diferenciais/edit`

`src/app/(pages)/admin/layout.tsx` wraps every admin subtree in **`AdminProvider`** (`src/providers/admin-provider.tsx`), which reads `AuthContext` and client-side redirects to `/login` once auth finishes loading with no user. There is no server-side auth gate — never put secrets behind it, only UX.

Root layout (`src/app/layout.tsx`) mounts Google fonts as CSS vars (`--font-poppins`, `--font-roboto`, `--font-roboto-condensed`), wires global `Providers` (= `AuthProvider`), and renders the `sonner` toaster.

### Auth + data

`src/contexts/auth.context.tsx` is the single source of auth truth. On `onAuthStateChanged` it pulls the matching `users/{uid}` Firestore doc into `currentUser: User` (`{ email, name }`, see `src/classes/User.ts`). Login error codes are translated to pt-BR strings there — extend that switch rather than re-mapping at call sites.

Firestore collections in use (Firebase client SDK; accessed directly from client components):

| Collection | Written by | Shape (key fields) |
|------------|------------|--------------------|
| `users` | (out-of-band) | `email`, `name` |
| `posts` | `src/components/editors/posts-editor.tsx` | `title`, `content` (HTML), `imageUrl`, `base64ImageUrl`, `publishedAt` (serverTimestamp) |
| `courses` | `admin/cursos/write` | `name`, `instructors`, `description?`, `interestLink`, `area ∈ {doctors, patients-caregivers, others, mentorships}` |
| `professionals` | `admin/profissionais/write` | `name`, `occupation`, `career`, `identification`, `area ∈ {diabetology, nursing, nutrition, endocrinology, psychology/psychiatry, others}` |
| `differentials` | `admin/diferenciais/edit` | `counter`, `description` (6 fixed docs; UI addresses them by array index — do not reorder without updating `diferenciais/edit/page.tsx`) |

Post images are uploaded to Firebase Storage from `posts-editor.tsx`; the rendered blog uses `<Image placeholder="blur" blurDataURL={base64ImageUrl}>`, so writers must continue to persist both `imageUrl` and `base64ImageUrl`.

Blog post bodies are **raw HTML** produced by TipTap and injected into the DOM via React's raw-HTML escape hatch in `src/app/(pages)/blog/[id]/page.tsx`. There is no sanitizer in the pipeline; only Firebase-authenticated admins can write, so content is effectively trusted-author input — treat it accordingly and do not accept post content from untrusted sources.

### Forms

Every create/edit admin form follows the same recipe: `useForm` + `zodResolver(schema)` + shadcn `Form/FormField/FormItem/FormControl/FormMessage`, submit via `addDoc`/`updateDoc`, `toast.success|error` via `sonner`, then `router.push` back to the `view` page. When adding a new admin form, copy `admin/cursos/write/page.tsx` as the template.

Zod enums for `area` are duplicated between the schema and the `<SelectItem>` list — keep them in sync.

### Contact form → email

`src/components/ui/interest-form.tsx` collects `QualiFormData` (`src/classes/FormData.ts`) and invokes the server action `sendEmail` in `src/server/send-email.ts`, which renders `src/emails/novo-contato-email.tsx` via `react-email` and ships via Resend.

### Styling + design tokens

Tailwind v4 with **theme tokens declared inline in `src/app/globals.css`** (no `tailwind.config`). Brand colors live there as CSS custom props and must be used as Tailwind class suffixes (`text-magenta`, `bg-verde-petroleo`, `bg-ciano-escuro`, `bg-rosa-claro`, `text-menta-claro1`, `text-text`, etc.). Do not hand-roll new hex values — add a `--color-*` token in `globals.css` first.

Fonts are applied as Tailwind classes that map to the CSS vars: `font-poppins`, `font-roboto`, `font-roboto-condensed`.

shadcn/ui is configured via `components.json` with aliases `@/components`, `@/components/ui`, `@/lib/utils`, `@/hooks`. Run `npx shadcn@latest add <component>` to pull new primitives; they land in `src/components/ui/`.

### TS path aliases

Configured in `tsconfig.json`:

```
@/*          → src/*
@components  → src/components
@assets      → src/assets
@contexts    → src/contexts
@firebase    → src/firebase
@providers   → src/providers
@classes     → src/classes
@app         → src/app
@lib         → src/lib
```

`@/*` is the canonical one used throughout; the others are legacy and still appear in a few imports (`@assets/...`). Prefer `@/...` in new code.

## Conventions worth knowing

- Client components are the default here — most pages start with `"use client"` and fetch from Firestore in `useEffect`. There is no server-data layer; if you add one, pick a lane and stick to it for the whole feature.
- Dynamic routes that read `searchParams` wrap their inner component in `<Suspense>` at the page level (see `admin/blog/write`, `admin/cursos/write`) — Next 15 requires this.
- `next/image` is used with `unoptimized` almost everywhere because the Firebase Storage loader path is narrow; keep it consistent per file.
- SEO metadata helper: import `getWebMetadata({ title, description, url })` from `src/app/metadata.ts` at the top of each public page (not inside the component) — it shallow-merges into the default metadata from `layout.tsx`. Brand name, domain, and default OG image live in `metadata.ts`.
- User-visible strings (toasts, errors, labels, 404 copy) are pt-BR. Keep new copy in Portuguese.
