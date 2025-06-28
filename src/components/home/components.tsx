"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";

interface Course {
  name: string;
  area: string;
}

export function ButtonHomeModel({
  text,
  path,
}: {
  text: string;
  path: string;
}) {
  const router = useRouter();
  if (text == "Conheça-nos") {
    return (
      <button
        onClick={() => router.push(path)}
        className="h-12 flex sm:gap-[4px] items-center px-[6px] sm:px-[1rem] bg-white rounded-[5px] w-fit sm:w-auto hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="36px"
          viewBox="0 -960 960 960"
          width="36px"
          fill="#1D4C5A"
          className="hidden sm:block"
        >
          <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
        </svg>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1D4C5A"
            className="sm:hidden"
        >
          <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm1e280Z" />
          </svg>
        <p className="text-verde-petroleo text-[10px] sm:text-base uppercase">{text}</p>
      </button>
    );
  } else if (text == "Nosso blog") {
    return (
      <button
        onClick={() => router.push(path)}
        className="h-[3.125rem] flex sm:gap-[4px] items-center px-[6px] sm:px-[1rem] bg-white rounded-[5px] w-fit sm:w-auto hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="36px"
          viewBox="0 -960 960 960"
          width="36px"
          fill="#1D4C5A"
          className="hidden sm:block"
        >
          <path d="M160-406.67v-66.66h293.33v66.66H160ZM160-570v-66.67h460V-570H160Zm0-163.33V-800h460v66.67H160ZM520-160v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8.67 9 12.83 20 4.17 11 4.17 22t-4.33 22.5q-4.34 11.5-13.28 20.5L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#1D4C5A"
          className="sm:hidden"
        >
          <path d="M160-406.67v-66.66h293.33v66.66H160ZM160-570v-66.67h460V-570H160Zm0-163.33V-800h460v66.67H160ZM520-160v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8.67 9 12.83 20 4.17 11 4.17 22t-4.33 22.5q-4.34 11.5-13.28 20.5L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
        </svg>
        <p className="text-verde-petroleo text-[10px] sm:text-[15px] uppercase">{text}</p>
      </button>
    );
  } else if ((text = "Profissionais")) {
    return (
      <button
        onClick={() => router.push(path)}
        className="h-[3.125rem] w-fit flex gap-[4px] items-center px-[1rem] bg-magenta rounded-[5px] hover:cursor-pointer"
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
      className="rounded-[5px] py-[0.5rem] px-[1rem] uppercase bg-ciano-escuro text-white text-[1.125rem] hover:cursor-pointer"
    >
      Saiba mais
    </button>
  );
}

function SkeletonList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center mb-[0.5rem] gap-2">
        <Skeleton className="h-3 w-3 bg-gray-400 rounded-full" />
        <Skeleton className="h-[1.5rem] w-40 sm:w-64 bg-gray-400" />
      </div>
      <div className="flex flex-row items-center mb-[0.5rem] gap-2">
        <Skeleton className="h-3 w-3 bg-gray-400 rounded-full" />
        <Skeleton className="h-[1.5rem] w-40 sm:w-64 bg-gray-400" />
      </div>
      <div className="flex flex-row items-center mb-[0.5rem] gap-2">
        <Skeleton className="h-3 w-3 bg-gray-400 rounded-full" />
        <Skeleton className="h-[1.5rem] w-40 sm:w-64 bg-gray-400" />
      </div>
      <div className="flex flex-row items-center mb-[0.5rem] gap-2">
        <Skeleton className="h-3 w-3 bg-gray-400 rounded-full" />
        <Skeleton className="h-[1.5rem] w-40 sm:w-64 bg-gray-400" />
      </div>
    </div>
  );
}

export function AreaCursoHome({ courseArea }: { courseArea: string }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCourses = async () => {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const coursesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.name,
          area: data.area,
        } as Course;
      });
      setCourses(coursesData);
      setIsLoading(false);
    };
    getCourses();
  }, []);

  if (courseArea == "Para médicos") {
    const filteredCourses = courses.filter(
      (course) => course.area === "doctors"
    );
    return (
      <div className="flex items-center flex-col gap-[1rem] w-[90%] md:w-[320px] lg:w-[380px] px-[2rem] py-[1.75rem] my-2 bg-menta-claro1 rounded-[5px] shadow-[4px_4px_5px_0px_#f1f1f1]">
        <h2 className="text-center font-semibold text-[1.7rem] text-verde-petroleo">
          {courseArea}
        </h2>
        <div className="h-[12.5rem] overflow-y-auto hover:bg-white">
          {isLoading ? (
            <SkeletonList />
          ) : (
            <ul className="text-text text-[1.125rem]">
              {filteredCourses.map((course, index) => (
                <li key={index} className="mb-[0.5rem]">
                  {course.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <SaibaMaisBtn />
      </div>
    );
  } else if (courseArea == "Mentorias") {
    const filteredCourses = courses.filter(
      (course) => course.area === "mentorships"
    );
    return (
      <div className="flex items-center flex-col gap-[1rem] w-[90%] md:w-[320px] lg:w-[380px] px-[2rem] py-[1.75rem] my-2 bg-menta-claro1 rounded-[5px] shadow-[4px_4px_5px_0px_#f1f1f1]">
        <h2 className="text-center font-semibold text-[1.7rem] text-verde-petroleo">
          {courseArea}
        </h2>
        <div className="h-[12.5rem] overflow-y-auto hover:bg-white">
          {isLoading ? (
            <SkeletonList />
          ) : (
            <ul className="text-text text-[1.125rem]">
              {filteredCourses.map((course, index) => (
                <li key={index} className="mb-[0.5rem]">
                  {course.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <SaibaMaisBtn />
      </div>
    );
  } else if (courseArea == "Para outros profissionais") {
    const filteredCourses = courses.filter(
      (course) => course.area === "others"
    );
    return (
      <div className="flex items-center flex-col gap-[1rem] w-[90%] md:w-[320px] lg:w-[380px] px-[2rem] py-[1.75rem] my-2 bg-menta-claro1 rounded-[5px] shadow-[4px_4px_5px_0px_#f1f1f1]">
        <h2 className="text-center font-semibold text-[1.7rem] text-verde-petroleo">
          {courseArea}
        </h2>
        <div className="h-[12.5rem] overflow-y-auto hover:bg-white">
          {isLoading ? (
            <SkeletonList />
          ) : (
            <ul className="text-text text-[1.125rem]">
              {filteredCourses.map((course, index) => (
                <li key={index} className="mb-[0.5rem]">
                  {course.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <SaibaMaisBtn />
      </div>
    );
  } else if (courseArea == "Para pacientes e cuidadores") {
    const filteredCourses = courses.filter(
      (course) => course.area === "patients-caregivers"
    );
    return (
      <div className="flex items-center flex-col gap-[1rem] w-[90%] md:w-[320px] lg:w-[380px] px-[2rem] py-[1.75rem] my-2 bg-menta-claro1 rounded-[5px] shadow-[4px_4px_5px_0px_#f1f1f1]">
        <h2 className="text-center font-semibold text-[1.7rem] text-verde-petroleo">
          {courseArea}
        </h2>
        <div className="h-[12.5rem] overflow-y-auto hover:bg-white">
          {isLoading ? (
            <SkeletonList />
          ) : (
            <ul className="text-text text-[1.125rem]">
              {filteredCourses.map((course, index) => (
                <li key={index} className="mb-[0.5rem]">
                  {course.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <SaibaMaisBtn />
      </div>
    );
  }
}
