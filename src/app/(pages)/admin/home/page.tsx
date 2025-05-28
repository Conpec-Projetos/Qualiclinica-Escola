"use client";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { AuthContext } from "@/contexts/auth.context";
import Link from "next/link";
import { useContext } from "react";

export default function HomeAdmin() {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <div className="flex flex-col w-screen min-h-screen bg-white font-poppins">
      <Navbar />
      <main className="w-full flex flex-col items-center justify-center text-black">
        <div className="flex gap-8 text-magenta font-semibold text-[18px] bg-rosa-claro px-20 py-4 rounded-[5px]">
          <Link href="/admin/cursos/view">Cursos</Link>
          <Link href="/admin/profissionais/view">Profissionais</Link>
          <Link href="/admin/blog/view">Blog</Link>
          <Link href="/admin/diferenciais/edit">Diferenciais</Link>
        </div>
        <div
          className={`flex flex-col items-center justify-center w-[606px] h-[250px] bg-[url('/circles-home-admin.svg')] bg-no-repeat bg-cover bg-center mt-10`}
        >
          <p className="text-7xl font-semibold text-verde-petroleo mb-6">
            Olá, { currentUser?.name }!
          </p>
          <p className="text-[18px] w-[548px] text-center text-text">
            Bem-vindo à área dos administradores, aqui você pode{" "}
            <b>editar informações</b> sobre os{" "}
            <b>profissionais, cursos da clínica, valores dos diferenciais</b> e
            escrever <b>artigos para o blog</b>.
          </p>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
