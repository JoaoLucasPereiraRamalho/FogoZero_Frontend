import { useEffect, useState } from "react";
import { biomaService } from "../../services/bioma";
import { TreePine, Loader2, TrendingUp } from "lucide-react";

interface BiomData {
  id: number;
  descricao: string;
  total_regioes: number;
}

interface DistribuicaoResponse {
  biomas: BiomData[];
}

export function DistribuicaoBiomas({ ano }: { ano: number }) {
  const [dados, setDados] = useState<BiomData[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDistribuicao() {
      try {
        setLoading(true);
        setErro(null);
        const response: DistribuicaoResponse =
          await biomaService.getDistribuicao(ano);
        // Extrai o array de biomas
        setDados(response.biomas || []);
      } catch (err) {
        console.error("Erro ao carregar distribuição de biomas:", err);
        setErro("Erro ao carregar dados dos biomas");
      } finally {
        setLoading(false);
      }
    }
    carregarDistribuicao();
  }, [ano]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="text-center">
          <Loader2 className="animate-spin text-[#bd1522] mx-auto mb-2" />
          <p className="text-sm text-gray-500">
            Carregando dados dos biomas...
          </p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-[2rem] border border-red-200">
        <p className="text-red-600 font-medium">{erro}</p>
      </div>
    );
  }

  if (dados.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-[2rem] border border-gray-200">
        <p className="text-gray-500 font-medium">
          Nenhum dado disponível para {ano}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {dados.map((item) => (
        <div
          key={item.id}
          className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <TreePine size={20} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-blue-500">
              <TrendingUp size={14} />
              {item.total_regioes}
            </span>
          </div>
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {item.descricao}
          </h4>
          <p className="text-2xl font-black text-gray-900">
            {item.total_regioes}
          </p>
          <p className="text-[10px] text-gray-400 font-medium mt-1">
            Regiões em Minas Gerais
          </p>
        </div>
      ))}
    </div>
  );
}
