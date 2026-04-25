import { LoginForm } from "../components/Login/LoginForm";
import { Header } from "../components/Header";

export function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Lado Esquerdo: Imagem Arredondada (Destaque visual) */}
          <div className="hidden lg:block h-[600px] bg-gray-100 rounded-[3rem] overflow-hidden shadow-inner">
            <img
              src="/public/login.png"
              alt="Monitoramento FogoZero"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Lado Direito: Formulário */}
          <div className="flex justify-center lg:justify-start lg:pl-8">
            <LoginForm />
          </div>
        </div>
      </main>

      {/* Opcional: Adicionar seu Footer aqui */}
    </div>
  );
}
