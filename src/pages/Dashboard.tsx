import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { Header } from "../components/Header";
import { DashboardGraficos } from "../components/Dashboard/DashboardGraficos";
import { CitySelector } from "../components/Dashboard/CitySelector";
import { municipioService } from "../services/municipio";

interface Municipio {
  id: number;
  municipio: string;
  lat: number;
  lon: number;
  numero_focos?: number;
  imri?: number;
  classificacao_imri?: string;
  bioma_mais_afetado?: string;
  mes_mais_afetado?: string;
}

export function DashboardPage() {
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [municipioAtivo, setMunicipioAtivo] = useState<Municipio | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega todos os municípios na inicialização
  useEffect(() => {
    async function carregarCidades() {
      try {
        setLoading(true);
        const resposta = await municipioService.listar();

        // Ordena alfabeticamente
        const listaOrdenada = [...resposta].sort((a, b) =>
          a.municipio.localeCompare(b.municipio),
        );

        setMunicipios(listaOrdenada);

        // Define a primeira cidade como padrão
        if (listaOrdenada.length > 0) {
          setMunicipioAtivo(listaOrdenada[0]);
        }
      } catch (err) {
        console.error("Erro ao carregar lista de cidades:", err);
      } finally {
        setLoading(false);
      }
    }
    carregarCidades();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#f8f9fa]">
        <Loader2 className="animate-spin text-[#bd1522] mb-4" size={40} />
        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">
          Sincronizando dados de Minas Gerais...
        </p>
      </div>
    );

  return (
    <main className="min-h-screen bg-[#f8f9fa] pb-20">
      <Header />

      {/* Seção com Cabeçalho e Seletor de Cidade Unificado */}
      <div className="pt-12 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-black text-black mb-2">
              Monitoramento FogoZero
            </h1>
            <p className="text-gray-500 text-sm">
              Dados consolidados de {municipios.length} municípios mineiros.
            </p>
          </header>

          {/* INPUT UNIFICADO */}
          <div className="mb-12">
            <CitySelector
              municipios={municipios}
              municipioSelecionado={municipioAtivo}
              onCityChange={setMunicipioAtivo}
            />
          </div>
        </div>
      </div>

      {/* Dashboard com Cards */}
      <Dashboard municipioAtivo={municipioAtivo} />

      {/* Seção com Gráficos e Mapas */}
      <DashboardGraficos municipioSelecionado={municipioAtivo} />
    </main>
  );
}
