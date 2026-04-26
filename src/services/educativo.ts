import { api } from "./api";
import { extractApiError } from "../utils/errors";
import type { GlossarioItem } from "../types/models";

export const educativoService = {
  async getGlossario(): Promise<GlossarioItem[]> {
    try {
      const { data } = await api.get("/educativo/glossario");
      const lista = data?.dados ?? data ?? [];
      return Array.isArray(lista) ? lista : [];
    } catch (error) {
      throw extractApiError(error, "Erro ao carregar glossário");
    }
  },
};
