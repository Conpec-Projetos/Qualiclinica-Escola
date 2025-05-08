import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import ContactUsSvg from "@/assets/decoration-contact.svg";
import Image from "next/image";
import InterestForm from "@/components/ui/interest-form";
import { Toaster } from "sonner";

export default function ContactUs() {
  return (
    <div>
      <Navbar />
      <main className="font-poppins flex flex-col items-center gap-[2.625rem] p-[2rem]">
        <div className="flex flex-row gap-x-[4.3125rem] items-start justify-center bg-verde-petroleo w-[67.25rem] h-[47rem] p-[4.75rem]">
          <div className="w-[28.8375rem] h-[37.5rem] rounded-[0.3125rem]">
            <InterestForm />
          </div>
          <div className="flex flex-col gap-y-[1.443] justify-center text-menta-claro1 w-[19.75rem] ">
            <div className="flex flex-col gap-y-[0.5rem]">
              <h1 className="custom-h1 font-semibold h-[4.5rem]">
                contate-nos
              </h1>
              <p className="text-[1.3125rem] h-[11.1875rem]">
                Comece uma jornada de ampliação dos seus conhecimentos sobre o
                diabetes e as suas formas de cuidado!
              </p>
            </div>
            <Image alt="contact-us decoration" src={ContactUsSvg}></Image>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" closeButton />
    </div>
  );
}
