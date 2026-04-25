import { api } from "./api";

export const municipioService = {
  listar: async () => {
    try {
      const response = await api.get("/municipios");
      const dadosBrutos = response.data;

      // Log para você conferir no F12
      console.log("🔍 API Respondendo:", dadosBrutos);

      // Garantia: Se a API mandou um objeto com { dados: [...] }, pegamos o array.
      // Se mandou o array direto [...], usamos ele.
      return Array.isArray(dadosBrutos) ? dadosBrutos : dadosBrutos.dados || [];
    } catch (error) {
      console.error("❌ Erro no service:", error);
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
      // Usamos encode para lidar com nomes tipo "SÃO JOÃO"
      const { data } = await api.get(
        `/municipios/${encodeURIComponent(nomeMunicipio)}/evolucao`,
      );
      return data?.evolucao || [];
    } catch (error) {
      return [];
    }
  },
};
