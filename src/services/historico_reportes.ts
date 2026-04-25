import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});


export const listarReportesPorUsuario = async (usuarioId: number) => {
  try {
    // A rota deve ser exatamente /reportes/usuario/ID conforme seu router
    const { data } = await api.get(`/reportes/usuario/${usuarioId}`);
    return data;
  } catch (error: any) {
    throw error.response?.data?.mensagem || "Erro ao carregar histórico de reportes";
  }
};

// Função caso precise pegar detalhes de um reporte específico
export const buscarReportePorId = async (id: number) => {
  try {
    const { data } = await api.get(`/reportes/${id}`);
    return data;
  } catch (error: any) {
    throw error.response?.data?.mensagem || "Erro ao carregar detalhes do reporte";
  }
};