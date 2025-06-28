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
import InterestForm from "@/components/ui/interest-form";
import { getWebMetadata } from "@/app/metadata";

export const metadata = getWebMetadata({
  title: "Home",
  description: "Bem-vindo à Quali Clínica Escola",
  url: "/",
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="font-poppins flex flex-col items-center gap-[2.625rem] pt-[1.5rem] pb-[2.625rem]">
        <section className="flex flex-col sm:flex-row justify-center items-center bg-rosa-claro w-[90%] sm:w-full h-fit gap-x-[4rem]">
          <div className="flex flex-col items-center w-full gap-x-[1rem] gap-y-[1.5rem]">
            <h1 className="!text-2xl text-center sm:!text-4xl h-fit text-magenta font-semibold w-[90%] sm:w-[24rem] inline-block">
              Conhecimento que promove bem-estar
            </h1>
            <div className="flex flex-row gap-x-[6px] sm:gap-x-[1.5rem]">
              <ButtonHomeModel text="Conheça-nos" path="/a-qualiclinica" />
              <ButtonHomeModel text="Nosso blog" path="/blog" />
            </div>
          </div>
          <Image
            alt="logo principal"
            src={LogoPrincipal}
            className="inline-block w-[50%] sm:w-[30%]"
            priority
          />
        </section>
        <section className="w-full">
          <h1 className="text-center font-semibold text-[3rem] text-verde-petroleo pb-[21px]">
            Nossos cursos
          </h1>
          <div className="w-full flex flex-row justify-center">
            <div className="flex flex-col md:flex-row justify-center items-center w-[90%] h-fit md:h-[75.15rem] gap-y-[2rem] gap-x-[5rem]">
              <div className="flex flex-col items-center">
                <p className="w-full md:w-[320px] lg:w-[380px] text-center text-[18px] md:text-left text-text">
                  Na Quali Clínica Escola oferecemos uma ampla gama de cursos e
                  mentorias relacionados ao tema do{" "}
                  <b className="font-medium">diabetes</b>.
                </p>
                <div className="md:hidden w-[90%] flex flex-row justify-center">
                  <Image
                    className="rounded-md object-contain"
                    src={Imagem1CursosHome}
                    alt="Diabetologista Walkyria apresentando slides do curso"
                    placeholder="blur"
                  />
                </div>

                <AreaCursoHome courseArea={"Para médicos"} />
                <AreaCursoHome courseArea={"Mentorias"} />
                <div className="hidden md:block w-[20rem] lg:w-[23.75rem]">
                  <Image
                    className="object-contain rounded-md"
                    src={Imagem2CursosHome}
                    alt="Nutricionista Thais apresentando slides do curso"
                    placeholder="blur"
                  />
                </div>
              </div>

              <div className="w-fit flex flex-col items-center">
                <div className="mt-2 hidden md:block w-[20rem] lg:w-[23.75rem]">
                  <Image
                    className="rounded-md object-cover"
                    src={Imagem1CursosHome}
                    alt="Diabetologista Walkyria apresentando slides do curso"
                    placeholder="blur"
                  />
                </div>
                <AreaCursoHome courseArea={"Para outros profissionais"} />
                <AreaCursoHome courseArea={"Para pacientes e cuidadores"} />
                <div className="md:hidden w-[90%] flex flex-row justify-center">
                  <Image
                    className="rounded-md md:hidden"
                    src={Imagem2CursosHome}
                    alt="Nutricionista Thais apresentando slides do curso"
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col md:flex-row w-full h-fit justify-center items-center py-[3.75rem] bg-rosa-claro gap-x-[3.19rem]">
          <div className="hidden w-[300px] md:flex justify-center h-fit">
            <MeetOurTeamSvg />
          </div>

          <div className="flex flex-col w-[90%] md:w-[50%] gap-[1.5rem] items-center md:items-end">
            <h1 className="font-semibold text-magenta !text-3xl md:!text-5xl text-center md:text-right w-fit md:w-full">
              Conheça nossos profissionais
            </h1>
            <p className="w-[90%] md:w-[24rem] text-center md:text-right text-[1.125rem] text-text">
              Nossa clínica é formada por profissionais altamente capacitados,
              que se dedicam ao <b className="font-medium">cuidado</b> de cada
              paciente e à <b className="font-medium">formação de cada aluno</b>
              .
            </p>
            <div className="md:hidden w-full flex flex-col items-center">
              <MeetOurTeamSvg />
              <ButtonHomeModel
                path="profissionais"
                text="Profissionais"
              ></ButtonHomeModel>
            </div>
            <div className="hidden md:block">
              <ButtonHomeModel
                path="profissionais"
                text="Profissionais"
              ></ButtonHomeModel>
            </div>
          </div>
        </section>
        <section className="mx-2 flex flex-col md:flex-row gap-[1.5rem]">
          <div className="flex flex-col items-center">
            <h1 className="font-semibold text-verde-petroleo text-[3rem]">
              Contate-nos
            </h1>
            <InterestForm />
          </div>

          <div className="flex flex-col items-center w-full md:w-fit gap-[1.5rem]">
            <div className="hidden sm:flex flex-col gap-[1rem]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.73410215155306!2d-47.03778380613328!3d-22.8858529969182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cf60929e4e9b%3A0x248fedc1733a652f!2sR.%20Pilar%20do%20Sul%2C%20364%20-%20Ch%C3%A1cara%20da%20Barra%2C%20Campinas%20-%20SP%2C%2013090-757!5e0!3m2!1spt-BR!2sbr!4v1742434083835!5m2!1spt-BR!2sbr"
                width="381"
                height="288"
                /*allowfullscreen=""*/ loading="lazy" /*referrerpolicy="no-referrer-when-downgrade"*/
              ></iframe>
            </div>
            <div className="sm:hidden flex flex-col gap-[1rem]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.73410215155306!2d-47.03778380613328!3d-22.8858529969182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cf60929e4e9b%3A0x248fedc1733a652f!2sR.%20Pilar%20do%20Sul%2C%20364%20-%20Ch%C3%A1cara%20da%20Barra%2C%20Campinas%20-%20SP%2C%2013090-757!5e0!3m2!1spt-BR!2sbr!4v1742434083835!5m2!1spt-BR!2sbr"
                width="336"
                height="155"
                /*allowfullscreen=""*/ loading="lazy" /*referrerpolicy="no-referrer-when-downgrade"*/
              ></iframe>
            </div>
            <p className="w-[336px] sm:w-[380px] text-[18px] text-center sm:text-left text-text">
              Endereço: Rua Pilar do Sul 364, Chácara da Barra - Campinas (SP),
              CEP 13090-757
            </p>
            <section className="w-full flex flex-row justify-center md:w-fit">
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
                    <Image
                      className="inline-block"
                      alt="Ícone de WhatsApp"
                      src={WhatsappIcon}
                    />
                    <p className="inline-block px-[1rem] text-[16px]">
                      WhatsApp: +55 (19) 99641-9210
                    </p>
                  </li>
                  <li>
                    <Phone className="inline-block" color="#991871" />
                    <p className="inline-block px-[1rem] text-[16px]">
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
    </>
  );
}
