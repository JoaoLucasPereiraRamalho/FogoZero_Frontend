import { api } from "./api";
import { extractApiError } from "../utils/errors";

export const listarReportesPorUsuario = async (usuarioId: number) => {
  try {
    const { data } = await api.get(`/reportes/usuario/${usuarioId}`);
    return data;
  } catch (error) {
    throw extractApiError(error, "Erro ao carregar histórico de reportes");
  }
};

export const buscarReportePorId = async (id: number) => {
  try {
    const { data } = await api.get(`/reportes/${id}`);
    return data;
  } catch (error) {
    throw extractApiError(error, "Erro ao carregar detalhes do reporte");
  }
};
