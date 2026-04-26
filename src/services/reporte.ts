import { api } from "./api";
import { getAuthToken } from "../utils/auth";

export interface ReporteData {
  id_regiao: number;
  titulo: string;
  assunto: string;
  latitude: number;
  longitude: number;
  imagem_url: string;
}

export interface PrimeiroReporteData {
  usuario: {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    id_regiao: number;
  };
  reporte: {
    titulo: string;
    assunto: string;
    latitude?: number;
    longitude?: number;
    imagem_url?: string;
  };
}

export const criarReporte = async (dados: ReporteData) => {
  const token = getAuthToken();
  const payload: ReporteData = {
    id_regiao: dados.id_regiao,
    titulo: (dados.titulo || "").trim(),
    assunto: (dados.assunto || "").trim(),
    latitude: Number(dados.latitude),
    longitude: Number(dados.longitude),
    imagem_url: (dados.imagem_url || "").trim(),
  };

  if (!payload.assunto) throw new Error("Assunto é obrigatório.");
  if (!Number.isFinite(payload.latitude)) throw new Error("Latitude inválida.");
  if (!Number.isFinite(payload.longitude)) throw new Error("Longitude inválida.");
  if (!payload.imagem_url) throw new Error("Imagem é obrigatória.");
  
  // Configuração da requisição
  const config = {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };

  try {
    const { data } = await api.post("/reportes", payload, config);
    return data;
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: { error?: string; mensagem?: string } };
    };
    throw (
      err.response?.data?.error ||
      err.response?.data?.mensagem ||
      "Erro ao enviar reporte"
    );
  }
};

export const listarReportesPorUsuario = async (
  usuarioId: number,
): Promise<unknown[]> => {
  try {
    const { data } = await api.get(`/reportes/usuario/${usuarioId}`);

    // Se o backend retornar a lista direto: data
    // Se o backend retornar um objeto: data.reportes, data.data ou data.dados
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.reportes)) return data.reportes;
    if (data && Array.isArray(data.data)) return data.data;
    if (data && Array.isArray(data.dados)) return data.dados;

    return []; // Retorna array vazio se não encontrar a lista
  } catch (error: unknown) {
    console.error("Erro no service de reporte:", error);
    return []; // Retorna array vazio para não quebrar o .map() no componente
  }
};

export const criarPrimeiroReporte = async (dados: PrimeiroReporteData) => {
  try {
    const { data } = await api.post("/reportes/primeiro", dados);
    return data;
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: { error?: string; mensagem?: string } };
    };
    throw (
      err.response?.data?.error ||
      err.response?.data?.mensagem ||
      "Erro ao realizar cadastro e reporte"
    );
  }
};

