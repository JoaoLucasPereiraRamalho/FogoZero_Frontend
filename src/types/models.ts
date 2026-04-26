// Tipos compartilhados de domínio (espelham o backend)

export interface MunicipioMG {
  id: number;
  municipio: string;
  numero_focos?: number;
  lat?: number;
  lon?: number;
  imri?: number;
  classificacao_imri?: string;
  bioma_mais_afetado?: string;
  focos_2015?: number;
  focos_2016?: number;
  focos_2017?: number;
  focos_2018?: number;
  focos_2019?: number;
  focos_2020?: number;
  focos_2021?: number;
  focos_2022?: number;
  focos_2023?: number;
  focos_2024?: number;
  focos_2025?: number;
}

export interface GlossarioItem {
  id: number;
  termo: string;
  definicao: string;
}

export interface Monitoramento {
  id: number;
  cidade: string;
  estado?: string;
  usuarioId?: number;
  notificar?: boolean;
}

export interface ReporteHistorico {
  id: number;
  tipo?: string;
  titulo?: string;
  descricao?: string;
  data?: string;
  createdAt?: string;
  created_at?: string;
}

export interface UsuarioAdmin {
  id?: number;
  id_usuario?: number;
  usuario_id?: number;
  nome: string;
  email: string;
  telefone?: string;
  tipo?: string;
  id_regiao?: number;
}
