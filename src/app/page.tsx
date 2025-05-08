"use client";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import "@/app/globals.css";
import Image from "next/image";
import LogoPrincipal from "@/assets/logo-principal.svg";
import Imagem1CursosHome from "@/assets/walkyria-cursos.jpg";
import Imagem2CursosHome from "@/assets/thais-cursos.jpg";
import WhatsappIcon from "@/assets/whatsapp-icon.svg";
import { Instagram } from "lucide-react";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { AreaCursoHome, ButtonHomeModel } from "@/components/home/components";
import MeetOurTeamSvg from "@/components/home/svg-meet-our-team";
import { useRouter } from "next/navigation";
import InterestForm from "@/components/ui/interest-form";
import { Toaster } from "sonner";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <main className="font-poppins flex flex-col items-center gap-[2.625rem] pt-[1.5rem] pb-[2.625rem]">
        <section className="flex justify-center items-center bg-rosa-claro w-full h-[23.125rem] m-auto gap-x-[4rem]">
          <div className="flex flex-wrap w-[24rem] gap-x-[1rem] gap-y-[1.5rem]">
            <h1 className="text-[2.25rem] h-fit text-magenta font-semibold w-[24rem] inline-block">
              conhecimento que promove bem-estar
            </h1>
            <ButtonHomeModel
              text="Conheça-nos"
              onClick={() => router.push("/a-qualiclinica")}
            />
            <ButtonHomeModel
              text="Nosso blog"
              onClick={() => router.push("/blog")}
            />
          </div>
          <Image
            alt="logo principal"
            src={LogoPrincipal}
            className="inline-block w-[23rem]"
            priority
          />
        </section>
        <section>
          <h1 className="text-center font-semibold text-[3rem] text-verde-petroleo pb-[21px]">
            nossos cursos
          </h1>
          <div className="flex flex-col flex-wrap h-[75.15rem] gap-y-[2rem] gap-x-[5rem]">
            <p className="w-[23.75rem] text-[1.125rem] text-text">
              Na QualiClínica Escola oferecemos uma ampla gama de cursos e
              mentorias relacionados ao tema do{" "}
              <b className="font-medium">diabetes</b>.
            </p>
            <AreaCursoHome courseArea={"para médicos"} />
            <AreaCursoHome courseArea={"mentorias"} />
            <Image
              className="rounded-[5px]"
              src={Imagem2CursosHome}
              alt="Nutricionista Thais apresentando slides do curso"
            />
            <Image
              className="rounded-[5px]"
              src={Imagem1CursosHome}
              alt="Diabetologista Walkyria apresentando slides do curso"
            />
            <AreaCursoHome courseArea={"para outros profissionais"} />
            <AreaCursoHome courseArea={"para pacientes e cuidadores"} />
          </div>
        </section>
        <section className="flex w-full h-[470px] justify-center items-center py-[3.75rem] bg-rosa-claro gap-x-[3.19rem]">
          <MeetOurTeamSvg />
          <div className="flex flex-col gap-[1.5rem] items-end">
            <h1 className="font-semibold text-magenta text-[3rem] text-right w-[25rem]">
              conheça nossos profissionais
            </h1>
            <p className="w-[24rem] text-right text-[1.125rem] text-text">
              Nossa clínica é formada por profissionais altamente capacitados,
              que se dedicam ao <b className="font-medium">cuidado</b> de cada
              paciente e à <b className="font-medium">formação de cada aluno</b>
              .
            </p>
            <ButtonHomeModel
              onClick={() => router.push("profissionais")}
              text="Profissionais"
            ></ButtonHomeModel>
          </div>
        </section>
        <section className="flex flex-row gap-[1.5rem]">
          <div className="flex flex-col items-center">
            <h1 className="font-semibold text-verde-petroleo text-[3rem]">
              contate-nos
            </h1>
            <InterestForm />
          </div>

          <div className="flex flex-col gap-[1.5rem]">
            <div className="flex flex-col gap-[1rem]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.73410215155306!2d-47.03778380613328!3d-22.8858529969182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cf60929e4e9b%3A0x248fedc1733a652f!2sR.%20Pilar%20do%20Sul%2C%20364%20-%20Ch%C3%A1cara%20da%20Barra%2C%20Campinas%20-%20SP%2C%2013090-757!5e0!3m2!1spt-BR!2sbr!4v1742434083835!5m2!1spt-BR!2sbr"
                width="381"
                height="288"
                /*allowfullscreen=""*/ loading="lazy" /*referrerpolicy="no-referrer-when-downgrade"*/
              ></iframe>
              <p className="text-[1.125rem] text-text w-[23.75rem]">
                Endereço: Rua Pilar do Sul 364, Chácara da Barra - Campinas
                (SP), CEP 13090-757
              </p>
            </div>
            <section className="w-full flex flex-row">
              <div className="flex flex-col gap-[0.75rem]">
                <h2 className="font-semibold text-verde-petroleo text-[1.69rem]">
                  contato e redes sociais
                </h2>
                <ul className="text-text text-[1.125rem] leading-[2.7rem]">
                  <li>
                    <Instagram className="inline-block" color="#991871" />
                    <p className="inline-block px-[1rem]">
                      @qualiclinicaescola
                    </p>
                  </li>
                  <li>
                    <Mail className="inline-block" color="#991871" />
                    <p className="inline-block px-[1rem]">
                      wqualiclinica@gmail.com
                    </p>
                  </li>
                  <li>
                    <Image className="inline-block" alt="" src={WhatsappIcon} />
                    <p className="inline-block px-[1rem]">
                      WhatsApp: +55 (19) 99641-9210
                    </p>
                  </li>
                  <li>
                    <Phone className="inline-block" color="#991871" />
                    <p className="inline-block px-[1rem]">
                      Telefone: +55 (19) 3254-5792
                    </p>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" closeButton />
    </>
  );
}
