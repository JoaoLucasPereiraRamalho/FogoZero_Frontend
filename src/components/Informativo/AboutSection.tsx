export function AboutSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Coluna da Esquerda (Textos) */}
        <div>
          <h2 className="text-[2rem] font-extrabold text-black mb-1">
            Conheça o FogoZero
          </h2>
          <h3 className="text-xl text-gray-700 mb-6">
            Uma plataforma para informar e agir!
          </h3>

          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
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
        <div className="flex flex-col gap-4">
          {/* Card 1 - Destaque */}
          <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm p-5 pl-6 flex items-start gap-4">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-red-100/70 to-transparent border-l-4 border-[#bd1522] pointer-events-none"></div>
            <div className="z-10 mt-0.5 text-gray-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            <div className="z-10">
              <strong className="block text-black text-sm mb-0.5 uppercase tracking-wide">
                Monitore sua região
              </strong>
              <p className="text-[13px] text-gray-500">
                Dados atualizados em mapas e gráficos interativos.
              </p>
            </div>
          </div>

          {/* Cards normais */}
          {[
            {
              title: "Reporte ocorrências",
              desc: "Sua observação pode ajudar na prevenção.",
            },
            {
              title: "Fique informado",
              desc: "Receba avisos quando houver risco na sua região.",
            },
            {
              title: "Fique informado",
              desc: "Receba avisos quando houver risco na sua região.",
            }, // Repetido conforme o design
          ].map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm p-5 pl-6 flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-100/50 to-transparent border-l-4 border-transparent pointer-events-none"></div>
              <div className="z-10 mt-0.5 text-gray-400">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </div>
              <div className="z-10">
                <strong className="block text-black text-sm mb-0.5 uppercase tracking-wide">
                  {item.title}
                </strong>
                <p className="text-[13px] text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
