"use client";

import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import "@/app/globals.css";
import Image from "next/image";
import Time from "@assets/assets-profissionais/time.jpg";
import Walkyria from "@assets/assets-profissionais/walkyria.jpg";
import Sonia from "@assets/assets-profissionais/sonia.jpg";
import Sandra from "@assets/assets-profissionais/sandra.jpg";
import Thais from "@assets/assets-profissionais/thais.jpg";
import Paula from "@assets/assets-profissionais/paula.jpg";
import ProfissionalModel from "@/components/professionals/professional-model";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Professional } from "@/components/ui/professional-card";

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState<Professional[]>([]);

  useEffect(() => {
    const professionalsRef = collection(db, "professionals");
    const fetchProfessionals = async () => {
      try {
        const snapshot = await getDocs(professionalsRef);
        const fetchedProfessionals = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Professional, "id">),
        }));
        setProfissionais(fetchedProfessionals);
      } catch (error) {
        console.error("Error fetching professionals:", error);
      }
    };
    fetchProfessionals();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="font-poppins flex flex-col items-center gap-[2.625rem] pt-[1.5rem] pb-[2.625rem]">
        <section className="h-fit w-full flex flex-row justify-center">
          <div className="flex flex-col sm:flex-row sm:items-start justify-center items-center gap-x-[2rem] space-y-2">
            <div className="w-[340px] h-[230px] sm:w-[290px] sm:h-[210px] md:w-[400px] md:h-[230px] lg:w-[480px] lg:h-[260px] relative">
              <Image
                className="rounded-md object-cover"
                src={Time}
                alt="Time da Qualiclínica Escola sorrindo para a foto"
                unoptimized
                fill
                priority
              />
            </div>

            <div className="flex flex-col items-center lg:mt-8 sm:items-start lg:gap-y-[0.75rem]">
              <h1 className="!text-3xl sm:!text-2xl text-verde-petroleo font-semibold w-80 lg:w-[358px] text-center sm:text-left leading-[2.7rem]">
                Nosso núcleo educacional
              </h1>
              <p className="w-[320px] sm:w-72 md:w-64 lg:w-60 text-text text-base sm:text-sm md:text-base text-center sm:text-left py-[0.5rem] bg-[url('/circle-prof.svg')] bg-contain bg-no-repeat">
                Nosso núcleo educacional é composto por Sandra David, Thais
                Brasil, Sonia Cavinatto e Walkyria Volpini, principal
                organizadora das atividades educacionais.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-rosa-claro flex w-full justify-center py-[1.9rem]">
          <div className="flex flex-wrap justify-center gap-x-[26px] gap-y-[24px] w-[51.625rem]">
            <div className="w-fit h-[10.5rem] flex flex-row flex-wrap justify-center gap-x-5">
              <div className="h-32 w-32 lg:w-40 lg:h-40 relative">
                <Image
                  src={Walkyria}
                  alt="Diabetologista Walkyria"
                  className="rounded-[84px] object-cover"
                  fill
                  unoptimized
                />
              </div>

              <div>
                <p className="w-40 lg:w-[216px] font-semibold text-lg lg:text-2xl text-magenta">
                  Walkyria Mara Gonçalves Volpini
                </p>
                <p className="text-base text-text">Diabetologista</p>
              </div>
            </div>
            <div className="w-fit h-[10.5rem] flex flex-row flex-wrap justify-center gap-x-5">
              <div className="h-32 w-32 lg:w-40 lg:h-40 relative">
                <Image
                  src={Sonia}
                  alt="Enfermeira Sonia"
                  className="rounded-[84px] object-cover"
                  fill
                  unoptimized
                />
              </div>
              <div>
                <p className="w-40 lg:w-[216px] font-semibold text-lg lg:text-2xl text-magenta">
                  Sonia Maria Cavinatto
                </p>
                <p className="text-base text-text">Enfermeira</p>
              </div>
            </div>
            <div className="w-fit h-[10.5rem] flex flex-row flex-wrap justify-center gap-x-5">
              <div className="h-32 w-32 lg:w-40 lg:h-40 relative">
                <Image
                  src={Sandra}
                  alt="Psicóloga Sandra"
                  className="rounded-[84px] object-cover"
                  fill
                  unoptimized
                />
              </div>

              <div>
                <p className="w-40 lg:w-[216px] font-semibold text-lg lg:text-2xl text-magenta">
                  Sandra Mara Rosa David
                </p>
                <p className="text-base text-text">Psicóloga</p>
              </div>
            </div>
            <div className="w-fit h-[10.5rem] flex flex-row flex-wrap justify-center gap-x-5">
              <div className="h-32 w-32 lg:w-40 lg:h-40  relative">
                <Image
                  src={Thais}
                  alt="Nutricionista Thais"
                  className="rounded-[84px] object-cover"
                  fill
                  unoptimized
                />
              </div>
              <div>
                <p className="w-40 lg:w-[216px] font-semibold text-lg lg:text-2xl text-magenta">
                  Thais Barbarini Seabra Brasil
                </p>
                <p className="text-base text-text">Nutricionista</p>
              </div>
            </div>

            <div className="w-fit h-[10.5rem] flex flex-row flex-wrap justify-center gap-x-5">
              <div className="h-32 w-32 lg:w-40 lg:h-40 rounded-[84px] relative">
                <Image
                  src={Paula}
                  alt="Enfermeira Paula"
                  className="rounded-[84px] object-cover"
                  fill
                  unoptimized
                />
              </div>

              <div className="">
                <p className="w-40 lg:w-[216px] font-semibold text-lg lg:text-2xl text-magenta">
                  Paula Maria de Pascali
                </p>
                <p className="text-base text-text">Enfermeira</p>
                <p className="w-40 lg:w-[216px] text-base text-text">Educadora em Diabetes</p>
              </div>
            </div>

          </div>
        </section>
        <section className="flex flex-col gap-y-[1.5rem] w-full max-w-6xl px-4">
          <section className="w-full">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo !text-2xl sm:!text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              Diabetologia
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-[1.375rem] mt-4">
              {profissionais
                .filter((profissional) => profissional.area === "diabetology")
                .map((profissional) => (
                  <ProfissionalModel
                    key={profissional.id}
                    nome={profissional.name}
                    profissao={profissional.occupation}
                    identificacao={profissional.identification}
                    carreira={profissional.career}
                  />
                ))}
            </div>
          </section>
          <section className="w-full">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo !text-2xl sm:!text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              Enfermagem
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-[1.375rem] mt-4">
              {profissionais
                .filter((profissional) => profissional.area === "nursing")
                .map((profissional) => (
                  <ProfissionalModel
                    key={profissional.id}
                    nome={profissional.name}
                    profissao={profissional.occupation}
                    identificacao={profissional.identification}
                    carreira={profissional.career}
                  />
                ))}
            </div>
          </section>
          <section className="w-full">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo !text-2xl sm:!text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              Endocrinologia
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-[1.375rem] mt-4">
              {profissionais
                .filter((profissional) => profissional.area === "endocrinology")
                .map((profissional) => (
                  <ProfissionalModel
                    key={profissional.id}
                    nome={profissional.name}
                    profissao={profissional.occupation}
                    identificacao={profissional.identification}
                    carreira={profissional.career}
                  />
                ))}
            </div>
          </section>
          <section className="w-full">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo !text-2xl sm:!text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              Nutrição
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-[1.375rem] mt-4">
              {profissionais
                .filter((profissional) => profissional.area === "nutrition")
                .map((profissional) => (
                  <ProfissionalModel
                    key={profissional.id}
                    nome={profissional.name}
                    profissao={profissional.occupation}
                    identificacao={profissional.identification}
                    carreira={profissional.career}
                  />
                ))}
            </div>
          </section>
          <section className="w-full">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo !text-2xl sm:!text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              Psicologia/Psiquiatria
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-[1.375rem] mt-4">
              {profissionais
                .filter(
                  (profissional) => profissional.area === "psychology/psychiatry"
                )
                .map((profissional) => (
                  <ProfissionalModel
                    key={profissional.id}
                    nome={profissional.name}
                    profissao={profissional.occupation}
                    identificacao={profissional.identification}
                    carreira={profissional.career}
                  />
                ))}
            </div>
          </section>
          <section className="w-full">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo !text-2xl sm:!text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              Outras áreas
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-[1.375rem] mt-4">
              {profissionais
                .filter((profissional) => profissional.area === "others")
                .map((profissional) => (
                  <ProfissionalModel
                    key={profissional.id}
                    nome={profissional.name}
                    profissao={profissional.occupation}
                    identificacao={profissional.identification}
                    carreira={profissional.career}
                  />
                ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}
