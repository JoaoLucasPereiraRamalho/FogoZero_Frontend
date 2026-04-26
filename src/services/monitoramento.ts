import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

export interface MonitoramentoDTO {
  cidade: string;
  estado?: string;
  usuarioId: number;
  notificar?: boolean;
}

export const registrarMonitoramento = async (dados: MonitoramentoDTO) => {
  const token = localStorage.getItem("@FogoZero:token"); // Pegue a chave exata que você usa

  try {
    const { data } = await api.post("/monitoramentos", dados, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    throw error.response?.data?.mensagem || "Erro ao registrar monitoramento";
  }
};

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("@FogoZero:token")}`,
  },
});

export const listarMonitoramentos = async (usuarioId: number) => {
  try {
    // Passando os headers manualmente como segundo/terceiro parâmetro
    const { data } = await api.get(
      `/monitoramentos?usuarioId=${usuarioId}`,
      getHeaders(),
    );
    return data;
  } catch (error: any) {
    throw error.response?.data?.mensagem || "Erro ao carregar lista";
  }
};

export const deletarMonitoramento = async (id: number) => {
  try {
    // No DELETE, os headers são o segundo parâmetro
    await api.delete(`/monitoramentos/${id}`, getHeaders());
  } catch (error: any) {
    throw error.response?.data?.mensagem || "Erro ao deletar";
  }
};
