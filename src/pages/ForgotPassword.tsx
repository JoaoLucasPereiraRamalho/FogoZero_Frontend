// 1. O import continua igual
import { ForgotPassword } from "../components/EsqueciSenha/ForgotPassword";

// 2. Mude o nome da função da página para ForgotPasswordPage
export function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            {/* 3. Renderize o componente importado */}
            <ForgotPassword />
        </div>
    );
}