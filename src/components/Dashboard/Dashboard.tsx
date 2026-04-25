import { useEffect, useState } from "react";
import {
  Flame,
  Activity,
  TreePine,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { municipioService } from "../../services/municipio";

interface Municipio {
  municipio: string;
  numero_focos?: number;
  imri?: number;
  classificacao_imri?: string;
  bioma_mais_afetado?: string;
  mes_mais_afetado?: string;
}

interface DashboardProps {
  municipioAtivo: Municipio | null;
}

export function Dashboard({ municipioAtivo }: DashboardProps) {
  const [loading, setLoading] = useState(true);

  // Busca a evolução quando o município muda
  useEffect(() => {
    if (municipioAtivo?.municipio) {
      municipioService
        .getEvolucao(municipioAtivo.municipio)
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
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
    <section className="bg-[#f8f9fa] pb-20 pt-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* CARDS COM DADOS DINÂMICOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Focos Registrados"
            value={municipioAtivo?.numero_focos?.toLocaleString() || "0"}
            description="Total acumulado"
            icon={<Flame size={18} />}
          />
          <StatCard
            label="Risco IMRI"
            value={municipioAtivo?.imri?.toFixed(2) || "0.00"}
            description={municipioAtivo?.classificacao_imri || "---"}
            icon={<Activity size={18} />}
          />
          <StatCard
            label="Bioma Principal"
            value={municipioAtivo?.bioma_mais_afetado || "---"}
            description="Vegetação predominante"
            icon={<TreePine size={18} />}
          />
          <StatCard
            label="Mês mais crítico"
            value={municipioAtivo?.mes_mais_afetado || "---"}
            description="Sazonalidade"
            icon={<AlertTriangle size={18} />}
            trend={
              (municipioAtivo?.imri ?? 0) > 100 ? "Ação Urgente" : "Estável"
            }
          />
        </div>
      </div>
    </section>
  );
}
