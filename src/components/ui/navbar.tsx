"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo-navbar.svg";
import Button from "@/components/ui/button-quali";
import DropdownMenuNavbar from "@/components/ui/dropdown-menu-navbar";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth.context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { currentUser, isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    logout();
    router.push("/");
  };

  const handleContateNos = () => {
    router.push("/contate-nos");
  };

  return (
    <nav className="w-full h-[80px] flex items-center justify-around bg-white border-b-[1px] border-b-[#D4D4D4]">
      {isLoggedIn ? (
        <Button
          text={`Olá, ${currentUser?.name}!`}
          onClick={() => {
            router.push("/admin/home");
          }}
        ></Button>
      ) : (
        <div>
          <Button
            className="hidden sm:flex w-auto text-xs md:text-base lg:!text-xl"
            buttonSize="small"
            text="Login administradores"
            onClick={() => router.push("/login")}
            ></Button>
            <div className="flex sm:hidden items-center gap-2">
              <User size={25} color="#88C8D4" />
              <p className="text-[#88C8D4] text-[15px]">Login</p>
            </div>
        </div>
      )}

      <div className="w-[130px] md:w-[120px] lg:w-[200px]">
        <Image
          src={Logo}
          alt="Quali Clínica logo"
          className="object-contain w-full h-auto"
          priority
        />
      </div>

      <div className="hidden sm:flex space-x-6 text-[#959595] sm:text-sm md:text-base lg:text-xl">
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

      {isLoggedIn ? (
        <button
          className={`border hover:border-transparent hover:bg-[#88C8D4] hover:text-white rounded-[5px]
                  border-[#88C8D4] bg-transparent text-[#88C8D4]
                  py-1 px-5 transition-all duration-300 text-[15px] uppercase cursor-pointer`}
          onClick={handleLogout}
        >
          logout
        </button>
      ) : (
        <Button
          className="flex w-auto text-xs md:text-base lg:!text-xl"
          buttonSize="small"
          text="CONTATE-NOS"
          onClick={handleContateNos}
        ></Button>
      )}

      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 flex flex-row items-center gap-2 rounded-md border border-gray-300 hover:bg-gray-100">
            <Menu className="w-5 h-5 text-gray-700" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 h-48 bg-white">
            <DropdownMenuItem asChild>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DropdownMenuNavbar />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/cursos">Cursos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/blog">Blog</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
