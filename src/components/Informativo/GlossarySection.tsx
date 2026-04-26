import { useEffect, useState } from "react";
import { BookOpen, Loader2 } from "lucide-react";
import { educativoService } from "../../services/educativo";
import { GlossaryTooltip } from "../GlossaryTooltip";
import type { GlossarioItem } from "../../types/models";

const TEXTO_INTRODUTORIO =
  "Compreender termos como bioma, foco de calor, IMRI e queimada é essencial para interpretar corretamente as informações exibidas pelo FogoZero MG. Esta seção reúne definições oficiais utilizadas pelos órgãos ambientais para que você acompanhe os indicadores de risco, a evolução das queimadas e o monitoramento das áreas de preservação com mais clareza. Passe o mouse sobre os termos destacados ao longo da página para ver a definição.";

export function GlossarySection() {
  const [glossario, setGlossario] = useState<GlossarioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await educativoService.getGlossario();
        setGlossario(dados);
      } catch (err) {
        setErro(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="text-[#bd1522]" size={28} />
        <h2 className="text-[2.4rem] font-bold text-black leading-tight">
          Glossário Ambiental
        </h2>
      </div>
      <p className="text-gray-600 text-[15px] leading-relaxed max-w-3xl mb-10">
        <GlossaryTooltip text={TEXTO_INTRODUTORIO} terms={glossario} />
      </p>

      <div className="bg-white rounded-4xl border border-gray-100 shadow-sm p-8">
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-[#bd1522]" size={28} />
          </div>
        ) : erro ? (
          <p className="text-sm text-red-700">{erro}</p>
        ) : glossario.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            Nenhum termo cadastrado no glossário.
          </p>
        ) : (
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {glossario.map((item) => (
              <div key={item.id}>
                <dt className="font-bold text-[#bd1522] text-sm uppercase tracking-wide mb-1">
                  {item.termo}
                </dt>
                <dd className="text-sm text-gray-600 leading-snug">
                  {item.definicao}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
