"use client";
import Footer from "@/components/ui/footer";
import LoginForm from "@/components/ui/login-form";
import Navbar from "@/components/ui/navbar";

export default function Login() {
  return (
    <div className="flex flex-col w-screen min-h-screen h-screen bg-white font-poppins">
      <Navbar />
      <main className="w-full flex flex-col items-center justify-center mt-6 mb-6 h-full">
        <LoginForm />
      </main>
      <Footer></Footer>
    </div>
  );
}
