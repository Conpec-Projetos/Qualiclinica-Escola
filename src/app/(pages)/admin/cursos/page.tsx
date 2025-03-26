import Button from "@/components/ui/button-quali";
import Footer from "@/components/ui/footer";
import NavbarAdmin from "@/components/ui/navbar-admin";

export default function CursosAdmin() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-white font-[family-name:var(--font-poppins)]">
      <NavbarAdmin username="Walkyria" />
      <main className="p-10 w-full flex items-center justify-center text-black">
        <div className="max-w-5xl mx-auto">
          {/* Título */}
          <h1 className="text-3xl font-bold text-center mb-4 text-(--verde-petroleo)">
            cursos
          </h1>

          {/* Botões de ação */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button text="adicionar curso" />
            <Button text="remover curso" />
          </div>

          {/* Seção: para médicos */}
          <section className="mb-8">
            <div className="bg-(--rosa) p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-(--magenta)">
                para médicos
              </h2>
              <p className="mb-2">
                <strong>Nome:</strong> Curso de Atualização em Saúde
              </p>
              <p className="mb-2">
                <strong>Descrição:</strong> Focado em práticas modernas e novas
                técnicas de atendimento para pacientes com doenças crônicas.
              </p>
              <p className="mb-2">
                <strong>Data:</strong> 15/05/2025
              </p>
              <p>
                <strong>Link:</strong>{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Acessar curso
                </a>
              </p>
            </div>
          </section>

          {/* Seção: para pacientes e cuidadores */}
          <section className="mb-8">
            <div className="bg-(--rosa) p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-(--magenta)">
                para pacientes e cuidadores
              </h2>
              <p className="mb-2">
                <strong>Nome:</strong> Curso de Cuidados Domiciliares
              </p>
              <p className="mb-2">
                <strong>Descrição:</strong> Técnicas de cuidados básicos,
                administração de medicamentos e exercícios de reabilitação.
              </p>
              <p className="mb-2">
                <strong>Data:</strong> 10/06/2025
              </p>
              <p>
                <strong>Link:</strong>{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Acessar curso
                </a>
              </p>
            </div>
          </section>

          {/* Seção: para demais profissionais */}
          <section className="mb-8">
            <div className="bg-(--rosa) p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-(--magenta)">
                para demais profissionais
              </h2>
              <p className="mb-2">
                <strong>Nome:</strong> Curso de Fisioterapia e Reabilitação
              </p>
              <p className="mb-2">
                <strong>Descrição:</strong> Conceitos avançados de fisioterapia
                motora, práticas de reabilitação em domicílio e suporte.
              </p>
              <p className="mb-2">
                <strong>Data:</strong> 20/07/2025
              </p>
              <p>
                <strong>Link:</strong>{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Acessar curso
                </a>
              </p>
            </div>
          </section>

          {/* Seção: mentorias */}
          <section className="mb-8">
            <div className="bg-(--rosa) p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-(--magenta)">
                mentorias
              </h2>
              <p className="mb-2">
                <strong>Nome:</strong> Mentoria em Acolhimento Familiar
              </p>
              <p className="mb-2">
                <strong>Descrição:</strong> Orientações para familiares e
                cuidadores sobre suporte emocional, comunicação e planejamento.
              </p>
              <p className="mb-2">
                <strong>Data:</strong> 30/08/2025
              </p>
              <p>
                <strong>Link:</strong>{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Acessar mentoria
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
