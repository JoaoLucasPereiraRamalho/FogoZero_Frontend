import { Carrossel } from "./Carrossel";

export function HeroCarousel() {
  return (
    <section className="pt-12 pb-16">
      {/* Textos de Introdução */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <h1 className="text-[2.5rem] font-extrabold text-black leading-tight mb-4 max-w-3xl">
          Entenda, previna e ajude a combater incêndios na sua região!
        </h1>
        <p className="text-gray-700 text-sm mb-6 max-w-4xl">
          No FogoZero MG, você encontra dados atualizados, orientações de
          prevenção e ferramentas que permitem acompanhar a situação das
          queimadas e contribuir diretamente com a proteção do meio ambiente e
          da sua comunidade.
        </p>
        <p className="text-black font-bold text-lg max-w-4xl">
          Acompanhe a situação das queimadas, receba alertas personalizados e
          reporte incêndios diretamente pela plataforma.
        </p>
      </div>

      <Carrossel />
    </section>
  );
}
