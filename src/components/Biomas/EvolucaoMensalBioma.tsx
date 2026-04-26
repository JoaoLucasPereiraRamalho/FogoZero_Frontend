import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { biomaService } from "../../services/bioma";
import { Loader2, TrendingUp, ChevronDown, TreePine } from "lucide-react";

// --- Interfaces ---
interface DadosMes {
  mes: number;
  mes_nome: string;
  total_focos: number;
}

interface BiomaLista {
  id: number;
  descricao: string;
  total_regioes: number;
}

interface DistribuicaoResponse {
  biomas: BiomaLista[];
}

interface EvolucaoResponse {
  bioma: { id: number; descricao: string };
  ano: number;
  evolucao: DadosMes[];
}

interface Props {
  id: string | number;
  ano: number;
  onBiomaChange?: (bioma: { id: number; descricao: string }) => void;
}

const getBiomaId = (id: string | number, biomas: BiomaLista[]) => {
  if (typeof id === "number") return id;
  if (!isNaN(Number(id))) return Number(id);
  const encontrado = biomas.find((bioma) => bioma.descricao === id);
  return encontrado?.id || biomas[0]?.id || 1;
};

export function EvolucaoMensalBioma({ id, ano, onBiomaChange }: Props) {
  // Estados
  const [biomasDisponiveis, setBiomasDisponiveis] = useState<BiomaLista[]>([]);
  const [biomaAtivoId, setBiomaAtivoId] = useState<number | null>(null);
  const [dadosGrafico, setDadosGrafico] = useState<
    { name: string; focos: number }[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [loadingGrafico, setLoadingGrafico] = useState(false);
  const [, setErro] = useState<string | null>(null);

  // 1. CARGA INICIAL: Busca a lista de biomas existentes na API
  useEffect(() => {
    async function carregarListaBiomas() {
      try {
        setLoading(true);
        // Usamos o endpoint de distribuição para saber quais biomas existem
        const distribuicao: DistribuicaoResponse =
          await biomaService.getDistribuicao(ano);

        const listaBiomas = distribuicao?.biomas || [];
        if (listaBiomas.length > 0) {
          setBiomasDisponiveis(listaBiomas);
          const idInicial = getBiomaId(id, listaBiomas);
          setBiomaAtivoId(idInicial);
          const biomaInicial = listaBiomas.find(
            (bioma) => bioma.id === idInicial,
          );
          if (biomaInicial && onBiomaChange) {
            onBiomaChange({
              id: biomaInicial.id,
              descricao: biomaInicial.descricao,
            });
          }
        }
      } catch (err) {
        console.error("Erro ao carregar lista de biomas:", err);
        setErro("Erro ao sincronizar biomas.");
      } finally {
        setLoading(false);
      }
    }
    carregarListaBiomas();
  }, [ano, id, onBiomaChange]);

  // 2. REAÇÃO À ESCOLHA: Busca a evolução sempre que o biomaAtivo mudar
  useEffect(() => {
    async function carregarEvolucao() {
      if (!biomaAtivoId) return;

      try {
        setLoadingGrafico(true);
        const resposta: EvolucaoResponse = await biomaService.getEvolucaoMensal(
          biomaAtivoId,
          ano,
        );

        if (resposta && resposta.evolucao) {
          const formatados = resposta.evolucao.map((item) => ({
            name: item.mes_nome,
            focos: item.total_focos,
          }));
          setDadosGrafico(formatados);
        }
      } catch (err) {
        console.error("Erro ao carregar gráfico:", err);
      } finally {
        setLoadingGrafico(false);
      }
    }

    carregarEvolucao();
  }, [biomaAtivoId, ano]);

  if (loading)
    return (
      <div className="h-112.5 flex items-center justify-center bg-white rounded-[2.5rem] border border-gray-100">
        <Loader2 className="animate-spin text-[#bd1522]" size={32} />
      </div>
    );

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm w-full">
      {/* Header com Select Dinâmico */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-black italic uppercase text-gray-900 flex items-center gap-2">
            <TreePine className="text-[#bd1522]" size={20} />
            Análise por Bioma
          </h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Série histórica mensal em {ano}
          </p>
        </div>

        {/* Select populado pela API */}
        <div className="relative min-w-55">
          <select
            value={biomaAtivoId ?? ""}
            onChange={(e) => {
              const novoId = Number(e.target.value);
              setBiomaAtivoId(novoId);
              const biomaSelecionado = biomasDisponiveis.find(
                (bioma) => bioma.id === novoId,
              );
              if (biomaSelecionado && onBiomaChange) {
                onBiomaChange({
                  id: biomaSelecionado.id,
                  descricao: biomaSelecionado.descricao,
                });
              }
            }}
            className="w-full appearance-none bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl font-bold text-xs outline-none focus:ring-2 focus:ring-red-100 transition-all cursor-pointer pr-10"
          >
            {biomasDisponiveis.map((bioma) => (
              <option key={bioma.id} value={bioma.id}>
                {bioma.descricao}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      {/* Área do Gráfico */}
      <div className="h-87.5 w-full relative">
        {loadingGrafico && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40 z-10 backdrop-blur-[1px]">
            <Loader2 className="animate-spin text-[#bd1522]" size={32} />
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dadosGrafico}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorFocosBioma" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#bd1522" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#bd1522" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: "bold" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              }}
              formatter={(val) => [(val as number).toLocaleString(), "Focos"]}
            />
            <Area
              type="monotone"
              dataKey="focos"
              stroke="#bd1522"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorFocosBioma)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-50">
        <TrendingUp size={14} className="text-gray-400" />
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Fonte: Monitoramento FogoZero MG
        </span>
      </div>
    </div>
  );
}
