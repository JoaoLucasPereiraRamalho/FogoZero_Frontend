/**
 * Mapeia o nome do bioma para o `id_regiao` correspondente no backend.
 *
 * Tabela `Regiao` (id 1-9):
 *  - Cerrado:        Serra do Gandarela (1), Serra do Cipó (2),
 *                    Serra da Canastra (3), Grande Sertão Veredas (4)
 *  - Mata Atlântica: Serra da Mantiqueira (5), Parque Estadual do Ibitipoca (6),
 *                    APA Sul RMBH (7)
 *  - Caatinga:       Parque Estadual da Lapa Grande (8),
 *                    APA Carste de Lagoa Santa (9)
 *
 * Para fins de cadastro/reporte, usamos a primeira região representativa
 * de cada bioma. O fallback (1) cobre municípios sem bioma definido.
 */
export function getBiomaRegiao(bioma: string | null | undefined): number {
  const normalizado = (bioma || "").trim().toLowerCase();

  if (normalizado.includes("mata")) return 5; // Mata Atlântica
  if (normalizado.includes("caatinga")) return 8; // Caatinga
  if (normalizado.includes("cerrado")) return 1; // Cerrado

  return 1;
}
