import { api } from "./api";
import { extractApiError } from "../utils/errors";

export interface MonitoramentoDTO {
  cidade: string;
  estado?: string;
  usuarioId: number;
  notificar?: boolean;
}

export const registrarMonitoramento = async (dados: MonitoramentoDTO) => {
  try {
    const { data } = await api.post("/monitoramentos", dados);
    return data;
  } catch (error) {
    throw extractApiError(error, "Erro ao registrar monitoramento");
  }
};

export const listarMonitoramentos = async (usuarioId: number) => {
  try {
    const { data } = await api.get(`/monitoramentos?usuarioId=${usuarioId}`);
    return data;
  } catch (error) {
    throw extractApiError(error, "Erro ao carregar lista");
  }
};

export const deletarMonitoramento = async (id: number) => {
  try {
    await api.delete(`/monitoramentos/${id}`);
  } catch (error) {
    throw extractApiError(error, "Erro ao deletar");
  }
};
