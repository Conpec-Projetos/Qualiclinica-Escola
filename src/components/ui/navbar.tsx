"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo-navbar.svg";
import Button from "@/components/ui/button-quali";
import DropdownMenuNavbar from "@/components/ui/dropdown-menu-navbar";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase-config";

export default function Navbar({ loggedIn = false }: { loggedIn?: boolean }) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const handleContateNos = () => {
    router.push("/contate-nos");
  }

  return (
    <nav className="bg-white w-full h-[80px] flex items-center justify-around border-b-[1px] border-b-[#D4D4D4]">
      {/* Botão à esquerda */}
      {loggedIn ? (
        <Button text="Olá, (nome)!"></Button>
      ) : (
        <Button text="Login administradores" onClick={() => router.push("/login")}></Button>
      )}

      {/* Logo ao centro */}
      <Image src={Logo} alt="Qualiclínica logo" />

      {/* Links de navegação */}
      <div className="flex space-x-6 text-[#959595] text-[16px]">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <DropdownMenuNavbar />
        <Link href="/cursos" className="hover:text-gray-700">
          Cursos
        </Link>
        <Link href="/blog" className="hover:text-gray-700">
          Blog
        </Link>
      </div>

      {/* Botão à direita */}
      {loggedIn ? (
        <button
          className={`border hover:border-transparent hover:bg-[#88C8D4] hover:text-white rounded-[5px]
                  border-[#88C8D4] bg-transparent text-[#88C8D4]
                  py-1 px-5 transition-all duration-300 text-[15px] uppercase cursor-pointer`}
          onClick={handleLogout}
        >
          logout
        </button>
      ) : (
        <Button text="CONTATE-NOS" onClick={handleContateNos}></Button>
      )}
    </nav>
  );
}
