import { getWebMetadata } from "@/app/metadata";

export const metadata = getWebMetadata({
  title: 'Sobre Nós',
  description: 'Conheça a Quali Clínica',
  url: '/a-qualiclinica/',
})

export default function AQualiCLinicaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
         children 
    )
}