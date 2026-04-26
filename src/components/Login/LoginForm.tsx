import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import authService from "../../services/auth"; // Importando seu service

export function LoginForm() {
  // Estados para capturar os dados dos inputs
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  // Função que lida com o clique no botão (Envio do formulário)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const data = await authService.login(email, senha);

      // 1. Salva no LocalStorage
      localStorage.setItem("@FogoZero:token", data.token);
      localStorage.setItem("@FogoZero:user", JSON.stringify(data.usuario));

      // 2. Extrai o tipo com segurança (usa o ? para não travar se data.usuario for undefined)
      const tipoUsuario = data.usuario?.tipo?.toLowerCase();

      // 3. Redirecionamento
      if (tipoUsuario === "administrador") {
        navigate("/admin");
      } else {
        // Qualquer coisa que não seja 'admin' (incluindo 'user' ou erro) vai para o perfil
        navigate("/perfilusuario");
      }
    } catch (err: any) {
      // O seu service deve retornar a mensagem de erro da API
      setErro(err || "Falha na autenticação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full">
      <h2 className="text-[2.5rem] font-extrabold text-black mb-2">
        Bem-vindo de volta
      </h2>
      <p className="text-gray-500 text-sm mb-10">
        Entre para acompanhar dados, receber alertas e monitorar sua região.
      </p>

      {/* Exibição de erro caso a API retorne falha */}
      {erro && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg flex items-start gap-3 animate-pulse">
          <svg
            className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-red-800 font-bold text-sm">Falha no login</p>
            <p className="text-red-700 text-sm">{erro}</p>
          </div>
        </div>
      )}

      <form className="flex flex-col" onSubmit={handleSubmit}>
        {/* Campo de Email */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-sm font-bold text-gray-700">Email</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 text-gray-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Coloque seu email aqui"
              className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Campo de Senha */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-sm font-bold text-gray-700">Senha</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 text-gray-400" size={18} />
            <input
              type={mostrarSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Insira sua senha aqui"
              className="w-full p-2.5 pl-10 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setMostrarSenha((prev) => !prev)}
              className="absolute right-3 text-gray-400 cursor-pointer bg-transparent border-0 p-0"
              aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            >
              {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Links Auxiliares */}
        <div className="flex items-center justify-between mt-2 mb-8">
          <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-[#bd1522]" />
            Manter conectado
          </label>
          <Link
            to="/forgot-password"
            className="text-xs text-[#bd1522] font-medium hover:underline cursor-pointer"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        {/* Botão de Ação */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#bd1522] text-white py-3.5 rounded-xl font-bold text-base hover:bg-[#a0121d] transition-all shadow-md active:scale-[0.98] mb-4 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Carregando..." : "Acessar Minha Conta"}
        </button>

        <p className="text-center text-xs text-gray-500">
          Não tem uma conta?{" "}
          <Link
            to="/cadastro"
            className="text-[#bd1522] font-bold hover:underline cursor-pointer"
          >
            Cadastre-se aqui!
          </Link>
        </p>
      </form>
    </div>
  );
}
