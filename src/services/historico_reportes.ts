import axios from "axios";
import { extractApiError } from "../utils/errors";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

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
