import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import "@/app/globals.css"
import Image from "next/image";
import NucleoEdu from "./assets-profissionais/nucleo-educacional.jpg"
import Walkiria from "./assets-profissionais/walkiria.jpg"

function HeroProfissionais() {
  return (
    <section className="h-[20rem] flex flex-col flex-wrap justify-center items-center m-auto gap-x-[2rem]">
      <Image className="w-[31.5rem] h-[20rem] rounded-[5px]" src={NucleoEdu} alt="Nosso núcleo educacional composto por Walkíria, Sonia, Thaís e Sandra" />
      <div className="flex flex-col gap-y-[0.75rem]">
        <h1 className="text-[2.25rem] h-fit text-(--verde-petroleo) font-semibold w-[19.5rem] inline-block leading-[2.7rem]">nosso núcleo educacional</h1>
        <p className="w-[16.25rem] text-(--text) text-[0.94rem] py-[0.5rem] bg-[url('/circle-prof.svg')] bg-contain bg-no-repeat">Nosso núcleo educacional é composto por Sandra David, Thais Brasil, Sonia Cavinatto e Walkyria Volpini, principal organizadora das atividades educacionais.</p>
      </div>
    </section>
  );
}

function NucleoEducacional() {
  return (
    <section className="bg-(--rosa-claro) flex w-full justify-center py-[1.9rem]">
      <div className="flex flex-wrap gap-x-[26px] gap-y-[24px] w-[51.625rem]">
        <div className="w-[25rem] h-[10.5rem] flex flex-col flex-wrap justify-center items-stretch gap-y-[0.5rem]">
          <Image src={Walkiria} alt="Diabetologista Walkiria" width={168} height={168} className="rounded-[84px]" />
          <h2 className="w-[13.5rem] font-semibold text-[27px] text-(--magenta)">Walkyiria Mara Gonçalves Volpini</h2>
          <p className="text-[0.9375rem] text-(--text)">Diabetologista</p>
        </div>
        <div className="w-[25rem] h-[10.5rem] flex flex-col flex-wrap justify-center items-stretch gap-y-[0.5rem]">
          <Image src={Walkiria} alt="Diabetologista Walkiria" width={168} height={168} className="rounded-[84px]" />
          <h2 className="w-[13.5rem] font-semibold text-[27px] text-(--magenta)">Sonia Maria Cavinatto</h2>
          <p className="text-[0.9375rem] text-(--text)">Enfermeira</p>
        </div>
        <div className="w-[25rem] h-[10.5rem] flex flex-col flex-wrap justify-center items-stretch gap-y-[0.5rem]">
          <Image src={Walkiria} alt="Diabetologista Walkiria" width={168} height={168} className="rounded-[84px]" />
          <h2 className="w-[13.5rem] font-semibold text-[27px] text-(--magenta)">Sandra Mara Rosa David</h2>
          <p className="text-[0.9375rem] text-(--text)">Psicóloga</p>
        </div>
        <div className="w-[25rem] h-[10.5rem] flex flex-col flex-wrap justify-center items-stretch gap-y-[0.5rem]">
          <Image src={Walkiria} alt="Diabetologista Walkiria" width={168} height={168} className="rounded-[84px]" />
          <h2 className="w-[13.5rem] font-semibold text-[27px] text-(--magenta)">Thais Barbarini Seabra Brasil</h2>
          <p className="text-[0.9375rem] text-(--text)">Nutricionista</p>
        </div>
      </div>
    </section>
  );
}

function ProfissionalModel({ nome, profissao, identificacao, carreira }: { nome: string, profissao: string, identificacao: string, carreira: string }) {
  return (
    <section className="flex flex-col bg-(--menta-claro1) rounded-[5px] p-[1.375rem] gap-y-[0.5rem] w-[25.5rem]">
      <h4 className="font-semibold text-(--verde-petroleo)">{nome}</h4>
      <div className="flex justify-between">
        <h5 className="inline-block font-semibold text-(--verde-petroleo)">{profissao}</h5>
        <p className="inline-block font-light text-(--text) text-[1rem]">{identificacao}</p>
      </div>
      <div className="w-[22.75rem] h-[11.375rem] overflow-y-auto hover:bg-white">
        <p className="text-(--text) text-[0.9375rem] font-light"><b className="font-normal">Carreira: </b>{carreira}</p>
      </div>
    </section>
  );
}

