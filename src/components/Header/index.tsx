import { Link, useLocation } from "react-router-dom";
import { BotaoPerfil } from "./BotaoPerfil";

export function Header() {
  const location = useLocation();

  const navLinks = [
    { name: "Portal", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Reporte", path: "/reporte" },
  ];

  return (
    <header className="bg-linear-to-r from-[#6a0a18] via-[#a8121f] to-[#d12a3d] text-white py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <Link
          to="/"
          className="cursor-pointer flex items-center"
          aria-label="Ir para o Portal"
        >
          <img
            src="/logo_completa_w.svg"
            alt="FogoZero MG"
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`cursor-pointer transition-colors ${
                  isActive
                    ? "border-b-2 border-white pb-1 font-bold"
                    : "hover:text-white/80 text-white/90"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <BotaoPerfil />
        </div>
      </div>
    </header>
  );
}
