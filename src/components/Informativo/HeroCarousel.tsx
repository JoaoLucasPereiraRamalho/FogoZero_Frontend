export function HeroCarousel() {
  return (
    <section className="pt-12 pb-16">
      {/* Textos de Introdução */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <h1 className="text-[2.5rem] font-extrabold text-black leading-tight mb-4 max-w-3xl">
          Entenda, previna e ajude a combater incêndios na sua região!
        </h1>
        <p className="text-gray-700 text-sm mb-6 max-w-4xl">
          No FogoZero MG, você encontra dados atualizados, orientações de
          prevenção e ferramentas que permitem acompanhar a situação das
          queimadas e contribuir diretamente com a proteção do meio ambiente e
          da sua comunidade.
        </p>
        <p className="text-black font-bold text-lg max-w-4xl">
          Acompanhe a situação das queimadas, receba alertas personalizados e
          reporte incêndios diretamente pela plataforma.
        </p>
      </div>

      {/* Carrossel Placeholder */}
      <div className="relative w-full overflow-hidden flex justify-center items-center h-[400px]">
        {/* Card Anterior (vazando na esquerda) */}
        <div className="hidden md:block absolute left-[-15%] w-[60%] h-full bg-[#e5e5e5] rounded-3xl opacity-50"></div>

        {/* Card Principal (Centro) */}
        <div className="relative z-10 w-[90%] md:w-[70%] h-full bg-[#e5e5e5] rounded-3xl shadow-sm flex items-center justify-between px-4 md:px-[-2rem]">
          {/* Seta Esquerda */}
          <button className="absolute left-4 w-10 h-10 bg-red-100/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-red-200 transition-colors shadow-sm">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Seta Direita */}
          <button className="absolute right-4 w-10 h-10 bg-red-100/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-red-200 transition-colors shadow-sm">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Card Próximo (vazando na direita) */}
        <div className="hidden md:block absolute right-[-15%] w-[60%] h-full bg-[#e5e5e5] rounded-3xl opacity-50"></div>
      </div>
    </section>
  );
}
