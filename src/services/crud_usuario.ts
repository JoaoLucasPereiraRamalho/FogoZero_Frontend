import { api } from "./api";
import { extractApiError } from "../utils/errors";

export interface UserUpdateData {
  nome?: string;
  email?: string;
  telefone?: string;
  senha?: string;
  senha_atual?: string;
}

// Busca os dados do perfil (GET /api/usuarios/:id)
export const buscarPerfil = async (id: number) => {
  try {
    const { data } = await api.get(`/usuarios/${id}`);
    return data.usuario;
  } catch (error) {
    throw extractApiError(error, "Erro ao buscar dados do perfil");
  }
};

// Atualiza dados do perfil (PATCH /api/usuarios/:id)
export const atualizarPerfil = async (id: number, dados: UserUpdateData) => {
  try {
    const { data } = await api.patch(`/usuarios/${id}`, dados);
    return data;
  } catch (error) {
    throw extractApiError(error, "Erro ao atualizar perfil");
  }
};

// Exclui a própria conta (DELETE /api/usuarios/:id)
export const excluirConta = async (id: number) => {
  try {
    await api.delete(`/usuarios/${id}`);
  } catch (error) {
    throw extractApiError(error, "Erro ao excluir conta");
  }
};

// Exclui um usuário por ID (uso administrativo)
export const excluirUsuarioPorId = async (id: number) => {
  try {
    await api.delete(`/usuarios/${id}`);
  } catch (error) {
    throw extractApiError(error, "Erro ao excluir usuário");
  }
};

export const listarTodosUsuarios = async () => {
  try {
    const { data } = await api.get("/usuarios");
    return data.data || data;
  } catch (error) {
    throw extractApiError(error, "Erro ao listar usuários");
  }
};
