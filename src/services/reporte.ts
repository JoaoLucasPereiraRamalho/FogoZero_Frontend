import axios from "axios";
import type { LoginResponse } from "../types/auth";
import { getAuthToken } from "../utils/auth";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});


export interface ReporteData {
  id_regiao: number;
  titulo: string;
  assunto: string;
  latitude?: number;
  longitude?: number;
}

export const criarReporte = async (dados: ReporteData) => {
  const token = getAuthToken();
  
  // Configuração da requisição
  const config = {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  };

  try {
    // O axios aceita a config como terceiro parâmetro no POST
    const { data } = await api.post("/reportes", dados, config);
    return data;
  } catch (error: any) {
    throw error.response?.data?.error || "Erro ao enviar reporte";
  }

};

export const listarReportesPorUsuario = async (usuarioId: number): Promise<any[]> => {
  try {
    const { data } = await api.get(`/reportes/usuario/${usuarioId}`);

    // Se o backend retornar a lista direto: data
    // Se o backend retornar um objeto: data.reportes ou data.data
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.reportes)) return data.reportes;
    if (data && Array.isArray(data.data)) return data.data;

    return []; // Retorna array vazio se não encontrar a lista
  } catch (error: any) {
    console.error("Erro no service de reporte:", error);
    return []; // Retorna array vazio para não quebrar o .map() no componente
  }
};

export const criarPrimeiroReporte = async (dados: PrimeiroReporteData) => {
  try {
    const { data } = await api.post("/reportes/primeiro", dados);
    return data;
  } catch (error: any) {
    throw error.response?.data?.error || "Erro ao realizar cadastro e reporte";
  }
};

