"use client";
import LogoPrincipalAdaptada from "@/assets/logo-principal-adaptada.svg";
import ButtonQuali from "@/components/ui/button-quali";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-rosa-claro font-poppins flex flex-col justify-center items-center">
      <Image
        alt="logo principal"
        src={LogoPrincipalAdaptada}
        className="inline-block w-[15rem] sm:w-[23rem]"
        priority
        unoptimized
      />
      <h1 className="text-magenta !text-2xl sm:!text-4xl font-bold">
        Erro 404
      </h1>
      <h2 className="text-verde-petroleo !text-lg sm:!text-2xl text-center font-bold">
        Página não encontrada
      </h2>
      <ButtonQuali
        className="mt-5 sm:mt-10"
        buttonSize="large"
        fontSize="large"
        onClick={() => router.push("/")}
        text="Retornar para a página inicial"
      ></ButtonQuali>
    </div>
  );
}
