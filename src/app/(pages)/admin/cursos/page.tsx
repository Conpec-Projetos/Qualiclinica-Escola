"use client";

import Button from "@/components/ui/button-quali";
import Footer from "@/components/ui/footer";
import {
  Course,
  SmallCourseCard,
  GeneralCourseCard,
} from "@/components/ui/course-card";
import NavbarAdmin from "@/components/ui/navbar-admin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/firebase-config";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CursosAdmin() {
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const coursesQuery = query(collection(db, "courses"));
        const querySnapshot = await getDocs(coursesQuery);
        console.log(querySnapshot.docs);
        const coursesData: Course[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Course, "id">),
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Erro ao carregar os posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCheckboxChange = (courseId: string, checked: boolean) => {
    if (checked) {
      setSelectedCourses((prev) => [...prev, courseId]);
    } else {
      setSelectedCourses((prev) => prev.filter((id) => id !== courseId));
    }
  };

  const handleDeleteCourses = async (selectedCourses: string[]) => {
    try {
      for (const courseId of selectedCourses) {
        const courseRef = doc(db, "courses", courseId);
        await deleteDoc(courseRef);
      }

      setCourses((prevCourses) =>
        prevCourses.filter((course) => !selectedCourses.includes(course.id))
      );
      setSelectedCourses([]);
    } catch (error) {
      console.error("Erro ao remover posts: ", error);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedCourses.length === 0) return;

    toast("Tem certeza que deseja remover os cursos selecionados?", {
      action: {
        label: "Remover",
        onClick: async () => {
          await handleDeleteCourses(selectedCourses);
          toast.success("Cursos removidos com sucesso!");
        },
      },
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white font-[family-name:var(--font-poppins)]">
      <NavbarAdmin />
      <main className="w-full flex items-center justify-center text-black">
        <div className="max-w-5xl mx-auto">
          {/* Título */}
          <h1 className="text-3xl font-bold text-center mb-4 text-(--verde-petroleo)">
            cursos
          </h1>

          {/* Botões de ação */}
          <div className="flex justify-center space-x-4 mb-8">
            <Link href="/admin/cursos/write">
              <Button
                text="adicionar curso"
                onClick={() => router.push("/admin/cursos/write")}
              />
            </Link>
            <Button text="remover cursos" onClick={handleDeleteSelected} />
          </div>

          <section className="mb-8">
            <div className="flex flex-col gap-8 bg-(--rosa) font-[family-name:var(--font-roboto)] p-6 rounded-[5px] max-w-[911px] mx-auto">
              <h1 className="text-[var(--magenta)] font-bold text-center">
                para médicos
              </h1>
              {loading ? (
                <p>Carregando cursos...</p>
              ) : courses.length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Nenhum curso encontrado.
                </p>
              ) : (
                courses.map(
                  (course) =>
                    course.area === "doctors" && (
                      <GeneralCourseCard
                        key={course.id}
                        course={course}
                        selected={selectedCourses.includes(course.id)}
                        onCheckboxChange={handleCheckboxChange}
                      />
                    )
                )
              )}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex flex-col gap-8 bg-(--rosa) font-[family-name:var(--font-roboto)] max-w-[911px] mx-auto p-6 rounded-[5px]">
              <h1 className="text-[var(--magenta)] text-center font-bold">
                para pacientes e cuidadores
              </h1>
              {loading ? (
                <p>Carregando cursos...</p>
              ) : courses.length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Nenhum curso encontrado.
                </p>
              ) : (
                <div className="w-full flex flex-wrap gap-4">
                  {courses.map(
                    (course) =>
                      course.area === "pacients-caretakers" && (
                        <SmallCourseCard
                          key={course.id}
                          course={course}
                          selected={selectedCourses.includes(course.id)}
                          onCheckboxChange={handleCheckboxChange}
                        />
                      )
                  )}
                </div>
              )}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex flex-col gap-8 bg-[var(--rosa)] font-[family-name:var(--font-roboto)] p-6 rounded-[5px] max-w-[911px] mx-auto">
              <h1 className="text-[var(--magenta)] font-bold text-center">
                para demais profissionais
              </h1>

              {loading ? (
                <p className="text-center text-lg text-gray-500">
                  Carregando cursos...
                </p>
              ) : courses.filter((course) => course.area === "others")
                  .length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Nenhum curso encontrado.
                </p>
              ) : (
                courses
                  .filter((course) => course.area === "others")
                  .map((course) => (
                    <GeneralCourseCard
                      key={course.id}
                      course={course}
                      selected={selectedCourses.includes(course.id)}
                      onCheckboxChange={handleCheckboxChange}
                    />
                  ))
              )}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex flex-col gap-8 bg-(--rosa) font-[family-name:var(--font-roboto)] p-6 rounded-[5px] max-w-[911px] mx-auto">
              <h1 className="text-[var(--magenta)] font-bold text-center">
                mentorias
              </h1>
              {loading ? (
                <p>Carregando cursos...</p>
              ) : courses.filter((course) => course.area === "mentorships").length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Nenhum curso encontrado.
                </p>
              ) : (
                courses.map(
                  (course) =>
                    course.area === "mentorships" && (
                      <GeneralCourseCard
                        key={course.id}
                        course={course}
                        selected={selectedCourses.includes(course.id)}
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
