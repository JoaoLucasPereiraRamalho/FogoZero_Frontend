import { useNavigate } from "react-router-dom";

export function BotaoPerfil() {
  const navigate = useNavigate();

  const token = localStorage.getItem("@FogoZero:token");
  const userData = localStorage.getItem("@FogoZero:user");
  const usuario = userData ? JSON.parse(userData) : null;
  const isLogged = Boolean(token && usuario);
  const isAdmin = isLogged && usuario.tipo?.toLowerCase() === "administrador";

  function handleLogout() {
    localStorage.removeItem("@FogoZero:token");
    localStorage.removeItem("@FogoZero:user");
    navigate("/");
    window.location.reload();
  }

  // Botão "outline" branco (transparente com borda)
  const outlineCls =
    "px-5 py-2 border border-white text-white text-sm font-bold rounded-lg hover:bg-white/10 transition-colors cursor-pointer";
  // Botão "solid" branco (fundo branco, texto vermelho)
  const solidCls =
    "px-5 py-2 bg-white text-[#bd1522] text-sm font-bold rounded-lg shadow-sm hover:bg-gray-100 transition-colors cursor-pointer";

  // Não logado: Entrar (outline) + Cadastrar (solid)
  if (!isLogged) {
    return (
      <>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className={outlineCls}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => navigate("/cadastro")}
          className={`hidden sm:block ${solidCls}`}
        >
          Cadastrar
        </button>
      </>
    );
  }

  // Admin: Perfil (outline) + Administrador (solid) + Sair (solid)
  if (isAdmin) {
    return (
      <>
        <button
          type="button"
          onClick={() => navigate("/perfilusuario")}
          className={outlineCls}
        >
          Perfil
        </button>
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className={solidCls}
        >
          Administrador
        </button>
        <button type="button" onClick={handleLogout} className={solidCls}>
          Sair
        </button>
      </>
    );
  }

  // Usuário comum: Perfil (outline) + Sair (solid)
  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/perfilusuario")}
        className={outlineCls}
      >
        Perfil
      </button>
      <button type="button" onClick={handleLogout} className={solidCls}>
        Sair
      </button>
    </>
  );
}
