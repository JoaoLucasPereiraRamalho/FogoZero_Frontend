export function EmergencyGuidelines() {
  return (
    <div className="flex flex-col h-full justify-center">
      <h3 className="text-[1.35rem] leading-tight font-extrabold text-black mb-3">
        O que fazer em caso de
        <br />
        incêndio próximo
      </h3>
      <p className="text-gray-700 text-sm mb-8 leading-relaxed pr-4">
        Enquanto aguarda a chegada das autoridades, algumas atitudes podem
        ajudar a manter sua segurança e evitar a propagação do fogo.
      </p>

      <div className="flex flex-col gap-4">
        {/* Card 1 - Destaque */}
        <div className="relative overflow-hidden bg-white border border-gray-200 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-4 pl-5 flex items-start gap-4">
          {/* Efeito visual da borda e degradê */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-red-100/80 to-transparent border-l-4 border-[#bd1522] pointer-events-none"></div>

          <div className="z-10 text-[#bd1522] mt-0.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div className="z-10">
            <strong className="block text-black text-sm mb-0.5">
              Mantenha distância
            </strong>
            <p className="text-[13px] text-gray-500">
              Não tente combater incêndios de grande proporção sozinho.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative overflow-hidden bg-white border border-gray-200 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-4 pl-5 flex items-start gap-4">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-red-100/40 to-transparent border-l-4 border-[#bd1522] pointer-events-none"></div>

          <div className="z-10 text-black mt-0.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          </div>
          <div className="z-10">
            <strong className="block text-black text-sm mb-0.5">
              Lorem Ipsum
            </strong>
            <p className="text-[13px] text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative overflow-hidden bg-white border border-gray-200 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-4 pl-5 flex items-start gap-4">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-red-100/40 to-transparent border-l-4 border-[#bd1522] pointer-events-none"></div>

          <div className="z-10 text-black mt-0.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          </div>
          <div className="z-10">
            <strong className="block text-black text-sm mb-0.5">
              Lorem Ipsum
            </strong>
            <p className="text-[13px] text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