function InfoProfissionais() {
  return (
    <section className="flex flex-col gap-y-[1.5rem]">
      <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
        <h1 className="w-full mb-[0.5rem] font-semibold text-(--verde-petroleo) text-[2.5rem] border-b-[1px] border-b-(--verde-petroleo)">diabetologia</h1>
        <ProfissionalModel nome={"Walkyria Mara Gonçalves Volpini"} profissao={"Diabetologista"} identificacao={"CRM 45928"} carreira={"Carreira: Graduação em Medicina pela Faculdade de Ciências Médicas UNICAMP 1982;\nResidência Médica em Endocrinologia e Metabologia	Hospital das Clínicas UNICAMP;\nTítulo de Especialista em Diabetes pela Escola de Graduados da Sociedade Argentina de Diabetes, Buenos Aires;\nDiploma de Estudos Aprofundados em Bases Genéticas e Moleculares do Sistema Imunológico Normal e Patológico	Universidade Paris V, França;\nDoutorado em Clínica Médica Faculdade de Ciências Médicas UNICAMP;\nPós-Doutoramento Laboratório de Histocompatibilidade, Hemocentro UNICAMP;\nProfessor Doutor Disciplina de Endocrinologia Departamento de Clínica Médica, FCM UNICAMP."} />
      </section>
      <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
        <h1 className="w-full mb-[0.5rem] font-semibold text-(--verde-petroleo) text-[2.5rem] border-b-[1px] border-b-(--verde-petroleo)">enfermagem</h1>
        <ProfissionalModel nome={"Walkyria Mara Gonçalves Volpini"} profissao={"Diabetologista"} identificacao={"CRM 45928"} carreira={"Carreira: Graduação em Medicina pela Faculdade de Ciências Médicas UNICAMP 1982;\nResidência Médica em Endocrinologia e Metabologia	Hospital das Clínicas UNICAMP;\nTítulo de Especialista em Diabetes pela Escola de Graduados da Sociedade Argentina de Diabetes, Buenos Aires;\nDiploma de Estudos Aprofundados em Bases Genéticas e Moleculares do Sistema Imunológico Normal e Patológico	Universidade Paris V, França;\nDoutorado em Clínica Médica Faculdade de Ciências Médicas UNICAMP;\nPós-Doutoramento Laboratório de Histocompatibilidade, Hemocentro UNICAMP;\nProfessor Doutor Disciplina de Endocrinologia Departamento de Clínica Médica, FCM UNICAMP."} />
        <ProfissionalModel nome={"Walkyria Mara Gonçalves Volpini"} profissao={"Diabetologista"} identificacao={"CRM 45928"} carreira={"Carreira: Graduação em Medicina pela Faculdade de Ciências Médicas UNICAMP 1982;\nResidência Médica em Endocrinologia e Metabologia	Hospital das Clínicas UNICAMP;\nTítulo de Especialista em Diabetes pela Escola de Graduados da Sociedade Argentina de Diabetes, Buenos Aires;\nDiploma de Estudos Aprofundados em Bases Genéticas e Moleculares do Sistema Imunológico Normal e Patológico	Universidade Paris V, França;\nDoutorado em Clínica Médica Faculdade de Ciências Médicas UNICAMP;\nPós-Doutoramento Laboratório de Histocompatibilidade, Hemocentro UNICAMP;\nProfessor Doutor Disciplina de Endocrinologia Departamento de Clínica Médica, FCM UNICAMP."} />
      </section>
      <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
        <h1 className="w-full mb-[0.5rem] font-semibold text-(--verde-petroleo) text-[2.5rem] border-b-[1px] border-b-(--verde-petroleo)">endocrinologia</h1>
        <ProfissionalModel nome={"Walkyria Mara Gonçalves Volpini"} profissao={"Diabetologista"} identificacao={"CRM 45928"} carreira={"Carreira: Graduação em Medicina pela Faculdade de Ciências Médicas UNICAMP 1982;\nResidência Médica em Endocrinologia e Metabologia	Hospital das Clínicas UNICAMP;\nTítulo de Especialista em Diabetes pela Escola de Graduados da Sociedade Argentina de Diabetes, Buenos Aires;\nDiploma de Estudos Aprofundados em Bases Genéticas e Moleculares do Sistema Imunológico Normal e Patológico	Universidade Paris V, França;\nDoutorado em Clínica Médica Faculdade de Ciências Médicas UNICAMP;\nPós-Doutoramento Laboratório de Histocompatibilidade, Hemocentro UNICAMP;\nProfessor Doutor Disciplina de Endocrinologia Departamento de Clínica Médica, FCM UNICAMP."} />
      </section>
      <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
        <h1 className="w-full mb-[0.5rem] font-semibold text-(--verde-petroleo) text-[2.5rem] border-b-[1px] border-b-(--verde-petroleo)">nutrição</h1>
        <ProfissionalModel nome={"Walkyria Mara Gonçalves Volpini"} profissao={"Diabetologista"} identificacao={"CRM 45928"} carreira={"Carreira: Graduação em Medicina pela Faculdade de Ciências Médicas UNICAMP 1982;\nResidência Médica em Endocrinologia e Metabologia	Hospital das Clínicas UNICAMP;\nTítulo de Especialista em Diabetes pela Escola de Graduados da Sociedade Argentina de Diabetes, Buenos Aires;\nDiploma de Estudos Aprofundados em Bases Genéticas e Moleculares do Sistema Imunológico Normal e Patológico	Universidade Paris V, França;\nDoutorado em Clínica Médica Faculdade de Ciências Médicas UNICAMP;\nPós-Doutoramento Laboratório de Histocompatibilidade, Hemocentro UNICAMP;\nProfessor Doutor Disciplina de Endocrinologia Departamento de Clínica Médica, FCM UNICAMP."} />
      </section>
      <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
        <h1 className="w-full mb-[0.5rem] font-semibold text-(--verde-petroleo) text-[2.5rem] border-b-[1px] border-b-(--verde-petroleo)">psicologia/psiquiatria</h1>
        <ProfissionalModel nome={"Walkyria Mara Gonçalves Volpini"} profissao={"Diabetologista"} identificacao={"CRM 45928"} carreira={"Carreira: Graduação em Medicina pela Faculdade de Ciências Médicas UNICAMP 1982;\nResidência Médica em Endocrinologia e Metabologia	Hospital das Clínicas UNICAMP;\nTítulo de Especialista em Diabetes pela Escola de Graduados da Sociedade Argentina de Diabetes, Buenos Aires;\nDiploma de Estudos Aprofundados em Bases Genéticas e Moleculares do Sistema Imunológico Normal e Patológico	Universidade Paris V, França;\nDoutorado em Clínica Médica Faculdade de Ciências Médicas UNICAMP;\nPós-Doutoramento Laboratório de Histocompatibilidade, Hemocentro UNICAMP;\nProfessor Doutor Disciplina de Endocrinologia Departamento de Clínica Médica, FCM UNICAMP."} />
      </section>
      <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
        <h1 className="w-full mb-[0.5rem] font-semibold text-(--verde-petroleo) text-[2.5rem] border-b-[1px] border-b-(--verde-petroleo)">outras áreas</h1>
        <ProfissionalModel nome={"Walkyria Mara Gonçalves Volpini"} profissao={"Diabetologista"} identificacao={"CRM 45928"} carreira={`Carreira: Graduação em Medicina pela Faculdade de Ciências Médicas UNICAMP 1982;
        Residência Médica em Endocrinologia e Metabologia	Hospital das Clínicas UNICAMP;
        Título de Especialista em Diabetes pela Escola de Graduados da Sociedade Argentina de Diabetes, Buenos Aires;
        Diploma de Estudos Aprofundados em Bases Genéticas e Moleculares do Sistema Imunológico Normal e Patológico	Universidade Paris V, França;
        Doutorado em Clínica Médica Faculdade de Ciências Médicas UNICAMP;\n
        Pós-Doutoramento Laboratório de Histocompatibilidade, Hemocentro UNICAMP;\n
        Professor Doutor Disciplina de Endocrinologia Departamento de Clínica Médica, FCM UNICAMP.`} />
      </section>
    </section>
  );
}

export default function Profissionais() {
  return (
    <div>
      <Navbar />
      <main className="font-[family-name:var(--font-poppins)] flex flex-col items-center gap-[2.625rem] pt-[1.5rem] pb-[2.625rem]">
        <HeroProfissionais />
        <NucleoEducacional />
        <InfoProfissionais />
      </main>
      <Footer />
    </div>
  );
}