import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import ContactUsSvg from "@/assets/decoration-contact.svg";
import Image from "next/image";
import InterestForm from "@/components/ui/interest-form";

export default function ContactUs() {
  return (
    <div className="min-h-screen w-full bg-menta-claro1 flex flex-col">
      <Navbar />
      <main className="font-poppins flex flex-col items-center gap-4 md:gap-[2.625rem] p-4 md:p-[2rem]">
        <div className="flex flex-col md:flex-row gap-4 md:gap-x-[4.3125rem] items-center md:items-start justify-center bg-verde-petroleo w-full max-w-[67.25rem] min-h-[600px] md:h-[47rem] p-4 sm:p-8 md:p-[4.75rem] rounded-lg">
          <div className="w-full md:w-[28.8375rem] md:h-[37.5rem] rounded-[0.3125rem] order-2 md:order-1">
            <InterestForm />
          </div>
          
          {/* Mobile */}
          <div className="block md:hidden w-full text-center order-1">
            <div className="flex flex-col items-center gap-y-[0.5rem]">
              <h1 className="text-xl font-semibold text-menta-claro1">
                Contate-nos
              </h1>
              <div className="flex justify-center items-start max-w-md gap-x-2">
                <p className="text-base text-left leading-relaxed text-menta-claro1 flex-1">
                  Comece uma jornada de ampliação dos seus conhecimentos sobre o
                  diabetes e as suas formas de cuidado!
                </p>
                <div className="w-32">
                  <Image alt="contact-us decoration" src={ContactUsSvg} className="object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex flex-col gap-y-[1.443rem] justify-center text-menta-claro1 w-[19.75rem] text-left order-2">
            <div className="flex flex-col gap-y-[0.5rem]">
              <h1 className="md:!text-3xl lg:!text-4xl font-semibold">
                Contate-nos
              </h1>
              <p className="text-lg font-light leading-relaxed">
                Comece uma jornada de ampliação dos seus conhecimentos sobre o
                diabetes e as suas formas de cuidado!
              </p>
            </div>
            <div>
              <Image alt="contact-us decoration" src={ContactUsSvg} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
