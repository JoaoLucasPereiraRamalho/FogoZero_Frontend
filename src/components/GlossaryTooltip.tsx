import { useMemo, type ReactNode } from "react";
import type { GlossarioItem } from "../types/models";

interface GlossaryTooltipProps {
  text: string;
  terms: GlossarioItem[];
}

/**
 * Escapa caracteres especiais de regex em uma string.
 */
function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Renderiza um texto destacando termos do glossário com um tooltip
 * exibido no hover contendo a definição.
 *
 * - Match case-insensitive com word-boundary (\b).
 * - Cada termo é destacado apenas na primeira ocorrência, evitando
 *   poluição visual em parágrafos longos.
 */
export function GlossaryTooltip({ text, terms }: GlossaryTooltipProps) {
  const segments = useMemo<ReactNode[]>(() => {
    if (!text || terms.length === 0) return [text];

    // Ordena por tamanho (descendente) para casar termos compostos
    // antes de termos curtos contidos neles.
    const ordenados = [...terms].sort(
      (a, b) => b.termo.length - a.termo.length,
    );

    const usados = new Set<number>();
    const padrao = ordenados
      .map((t) => `\\b(${escapeRegex(t.termo)})\\b`)
      .join("|");
    const regex = new RegExp(padrao, "gi");

    const partes: ReactNode[] = [];
    let cursor = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const trecho = match[0];
      const termoEncontrado = ordenados.find(
        (t) => t.termo.toLowerCase() === trecho.toLowerCase(),
      );
      if (!termoEncontrado || usados.has(termoEncontrado.id)) continue;

      usados.add(termoEncontrado.id);

      if (match.index > cursor) {
        partes.push(text.slice(cursor, match.index));
      }

      partes.push(
        <span
          key={`${termoEncontrado.id}-${match.index}`}
          className="relative inline-block group cursor-help bg-red-100 text-[#bd1522] font-semibold px-1 rounded"
        >
          {trecho}
          <span
            role="tooltip"
            className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-20 w-64 bg-gray-900 text-white text-xs font-normal rounded-lg p-3 shadow-lg leading-snug pointer-events-none"
          >
            <strong className="block text-red-300 mb-1">
              {termoEncontrado.termo}
            </strong>
            {termoEncontrado.definicao}
          </span>
        </span>,
      );

      cursor = match.index + trecho.length;
    }

    if (cursor < text.length) {
      partes.push(text.slice(cursor));
    }

    return partes;
  }, [text, terms]);

  return <>{segments}</>;
}
