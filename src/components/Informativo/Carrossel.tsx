import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image: "/public/carrossel.png",
  },

  {
    id: 2,
    image: "/public/carrossel2.png", // Substitua pela sua imagem local
  },

  {
    id: 3,
    image: "/public/carrossel.png", // Substitua pela sua imagem local
  },
  // Adicione mais slides aqui se quiser que ele gire
];

export function Carrossel() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl group">
        {/* Container dos Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {SLIDES.map((slide) => (
            <div key={slide.id} className="min-w-full relative h-[550px]">
              {/* Imagem de Fundo */}
              <img
                src={slide.image}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Background"
              />

              {/* Overlay Gradiente (O segredo do visual) */}
              <div className="absolute inset-0 from-[#bd1522]/90 via-[#bd1522]/40 to-transparent flex items-center">
                {/* Conteúdo do Texto */}
                <div className="max-w-2xl ml-12 lg:ml-20 text-white">
                  {/* Grid de Badges */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão de Navegação Direita (igual ao da imagem) */}
        <button
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#bd1522] transition-all opacity-0 group-hover:opacity-100 shadow-xl"
          onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)}
        >
          <ChevronRight size={24} strokeWidth={3} />
        </button>
      </div>
    </section>
  );
}
