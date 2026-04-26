import { api } from "./api";

export const municipioService = {
  listar: async () => {
    try {
      const response = await api.get("/municipios");
      const dadosBrutos = response.data;

      return Array.isArray(dadosBrutos) ? dadosBrutos : dadosBrutos.dados || [];
    } catch (error) {
      console.error("Erro ao listar municípios:", error);
      return [];
    }
  },

  getAssets: async (nome: string) => {
    const { data } = await api.get(
      `/graficos/${encodeURIComponent(nome)}/assets`,
    );
    return data;
  },

  getEvolucao: async (nomeMunicipio: string) => {
    try {
      const { data } = await api.get(
        `/municipios/${encodeURIComponent(nomeMunicipio)}/evolucao`,
      );
      return data?.evolucao || [];
    } catch (error) {
      return [];
    }
  },
};
