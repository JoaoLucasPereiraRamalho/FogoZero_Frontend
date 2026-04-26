import { api } from "./api";
import type { NoticiaResponse, ImportacaoResponse } from "../types/noticia";

export const noticiaService = {
  // Tipando o retorno como Promise<NoticiaResponse>
  async listarAprovadas(pagina = 1, limite = 10): Promise<NoticiaResponse> {
    const response = await api.get<NoticiaResponse>("/noticias", {
      params: { status: "APROVADA", pagina, limite },
    });
    return response.data;
  },

  async listarPendentes(pagina = 1, limite = 10): Promise<NoticiaResponse> {
    const response = await api.get<NoticiaResponse>("/noticias", {
      params: { status: "PENDENTE", pagina, limite },
    });
    return response.data;
  },

  async dispararImportacao(): Promise<ImportacaoResponse> {
    const response = await api.get<ImportacaoResponse>("/noticias/importar");
    return response.data;
  },

  async atualizarStatus(
    id: number,
    status: "APROVADA" | "REJEITADA",
  ): Promise<void> {
    await api.patch(`/noticias/${id}/status`, { status });
  },
};
