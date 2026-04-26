import axios from "axios";

/**
 * Extrai uma mensagem de erro amigável de um valor desconhecido capturado num catch.
 * Prioriza a mensagem do backend (campo `mensagem` em respostas Axios) e cai para
 * `Error.message` ou string padrão.
 */
export function extractApiError(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { mensagem?: string } | undefined;
    if (data?.mensagem) return data.mensagem;
    if (error.message) return error.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
