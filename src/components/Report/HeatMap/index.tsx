export function HeatMap() {
  return (
    <section className="mt-12">
      {/* Títulos externos (fora do card do mapa) */}
      <div className="mb-6">
        <h2 className="text-[2.2rem] font-extrabold text-black mb-2 tracking-tight">
          Entenda o que acontece ao seu redor
        </h2>
        <p className="text-gray-600 text-[15px] max-w-5xl leading-relaxed">
          Após registrar um reporte, você pode visualizar no mapa os focos de
          incêndio próximos e compreender melhor a situação da área onde você
          está. Utilize o mapa para explorar ocorrências e ficar por dentro de
          novos registros.
        </p>
      </div>

      {/* O Grande Card Branco do Mapa */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6">
        {/* Cabeçalho do Card (Título, Legenda e Filtros) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#059669"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <h3 className="text-xl font-bold text-gray-900">Mapa de Calor</h3>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-gray-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]"></span>{" "}
              Alto Risco
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>{" "}
              Médio Risco
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]"></span>{" "}
              Baixo Risco
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              disabled
              title="Filtro em breve"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#900e18] text-white text-sm font-medium rounded hover:bg-[#6b0a12] transition-colors cursor-not-allowed opacity-70"
            >
              Município
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <button
              type="button"
              disabled
              title="Filtro em breve"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#900e18] text-white text-sm font-medium rounded hover:bg-[#6b0a12] transition-colors cursor-not-allowed opacity-70"
            >
              Período
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* CONTAINER DO MAPA REAL (IFRAME) */}
        <div className="w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15214878.711867142!2d-52.92341908202573!3d-18.431874251787163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa690a165324289%3A0x112170c9379de7b3!2sMinas%20Gerais!5e0!3m2!1spt-BR!2sbr!4v1712760000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="Mapa de Minas Gerais"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
