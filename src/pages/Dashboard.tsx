import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { Header } from "../components/Header";
import { DashboardGraficos } from "../components/Dashboard/DashboardGraficos";
import { CitySelector } from "../components/Dashboard/CitySelector";
import { municipioService } from "../services/municipio";
import { Footer } from "../components/Footer/Footer";
import { DistribuicaoBiomas } from "../components/Biomas/DistribuicaoBiomas";
import { EvolucaoMensalBioma } from "../components/Biomas/EvolucaoMensalBioma";
import { EstatisticasBioma } from "../components/Biomas/EstatisticasBioma";

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
  const [anoFiltro] = useState(2026);
  const [biomaFoco, setBiomaFoco] = useState<string>("");

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
          const primeiraCity = listaOrdenada[0];
          setMunicipioAtivo(primeiraCity);
          setBiomaFoco(primeiraCity.bioma_mais_afetado || "Cerrado");
        }
      } catch (err) {
        console.error("Erro ao carregar lista de cidades:", err);
      } finally {
        setLoading(false);
      }
    }
    carregarCidades();
  }, []);

  // Sincroniza o bioma quando o município muda
  useEffect(() => {
    if (municipioAtivo?.bioma_mais_afetado) {
      setBiomaFoco(municipioAtivo.bioma_mais_afetado);
    }
  }, [municipioAtivo]);

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

      {/* Seção de Biomas */}
      <div className="px-6 pt-12">
        <div className="max-w-7xl mx-auto">
          <section className="mb-12">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-black">Biomas em Minas Gerais</h2>
              <p className="text-sm text-gray-500 font-medium">
                Dados consolidados de {anoFiltro}
              </p>
            </div>

            <DistribuicaoBiomas ano={anoFiltro} />
          </section>

          {/* Análise Detalhada do Bioma Específico */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Gráfico de Evolução */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-lg font-black italic uppercase">
                    Evolução Mensal
                  </h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                    Bioma: {biomaFoco || "Município"}
                  </p>
                </div>
              </div>

              <EvolucaoMensalBioma id={biomaFoco || "1"} ano={anoFiltro} />
            </div>

            {/* Estatísticas */}
            <div className="lg:col-span-1">
              <EstatisticasBioma id={biomaFoco || "1"} ano={anoFiltro} />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
