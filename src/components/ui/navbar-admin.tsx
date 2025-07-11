"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo-navbar.svg";
import ButtonQuali from "@/components/ui/button-quali";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth.context";

export default function NavbarAdmin() {
  const router = useRouter();
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-white w-full h-[80px] flex items-center justify-around border-b-[1px] border-[#D4D4D4]">
      {/* Botão à esquerda */}
      <ButtonQuali text={currentUser ? `Olá, ${currentUser?.name}!` : 'Carregando...'}></ButtonQuali>

      {/* Logo ao centro */}
      <Image src={Logo} alt="Quali Clínica logo" priority onClick={() => router.push("/admin/home")} unoptimized />

      {/* Links de navegação */}
      <div className="flex space-x-6 text-[#959595] text-[16px]">
        <Link href="/admin/home" className="hover:text-gray-700">
          Home
        </Link>
        <Link href="/admin/cursos/view" className="hover:text-gray-700">
          Cursos
        </Link>
        <Link href="/admin/profissionais/view" className="hover:text-gray-700">
          Profissionais
        </Link>
        <Link href="/admin/blog/view" className="hover:text-gray-700">
          Blog
        </Link>
        <Link href="/admin/diferenciais/edit" className="hover:text-gray-700">
          Diferenciais
        </Link>
      </div>

      {/* Botão à direita */}
      <button
        className={`border hover:border-transparent hover:bg-[#88C8D4] hover:text-white rounded-[5px]
                  border-[#88C8D4] bg-transparent text-[#88C8D4]
                  py-1 px-5 transition-all duration-300 text-[15px] uppercase cursor-pointer`}
        onClick={handleLogout}
      >
        logout
      </button>
    </nav>
  );
}
