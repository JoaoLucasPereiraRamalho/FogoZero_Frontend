import { ChevronDown, Search } from "lucide-react";

interface Municipio {
  id: number;
  municipio: string;
  lat: number;
  lon: number;
}

interface CitySelectorProps {
  municipios: Municipio[];
  municipioSelecionado: Municipio | null;
  onCityChange: (municipio: Municipio) => void;
}

export function CitySelector({
  municipios,
  municipioSelecionado,
  onCityChange,
}: CitySelectorProps) {
  const handleSelectChange = (nomeSelecionado: string) => {
    const cidade = municipios.find((m) => m.municipio === nomeSelecionado);
    if (cidade) onCityChange(cidade);
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center gap-6">
      <div className="flex-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase mb-3 block">
          Selecione a cidade para análise
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-red-100 transition-all cursor-pointer"
            value={municipioSelecionado?.municipio || ""}
            onChange={(e) => handleSelectChange(e.target.value)}
          >
            {municipios.map((m) => (
              <option key={m.id} value={m.municipio}>
                {m.municipio}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={18}
          />
        </div>
      </div>

      <div className="md:w-1/3 flex flex-col justify-center">
        <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">
          Localização
        </span>
        <p className="text-xs font-semibold text-gray-600 flex items-center gap-2">
          <Search size={14} className="text-[#bd1522]" />
          Lat: {municipioSelecionado?.lat?.toFixed(4)} | Lon:{" "}
          {municipioSelecionado?.lon?.toFixed(4)}
        </p>
      </div>
    </div>
  );
}
