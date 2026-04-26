import { useEffect, useMemo, useState } from "react";
import { listarReportesPorUsuario } from "../../services/reporte";
import { getLoggedUser } from "../../utils/auth";
import { Loader2 } from "lucide-react";

interface ReporteItem {
  id: number;
  tipo: string;
  data: string;
}

export function ReportsTable() {
  const [reportes, setReportes] = useState<ReporteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const user = getLoggedUser();
  const userId = useMemo(() => {
    const rawId = user?.id ?? user?.id_usuario ?? user?.usuario_id;
    const id = Number(rawId);
    return Number.isFinite(id) ? id : null;
  }, [user]);

  useEffect(() => {
    if (userId) {
      carregarReportes();
    } else {
      setLoading(false);
      setReportes([]);
    }
  }, [userId]);

  const normalizarReporte = (item: any): ReporteItem => {
    const id = Number(item?.id ?? item?.id_reporte ?? item?.reporte_id ?? 0);
    const tipo = item?.tipo || item?.titulo || "Foco de Incêndio";
    const data = item?.createdAt || item?.created_at || item?.data || "";
    return { id, tipo, data };
  };

  const carregarReportes = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const dados = await listarReportesPorUsuario(userId);
      const listaNormalizada = (dados as any[]).map(normalizarReporte);
      setReportes(listaNormalizada);
    } catch (err) {
      console.error("Erro ao carregar reportes:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-4xl font-extrabold mb-2 text-black">Seus reportes</h2>
      <p className="text-gray-500 text-sm mb-8">
        Cada reporte contribui para o monitoramento das queimadas. Aqui você
        pode acompanhar todos os registros que já enviou.
      </p>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
        <div className="mb-6">
          <h4 className="font-bold text-gray-800">Reportes enviados</h4>
          <p className="text-[11px] text-gray-400">
            Acompanhe o status e os detalhes dos seus envios abaixo.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-[#bd1522]" size={32} />
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm font-bold text-gray-800 border-b border-gray-100">
                <th className="pb-4">Reporte</th>
                <th className="pb-4">Tipo de Reporte</th>
                <th className="pb-4">Data</th>
                <th className="pb-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-600">
              {reportes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400 italic">
                    Nenhum reporte encontrado.
                  </td>
                </tr>
              ) : (
                reportes.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-medium">#{String(r.id).padStart(2, '0')}</td>
                    <td className="py-4">
                      {r.tipo}
                    </td>
                    <td className="py-4">
                      {r.data
                        ? new Date(r.data).toLocaleDateString("pt-BR")
                        : "-"}
                    </td>
                    <td className="py-4 text-right">
                      <button className="bg-[#bd1522] text-white px-4 py-1.5 rounded-lg text-[11px] font-bold hover:bg-red-800 transition-all">
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}