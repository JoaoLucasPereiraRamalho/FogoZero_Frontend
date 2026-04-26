import { MapPin, Megaphone, Bell, Flame } from "lucide-react";
import { Link } from "react-router-dom";

export function AboutSection() {
  const infoCards = [
    {
      title: "Acompanhe sua cidade",
      desc: "Veja mapas e indicadores atualizados",
      icon: <MapPin className="text-[#bd1522]" size={20} />,
      gradient: "from-red-100/60",
      to: "/dashboard",
    },
    {
      title: "Reporte ocorrências",
      desc: "Ajude a identificar focos de incêndio",
      icon: <Megaphone className="text-[#bd1522]" size={20} />,
      gradient: "from-orange-100/60",
      to: "/reporte",
    },
    {
      title: "Receba alertas",
      desc: "Seja avisado sobre riscos na sua região",
      icon: <Bell className="text-orange-500" size={20} />,
      gradient: "from-orange-100/40",
      to: "/perfilusuario",
    },
    {
      title: "Acompanhe as queimadas",
      desc: "Veja como os incêndios mudaram ao longo do tempo.",
      icon: <Flame className="text-[#bd1522]" size={20} />,
      gradient: "from-red-100/60",
      to: "/dashboard",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        {/* Coluna da Esquerda (Textos) */}
        <div className="flex flex-col space-y-6">
          <div>
            <h2 className="text-4xl lg:text-[2.6rem] font-bold text-black leading-tight mb-2">
              Conheça o FogoZero
            </h2>
            <h3 className="text-2xl font-medium text-gray-800">
              Uma plataforma para informar e agir!
            </h3>
          </div>

          <div className="space-y-5 text-[15px] text-gray-600 leading-relaxed text-justify">
            <p>
              O FogoZero MG é uma plataforma criada para facilitar o acesso a
              informações sobre incêndios ambientais e riscos de queimadas em
              Minas Gerais. Reunindo dados atualizados, indicadores e
              visualizações interativas, o sistema permite acompanhar a situação
              ambiental de forma simples, rápida e confiável.
            </p>
            <p>
              Aqui, você pode visualizar métricas sobre sua região, entender os
              níveis de risco e acessar conteúdos que ajudam a compreender
              melhor o cenário das queimadas no estado.
            </p>
            <p>
              Além de informar, a plataforma também convida você a participar da
              prevenção. É possível receber alertas personalizados conforme sua
              localização e colaborar com o monitoramento ambiental ao reportar
              possíveis focos de incêndio.
            </p>
            <p>
              O objetivo do FogoZero MG é transformar informação em ação,
              incentivando a conscientização coletiva e contribuindo para a
              proteção do meio ambiente.
            </p>
          </div>
        </div>

        {/* Coluna da Direita (Cards) */}
        <div className="flex flex-col gap-5">
          {infoCards.map((card, index) => (
            <Link
              key={index}
              to={card.to}
              className="group relative overflow-hidden bg-[#f3f4f6]/40 border border-gray-100 rounded-[1.8rem] p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Gradiente Lateral (O toque do design) */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r ${card.gradient} to-transparent pointer-events-none`}
              />

              {/* Container do Ícone */}
              <div className="z-10 bg-white p-3.5 rounded-2xl shadow-sm border border-gray-50 group-hover:scale-105 transition-transform">
                {card.icon}
              </div>

              {/* Textos */}
              <div className="z-10">
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-0.5">
                  {card.title}
                </h4>
                <p className="text-[13px] text-gray-500 font-medium leading-snug">
                  {card.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
