export const GraficoTaxa = ({ url }: { url: string }) => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
    <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">
      Taxa de Variação
    </h3>
    <img src={url} alt="Gráfico de Taxa" className="w-full h-auto rounded-xl" />
  </div>
);
