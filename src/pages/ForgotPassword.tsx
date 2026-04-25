// 1. O import continua igual
import { ForgotPassword } from "../components/EsqueciSenha/ForgotPassword";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header";

// 2. Mude o nome da função da página para ForgotPasswordPage
export function ForgotPasswordPage() {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {/* 3. Renderize o componente importado */}
        <ForgotPassword />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
