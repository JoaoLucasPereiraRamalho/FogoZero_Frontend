import { useState, useEffect } from "react";
import {
  registrarMonitoramento,
  listarMonitoramentos,
  deletarMonitoramento,
} from "../../services/monitoramento";
import { municipioService } from "../../services/municipio";
import { getLoggedUser } from "../../utils/auth";
import { Loader2, MapPin } from "lucide-react";

export function CityAlertsManager() {
  const [monitoramentos, setMonitoramentos] = useState<any[]>([]);
  const [municipiosDisponiveis, setMunicipiosDisponiveis] = useState<string[]>(
    [],
  );
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const user = getLoggedUser();

  // Carrega monitoramentos e municípios disponíveis
  useEffect(() => {
    if (user?.id) {
      carregarDados();
    }
  }, [user?.id]);

  const carregarDados = async () => {
    try {
      setFetching(true);
      const [dados, municipios] = await Promise.all([
        listarMonitoramentos(user.id),
        municipioService.listar(),
      ]);

      setMonitoramentos(dados);

      const nomesMunicipios = (municipios || [])
        .map((m: any) => m.municipio)
        .filter(Boolean)
        .sort((a: string, b: string) => a.localeCompare(b));
      setMunicipiosDisponiveis(nomesMunicipios);
    } catch (err: any) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleAdd = async () => {
    if (!cidadeSelecionada || !user) return;

    setLoading(true);
    try {
      await registrarMonitoramento({
        cidade: cidadeSelecionada,
        estado: "MG",
        usuarioId: user.id,
        notificar: true,
      });

      setCidadeSelecionada("");
      await carregarDados(); // Recarrega lista do banco
    } catch (err: any) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: number) => {
    if (!window.confirm("Deseja parar de monitorar esta cidade?")) return;

    try {
      await deletarMonitoramento(id);
      // Filtra localmente para resposta instantânea na UI
      setMonitoramentos((prev) => prev.filter((m) => m.id !== id));
    } catch (err: any) {
      alert(err);
    }
  };

  const cidadesJaMonitoradas = new Set(
    monitoramentos.map((m) => (m.cidade || "").toLowerCase()),
  );
  const opcoesCidade = municipiosDisponiveis.filter(
    (cidade) => !cidadesJaMonitoradas.has(cidade.toLowerCase()),
  );

  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm h-full">
      <h3 className="text-lg font-bold text-black mb-1">
        Alertas por município
      </h3>
      <p className="text-[11px] text-gray-500 mb-6 leading-tight">
        Escolha as cidades que deseja acompanhar para o monitoramento FogoZero.
      </p>

      <div className="flex flex-col gap-2 mb-8">
        <select
          value={cidadeSelecionada}
          onChange={(e) => setCidadeSelecionada(e.target.value)}
          className="w-full p-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 outline-none"
        >
          <option value="">Selecione uma cidade...</option>
          {opcoesCidade.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          onClick={handleAdd}
          disabled={loading || !cidadeSelecionada}
          className="self-end bg-[#bd1522] text-white px-6 py-2 rounded-lg font-bold text-xs uppercase disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <Loader2 size={12} className="animate-spin" />}
          Adicionar município
        </button>
      </div>

      <div className="border border-gray-100 rounded-xl p-4">
        <h4 className="text-sm font-bold mb-1">Cidades monitoradas</h4>

        {fetching ? (
          <div className="flex justify-center py-4">
            <Loader2 className="animate-spin text-gray-400" size={20} />
          </div>
        ) : (
          <div className="space-y-3 mt-4">
            {monitoramentos.length === 0 && (
              <p className="text-[10px] text-gray-400 italic">
                Nenhuma cidade monitorada no momento.
              </p>
            )}

            {monitoramentos.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between text-[11px] pb-2 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-red-700" />
                  <span className="font-medium text-gray-600">{m.cidade}</span>
                </div>
                <div className="flex gap-2">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[9px] font-bold">
                    {m.notificar ? "ATIVO" : "OFF"}
                  </span>
                  <button
                    onClick={() => handleRemove(m.id)}
                    className="bg-gray-800 text-white px-3 py-1 rounded text-[10px] font-bold hover:bg-black"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
