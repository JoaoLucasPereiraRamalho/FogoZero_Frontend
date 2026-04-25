export type NoticiaStatus = "PENDENTE" | "APROVADA" | "REJEITADA";

export interface Autor {
  id: number;
  nome: string;
  email?: string;
}

export interface Noticia {
  id: number;
  titulo: string;
  slug: string;
  conteudo: string;
  imagem_capa: string | null;
  fonte_url: string;
  status: NoticiaStatus;
  data_publicacao: string; // Vem como string ISO do JSON
  data_importacao: string;
  autor?: Autor; // Opcional, caso você faça o include no Prisma
}

export interface NoticiaResponse {
  total: number;
  pagina: number;
  paginas: number;
  noticias: Noticia[];
}

export interface ImportacaoResponse {
  mensagem: string;
  importId: string;
  statusUrl: string;
}
