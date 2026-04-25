export function HeroCTA() {
  return (
    // Adicionamos 'relative' e 'overflow-hidden' para conter a imagem
    <section className="relative overflow-hidden py-16 md:py-32 px-4 sm:px-6">
      {/* 1. A Imagem de Fundo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/imagem.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* 2. Overlay para escurecer ou clarear a imagem e dar contraste ao texto */}
        <div className="absolute inset-0 bg-white/20 md:bg-white/20"></div>
      </div>

      {/* 3. Conteúdo (z-10 para ficar acima da imagem) */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna 1: Vazia para manter o layout */}
        <div className="hidden md:block"></div>

        {/* Coluna 2: Conteúdo */}
        <div className="flex flex-col justify-center items-start text-left">
          <h3 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight uppercase">
            Viu um incêndio ou possível foco de queimada?
          </h3>

          <p className="text-gray-900 text-base sm:text-xl mb-8 leading-relaxed font-medium">
            Em situações de risco, o primeiro passo é acionar as autoridades.
            Você também pode registrar a ocorrência aqui para contribuir com o
            monitoramento ambiental.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <button className="flex items-center gap-2 px-8 py-3 border-2 border-[#bd1522] text-[#bd1522] font-black rounded-xl hover:bg-red-50 transition-all active:scale-95 shadow-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              FAZER REPORTE
            </button>

            <button className="flex items-center gap-2 px-8 py-3 border-2 border-[#bd1522] bg-[#bd1522] text-white font-black rounded-xl hover:bg-red-800 transition-all active:scale-95 shadow-md">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              LIGAR 193
            </button>
          </div>

          <small className="text-xs font-bold text-gray-700 mt-2 uppercase tracking-wide">
            O reporte na plataforma não substitui o atendimento de emergência.
          </small>
        </div>
      </div>
    </section>
  );
}
