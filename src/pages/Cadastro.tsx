import { RegisterForm } from "../components/Cadastro/RegisterForm";
import { Header } from "../components/Header";

export function Cadastro() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Aqui entraria o seu componente de Header/Navbar */}
      <Header />

      <main className="flex-grow flex items-center justify-center p-6 bg-white">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lado Esquerdo: Área da Imagem Arredondada */}
          <div className="hidden lg:block h-[700px] bg-gray-200 rounded-[3rem] overflow-hidden">
            <img
              src="/path-to-your-background.jpg"
              alt="Incêndio Florestal"
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          {/* Lado Direito: Formulário */}
          <div className="flex justify-center lg:justify-start">
            <RegisterForm />
          </div>
        </div>
      </main>

      {/* Aqui entraria o seu componente de Footer */}
    </div>
  );
}
