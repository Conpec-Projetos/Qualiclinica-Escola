import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo-navbar.svg"; // Substitua pelo caminho correto do seu logo
import Button from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-white w-full h-[80px] flex items-center justify-around border-b-[1px] border-b-[#D4D4D4]">
      {/* Botão à esquerda */}
      <Button text="LOGIN ADMINISTRADORES"></Button>

      {/* Logo ao centro */}
      <Image src={Logo} alt="Qualiclínica logo" />

      {/* Links de navegação */}
      <div className="flex space-x-6 text-gray-500 text-sm">
        <Link href="/home" className="hover:text-gray-700">
          Home
        </Link>
        <Link href="/sobre" className="hover:text-gray-700">
          Sobre Nós
        </Link>
        <Link href="/cursos" className="hover:text-gray-700">
          Cursos
        </Link>
        <Link href="/blog" className="hover:text-gray-700">
          Blog
        </Link>
      </div>

      {/* Botão à direita */}
      <Button text="CONTATE-NOS"></Button>
    </nav>
  );
}
