import type { Metadata } from "next";
import { Poppins, Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const poppins_init = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const roboto_init = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["600", "400", "300"],
});

const robotoCondensed_init = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: "200",
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Quali Clínica Escola",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins_init.variable} ${roboto_init.variable} ${robotoCondensed_init.variable}antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
