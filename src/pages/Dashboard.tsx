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
import { biomaService } from "../services/bioma";

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
  const [anoFiltro, setAnoFiltro] = useState(2026);
  const [anosDisponiveis, setAnosDisponiveis] = useState<number[]>([2026]);
  const [biomaFoco, setBiomaFoco] = useState<string>("");
  // ID real do bioma vem do backend via onBiomaChange do EvolucaoMensalBioma.
  // Iniciamos com 1 (primeiro bioma da lista) como placeholder seguro.
  const [biomaFocoId, setBiomaFocoId] = useState<number>(1);

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

  // Carrega anos disponíveis a partir do backend
  useEffect(() => {
    async function carregarAnos() {
      try {
        const { anos } = await biomaService.getAnosDisponiveis();
        if (anos && anos.length > 0) {
          setAnosDisponiveis(anos);
          // Se o ano padrão não estiver disponível, usa o mais recente.
          if (!anos.includes(anoFiltro)) {
            setAnoFiltro(anos[0]);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar anos disponíveis:", err);
      }
    }
    carregarAnos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sincroniza apenas o nome do bioma quando o município muda.
  // O ID real é atualizado via onBiomaChange do EvolucaoMensalBioma
  // (que carrega a lista verdadeira de biomas do backend).
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
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header />
      <main className="flex-grow">
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
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
                <h2 className="text-2xl font-black">Biomas em Minas Gerais</h2>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="ano-bioma"
                    className="text-[10px] font-bold uppercase tracking-widest text-gray-500"
                  >
                    Ano de referência
                  </label>
                  <select
                    id="ano-bioma"
                    value={anoFiltro}
                    onChange={(e) => setAnoFiltro(Number(e.target.value))}
                    className="appearance-none bg-white border border-gray-200 px-4 py-2 rounded-xl font-bold text-xs outline-none focus:ring-2 focus:ring-red-100 transition-all cursor-pointer"
                  >
                    {anosDisponiveis.map((ano) => (
                      <option key={ano} value={ano}>
                        {ano}
                      </option>
                    ))}
                  </select>
                </div>
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

                <EvolucaoMensalBioma
                  id={biomaFocoId}
                  ano={anoFiltro}
                  onBiomaChange={({ id, descricao }) => {
                    setBiomaFocoId(id);
                    setBiomaFoco(descricao);
                  }}
                />
              </div>

              {/* Estatísticas */}
              <div className="lg:col-span-1">
                <EstatisticasBioma id={biomaFocoId} ano={anoFiltro} />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
