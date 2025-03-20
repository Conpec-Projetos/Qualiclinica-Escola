import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";

function HeroHome() {
  return (
    <section>
      <h1>conhecimento que promove bem-estar</h1>
      <div>
        {/*botoes*/}
      </div>
      {/*logo principal*/}
    </section>
  );
}

function CursoModelHome({ courseArea }: { courseArea: string }) {
  return (
    <div>
      <h2>{courseArea}</h2>
      <div>
        <ul>
          <li>curso1</li>
        </ul>
      </div>
      <button>Saiba mais</button>
    </div>
  );
}

function CursosHome() {
  return (
    <section>
      <h1>nossos cursos</h1>
      <div>
        <p>Na QualiClínica Escola oferecemos uma ampla gama de cursos e mentorias relacionados ao tema do <b>diabetes</b>.</p>
        <CursoModelHome courseArea={"para médicos"} />
        <CursoModelHome courseArea={"mentorias"} />
        {/*foto sonia*/}
      </div>
      <div>
        {/*foto walkyria*/}
        <CursoModelHome courseArea={"para outros profissionais"} />
        <CursoModelHome courseArea={"para pacientes e cuidadores"} />
      </div>
    </section>
  );
}

function ProfissionaisHome() {
  return (
    <section>
      {/*Figura*/}
      <h1>conheça nossos profissionais</h1>
      <p>Nossa clínica é formada por profissionais altamente capacitados, que se dedicam ao <b>cuidado</b> de cada paciente e à <b>formação de cada aluno</b>.</p>
      <button>Profissionais</button>
    </section>
  );
}

function ContatoHome() {
  return (
    <section>
      <h1>entre em contato</h1>
      {/*Forms*/}
    </section>
  );
}

function AdressHome() {
  return (
    <section>
      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.73410215155306!2d-47.03778380613328!3d-22.8858529969182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cf60929e4e9b%3A0x248fedc1733a652f!2sR.%20Pilar%20do%20Sul%2C%20364%20-%20Ch%C3%A1cara%20da%20Barra%2C%20Campinas%20-%20SP%2C%2013090-757!5e0!3m2!1spt-BR!2sbr!4v1742434083835!5m2!1spt-BR!2sbr" width="381" height="288" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      <adress>

      </adress> */}
    </section>
  );
}


