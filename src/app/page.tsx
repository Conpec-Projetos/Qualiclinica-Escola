import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import "@/app/globals.css"
import Image from "next/image";
import LogoPrincipal from "@/assets/logo-principal.svg"
import Imagem1CursosHome from "@/assets/walkyria-cursos.jpg"
import Imagem2CursosHome from "@/assets/thais-cursos.jpg"
import WhatsappIcon from "@/assets/whatsapp-icon.svg"
import { Instagram } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';

function ButtonHomeModel({ text }: { text: string }) {
  if (text == "Conheça-nos") {
    return (
      <button className="h-[3.125rem] flex gap-[4px] items-center px-[1rem] bg-white rounded-[5px]">
        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#1D4C5A"><path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" /></svg>
        <p className="text-(--verde-petroleo) text-[15px] uppercase">{text}</p>
      </button>
    );
  } else if (text == "Nosso blog") {
    return (
      <button className="h-[3.125rem] flex gap-[3px] items-center px-[1rem] bg-white rounded-[5px]">
        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#1D4C5A"><path d="M160-406.67v-66.66h293.33v66.66H160ZM160-570v-66.67h460V-570H160Zm0-163.33V-800h460v66.67H160ZM520-160v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8.67 9 12.83 20 4.17 11 4.17 22t-4.33 22.5q-4.34 11.5-13.28 20.5L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" /></svg>
        <p className="text-(--verde-petroleo) text-[15px] uppercase">{text}</p>
      </button>
    );
  } else if (text = "Profissionais") {
    return (
      <button className="h-[3.125rem] w-fit flex gap-[4px] items-center px-[1rem] bg-(--magenta) rounded-[5px]">
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M680-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480q-17 0-28.5 11.5T640-440q0 17 11.5 28.5T680-400ZM440-40v-116q0-21 10-39.5t28-29.5q32-19 67.5-31.5T618-275l62 75 62-75q37 6 72 18.5t67 31.5q18 11 28.5 29.5T920-156v116H440Zm79-80h123l-54-66q-18 5-35 13t-34 17v36Zm199 0h122v-36q-16-10-33-17.5T772-186l-54 66Zm-76 0Zm76 0Zm-518 0q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v200q-16-20-35-38t-45-24v-138H200v560h166q-3 11-4.5 22t-1.5 22v36H200Zm80-480h280q26-20 57-30t63-10v-40H280v80Zm0 160h200q0-21 4.5-41t12.5-39H280v80Zm0 160h138q11-9 23.5-16t25.5-13v-51H280v80Zm-80 80v-560 137-17 440Zm480-240Z" /></svg>
        <p className="text-white text-[15px] uppercase">{text}</p>
      </button>
    );
  }
}
function HeroHome() {
  return (
    <section className="flex justify-center items-center bg-[var(--rosa-claro)] h-[23.125rem] w-[67.25rem] m-auto gap-x-[4rem]">
      <div className="flex flex-wrap w-[24rem] gap-x-[1rem] gap-y-[1.5rem]">
        <h1 className="text-[2.25rem] h-fit text-(--magenta) font-semibold w-[24rem] inline-block">conhecimento que promove bem-estar</h1>
        <ButtonHomeModel text="Conheça-nos"></ButtonHomeModel>
        <ButtonHomeModel text="Nosso blog"></ButtonHomeModel>
      </div>
      <Image alt="logo principal" src={LogoPrincipal} className="inline-block w-[23rem]" />
    </section>
  );
}

function SaibaMaisBtn() {
  return (
    <button className="rounded-[5px] py-[0.5rem] px-[1rem] uppercase bg-(--ciano-escuro) text-white text-[1.125rem]">Saiba mais</button>
  );
}

