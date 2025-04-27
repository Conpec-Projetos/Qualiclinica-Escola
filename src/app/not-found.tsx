import LogoPrincipal from "@/assets/logo-principal.svg";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="h-screen w-screen bg-rosa-claro font-poppins flex flex-col justify-center items-center">
            <Image alt="logo principal" src={LogoPrincipal} className="inline-block w-[23rem]" />
            <h1 className="text-magenta text-4xl font-bold">Erro 404</h1>
            <h2 className="text-verde-petroleo text-2xl font-bold">Página não encontrada</h2>
        </div>
    )
}