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
    }
    fetchProfessionals();
  }, [])

  return (
    <div>
      <Navbar />
      <main className="font-poppins flex flex-col items-center gap-[2.625rem] pt-[1.5rem] pb-[2.625rem]">
        <section className="h-[20rem] flex flex-col flex-wrap justify-center items-center m-auto gap-x-[2rem]">
          <Image
            className="w-[504px] h-[321px] rounded-[5px] object-cover"
            src={Time}
            alt="Nosso núcleo educacional composto por Walkyria, Sonia, Thaís e Sandra"
            priority
            placeholder="blur"
          />
          <div className="flex flex-col gap-y-[0.75rem]">
            <h1 className="text-[2.25rem] h-fit text-verde-petroleo font-semibold w-[19.5rem] inline-block leading-[2.7rem]">
              Nosso núcleo educacional
            </h1>
            <p className="w-[16.25rem] text-text text-[0.94rem] py-[0.5rem] bg-[url('/circle-prof.svg')] bg-contain bg-no-repeat">
              Nosso núcleo educacional é composto por Sandra David, Thais
              Brasil, Sonia Cavinatto e Walkyria Volpini, principal organizadora
              das atividades educacionais.
            </p>
          </div>
        </section>
        <section className="bg-rosa-claro flex w-full justify-center py-[1.9rem]">
          <div className="flex flex-wrap gap-x-[26px] gap-y-[24px] w-[51.625rem]">
            <div className="w-[25rem] h-[10.5rem] flex flex-col flex-wrap justify-center items-stretch gap-y-[0.5rem]">
              <Image
                src={Walkyria}
                alt="Diabetologista Walkyria"
                width={168}
                height={168}
                className="rounded-[84px]"
              />
              <h2 className="w-[13.5rem] font-semibold custom-h2 text-magenta">
                Walkyria Mara Gonçalves Volpini
              </h2>
              <p className="text-[0.9375rem] text-text">Diabetologista</p>
            </div>
            <div className="w-[25rem] h-[10.5rem] flex flex-col flex-wrap justify-center items-stretch gap-y-[0.5rem]">
              <Image
                src={Sonia}
                alt="Enfermeira Sonia"
                width={168}
                height={168}
                className="rounded-[84px]"
              />
              <h2 className="w-[13.5rem] font-semibold custom-h2 text-magenta">
                Sonia Maria Cavinatto
              </h2>
              <p className="text-[0.9375rem] text-text">Enfermeira</p>
            </div>
            <div className="w-[25rem] h-[10.5rem] flex flex-col flex-wrap justify-center items-stretch gap-y-[0.5rem]">
              <Image
                src={Sandra}
                alt="Psicóloga Sandra"
                width={168}
                height={168}
                className="rounded-[84px]"
              />
              <h2 className="w-[13.5rem] font-semibold custom-h2 text-magenta">
                Sandra Mara Rosa David
              </h2>
              <p className="text-[0.9375rem] text-text">Psicóloga</p>
            </div>
            <div className="w-[25rem] h-[10.5rem] flex flex-col flex-wrap justify-center items-stretch gap-y-[0.5rem]">
              <Image
                src={Thais}
                alt="Nutricionista Thais"
                width={168}
                height={168}
                className="rounded-[84px]"
              />
              <h2 className="w-[13.5rem] font-semibold custom-h2 text-magenta">
                Thais Barbarini Seabra Brasil
              </h2>
              <p className="text-[0.9375rem] text-text">Nutricionista</p>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-y-[1.5rem]">
          <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              diabetologia
            </h1>
            {profissionais.filter((profissional) => profissional.area === "diabetology").map((profissional) => (
              <ProfissionalModel
                key={profissional.id}
                nome={profissional.name}
                profissao={profissional.occupation}
                identificacao={profissional.identification}
                carreira={profissional.career}
              />
            ))}
          </section>
          <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              enfermagem
            </h1>
            {profissionais.filter((profissional) => profissional.area === "nursing").map((profissional) => (
              <ProfissionalModel
                key={profissional.id}
                nome={profissional.name}
                profissao={profissional.occupation}
                identificacao={profissional.identification}
                carreira={profissional.career}
              />
            ))}
          </section>
          <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              endocrinologia
            </h1>
            {profissionais.filter((profissional) => profissional.area === "endocrinology").map((profissional) => (
              <ProfissionalModel
                key={profissional.id}
                nome={profissional.name}
                profissao={profissional.occupation}
                identificacao={profissional.identification}
                carreira={profissional.career}
              />
            ))}
          </section>
          <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              nutrição
            </h1>
            {profissionais.filter((profissional) => profissional.area === "nutrition").map((profissional) => (
              <ProfissionalModel
                key={profissional.id}
                nome={profissional.name}
                profissao={profissional.occupation}
                identificacao={profissional.identification}
                carreira={profissional.career}
              />
            ))}
          </section>
          <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              psicologia/psiquiatria
            </h1>
            {profissionais.filter((profissional) => profissional.area === "psychology/psychiatry").map((profissional) => (
              <ProfissionalModel
                key={profissional.id}
                nome={profissional.name}
                profissao={profissional.occupation}
                identificacao={profissional.identification}
                carreira={profissional.career}
              />
            ))}
          </section>
          <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              outras áreas
            </h1>
            {profissionais.filter((profissional) => profissional.area === "others").map((profissional) => (
              <ProfissionalModel
                key={profissional.id}
                nome={profissional.name}
                profissao={profissional.occupation}
                identificacao={profissional.identification}
                carreira={profissional.career}
              />
            ))}
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}