function AreaCursoHome({ courseArea }: { courseArea: string }) {
  if (courseArea == "para médicos") {
    return (
      <div className="flex items-center flex-col gap-[1rem] w-[23.75rem] px-[2rem] py-[1.75rem] bg-(--menta-claro1) rounded-[5px] shadow-[4px_4px_5px_0px_#f1f1f1]">
        <h2 className="text-center font-semibold text-[1.7rem] text-(--verde-petroleo)">{courseArea}</h2>
        <div className="h-[12.5rem] overflow-y-auto hover:bg-white">
          <ul className="text-(--text) text-[1.125rem]">
            <li className="mb-[0.5rem]">Terapia de bomba de infusão de insulina</li>
            <li className="mb-[0.5rem]">Seguimento seguro do paciente com Diabetes Tipo 2</li>
            <li className="mb-[0.5rem]">Terapia de Contagem de Carboidratos</li>
          </ul>
        </div>
        <SaibaMaisBtn />
      </div>
    );
  } else if (courseArea == "mentorias") {
    return (
      <div className="flex items-center flex-col  gap-[1rem] w-[23.75rem] px-[2rem] py-[1.75rem] bg-(--menta-claro1) rounded-[5px] shadow-[4px_4px_5px_0px_#f1f1f1]">
        <h2 className="text-center font-semibold text-[1.7rem] text-(--verde-petroleo)">{courseArea}</h2>
        <div className="h-[12.5rem] overflow-y-auto hover:bg-white">
          <ul className="text-(--text) text-[1.125rem]">
            <li className="mb-[0.5rem]">Introdução ao sistema de bomba de insulina: instalação em paciente próprio, com seguimento inicial</li>
            <li className="mb-[0.5rem]">Manejo e cuidado do paciente portador de Diabetes Tipo 1</li>
          </ul>
        </div>
        <SaibaMaisBtn />
      </div>
    );
  } else if (courseArea == "para outros profissionais") {
    return (
      <div className="flex items-center flex-col  gap-[1rem] w-[23.75rem] px-[2rem] py-[1.75rem] bg-(--menta-claro1) rounded-[5px] shadow-[4px_4px_5px_0px_#f1f1f1]">
        <h2 className="text-center font-semibold text-[1.7rem] text-(--verde-petroleo)">{courseArea}</h2>
        <div className="h-[12.5rem] overflow-y-auto hover:bg-white">
          <ul className="text-(--text) text-[1.125rem]">
            <li className="mb-[0.5rem]">Cuidados de Enfermagem em Pé Diabético</li>
            <li className="mb-[0.5rem]">Curso de terapia de contagem de carboidratos para nutricionistas</li>
          </ul>
        </div>
        <SaibaMaisBtn />
      </div>
    );
  } else if (courseArea == "para pacientes e cuidadores") {
    return (
      <div className="flex items-center flex-col gap-[1rem] w-[23.75rem] px-[2rem] py-[1.75rem] bg-(--menta-claro1) rounded-[5px] shadow-[4px_4px_5px_0px_#f1f1f1]">
        <h2 className="text-center font-semibold text-[1.7rem] text-(--verde-petroleo)">{courseArea}</h2>
        <div className="h-[12.5rem] overflow-y-auto hover:bg-white">
          <ul className="text-(--text) text-[1.125rem]">
            <li className="mb-[0.5rem]">Oficina de contagem de carboidratos para pacientes e famílias</li>
            <li className="mb-[0.5rem]">Curso para Cuidadores de pessoas com diabetes</li>
            <li className="mb-[0.5rem]">Roda de conversa para pais de pessoas com Diabetes Tipo 1</li>
            <li className="mb-[0.5rem]">Saúde mental e diabetes: desafios da cronicidade para pacientes e seus familiares</li>
            <li className="mb-[0.5rem]">Instalação e manejo do sensor subcutâneo de glicose</li>
          </ul>
        </div>
        <SaibaMaisBtn />
      </div>
    );
  }
}

