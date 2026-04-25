import { api } from "./api";

export const biomaService = {
  // GET /api/biomas/distribuicao?ano=2026
  getDistribuicao: async (ano: number) => {
    const { data } = await api.get(`/biomas/distribuicao`, { params: { ano } });
    return data;
  },

  // GET /api/biomas/:id/evolucao-mensal?ano=2026
  getEvolucaoMensal: async (id: number, ano: number) => {
    const { data } = await api.get(`/biomas/${id}/evolucao-mensal?ano=${ano}`);
    return data; // O retorno é [{ mes: 1, quantidade: 2 }, ...]
  },

  // GET /api/biomas/:id/estatisticas?ano=2026
  getEstatisticas: async (id: number, ano: number) => {
    const { data } = await api.get(`/biomas/${id}/estatisticas`, {
      params: { ano },
    });
    return data;
  },
};
