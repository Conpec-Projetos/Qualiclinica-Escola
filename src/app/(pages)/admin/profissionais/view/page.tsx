"use client";

import Button from "@/components/ui/button-quali";
import Footer from "@/components/ui/footer";
import ProfessionalCard, { Professional } from "@/components/ui/professional-card";
import NavbarAdmin from "@/components/ui/navbar-admin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/firebase-config";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfessionalsAdmin() {
  const router = useRouter();

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProfessionals, setSelectedProfessionals] = useState<string[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const professionalsQuery = query(collection(db, "professionals"));
        const querySnapshot = await getDocs(professionalsQuery);
        const professionalsData: Professional[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Professional, "id">),
        }));
        setProfessionals(professionalsData);
      } catch (error) {
        console.error("Erro ao carregar os posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCheckboxChange = (professionalId: string, checked: boolean) => {
    if (checked) {
      setSelectedProfessionals((prev) => [...prev, professionalId]);
    } else {
      setSelectedProfessionals((prev) => prev.filter((id) => id !== professionalId));
    }
  };

  const handleDeleteProfessionals = async (selectedProfessionals: string[]) => {
    try {
      for (const professionalId of selectedProfessionals) {
        const courseRef = doc(db, "professionals", professionalId);
        await deleteDoc(courseRef);
      }

      setProfessionals((prevProfessionals) =>
        prevProfessionals.filter((professional) => !selectedProfessionals.includes(professional.id))
      );
      setSelectedProfessionals([]);
    } catch (error) {
      console.error("Erro ao remover profissionais: ", error);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedProfessionals.length === 0) return;

    toast.warning("Tem certeza que deseja remover os profissionais selecionados?", {
      action: {
        label: "Remover",
        onClick: async () => {
          await handleDeleteProfessionals(selectedProfessionals);
          toast.success("Profissionais removidos com sucesso!");
        },
      },
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white font-poppins">
      <NavbarAdmin />
      <main className="w-full flex items-center justify-center text-black">
        <div className="max-w-5xl mx-auto">
          {/* Título */}
          <h1 className="text-3xl font-bold text-center mb-4 text-verde-petroleo">
            profissionais
          </h1>

          {/* Botões de ação */}
          <div className="flex justify-center space-x-4 mb-8">
            <Link href="/admin/profissionais/write">
              <Button
                text="adicionar profissional"
                onClick={() => router.push("/admin/profissionais/write")}
              />
            </Link>
            <Button text="remover profissionais" onClick={handleDeleteSelected} />
          </div>

          <section className="mb-8">
            <div className="flex flex-col gap-8 bg-rosa font-roboto p-6 rounded-[5px] max-w-[911px] mx-auto">
              <h1 className="text-magenta font-bold text-center">
                diabetologia
              </h1>
              {loading ? (
                <p>Carregando profissionais...</p>
              ) : professionals.filter((professional) => professional.area === "diabetology").length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Nenhum profissional encontrado.
                </p>
              ) : (
                professionals.map(
                  (professional) =>
                    professional.area === "diabetology" && (
                      <ProfessionalCard
                        key={professional.id}
                        course={professional}
                        selected={selectedProfessionals.includes(professional.id)}
                        onCheckboxChange={handleCheckboxChange}
                      />
                    )
                )
              )}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex flex-col gap-8 bg-rosa font-roboto)] p-6 rounded-[5px] max-w-[911px] mx-auto">
              <h1 className="text-magenta font-bold text-center">
                enfermagem
              </h1>
              {loading ? (
                <p>Carregando profissionais...</p>
              ) : professionals.filter((professional) => professional.area === "nursing").length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Nenhum profissional encontrado.
                </p>
              ) : (
                professionals.map(
                  (professional) =>
                    professional.area === "nursing" && (
                      <ProfessionalCard
                        key={professional.id}
                        course={professional}
                        selected={selectedProfessionals.includes(professional.id)}
                        onCheckboxChange={handleCheckboxChange}
                      />
                    )
                )
              )}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex flex-col gap-8 bg-rosa font-roboto p-6 rounded-[5px] max-w-[911px] mx-auto">
              <h1 className="text-magenta font-bold text-center">
                endocrinologia
              </h1>
              {loading ? (
                <p>Carregando profissionais...</p>
              ) : professionals.filter((professional) => professional.area === "endocrinology").length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Nenhum profissional encontrado.
                </p>
              ) : (
                professionals.map(
                  (professional) =>
                    professional.area === "endocrinology" && (
                      <ProfessionalCard
                        key={professional.id}
                        course={professional}
                        selected={selectedProfessionals.includes(professional.id)}
                        onCheckboxChange={handleCheckboxChange}
                      />
                    )
                )
              )}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex flex-col gap-8 bg-rosa font-roboto p-6 rounded-[5px] max-w-[911px] mx-auto">
              <h1 className="text-magenta font-bold text-center">
                nutrição
              </h1>
              {loading ? (
                <p>Carregando profissionais...</p>
              ) : professionals.filter((professional) => professional.area === "nutrition").length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Nenhum profissional encontrado.
                </p>
              ) : (
                professionals.map(
                  (professional) =>
                    professional.area === "nutrition" && (
                      <ProfessionalCard
                        key={professional.id}
                        course={professional}
                        selected={selectedProfessionals.includes(professional.id)}
                        onCheckboxChange={handleCheckboxChange}
                      />
                    )
                )
              )}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex flex-col gap-8 bg-rosa font-roboto p-6 rounded-[5px] max-w-[911px] mx-auto">
              <h1 className="text-magenta font-bold text-center">
                psicologia/psiquiatria
              </h1>
              {loading ? (
                <p>Carregando profissionais...</p>
              ) : professionals.filter((professional) => professional.area === "psychology/psychiatry").length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Nenhum profissional encontrado.
                </p>
              ) : (
                professionals.map(
                  (professional) =>
                    professional.area === "psychology/psychiatry" && (
                      <ProfessionalCard
                        key={professional.id}
                        course={professional}
                        selected={selectedProfessionals.includes(professional.id)}
                        onCheckboxChange={handleCheckboxChange}
                      />
                    )
                )
              )}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex flex-col gap-8 bg-rosa font-roboto p-6 rounded-[5px] max-w-[911px] mx-auto">
              <h1 className="text-magenta font-bold text-center">
                outras áreas
              </h1>
              {loading ? (
                <p>Carregando profissionais...</p>
              ) : professionals.filter((professional) => professional.area === "others").length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Nenhum profissional encontrado.
                </p>
              ) : (
                professionals.map(
                  (professional) =>
                    professional.area === "others" && (
                      <ProfessionalCard
                        key={professional.id}
                        course={professional}
                        selected={selectedProfessionals.includes(professional.id)}
                        onCheckboxChange={handleCheckboxChange}
                      />
                    )
                )
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