function CursosHome() {
  return (
    <section>
      <h1 className="text-center font-semibold text-[3rem] text-(--verde-petroleo) pb-[21px]">nossos cursos</h1>
      <div className="flex flex-col flex-wrap h-[75.15rem] gap-y-[2rem] gap-x-[5rem]">
        <p className="w-[23.75rem] text-[1.125rem] text-(--text)">Na QualiClínica Escola oferecemos uma ampla gama de cursos e mentorias relacionados ao tema do <b className="font-medium">diabetes</b>.</p>
        <AreaCursoHome courseArea={"para médicos"} />
        <AreaCursoHome courseArea={"mentorias"} />
        <Image className="rounded-[5px]" src={Imagem2CursosHome} alt="Nutricionista Thais apresentando slides do curso" />
        <Image className="rounded-[5px]" src={Imagem1CursosHome} alt="Diabetologista Walkiria apresentando slides do curso" />
        <AreaCursoHome courseArea={"para outros profissionais"} />
        <AreaCursoHome courseArea={"para pacientes e cuidadores"} />
      </div>
    </section>
  );
}

function ProfissionaisHome() {
  return (
    <section className="flex w-full h-[29.375rem] justify-center items-center py-[3.75rem] bg-(--rosa-claro) gap-x-[3.19rem]">
      <svg width="408" height="340" viewBox="0 0 408 340" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="200.536" cy="113.941" rx="113.941" ry="113.941" fill="#FADEF1" />
        <ellipse cx="329.973" cy="183.218" rx="77.4799" ry="77.4799" fill="#88C8D4" />
        <ellipse cx="91.1529" cy="242.466" rx="91.1529" ry="91.1528" fill="#C5F0F8" />
        <circle cx="226.059" cy="271.634" r="68.3647" fill="#E7F8FD" />
        <path d="M60.6548 283.334V226.667C60.6548 219.82 63.0749 213.976 67.9152 209.136C72.7555 204.295 78.5992 201.875 85.4464 201.875H135.384C139.398 201.875 143.235 202.879 146.894 204.886C150.554 206.893 153.682 209.667 156.28 213.208C163.127 223.125 171.863 230.799 182.488 236.229C193.113 241.66 204.446 244.375 216.488 244.375C228.53 244.375 239.863 241.66 250.488 236.229C261.113 230.799 269.967 223.125 277.05 213.208C279.648 209.667 282.717 206.893 286.259 204.886C289.8 202.879 293.578 201.875 297.592 201.875H347.53C354.377 201.875 360.221 204.295 365.061 209.136C369.901 213.976 372.321 219.82 372.321 226.667V283.334H280.238V241.188C271.738 248.979 261.998 255 251.019 259.25C240.04 263.5 228.53 265.625 216.488 265.625C204.446 265.625 192.995 263.5 182.134 259.25C171.273 255 161.474 248.979 152.738 241.188V283.334H60.6548ZM216.488 223.125C208.224 223.125 200.255 221.177 192.582 217.281C184.908 213.386 178.71 208.014 173.988 201.167C170.21 195.736 165.665 191.368 160.353 188.063C155.04 184.757 149.314 182.514 143.176 181.333C150.023 174.25 160.766 168.82 175.405 165.042C190.044 161.264 203.738 159.375 216.488 159.375C229.238 159.375 242.991 161.264 257.748 165.042C272.505 168.82 283.307 174.25 290.155 181.333C284.016 182.514 278.29 184.757 272.978 188.063C267.665 191.368 263.12 195.736 259.342 201.167C254.62 208.014 248.422 213.386 240.748 217.281C233.075 221.177 224.988 223.125 216.488 223.125ZM103.155 177.083C92.5298 177.083 83.3805 173.247 75.7069 165.573C68.0333 157.899 64.1964 148.75 64.1964 138.125C64.1964 127.264 68.0333 118.056 75.7069 110.5C83.3805 102.945 92.5298 99.1668 103.155 99.1668C114.016 99.1668 123.224 102.945 130.78 110.5C138.335 118.056 142.113 127.264 142.113 138.125C142.113 148.75 138.335 157.899 130.78 165.573C123.224 173.247 114.016 177.083 103.155 177.083ZM329.821 177.083C319.196 177.083 310.047 173.247 302.373 165.573C294.7 157.899 290.863 148.75 290.863 138.125C290.863 127.264 294.7 118.056 302.373 110.5C310.047 102.945 319.196 99.1668 329.821 99.1668C340.682 99.1668 349.891 102.945 357.446 110.5C365.002 118.056 368.78 127.264 368.78 138.125C368.78 148.75 365.002 157.899 357.446 165.573C349.891 173.247 340.682 177.083 329.821 177.083ZM216.488 134.583C205.863 134.583 196.714 130.747 189.04 123.073C181.367 115.399 177.53 106.25 177.53 95.6251C177.53 84.764 181.367 75.5556 189.04 68.0001C196.714 60.4445 205.863 56.6667 216.488 56.6667C227.349 56.6667 236.557 60.4445 244.113 68.0001C251.669 75.5556 255.446 84.764 255.446 95.6251C255.446 106.25 251.669 115.399 244.113 123.073C236.557 130.747 227.349 134.583 216.488 134.583Z" fill="#991871" />
      </svg>
      <div className="flex flex-col gap-[1.5rem] items-end">
        <h1 className="font-semibold text-(--magenta) text-[3rem] text-right w-[25rem]">conheça nossos profissionais</h1>
        <p className="w-[24rem] text-right text-[1.125rem] text-(--text)">Nossa clínica é formada por profissionais altamente capacitados, que se dedicam ao <b className="font-medium">cuidado</b> de cada paciente e à <b className="font-medium">formação de cada aluno</b>.</p>
        <ButtonHomeModel text="Profissionais"></ButtonHomeModel>
      </div>
    </section>
  );
}

