export function HeroCTA() {
  return (
    // Fundo cinza claro, padding generoso em cima e embaixo.
    <section className="bg-[#e5e5e5] py-16 md:py-24 px-4 sm:px-6">
      {/* Container centralizado. No desktop (md), divide em 2 colunas. */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna 1 (Esquerda): Vazia no desktop para empurrar o conteúdo para a direita. */}
        <div className="hidden md:block"></div>

        {/* Coluna 2 (Direita): O conteúdo de fato, alinhado à esquerda. */}
        <div className="flex flex-col justify-center items-start text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            Viu um incêndio ou possível
            <br className="hidden lg:block" /> foco de queimada?
          </h1>

          <p className="text-gray-800 text-base sm:text-lg mb-8 leading-relaxed">
            Em situações de risco, o primeiro passo é acionar as autoridades.
            Você também pode registrar a ocorrência aqui para contribuir com o
            monitoramento ambiental.
          </p>

          {/* Container dos botões */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Botão 'Fazer reporte' - Borda vermelha, fundo transparente */}
            <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-fogo-red text-fogo-red font-bold rounded hover:bg-red-50 transition-colors">
              {/* Ícone de Círculo */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              Fazer reporte
            </button>

            {/* Botão 'Ligar 193' - Fundo vermelho sólido */}
            <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-fogo-red bg-fogo-red text-white font-bold rounded hover:bg-red-800 transition-colors shadow-sm">
              {/* Ícone de Círculo com corte */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              Ligar 193
            </button>
          </div>

          <small className="text-sm text-gray-700 mt-2">
            O reporte na plataforma não substitui o atendimento de emergência.
          </small>
        </div>
      </div>
    </section>
  );
}
