export function HeatMapSection() {
  return (
    <div className="mt-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="w-2 h-6 bg-green-500 rounded-full"></span> Mapa de
            Calor
          </h3>
        </div>
        <div className="flex gap-4">
          <select className="border rounded-lg px-4 py-2 text-xs text-gray-500 outline-none">
            <option>Selecione a região</option>
          </select>
          <button
            type="button"
            disabled
            title="Filtro em breve"
            className="bg-[#bd1522] text-white px-4 py-2 rounded-lg text-xs font-bold cursor-not-allowed opacity-70"
          >
            Período
          </button>
        </div>
      </div>

      {/* Área do Mapa */}
      <div className="w-full h-100 bg-gray-100 rounded-2xl overflow-hidden relative">
        <img
          src="https://maps.googleapis.com/maps/api/staticmap?center=-21.2485,-44.9961&zoom=13&size=1200x400&key=YOUR_KEY"
          alt="Mapa de Lavras"
          className="w-full h-full object-cover"
        />
        {/* Overlay de legenda do mapa */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border shadow-sm flex gap-4 text-[10px] font-bold">
          <span className="flex items-center gap-1">
            <i className="w-2 h-2 bg-red-500 rounded-full"></i> Crítico
          </span>
          <span className="flex items-center gap-1">
            <i className="w-2 h-2 bg-orange-400 rounded-full"></i> Médio
          </span>
          <span className="flex items-center gap-1">
            <i className="w-2 h-2 bg-blue-400 rounded-full"></i> Estável
          </span>
        </div>
      </div>
    </div>
  );
}
