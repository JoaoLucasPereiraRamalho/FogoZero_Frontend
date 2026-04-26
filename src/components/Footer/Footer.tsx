export function Footer() {
  return (
    <footer className="w-full bg-linear-to-r from-[#6a0a18] via-[#a8121f] to-[#d12a3d] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Parte Superior: Logo e Redes Sociais */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8">
          {/* Logo (texto) */}
          <a
            href="/"
            className="flex items-center cursor-pointer"
            aria-label="Ir para o Portal"
          >
            <h2 className="text-3xl font-black italic tracking-tight">
              FogoZero{" "}
              <span className="font-light not-italic uppercase tracking-normal">
                MG
              </span>
            </h2>
          </a>

          {/* Ícones de Redes Sociais */}
          <div className="flex items-center gap-5">
            <a href="#" className="hover:scale-110 transition-transform">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* Texto Central de Missão */}
        <div className="mb-10 max-w-3xl">
          <p className="text-[17px] leading-relaxed font-light text-white/90">
            Levando a <span className="font-bold text-white">informação</span>{" "}
            além dos dados, permitindo que você{" "}
            <span className="font-bold text-white">acompanhe</span> a situação
            da sua <span className="font-bold text-white">região</span>, entenda
            os <span className="font-bold text-white">riscos</span> e participe
            ativamente da{" "}
            <span className="font-bold text-white">prevenção</span>.
          </p>
        </div>

        {/* Linha Divisória */}
        <div className="w-full h-[1px] bg-white/20 mb-6"></div>

        {/* Copyright */}
        <div className="text-sm font-medium text-white/70">
          © 2026 FogoZero MG. Todos Os Direitos Reservados.
        </div>
      </div>
    </footer>
  );
}
