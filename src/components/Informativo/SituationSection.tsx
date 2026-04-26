import { Flame, TrendingUp, TreePine, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export function SituationSection() {
  const cards = [
    {
      bg: "from-red-200/50 to-white",
      iconBg: "bg-[#7d1624]",
      iconColor: "text-white",
      title: "Visualizar Focos de Incêndio",
      desc: "Veja no mapa onde os incêndios estão acontecendo em Minas Gerais.",
      icon: <Flame size={20} fill="currentColor" />,
    },
    {
      bg: "from-orange-200/50 to-white",
      iconBg: "bg-[#c2410c]",
      iconColor: "text-white",
      title: "Evolução das Queimadas",
      desc: "Acompanhe como os incêndios mudaram ao longo dos anos.",
      icon: <TrendingUp size={20} />,
    },
    {
      bg: "from-green-200/50 to-white",
      iconBg: "bg-[#059669]",
      iconColor: "text-white",
      title: "Explorar Áreas de Preservação",
      desc: "Veja quais áreas ambientais estão mais vulneráveis.",
      icon: <TreePine size={20} fill="currentColor" />,
    },
    {
      bg: "from-blue-200/50 to-white",
      iconBg: "bg-[#0284c7]",
      iconColor: "text-white",
      title: "Entender o Nível de Risco (IMRI)",
      desc: "Descubra se sua região está em baixo, médio ou alto risco.",
      icon: <AlertTriangle size={20} />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-24 items-center">
        {/* Coluna da Esquerda */}
        <div className="max-w-md">
          <h2 className="text-[2.6rem] font-bold text-black leading-[1.1] mb-6">
            Veja o que está <br /> Acontecendo na sua Região
          </h2>
          <p className="text-gray-600 text-[16px] leading-relaxed mb-10">
            Explore mapas, indicadores e dados organizados para entender o
            cenário ambiental da sua região.
          </p>

          <Link
            to="/dashboard"
            className="inline-block px-8 py-3.5 bg-[#bd1522] text-white font-bold rounded-xl shadow-lg shadow-red-900/20 hover:bg-red-800 transition-all active:scale-95"
          >
            Acessar Dashboard
          </Link>
        </div>

        {/* Coluna da Direita (Grid de Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`bg-linear-to-br ${card.bg} border border-gray-100 rounded-[2.5rem] p-8 shadow-lg shadow-gray-200/50 min-h-55 flex flex-col justify-center `}
            >
              <div
                className={`w-12 h-12 rounded-full ${card.iconBg} ${card.iconColor} flex items-center justify-center mb-6 shadow-lg shadow-black/10`}
              >
                {card.icon}
              </div>

              <h3 className="text-gray-900 font-bold text-[17px] mb-3">
                {card.title}
              </h3>
              <p className="text-[14px] text-gray-500 leading-snug">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