// function ContatoHome() {
//   return (
//     <section>
//       <h1>entre em contato</h1>
//       {/*Forms*/}
//     </section>
//   );
// }

function AdressHome() {
  return (
    <section className="flex flex-col gap-[1.5rem]">
      <div className="flex flex-col gap-[1rem]">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.73410215155306!2d-47.03778380613328!3d-22.8858529969182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cf60929e4e9b%3A0x248fedc1733a652f!2sR.%20Pilar%20do%20Sul%2C%20364%20-%20Ch%C3%A1cara%20da%20Barra%2C%20Campinas%20-%20SP%2C%2013090-757!5e0!3m2!1spt-BR!2sbr!4v1742434083835!5m2!1spt-BR!2sbr" width="381" height="288" /*allowfullscreen=""*/ loading="lazy" /*referrerpolicy="no-referrer-when-downgrade"*/></iframe>
        <p className="text-[1.125rem] text-(--text) w-[23.75rem]">Endereço: Rua Pilar do Sul 364, Chácara da Barra - Campinas (SP), CEP 13090-757</p>
      </div>
      <div className="flex flex-col gap-[0.75rem]">
        <h2 className="font-semibold text-(--verde-petroleo) text-[1.69rem]">contato e redes sociais</h2>
        <ul className="text-(--text) text-[1.125rem] leading-[2.7rem]">
          <li><Instagram className="inline-block" color="#991871" /><p className="inline-block px-[1rem]">@qualiclinicaescola</p></li>
          <li><Mail className="inline-block" color="#991871" /><p className="inline-block px-[1rem]">wqualiclinica@gmail.com</p></li>
          <li><Image className="inline-block" alt="" src={WhatsappIcon} /><p className="inline-block px-[1rem]">WhatsApp: +55 (19) 99641-9210</p></li>
          <li><Phone className="inline-block" color="#991871" /><p className="inline-block px-[1rem]">Telefone: +55 (19) 3254-5792</p></li>
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="font-[family-name:var(--font-poppins)] flex flex-col items-center gap-[2.625rem] pt-[1.5rem] pb-[2.625rem]">
        <HeroHome />
        <CursosHome />
        <ProfissionaisHome />
        <AdressHome />
      </main>
      <Footer />
    </div>
  );
}
