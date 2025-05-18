import { getWebMetadata } from "@/app/metadata";

export const metadata = getWebMetadata({
  title: 'Contato',
  description: 'Entre em contato conosco',
  url: '/contate-nos/',
})

export default function ContateNosLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
         children 
    )
}