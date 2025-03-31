import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import "@/app/globals.css"
import Image from "next/image";
import NucleoEdu from "@assets/assets-profissionais/nucleo-educacional.jpg";

function HeroSobreNos() {
  return (
    <section className="h-[20rem] flex flex-row flex-wrap justify-center items-center m-auto gap-x-[2rem]">
      <Image className="w-[31.5rem] h-[20rem] rounded-[5px]" src={NucleoEdu} alt="Imagem a ser decidida" />
      <div className="flex flex-col gap-y-[0.75rem]">
        <h1 className="text-[2.25rem] h-fit text-(--magenta) font-semibold w-[22.4rem] inline-block leading-[2.7rem]">Qualiclínica Escola, quem somos?</h1>
        <p className="w-[19.25rem] text-(--text) text-[0.94rem] py-[0.5rem] bg-[url('/circle-prof.svg')] bg-contain bg-no-repeat">Somos um centro de <span className="font-medium">formação</span> e <span className="font-medium">treinamento</span> para profissionais de saúde que desejam aprimorar seus conhecimentos na assistência aos pacientes crônicos, em especial aqueles que convivem com diabetes. </p>
      </div>
    </section>
  );
}

function MVVSobreNos() {
  return (
    <section className="bg-(--ciano) flex w-full justify-center items-center py-[1.5rem] h-[15.875rem]">
      <div className="flex flex-row justify-center gap-x-[1.25rem]">
        <div className="w-[17.5rem] flex flex-col items-start gap-y-[0.5rem]">
          <h1 className="font-semibold text-(--verde-petroleo)">missão</h1>
          <p className="text-[0.875rem] text-(--verde-petroleo) self-stretch leading-[1.125rem] h-[6.75rem] px-[0.15rem]">Prover cuidados e ensino integrais ao paciente/familiar, gerando autonomia e bem-estar. Formar profissionais da saúde na investigação, manejo e seguimento multiprofissional de pessoas que convivem com o diabetes.</p>
        </div>
        <div className="w-[17.5rem] flex flex-col items-start gap-y-[0.5rem]">
          <h1 className="font-semibold text-(--verde-petroleo)">visão</h1>
          <p className="text-[0.875rem] text-(--verde-petroleo) self-stretch leading-[1.125rem] h-[6.75rem]">Ser um centro de referência para a capacitação multidisciplinar de pacientes/família e profissionais, por meio de novas tecnologias para o cuidado ambulatorial integral das pessoas que convivem com o diabetes </p>
        </div>
        <div className="w-[17.5rem] flex flex-col items-start gap-y-[0.5rem]">
          <h1 className="font-semibold text-(--verde-petroleo)">valores</h1>
          <ul className="text-(--verde-petroleo) text-[0.875rem] h-[9rem] leading-[1.125rem]">
            <li>Ensino</li>
            <li>Cuidado</li>
            <li>Ética</li>
            <li>Trabalho em equipe</li>
            <li>Conhecimento</li>
            <li>Dedicação</li>
            <li>Comprometimento</li>
            <li>Família</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function InfoSobreNos(){
  return(
    <section className="flex flex-col justify-center items-center gap-y-[1.625rem]">
      <div className="h-[20rem] flex flex-row justify-center items-center m-auto gap-x-[2rem]">
        <p className="w-[22.0538rem] text-(--text) text-[0.94rem] py-[0.5rem]">Nossa aptidão é a educação e o letramento em saúde que se estendem aos pacientes e famílias, especialmente com foco na atenção à cronicidade e seus desdobramentos. Temos a satisfação de manter o seguimento de centenas de pacientes que confiam no nosso trabalho há anos. Esse vínculo de confiança é motivo de orgulho para nossa equipe e é a inspiração que procuramos transmitir nos cursos que ministramos aos profissionais.  </p>
        <Image className="w-[31.5rem] h-[20rem] rounded-[5px]" src={NucleoEdu} alt="Imagem a ser decidida" />
      </div>
      <div className="h-[20rem] flex flex-row justify-center items-start m-auto gap-x-[2rem]">
        <Image className="w-[31.5rem] h-[20rem] rounded-[5px]" src={NucleoEdu} alt="Imagem a ser decidida" />
        <p className="w-[22.0538rem] text-(--text) text-[0.94rem] py-[0.5rem] text-right">Nossa Clínica dispõe de recepcionistas especializadas no atendimento humanizado e com ampla experiência em lidar com as tecnologias avançadas para o tratamento do diabetes, sobretudo bombas de infusão contínua de insulina,  sensores subcutâneos e glicosímetros. </p>
      </div>
    </section>
  );
}

/*
function Diferencial({diferencial}:{diferencial: number}){
  if (diferencial == 1){
    return(
      <div className="flex items-center flex-row gap-x-[0.75rem] w-[26.4375rem]">
        <h2 className="text-center font-semibold text-[1.7rem] text-(--verde-petroleo)">{diferencial}</h2>
        <div className="h-[12.5rem] overflow-y-auto hover:bg-white">
          <ul className="text-(--text) text-[1.125rem]">
            <li className="mb-[0.5rem]">Terapia de bomba de infusão de insulina</li>
            <li className="mb-[0.5rem]">Seguimento seguro do paciente com Diabetes Tipo 2</li>
            <li className="mb-[0.5rem]">Terapia de Contagem de Carboidratos</li>
          </ul>
        </div>
      </div>
    )
  }
}

function DiferenciaisSobreNos(){
  return(
    <section className="flex flex-col justify-start gap-y-[1.5rem] w-[54.875rem]">
      <h2 className="custom-h2 text-[3rem] text-(--verde-petroleo)">nossos diferenciais</h2>
      <div>
        <Diferencial diferencial={1}/>
        <Diferencial diferencial={2}/>
        <Diferencial diferencial={3}/>
        <Diferencial diferencial={4}/>
        <Diferencial diferencial={5}/>
      </div>
    </section>
  );
}*/


export default function SobreNos() {
  return (
    <div>
      <Navbar />
      <main className="font-[family-name:var(--font-poppins)] flex flex-col items-center gap-[2.625rem] pt-[1.5rem] pb-[2.625rem]">
        <HeroSobreNos />
        <MVVSobreNos />
        <InfoSobreNos />
      </main>
      <Footer />
    </div>
  );
}