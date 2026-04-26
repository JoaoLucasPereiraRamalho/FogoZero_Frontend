import axios from "axios";
import type { LoginResponse } from "../types/auth";
import { extractApiError } from "../utils/errors";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

export const loginUser = async (
  email: string,
  senha: string,
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    senha,
  });
  return data;
};

export const registerUser = async (
  nome: string,
  email: string,
  senha: string,
  id_regiao: number,
  telefone?: string,
) => {
  try {
    const { data } = await api.post("/auth/register", {
      nome,
      email,
      senha,
      telefone,
      id_regiao,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data as { error?: string } | undefined;
      if (apiError?.error) throw apiError.error;
    }
    throw extractApiError(error, "Erro ao realizar cadastro");
  }
};

const authService = {
  login: loginUser,
  register: registerUser,
  logout(): void {
    localStorage.removeItem("@FogoZero:token");
    localStorage.removeItem("@FogoZero:user");
  },
};

export const solicitarRecuperacao = async (email: string) => {
  try {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
  } catch (error) {
    throw extractApiError(error, "Erro ao solicitar recuperação de senha");
  }
};

// Função para definir a nova senha usando o token
export const resetarSenha = async (token: string, novaSenha: string) => {
  try {
    const { data } = await api.post("/auth/reset-password", {
      token,
      senha: novaSenha,
    });
    return data;
  } catch (error) {
    throw extractApiError(
      error,
      "Erro ao redefinir senha. O link pode ter expirado.",
    );
  }
};

export default authService;
