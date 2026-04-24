export function SituationSection() {
  const cards = [
    {
      bg: "from-red-100/80 to-white",
      iconColor: "text-[#bd1522]",
      iconBg: "bg-[#bd1522]",
      title: "Visualizar Focos de Incêndio",
      desc: "Acompanhe no mapa onde os incêndios estão ocorrendo em Minas Gerais.",
    },
    {
      bg: "from-orange-100/80 to-white",
      iconColor: "text-[#ea580c]",
      iconBg: "bg-[#ea580c]",
      title: "Lorem Ipsum",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      bg: "from-green-100/80 to-white",
      iconColor: "text-[#16a34a]",
      iconBg: "bg-[#16a34a]",
      title: "Lorem Ipsum",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      bg: "from-blue-100/80 to-white",
      iconColor: "text-[#0284c7]",
      iconBg: "bg-[#0284c7]",
      title: "Lorem Ipsum",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-end">
        {/* Coluna da Esquerda */}
        <div className="flex flex-col h-full justify-between">
          <div>
            <h2 className="text-[2rem] font-extrabold text-black leading-tight mb-4">
              Entenda a situação dos incêndios em Minas Gerais
            </h2>
            <p className="text-gray-600 text-[15px] mb-8">
              Explore mapas, indicadores e dados organizados para entender o
              cenário ambiental da sua região.
            </p>
          </div>

          <button className="self-start flex items-center gap-2 px-6 py-2.5 bg-[#bd1522] text-white font-bold rounded hover:bg-red-800 transition-colors">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            Label
          </button>
        </div>

        {/* Coluna da Direita (Grid de Cards Coloridos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${card.bg} border border-gray-100 rounded-2xl p-6 shadow-sm`}
            >
              <div className="mb-4">
                {/* Ícone com fundo transparente e borda */}
                <div
                  className={`w-8 h-8 rounded-full border-2 ${card.iconColor.replace("text-", "border-")} flex items-center justify-center relative`}
                >
                  <div
                    className={`w-full h-full rounded-full ${card.iconBg} opacity-20 absolute inset-0`}
                  ></div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={card.iconColor}
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
              </div>
              <strong className="block text-black text-sm mb-2">
                {card.title}
              </strong>
              <p className="text-[13px] text-gray-600 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
