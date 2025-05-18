import { getWebMetadata } from "@/app/metadata";

export const metadata = getWebMetadata({
  title: 'Blog',
  description: 'Leia nossos artigos',
  url: '/blog/',
})

export default function BlogLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
         children 
    )
}