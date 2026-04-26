import { Link, useLocation } from "react-router-dom";
import { BotaoPerfil } from "./BotaoPerfil";
import { useState } from "react";

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClose = () => setIsMenuOpen(false);

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

          {/* Menu Icon - Mobile Only */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-linear-to-r from-[#6a0a18] via-[#a8121f] to-[#d12a3d] border-t border-white/10 px-6 py-3">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={handleMenuClose}
                  className={`py-2 px-3 rounded text-sm font-medium transition-colors ${
                    isActive ? "bg-white/15 font-bold" : "hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
