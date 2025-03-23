import Button from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import InfoBlog from "@/components/ui/info-blog";
import NavbarAdmin from "@/components/ui/navbar-admin";

export default function CursosAdmin() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-white font-[family-name:var(--font-poppins)]">
      <NavbarAdmin username="Walkyria" />
      <main className="p-10 w-full flex items-center justify-center text-black">
        <div className="max-w-5xl mx-auto">
          {/* Título */}
          <h1 className="text-3xl font-bold text-center mb-4 text-(--verde-petroleo)">
            blog
          </h1>

          {/* Botões de ação */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button text="adicionar blog" />
            <Button text="remover blog" />
          </div>

          {/* Blogs */}
          <section className="mb-8">
            <div className="flex flex-col gap-8 bg-(--rosa) font-[family-name:var(--font-roboto)] p-6 rounded-md shadow-md">
              <InfoBlog
                title="Alimentação e Diabetes: Como a Dieta Pode Transformar o Controle da Doença"
                author="Thaís Brasil"
                date="18/02/2025"
              />
              <InfoBlog
                title="Alimentação e Diabetes: Como a Dieta Pode Transformar o Controle da Doença"
                author="Thaís Brasil"
                date="18/02/2025"
              />
              <InfoBlog
                title="Alimentação e Diabetes: Como a Dieta Pode Transformar o Controle da Doença"
                author="Thaís Brasil"
                date="18/02/2025"
              />
              <InfoBlog
                title="Alimentação e Diabetes: Como a Dieta Pode Transformar o Controle da Doença"
                author="Thaís Brasil"
                date="18/02/2025"
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
