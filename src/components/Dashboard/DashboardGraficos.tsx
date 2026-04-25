import { useCallback, useEffect, useState } from "react";
import {
  Loader2,
  MapIcon,
  BarChart3,
  Map as MapIcon2,
  Info,
  Activity,
} from "lucide-react";
import { municipioService } from "../../services/municipio";

interface DashboardAssets {
  municipio: string;
  grafico_mes_url: string;
  grafico_taxa_url: string;
  mapa_url: string;
}

interface DashboardGraficosProps {
  municipioSelecionado: { municipio: string } | null;
}

export function DashboardGraficos({
  municipioSelecionado,
}: DashboardGraficosProps) {
  const [assets, setAssets] = useState<DashboardAssets | null>(null);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [mapaHTML, setMapaHTML] = useState<string>("");

  const buscarAssets = useCallback(async (nome: string) => {
    try {
      setLoadingAssets(true);
      const data = await municipioService.getAssets(nome);
      setAssets(data);

      if (data.mapa_url) {
        const response = await fetch(data.mapa_url);
        const html = await response.text();
        setMapaHTML(html);
      }
    } catch (err) {
      console.error("Erro ao buscar assets:", err);
      setAssets(null);
    } finally {
      setLoadingAssets(false);
    }
  }, []);

  useEffect(() => {
    if (municipioSelecionado?.municipio) {
      buscarAssets(municipioSelecionado.municipio);
    }
  }, [municipioSelecionado, buscarAssets]);

  if (loadingAssets) {
    return (
      <div className="flex flex-col items-center justify-center p-20">
        <Loader2 className="animate-spin text-[#bd1522] mb-4" size={48} />
        <p className="text-gray-500 font-medium">
          Carregando mapas e gráficos...
        </p>
      </div>
    );
  }

  if (!municipioSelecionado)
    return (
      <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200 mx-4">
        <MapIcon className="mx-auto mb-6 text-gray-200" size={64} />
        <h3 className="text-xl font-bold text-gray-400">
          Nenhum município selecionado
        </h3>
      </div>
    );

  return (
    <section className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {assets && (
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg text-[#bd1522]">
                <MapIcon size={24} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 uppercase">
                {assets.municipio}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-gray-400">
                  <BarChart3 size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Distribuição Mensal
                  </span>
                </div>
                <img
                  src={assets.grafico_mes_url}
                  alt="Focos por mês"
                  className="w-full h-auto rounded-xl"
                />
              </div>

              <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-gray-400">
                  <Activity size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Taxa de Variação
                  </span>
                </div>
                <img
                  src={assets.grafico_taxa_url}
                  alt="Taxa de variação"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>

            <div className="bg-white p-3 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapIcon2 size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Mapa Interativo
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <Info size={12} />
                  <span>Use o scroll para zoom</span>
                </div>
              </div>
              <div className="relative w-full h-[600px] rounded-[2rem] overflow-hidden">
                <iframe
                  srcDoc={mapaHTML}
                  className="absolute inset-0 w-full h-full border-none"
                  title={`Mapa de focos de ${assets.municipio}`}
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
