import { getWebMetadata } from "@/app/metadata";

export const metadata = getWebMetadata({
  title: 'Cursos',
  description: 'Conheça nossos cursos',
  url: '/cursos/',
})

export default function CursosLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
         children 
    )
}