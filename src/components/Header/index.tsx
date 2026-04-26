import { Link, useLocation } from "react-router-dom";
import { BotaoPerfil } from "./BotaoPerfil";

export function Header() {
  // Esse hook descobre qual é a URL atual (ex: '/' ou '/reporte')
  const location = useLocation();

  const navLinks = [
    { name: "Portal", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Reporte", path: "/reporte" },
  ];

  return (
    <header className="bg-fogo-red text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        {/* Logo agora usa o componente <Link> */}
        <Link
          to="/"
          className="font-bold text-2xl tracking-tight cursor-pointer"
        >
          Logo
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            // Verifica se o caminho do link atual é exatamente igual à URL da página
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`cursor-pointer transition-colors ${
                  isActive
                    ? "border-b-2 border-white pb-1 font-bold" // Estilo se estiver ativo
                    : "hover:text-white/80 text-white/90" // Estilo se não estiver
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="auth-area">
            <BotaoPerfil />
          </div>
          <Link
            to="/cadastro"
            className="hidden sm:block px-5 py-2 bg-white text-fogo-red text-sm font-bold rounded-lg shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    </header>
  );
}
