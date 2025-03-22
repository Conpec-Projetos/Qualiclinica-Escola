import Footer from "@/components/ui/footer";
import LoginForm from "@/components/ui/login-form";
import Navbar from "@/components/ui/navbar";

export default function Login() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-white font-[family-name:var(--font-poppins)]">
      <Navbar></Navbar>
      <main className="p-10 w-full flex items-center justify-center text-black">
        <LoginForm />
      </main>
      <Footer></Footer>
    </div>
  );
}
