"use client";

import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import "@/app/globals.css";
import Image from "next/image";
import PessoalDaQuali from "@assets/assets-cursos/pessoal-da-quali.png";
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
      <main className="font-poppins flex flex-col items-center gap-[2.625rem] pt-[1.5rem] pb-[2.625rem]">
        <section className="h-fit w-full flex flex-row justify-center">
          <div className="flex flex-col sm:flex-row sm:items-start justify-center items-center gap-x-[2rem] space-y-2">
            <div className="w-[340px] h-[230px] sm:w-[290px] sm:h-[210px] md:w-[400px] md:h-[230px] lg:w-[480px] lg:h-[260px] relative">
              <Image
                className="rounded-md object-cover"
                src={PessoalDaQuali}
                alt="Grupo de pessoas realizando atividades educacionais da Quali Clínica Escola"
                unoptimized
                fill
                priority
              />
            </div>

            <div className="flex flex-col items-center lg:mt-8 sm:items-start gap-y-[0.75rem]">
              <h1 className="!text-3xl sm:!text-2xl text-magenta font-semibold w-80 lg:w-[358px] text-center sm:text-left leading-[2.7rem]">
                Nossa vocação é educacional
              </h1>
              <p className="w-[320px] sm:w-52 md:w-50 lg:w-60 text-text text-base sm:text-sm md:text-base text-center sm:text-left py-[0.5rem] bg-[url('/circle-prof.svg')] bg-contain bg-no-repeat">
                Explore nossos cursos e mentorias especializados na área de <span className="font-medium">diabetologia!</span>
              </p>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-y-[1.5rem] w-full max-w-7xl px-4">
          <section className="w-full">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo text-2xl md:text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              Cursos para médicos
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[1.375rem] mt-4">
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
            </div>
          </section>
          <section className="w-full">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo text-2xl md:text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              Cursos para pacientes e cuidadores
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[1.375rem] mt-4">
              {courses
                .filter((course) => course.area === "patients-caregivers")
                .map((course) => (
                  <CourseModel
                    key={course.id}
                    name={course.name}
                    instructors={course.instructors}
                    description={course.description}
                  />
                ))}
            </div>
          </section>
          <section className="w-full">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo text-2xl md:text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              Cursos para demais profissionais
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[1.375rem] mt-4">
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
            </div>
          </section>
          <section className="w-full">
            <h1 className="w-full mb-[0.5rem] font-semibold text-verde-petroleo text-2xl md:text-[2.5rem] border-b-[1px] border-b-verde-petroleo">
              Mentorias
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[1.375rem] mt-4">
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
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}
