import { getWebMetadata } from "@/app/metadata";

export const metadata = getWebMetadata({
  title: 'Profissionais',
  description: 'Conheça nossos profissionais',
  url: '/profissionais/',
})

export default function ProfissionaisLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
         children 
    )
}