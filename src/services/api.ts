import axios from "axios";

export const api = axios.create({
  // Use a sua variável de ambiente ou a URL direta do backend
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use(
  (config) => {
    // Busca o token que você salvou no login
    // Certifique-se de que o nome da chave é o mesmo que você usou no seu authService
    const token = localStorage.getItem("@FogoZero:token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Opcional: Interceptor para lidar com erros de Token expirado (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Se o token for inválido/expirado, limpa e desloga
      localStorage.removeItem("@FogoZero:token");
      // window.location.href = '/login'; // Opcional: redireciona
    }
    return Promise.reject(error);
  },
);
