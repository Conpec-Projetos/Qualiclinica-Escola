"use client";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import "@/app/globals.css";
import Image from "next/image";
import NucleoEdu from "@assets/assets-profissionais/nucleo-educacional.jpg";

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
    <div>
      <Navbar />
      <main className="font-[family-name:var(--font-poppins)] flex flex-col items-center gap-[2.625rem] pt-[1.5rem] pb-[2.625rem]">
        <section className="h-[20rem] flex flex-row flex-wrap justify-center items-center m-auto gap-x-[2rem]">
          <Image
            className="w-[504px] h-[321px] rounded-[5px]"
            src={NucleoEdu}
            alt="Imagem a ser decidida"
          />
          <div className="flex flex-col gap-y-[0.75rem]">
            <h1 className="text-[2.25rem] h-fit text-(--magenta) font-semibold w-[22.4rem] inline-block leading-[2.7rem]">
              Qualiclínica Escola, quem somos?
            </h1>
            <p className="w-[19.25rem] text-(--text) text-[0.94rem] py-[0.5rem] bg-[url('/circle-prof.svg')] bg-contain bg-no-repeat">
              Somos um centro de <span className="font-medium">formação</span> e{" "}
              <span className="font-medium">treinamento</span> para
              profissionais de saúde que desejam aprimorar seus conhecimentos na
              assistência aos pacientes crônicos, em especial aqueles que
              convivem com diabetes. 
            </p>
          </div>
        </section>

        <section className="bg-(--ciano) flex w-full justify-center items-center h-[15.875rem]">
          <div className="flex flex-row justify-center gap-x-[1.25rem]">
            <div className="w-[17.5rem] flex flex-col items-start gap-y-[0.5rem]">
              <h1 className="font-semibold text-(--verde-petroleo)">missão</h1>
              <p className="text-[0.875rem] text-(--verde-petroleo) self-stretch leading-[1.125rem] h-[6.75rem] px-[0.15rem]">
                Prover cuidados e ensino integrais ao paciente/familiar, gerando
                autonomia e bem-estar. Formar profissionais da saúde na
                investigação, manejo e seguimento multiprofissional de pessoas
                que convivem com o diabetes.
              </p>
            </div>
            <div className="w-[17.5rem] flex flex-col items-start gap-y-[0.5rem]">
              <h1 className="font-semibold text-(--verde-petroleo)">visão</h1>
              <p className="text-[0.875rem] text-(--verde-petroleo) self-stretch leading-[1.125rem] h-[6.75rem]">
                Ser um centro de referência para a capacitação multidisciplinar
                de pacientes/família e profissionais, por meio de novas
                tecnologias para o cuidado ambulatorial integral das pessoas que
                convivem com o diabetes 
              </p>
            </div>
            <div className="w-[12.5rem] flex flex-col items-start gap-y-[0.5rem]">
              <h1 className="font-semibold text-(--verde-petroleo)">valores</h1>
              <ul className="text-(--verde-petroleo) text-[0.875rem] h-[9rem] leading-[1.125rem]">
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
        </section>

        <section className="flex flex-row justify-center items-start gap-x-[2.4075rem]">
          <div className="flex flex-col justify-center items-center gap-y-[1.57875rem]">
            <p className="w-[22.0538rem] text-(--text) text-[0.94rem]">
              Nossa aptidão é a educação e o letramento em saúde que se estendem
              aos pacientes e famílias, especialmente com foco na atenção à
              cronicidade e seus desdobramentos. Temos a satisfação de manter o
              seguimento de centenas de pacientes que confiam no nosso trabalho
              há anos. Esse vínculo de confiança é motivo de orgulho para nossa
              equipe e é a inspiração que procuramos transmitir nos cursos que
              ministramos aos profissionais.
            </p>
            <Image
              className="w-[25.25rem] h-[14.5rem] rounded-[5px]"
              src={NucleoEdu}
              alt="Imagem a ser decidida"
            />
          </div>
          <div className="flex flex-col justify-center items-center  gap-y-[1.57875rem]">
            <Image
              className="w-[25.25rem] h-[14.5rem] rounded-[5px]"
              src={NucleoEdu}
              alt="Imagem a ser decidida"
            />
            <p className="w-[22.0538rem] text-(--text) text-[0.94rem] text-right">
              Nossa Clínica dispõe de recepcionistas especializadas no
              atendimento humanizado e com ampla experiência em lidar com as
              tecnologias avançadas para o tratamento do diabetes, sobretudo
              bombas de infusão contínua de insulina, sensores subcutâneos e
              glicosímetros.
            </p>
          </div>
        </section>

        <section>
          <div className="flex flex-col gap-y-[1.5rem] justify-start">
            <h1 className="custom-h1 text-(--verde-petroleo) font-semibold">
              nossos diferenciais
            </h1>
            {loading ? (
              <p className="text-(--text) text-[0.9375rem]">Carregando diferenciais...</p>
            ) : (
              <div className="flex flex-col gap-y-[1.5rem] justify-start">
                <div className="flex flex-row gap-x-[2rem]">
                  <div className="flex flex-row gap-x-[0.75rem] w-[26.4375rem] justify-start items-center">
                    <div className="flex items-center justify-center w-[6.625rem] h-[6.625rem] rounded-full bg-(--rosa) text-(--magenta) text-[1.5rem] font-semibold">
                      {differentials[4].counter}
                    </div>
                    <p className="text-black w-[18.75rem] text-[0.9375rem]">
                      {differentials[4].description}
                    </p>
                  </div>
                  <div className="flex flex-row gap-x-[0.75rem] w-[26.4375rem] justify-start items-center">
                    <div className="flex items-center justify-center w-[6.625rem] h-[6.625rem] rounded-full bg-(--rosa) text-(--magenta) text-[1.5rem] font-semibold">
                      {differentials[0].counter}
                    </div>
                    <p className="text-black w-[18.75rem] text-[0.9375rem]">
                      {differentials[0].description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-x-[2rem]">
                  <div className="flex flex-row gap-x-[0.75rem] w-[26.4375rem] justify-start items-center">
                    <div className="flex items-center justify-center w-[6.625rem] h-[6.625rem] rounded-full bg-(--rosa) text-(--magenta) text-[1.5rem] font-semibold">
                      {differentials[2].counter}
                    </div>
                    <p className="text-black w-[18.75rem] text-[0.9375rem]">
                      {differentials[2].description}
                    </p>
                  </div>
                  <div className="flex flex-row gap-x-[0.75rem] w-[26.4375rem] justify-start items-center">
                    <div className="flex items-center justify-center w-[6.625rem] h-[6.625rem] rounded-full bg-(--rosa) text-(--magenta) text-[1.5rem] font-semibold">
                      {differentials[3].counter}
                    </div>
                    <p className="text-black w-[18.75rem] text-[0.9375rem]">
                      {differentials[3].description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-x-[0.75rem] w-[44.875rem] justify-start items-center">
                    <div className="flex items-center justify-center w-[6.625rem] h-[6.625rem] rounded-full bg-(--rosa) text-(--magenta) text-[1.5rem] font-semibold">
                      {differentials[1].counter}
                    </div>
                    <p className="text-black w-[37.5rem] text-[0.9375rem]">
                      {differentials[1].description}
                    </p>
                  </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
