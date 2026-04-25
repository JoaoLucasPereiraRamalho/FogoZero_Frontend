import { useEffect, useState } from "react";
import { biomaService } from "../../services/bioma";
import {
  AlertCircle,
  Calendar,
  Flame,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// --- Interfaces (Mapeando exatamente o seu JSON) ---
interface Bioma {
  id: number;
  descricao: string;
}

interface Registro {
  mes: string;
  total_focos: number;
}

interface EstatisticasData {
  bioma: Bioma;
  ano: number;
  maior_registro: Registro;
  menor_registro: Registro;
  tendencia: "crescimento" | "queda" | "estável" | "estavel";
}

interface Props {
  id: string | number; // Recebe o nome do bioma (ex: "Cerrado") ou o ID ("1")
  ano: number;
}

// --- Dicionário de Conversão (De-Para) ---
// IMPORTANTE: Atualize estes números com os IDs reais da sua tabela de biomas no banco!
const BIOMAS_MAP: Record<string, number> = {
  Município: 1,
  Amazônia: 2,
  Caatinga: 3,
  Cerrado: 4,
  "Mata Atlântica": 5,
  Pampa: 6,
  Pantanal: 7,
};

export function EstatisticasBioma({ id, ano }: Props) {
  const [stats, setStats] = useState<EstatisticasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarStats() {
      if (!id) return;

      try {
        setLoading(true);
        setErro(null);

        // 1. Lógica de Conversão Robusta para o Backend
        let idNumerico: number;

        if (typeof id === "number") {
          idNumerico = id; // Já é número
        } else if (!isNaN(Number(id))) {
          idNumerico = Number(id); // É uma string numérica (ex: "1")
        } else {
          idNumerico = BIOMAS_MAP[id] || 1; // É um nome (ex: "Cerrado"). Fallback para 1.
        }

        // 2. Chamada à API enviando um Inteiro
        const dados = await biomaService.getEstatisticas(idNumerico, ano);

        if (dados && dados.maior_registro) {
          setStats(dados);
        } else {
          throw new Error("Formato inválido retornado pela API");
        }
      } catch (err: any) {
        console.error(
          `Erro ao buscar estatísticas:`,
          err.response?.data || err.message,
        );
        setErro("Não foi possível carregar as estatísticas.");
      } finally {
        setLoading(false);
      }
    }

    carregarStats();
  }, [id, ano]);

  // --- Telas de Estado (Carregamento / Erro) ---
  if (loading) {
    return (
      <div className="bg-[#1a1a1a] text-white p-6 rounded-[2rem] h-full flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <Flame
            className="animate-pulse text-[#bd1522] mx-auto mb-2"
            size={32}
          />
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
            Analisando dados...
          </p>
        </div>
      </div>
    );
  }

  if (erro || !stats) {
    return (
      <div className="bg-[#1a1a1a] text-white p-6 rounded-[2rem] h-full flex items-center justify-center min-h-[300px] border border-red-900/30">
        <p className="text-xs text-gray-400 text-center font-medium px-4">
          {erro || "Sem estatísticas disponíveis para este período."}
        </p>
      </div>
    );
  }

  // --- Funções Auxiliares Visuais ---
  const getTendenciaIcon = (tendencia: string) => {
    const t = tendencia.toLowerCase();
    if (t === "crescimento")
      return <TrendingUp className="text-[#bd1522]" size={18} />;
    if (t === "queda")
      return <TrendingDown className="text-green-500" size={18} />;
    return <AlertCircle className="text-yellow-500" size={18} />;
  };

  const getTendenciaColor = (tendencia: string) => {
    const t = tendencia.toLowerCase();
    if (t === "crescimento") return "text-[#bd1522]";
    if (t === "queda") return "text-green-500";
    return "text-yellow-500";
  };

  return (
    <div className="bg-[#1a1a1a] text-white p-6 rounded-[2rem] flex flex-col justify-between h-full min-h-[350px]">
      <div>
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">
          Análise de Tendência
        </h4>

        <div className="space-y-5">
          {/* Maior Registro */}
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 transition-colors hover:bg-white/10">
            <div className="p-2 bg-[#bd1522]/20 rounded-lg">
              <Flame className="text-[#bd1522]" size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                Pico de Focos
              </p>
              <p className="font-black text-lg">
                {stats.maior_registro.total_focos.toLocaleString()}{" "}
                <span className="text-xs font-normal text-gray-400">focos</span>
              </p>
              <p className="text-[11px] text-[#bd1522] font-bold">
                {stats.maior_registro.mes}
              </p>
            </div>
          </div>

          {/* Menor Registro */}
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 transition-colors hover:bg-white/10">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Calendar className="text-yellow-500" size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                Menor Registro
              </p>
              <p className="font-black text-lg">
                {stats.menor_registro.total_focos.toLocaleString()}{" "}
                <span className="text-xs font-normal text-gray-400">focos</span>
              </p>
              <p className="text-[11px] text-yellow-500 font-bold">
                {stats.menor_registro.mes}
              </p>
            </div>
          </div>

          {/* Tendência */}
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 transition-colors hover:bg-white/10">
            <div className="p-2 bg-white/10 rounded-lg">
              {getTendenciaIcon(stats.tendencia)}
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                Tendência Geral
              </p>
              <p
                className={`font-black text-sm uppercase tracking-wide mt-1 ${getTendenciaColor(stats.tendencia)}`}
              >
                {stats.tendencia}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-2">
        <AlertCircle size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-[10px] text-gray-400 leading-relaxed">
          Dados extraídos no ano de <strong>{stats.ano}</strong> referentes à
          área de influência classificada como{" "}
          <strong>{stats.bioma.descricao}</strong>.
        </p>
      </div>
    </div>
  );
}
