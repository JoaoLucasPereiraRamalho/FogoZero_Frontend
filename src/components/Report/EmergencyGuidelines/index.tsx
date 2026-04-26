import { AlertTriangle, Wind, ShieldAlert, ShieldCheck } from "lucide-react";

export function EmergencyGuidelines() {
  const guidelines = [
    {
      title: "Mantenha distância",
      desc: "Não tente combater incêndios de grande proporção sozinho.",
      icon: <AlertTriangle size={20} className="text-[#bd1522]" />,
    },
    {
      title: "Atenção ao vento",
      desc: "Afaste-se da direção do vento para evitar a fumaça.",
      icon: <Wind size={20} className="text-[#bd1522]" />,
    },
    {
      title: "Proteja-se",
      desc: "Evite inalar fumaça e procure locais seguros.",
      icon: <ShieldAlert size={20} className="text-[#bd1522]" />,
    },
    {
      title: "Siga orientações oficiais",
      desc: "Aguarde e siga as instruções das equipes de emergência.",
      icon: <ShieldCheck size={20} className="text-[#bd1522]" />,
    },
  ];

  return (
    <section className="flex flex-col h-full max-w-sm">
      <h2 className="text-[1.7rem] font-bold text-[#222] leading-[1.2] mb-3">
        O que fazer em caso de <br /> incêndio próximo
      </h2>

      <p className="text-gray-600 text-[14px] mb-8 leading-relaxed">
        Enquanto aguarda a chegada das autoridades, algumas atitudes podem
        ajudar a manter sua segurança e evitar a propagação do fogo.
      </p>

      <div className="flex flex-col gap-3">
        {guidelines.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-4 pl-6 flex items-center gap-4 shadow-md shadow-gray-200/50 transition-all hover:shadow-lg"
          >
            {/* Gradiente Lateral mais fino */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-red-100/40 to-transparent border-l-4 border-[#bd1522] pointer-events-none" />

            {/* Ícone menor */}
            <div className="z-10 shrink-0">{item.icon}</div>

            {/* Textos mais compactos */}
            <div className="z-10">
              <h4 className="text-[14px] font-bold text-gray-800 mb-0.5">
                {item.title}
              </h4>
              <p className="text-[12px] text-gray-500 leading-snug font-medium">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
