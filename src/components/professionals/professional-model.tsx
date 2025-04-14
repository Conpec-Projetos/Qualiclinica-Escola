export default function ProfissionalModel({
    nome,
    profissao,
    identificacao,
    carreira,
  }: {
    nome: string;
    profissao: string;
    identificacao: string;
    carreira: string;
  }) {
    return (
      <section className="flex flex-col bg-(--menta-claro1) rounded-[5px] p-[1.375rem] gap-y-[0.5rem] w-[25.5rem]">
        <h4 className="font-semibold text-(--verde-petroleo)">{nome}</h4>
        <div className="flex justify-between">
          <h5 className="inline-block font-semibold text-(--verde-petroleo)">
            {profissao}
          </h5>
          <p className="inline-block font-light text-(--text) text-[1rem]">
            {identificacao}
          </p>
        </div>
        <div className="w-[22.75rem] h-[11.375rem] overflow-y-auto hover:bg-white">
          <p className="text-(--text) text-[0.9375rem] font-light">
            <b className="font-normal">Carreira: </b>
            {carreira.split(";").map((paragraph, index) => {
              return (
                <span key={index}>
                  {index > 0 ? <br /> : null}
                  {paragraph.trim().replace(";", "")}
                </span>
              );
            })}
          </p>
        </div>
      </section>
    );
  }