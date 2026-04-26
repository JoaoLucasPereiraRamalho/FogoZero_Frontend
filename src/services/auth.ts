import axios from "axios";
import type { LoginResponse } from "../types/auth";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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
): Promise<any> => {
  try {
    const { data } = await api.post("/auth/register", {
      nome,
      email,
      senha,
      telefone,
      id_regiao,
    });
    return data;
  } catch (error: any) {
    // Repassa a mensagem de erro do backend (ex: "E-mail já cadastrado")
    throw error.response?.data?.error || "Erro ao realizar cadastro";
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
  } catch (error: any) {
    // Retorna a mensagem de erro vinda do backend ou uma genérica
    throw (
      error.response?.data?.mensagem || "Erro ao solicitar recuperação de senha"
    );
  }
};

// Função para definir a nova senha usando o token
export const resetarSenha = async (token: string, novaSenha: string) => {
  try {
    // Note que o corpo da requisição deve bater com o seu resetPasswordSchema no backend
    const { data } = await api.post("/auth/reset-password", {
      token,
      senha: novaSenha,
    });
    return data;
  } catch (error: any) {
    throw (
      error.response?.data?.mensagem ||
      "Erro ao redefinir senha. O link pode ter expirado."
    );
  }
};

export default authService;
