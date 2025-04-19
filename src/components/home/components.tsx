import { useRouter } from "next/navigation";

export function ButtonHomeModel({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
  }) {
  if (text == "Conheça-nos") {
    return (
      <button
        onClick={onClick}
        className="h-[3.125rem] flex gap-[4px] items-center px-[1rem] bg-white rounded-[5px] hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="36px"
          viewBox="0 -960 960 960"
          width="36px"
          fill="#1D4C5A"
        >
          <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
        </svg>
        <p className="text-(--verde-petroleo) text-[15px] uppercase">{text}</p>
      </button>
    );
  } else if (text == "Nosso blog") {
    return (
      <button
        onClick={onClick}
        className="h-[3.125rem] flex gap-[3px] items-center px-[1rem] bg-white rounded-[5px] hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="36px"
          viewBox="0 -960 960 960"
          width="36px"
          fill="#1D4C5A"
        >
          <path d="M160-406.67v-66.66h293.33v66.66H160ZM160-570v-66.67h460V-570H160Zm0-163.33V-800h460v66.67H160ZM520-160v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8.67 9 12.83 20 4.17 11 4.17 22t-4.33 22.5q-4.34 11.5-13.28 20.5L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
        </svg>
        <p className="text-(--verde-petroleo) text-[15px] uppercase">{text}</p>
      </button>
    );
  } else if ((text = "Profissionais")) {
    return (
      <button
        onClick={onClick}
        className="h-[3.125rem] w-fit flex gap-[4px] items-center px-[1rem] bg-(--magenta) rounded-[5px] hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="#FFFFFF"
        >
          <path d="M680-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480q-17 0-28.5 11.5T640-440q0 17 11.5 28.5T680-400ZM440-40v-116q0-21 10-39.5t28-29.5q32-19 67.5-31.5T618-275l62 75 62-75q37 6 72 18.5t67 31.5q18 11 28.5 29.5T920-156v116H440Zm79-80h123l-54-66q-18 5-35 13t-34 17v36Zm199 0h122v-36q-16-10-33-17.5T772-186l-54 66Zm-76 0Zm76 0Zm-518 0q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v200q-16-20-35-38t-45-24v-138H200v560h166q-3 11-4.5 22t-1.5 22v36H200Zm80-480h280q26-20 57-30t63-10v-40H280v80Zm0 160h200q0-21 4.5-41t12.5-39H280v80Zm0 160h138q11-9 23.5-16t25.5-13v-51H280v80Zm-80 80v-560 137-17 440Zm480-240Z" />
        </svg>
        <p className="text-white text-[15px] uppercase">{text}</p>
      </button>
    );
  }
}

function SaibaMaisBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/cursos")}
      className="rounded-[5px] py-[0.5rem] px-[1rem] uppercase bg-(--ciano-escuro) text-white text-[1.125rem] hover:cursor-pointer"
    >
      Saiba mais
    </button>
  );
}

export function AreaCursoHome({ courseArea }: { courseArea: string }) {
  if (courseArea == "para médicos") {
    return (
      <div className="flex items-center flex-col gap-[1rem] w-[23.75rem] px-[2rem] py-[1.75rem] bg-(--menta-claro1) rounded-[5px] shadow-[4px_4px_5px_0px_#f1f1f1]">
        <h2 className="text-center font-semibold text-[1.7rem] text-(--verde-petroleo)">
          {courseArea}
        </h2>
        <div className="h-[12.5rem] overflow-y-auto hover:bg-white">
          <ul className="text-(--text) text-[1.125rem]">
            <li className="mb-[0.5rem]">
              Terapia de bomba de infusão de insulina
            </li>
            <li className="mb-[0.5rem]">
              Seguimento seguro do paciente com Diabetes Tipo 2
            </li>
            <li className="mb-[0.5rem]">Terapia de Contagem de Carboidratos</li>
          </ul>
        </div>
        <SaibaMaisBtn />
      </div>
    );
  } else if (courseArea == "mentorias") {
    return (
      <div className="flex items-center flex-col  gap-[1rem] w-[23.75rem] px-[2rem] py-[1.75rem] bg-(--menta-claro1) rounded-[5px] shadow-[4px_4px_5px_0px_#f1f1f1]">
        <h2 className="text-center font-semibold text-[1.7rem] text-(--verde-petroleo)">
          {courseArea}
        </h2>
        <div className="h-[12.5rem] overflow-y-auto hover:bg-white">
          <ul className="text-(--text) text-[1.125rem]">
            <li className="mb-[0.5rem]">
              Introdução ao sistema de bomba de insulina: instalação em paciente
              próprio, com seguimento inicial
            </li>
            <li className="mb-[0.5rem]">
              Manejo e cuidado do paciente portador de Diabetes Tipo 1
            </li>
          </ul>
        </div>
        <SaibaMaisBtn />
      </div>
    );
  } else if (courseArea == "para outros profissionais") {
    return (
      <div className="flex items-center flex-col  gap-[1rem] w-[23.75rem] px-[2rem] py-[1.75rem] bg-(--menta-claro1) rounded-[5px] shadow-[4px_4px_5px_0px_#f1f1f1]">
        <h2 className="text-center font-semibold text-[1.7rem] text-(--verde-petroleo)">
          {courseArea}
        </h2>
        <div className="h-[12.5rem] overflow-y-auto hover:bg-white">
          <ul className="text-(--text) text-[1.125rem]">
            <li className="mb-[0.5rem]">
              Cuidados de Enfermagem em Pé Diabético
            </li>
            <li className="mb-[0.5rem]">
              Curso de terapia de contagem de carboidratos para nutricionistas
            </li>
          </ul>
        </div>
        <SaibaMaisBtn />
      </div>
    );
  } else if (courseArea == "para pacientes e cuidadores") {
    return (
      <div className="flex items-center flex-col gap-[1rem] w-[23.75rem] px-[2rem] py-[1.75rem] bg-(--menta-claro1) rounded-[5px] shadow-[4px_4px_5px_0px_#f1f1f1]">
        <h2 className="text-center font-semibold text-[1.7rem] text-(--verde-petroleo)">
          {courseArea}
        </h2>
        <div className="h-[12.5rem] overflow-y-auto hover:bg-white">
          <ul className="text-(--text) text-[1.125rem]">
            <li className="mb-[0.5rem]">
              Oficina de contagem de carboidratos para pacientes e famílias
            </li>
            <li className="mb-[0.5rem]">
              Curso para Cuidadores de pessoas com diabetes
            </li>
            <li className="mb-[0.5rem]">
              Roda de conversa para pais de pessoas com Diabetes Tipo 1
            </li>
            <li className="mb-[0.5rem]">
              Saúde mental e diabetes: desafios da cronicidade para pacientes e
              seus familiares
            </li>
            <li className="mb-[0.5rem]">
              Instalação e manejo do sensor subcutâneo de glicose
            </li>
          </ul>
        </div>
        <SaibaMaisBtn />
      </div>
    );
  }
}
