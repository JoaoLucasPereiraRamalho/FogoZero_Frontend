import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Função auxiliar para obter os headers com o token atualizado
const getAuthHeaders = () => {
  const token = localStorage.getItem("@FogoZero:token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

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
    const { data } = await api.get(`/usuarios/${id}`, getAuthHeaders());
    return data.usuario;
  } catch (error: any) {
    throw error.response?.data?.mensagem || "Erro ao buscar dados do perfil";
  }
};

// Atualiza dados do perfil (PATCH /api/usuarios/:id)
export const atualizarPerfil = async (id: number, dados: UserUpdateData) => {
  try {
    const { data } = await api.patch(
      `/usuarios/${id}`,
      dados,
      getAuthHeaders(),
    );
    return data;
  } catch (error: any) {
    throw error.response?.data?.mensagem || "Erro ao atualizar perfil";
  }
};

// Exclui a própria conta (DELETE /api/usuarios/:id)
export const excluirConta = async (id: number) => {
  try {
    await api.delete(`/usuarios/${id}`, getAuthHeaders());
  } catch (error: any) {
    throw error.response?.data?.mensagem || "Erro ao excluir conta";
  }
};

// Exclui um usuário por ID (uso administrativo)
export const excluirUsuarioPorId = async (id: number) => {
  try {
    await api.delete(`/usuarios/${id}`, getAuthHeaders());
  } catch (error: any) {
    throw error.response?.data?.mensagem || "Erro ao excluir usuário";
  }
};

export const listarTodosUsuarios = async () => {
  try {
    const { data } = await api.get("/usuarios", getAuthHeaders());
    return data.data || data;
  } catch (error: any) {
    throw error.response?.data?.mensagem || "Erro ao listar usuários";
  }
};
