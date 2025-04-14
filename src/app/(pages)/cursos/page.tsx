"use client";

import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import "@/app/globals.css";
import Image from "next/image";
import PessoalDaQuali from "@assets/assets-cursos/pessoal da quali.png";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Course } from "@/components/ui/course-card";
import CourseModel from "@/components/courses/course-model";

export default function Cursos() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const coursesRef = collection(db, "courses");
    const fetchCourses = async () => {
      try {
        const snapshot = await getDocs(coursesRef);
        const fetchedCourses = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Course, "id">),
        }));
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="font-[family-name:var(--font-poppins)] flex flex-col items-center gap-[2.625rem] pt-[1.5rem] pb-[2.625rem]">
        <section className="h-[20rem] flex flex-col flex-wrap justify-center items-center m-auto gap-x-[2rem]">
          <Image
            className="w-[503px] h-[239px] rounded-[5px]"
            src={PessoalDaQuali}
            alt="Nossa vocação é educacional!"
          />
          <div className="flex flex-col gap-y-[0.75rem]">
            <h1 className="text-[2.25rem] h-fit text-(--verde-petroleo) font-semibold w-[19.5rem] inline-block leading-[2.7rem]">
              nosso núcleo educacional
            </h1>
            <p className="w-[16.25rem] text-(--text) text-[0.94rem] py-[0.5rem] bg-[url('/circle-prof.svg')] bg-contain bg-no-repeat">
              Nosso núcleo educacional é composto por Sandra David, Thais
              Brasil, Sonia Cavinatto e Walkyria Volpini, principal organizadora
              das atividades educacionais.
            </p>
          </div>
        </section>
        <section className="flex flex-col gap-y-[1.5rem]">
          <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
            <h1 className="w-full mb-[0.5rem] font-semibold text-(--verde-petroleo) text-[2.5rem] border-b-[1px] border-b-(--verde-petroleo)">
              cursos para médicos
            </h1>
            {courses
              .filter((course) => course.area === "doctors")
              .map((course) => (
                <CourseModel
                  key={course.id}
                  name={course.name}
                  instructors={course.instructors}
                  description={course.description}
                />
              ))}
          </section>
          <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
            <h1 className="w-full mb-[0.5rem] font-semibold text-(--verde-petroleo) text-[2.5rem] border-b-[1px] border-b-(--verde-petroleo)">
              cursos para pacientes e cuidadores
            </h1>
            {courses
              .filter((course) => course.area === "pacients-caretakers")
              .map((course) => (
                <CourseModel
                  key={course.id}
                      name={course.name}
                      type="small"
                  instructors={course.instructors}
                  description={course.description}
                />
              ))}
          </section>
          <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
            <h1 className="w-full mb-[0.5rem] font-semibold text-(--verde-petroleo) text-[2.5rem] border-b-[1px] border-b-(--verde-petroleo)">
              cursos para demais profissionais
            </h1>
            {courses
              .filter((course) => course.area === "others")
              .map((course) => (
                <CourseModel
                  key={course.id}
                  name={course.name}
                  instructors={course.instructors}
                  description={course.description}
                />
              ))}
          </section>
          <section className="flex flex-wrap w-[53rem] gap-x-[1.375rem] gap-y-[1rem]">
            <h1 className="w-full mb-[0.5rem] font-semibold text-(--verde-petroleo) text-[2.5rem] border-b-[1px] border-b-(--verde-petroleo)">
              mentorias
            </h1>
            {courses
              .filter((course) => course.area === "mentorships")
              .map((course) => (
                <CourseModel
                  key={course.id}
                  name={course.name}
                  instructors={course.instructors}
                  description={course.description}
                />
              ))}
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}
