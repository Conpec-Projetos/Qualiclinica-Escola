"use client";
import Footer from "@/components/ui/footer";
import LoginForm from "@/components/ui/login-form";
import Navbar from "@/components/ui/navbar";

export default function Login() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-white font-[family-name:var(--font-poppins)]">
      <Navbar />
      <main className="w-full flex items-center justify-center mt-6 text-black">
        <LoginForm />
      </main>
      <Footer></Footer>
    </div>
  );
}
