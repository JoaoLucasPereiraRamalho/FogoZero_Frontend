import { Mail, Lock, Eye } from "lucide-react";

// src/components/LoginForm.tsx
export function LoginForm() {
  return (
    <div className="max-w-md w-full">
      <h2 className="text-[2.5rem] font-extrabold text-black mb-2">
        Bem-vindo de volta
      </h2>
      <p className="text-gray-500 text-sm mb-10">
        Entre para acompanhar dados, receber alertas e monitorar sua região.
      </p>

      <form className="flex flex-col">
        {/* Campo de Email */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-sm font-bold text-gray-700">Email</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Coloque seu email aqui"
              className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Campo de Senha */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-sm font-bold text-gray-700">Senha</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Insira sua senha aqui"
              className="w-full p-2.5 pl-10 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
            />
            <Eye
              className="absolute right-3 text-gray-400 cursor-pointer"
              size={18}
            />
          </div>
        </div>

        {/* Links Auxiliares */}
        <div className="flex items-center justify-between mt-2 mb-8">
          <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-[#bd1522]" />
            Manter conectado
          </label>
          <a
            href="#"
            className="text-xs text-[#bd1522] font-medium hover:underline"
          >
            Esqueceu sua senha?
          </a>
        </div>

        {/* Botão de Ação */}
        <button className="w-full bg-[#bd1522] text-white py-3.5 rounded-xl font-bold text-base hover:bg-[#a0121d] transition-all shadow-md active:scale-[0.98] mb-4">
          Acessar Minha Conta
        </button>

        <p className="text-center text-xs text-gray-500">
          Não tem uma conta?{" "}
          <a
            href="/cadastro"
            className="text-[#bd1522] font-bold hover:underline"
          >
            Cadastre-se aqui!
          </a>
        </p>
      </form>
    </div>
  );
}
