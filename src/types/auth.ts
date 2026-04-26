export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  tipo?: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

export interface ApiError {
  error: string;
}
