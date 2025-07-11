"use client";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import "@/app/globals.css";
import Image from "next/image";
import NucleoEdu from "@assets/assets-profissionais/nucleo-educacional.jpg";
import EquipeMultiprofissional from "@assets/assets-sobre-nos/equipe-multiprofissional.png";
import BlurEquipeMultiprofissional from "@assets/assets-sobre-nos/blur-equipe-multiprofissional.jpg";
import Walkirya_Grafico from "@assets/assets-sobre-nos/walkirya_graph.png";
import BlurWalkyria_Grafico from "@assets/assets-sobre-nos/blur-walkirya_graph.jpg";

import { db } from "@/firebase/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Differential {
  id: string;
  counter: number;
  description: string;
}

export default function SobreNos() {
  const [differentials, setDifferentials] = useState<Differential[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "differentials"),
      (snapshot) => {
        setLoading(true);
        try {
          const data = snapshot.docs.map((differential) => ({
            id: differential.id,
            ...differential.data(),
          })) as Differential[];
          setDifferentials(data);
        } catch (error) {
          console.error("Erro ao carregar os diferenciais: ", error);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <main className="font-poppins flex flex-col items-center gap-[2.625rem] pt-[1.5rem] pb-[2.625rem]">
        <section className="h-fit w-full flex flex-row justify-center">
          <div className="flex flex-col sm:flex-row sm:items-start justify-center items-center gap-x-[2rem] space-y-2">
            <div className="w-[340px] h-[230px] sm:w-[290px] sm:h-[210px] md:w-[400px] md:h-[230px] lg:w-[480px] lg:h-[260px] relative">
              <Image
                className="rounded-md object-cover"
                src={NucleoEdu}
                alt="Nutricionista Thais apresentando slides do curso"
                placeholder="blur"
                fill
                priority
              />
            </div>

            <div className="flex flex-col items-center lg:mt-8 sm:items-start gap-y-[0.75rem]">
              <h1 className="!text-3xl sm:!text-2xl text-magenta font-semibold w-80 lg:w-[358px] text-center sm:text-left leading-[2.7rem]">
                Quali Clínica Escola, quem somos?
              </h1>
              <p className="w-[320px] sm:w-72 md:w-80 lg:w-96 text-text text-base sm:text-sm md:text-base text-center sm:text-left py-[0.5rem] bg-[url('/circle-prof.svg')] bg-contain bg-no-repeat">
                Somos um centro de <span className="font-medium">formação</span>{" "}
                e <span className="font-medium">treinamento</span> para
                profissionais de saúde que desejam aprimorar seus conhecimentos
                na assistência aos pacientes crônicos, em especial aqueles que
                convivem com diabetes. 
              </p>
            </div>
          </div>
        </section>

        <section className="bg-ciano flex w-full justify-center items-center py-8 lg:py-12">
          <div className="max-w-3xl lg:max-w-6xl px-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              <div className="flex flex-col items-start gap-y-3 lg:gap-y-4">
                <div className="flex flex-col items-center sm:items-start">
                  <h1 className="font-semibold text-verde-petroleo text-lg lg:text-xl">
                    MISSÃO
                  </h1>
                  <p className="text-sm text-center sm:text-left lg:text-base text-verde-petroleo leading-relaxed">
                    Prover cuidados e ensino integrais ao paciente/familiar,
                    gerando autonomia e bem-estar. Formar profissionais da saúde
                    na investigação, manejo e seguimento multiprofissional de
                    pessoas que convivem com o diabetes.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-y-3 lg:gap-y-4">
                <div className="flex flex-col items-center sm:items-start">
                  <h1 className="font-semibold text-verde-petroleo text-lg lg:text-xl">
                    VISÃO
                  </h1>
                  <p className="text-sm text-center sm:text-left lg:text-base text-verde-petroleo leading-relaxed">
                    Ser um centro de referência para a capacitação
                    multidisciplinar de pacientes/família e profissionais, por
                    meio de novas tecnologias para o cuidado ambulatorial
                    integral das pessoas que convivem com o diabetes
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-y-3 lg:gap-y-4">
                <div className="flex flex-col items-center sm:items-start">
                  <h1 className="font-semibold text-verde-petroleo text-lg lg:text-xl">
                    VALORES
                  </h1>
                  <ul className="text-verde-petroleo flex flex-col items-center sm:items-start text-sm lg:text-base leading-relaxed space-y-1">
                    <li className="custom-li">Ensino</li>
                    <li className="custom-li">Cuidado</li>
                    <li className="custom-li">Ética</li>
                    <li className="custom-li">Trabalho em equipe</li>
                    <li className="custom-li">Conhecimento</li>
                    <li className="custom-li">Dedicação</li>
                    <li className="custom-li">Comprometimento</li>
                    <li className="custom-li">Família</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col sm:flex-row justify-center items-center gap-y-[1rem] gap-x-[2.4075rem] w-full px-4">
          <div className="w-full max-w-[450px] flex flex-col justify-center items-center gap-y-[1.57875rem]">
            <Image
              className="sm:hidden w-full max-w-[25.25rem] h-[14.5rem] rounded-[5px] object-cover"
              src={Walkirya_Grafico}
              alt="Diabetologista Walkirya na aula inaugural da Liga de Diabetes e Metabologia da Unicamp"
              placeholder="blur"
              blurDataURL={BlurWalkyria_Grafico.src}
              unoptimized
            />
            <p className="text-text text-lg text-center max-w-md">
              Nossa aptidão é a educação e o letramento em saúde que se estendem
              aos pacientes e famílias, especialmente com foco na atenção à
              cronicidade e seus desdobramentos. Temos a satisfação de manter o
              seguimento de centenas de pacientes que confiam no nosso trabalho
              há anos. Esse vínculo de confiança é motivo de orgulho para nossa
              equipe e é a inspiração que procuramos transmitir nos cursos que
              ministramos aos profissionais.
            </p>
            <Image
              className="hidden sm:block w-full max-w-[25.25rem] h-[14.5rem] rounded-[5px] object-cover"
              src={EquipeMultiprofissional}
              placeholder="blur"
              blurDataURL={BlurEquipeMultiprofissional.src}
              alt="Equipe multiprofissional da Qualiclínica - unida no cuidado à pessoa com diabetes"
              unoptimized
            />
          </div>
          <div className="w-full max-w-[450px] flex flex-col justify-center items-center gap-y-[1.57875rem]">
            <Image
              className="hidden sm:block w-full max-w-[25.25rem] h-[14.5rem] rounded-[5px] object-cover"
              src={Walkirya_Grafico}
              placeholder="blur"
              blurDataURL={BlurWalkyria_Grafico.src}
              alt="Diabetologista Walkirya na aula inaugural da Liga de Diabetes e Metabologia da Unicamp"
              unoptimized
            />
            <Image
              className="sm:hidden block w-full max-w-[25.25rem] h-[14.5rem] rounded-[5px] object-cover"
              src={EquipeMultiprofissional}
              placeholder="blur"
              blurDataURL={BlurEquipeMultiprofissional.src}
              alt="Equipe multiprofissional da Qualiclínica - unida no cuidado à pessoa com diabetes"
              unoptimized
            />
            <p className="text-text text-lg text-center max-w-md">
              Nossa Clínica dispõe de recepcionistas especializadas no
              atendimento humanizado e com ampla experiência em lidar com as
              tecnologias avançadas para o tratamento do diabetes, sobretudo
              bombas de infusão contínua de insulina, sensores subcutâneos e
              glicosímetros.
            </p>
          </div>
        </section>

        <section className="w-full max-w-6xl px-4">
          <div className="flex flex-col gap-8 items-center">
            <h1 className="text-3xl lg:text-4xl text-verde-petroleo font-semibold text-center">
              Nossos diferenciais
            </h1>
            {loading ? (
              <p className="text-text text-sm">Carregando diferenciais...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full max-w-5xl">
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-rosa text-magenta text-xl lg:text-2xl font-semibold flex-shrink-0">
                    {differentials[4]?.counter}
                  </div>
                  <p className="text-text text-sm lg:text-base">
                    {differentials[4]?.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-rosa text-magenta text-xl lg:text-2xl font-semibold flex-shrink-0">
                    {differentials[0]?.counter}
                  </div>
                  <p className="text-text text-sm lg:text-base">
                    {differentials[0]?.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-rosa text-magenta text-xl lg:text-2xl font-semibold flex-shrink-0">
                    {differentials[2]?.counter}
                  </div>
                  <p className="text-text text-sm lg:text-base">
                    {differentials[2]?.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-rosa text-magenta text-xl lg:text-2xl font-semibold flex-shrink-0">
                    {differentials[3]?.counter}
                  </div>
                  <p className="text-text text-sm lg:text-base">
                    {differentials[3]?.description}
                  </p>
                </div>
                <div className="md:col-span-2 flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-rosa text-magenta text-xl lg:text-2xl font-semibold flex-shrink-0">
                    {differentials[1]?.counter}
                  </div>
                  <p className="text-text text-sm lg:text-base">
                    {differentials[1]?.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
