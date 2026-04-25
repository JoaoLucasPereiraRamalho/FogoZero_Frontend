import { useNavigate } from "react-router-dom";
import { User, ShieldCheck, LogIn } from "lucide-react";

export function BotaoPerfil() {
  const navigate = useNavigate();

  // 1. Recupera o token e os dados do usuário do LocalStorage
  const token = localStorage.getItem("@FogoZero:token");
  const userData = localStorage.getItem("@FogoZero:user");
  const usuario = userData ? JSON.parse(userData) : null;

  // 2. Se não estiver logado, mostra o botão de Login
  if (!token || !usuario) {
    return (
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all shadow-sm"
      >
        <LogIn size={18} className="text-[#bd1522]" />
        Entrar
      </button>
    );
  }

  // 3. Se for Admin, mostra botão para o Painel Admin
  if (usuario.tipo?.toLowerCase() === "admin") {
    return (
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 bg-[#bd1522] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#a0121d] transition-all shadow-md"
      >
        <ShieldCheck size={18} />
        Painel Admin
      </button>
    );
  }

  // 4. Caso contrário (Usuário Comum), mostra botão para Perfil
  return (
    <button
      onClick={() => navigate("/perfilusuario")}
      className="flex items-center gap-2 bg-white border-2 border-[#bd1522] text-[#bd1522] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-50 transition-all shadow-sm"
    >
      <User size={18} />
      Meu Perfil
    </button>
  );
}
