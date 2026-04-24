"use client";

import { useEffect, useState } from "react";
import type { Noticia } from "../../../types/noticia";
import { noticiaService } from "../../../services/noticia";

export function NewsGrid() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        setIsLoading(true);
        // Buscamos as notícias aprovadas
        const data = await noticiaService.listarAprovadas(1, 6);
        setNoticias(data.noticias);
      } catch (error) {
        console.error("Falha ao carregar notícias:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadNews();
  }, []);

  // Skeleton Loader simples para quando estiver carregando
  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
        Carregando notícias relevantes...
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-[2rem] font-extrabold text-black mb-2">
          Fique por dentro do que acontece na sua região
        </h2>
        <p className="text-gray-600 text-base">
          Notícias que ajudam você a compreender o que está acontecendo no
          território mineiro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticias.length > 0 ? (
          noticias.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-hover hover:shadow-md"
            >
              {/* Imagem Dinâmica */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={
                    item.imagem_capa ||
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop"
                  }
                  alt={item.titulo}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#bd1522] text-white text-[10px] font-bold px-2 py-1 rounded">
                  Novo!
                </span>
              </div>

              {/* Conteúdo Dinâmico */}
              <div className="p-5 flex flex-col flex-grow">
                <h4 className="font-bold text-black text-[15px] leading-snug mb-2 line-clamp-2">
                  {item.titulo}
                </h4>
                <p className="text-[13px] text-gray-600 leading-relaxed mb-6 flex-grow line-clamp-3">
                  {item.conteudo}
                </p>

                {/* Rodapé do Card */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      {/* Placeholder simples para avatar */}
                      <span className="text-[10px] font-bold text-orange-700">
                        F0
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {item.autor?.nome || "Equipe FogoZero"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(item.data_publicacao).toLocaleDateString("pt-BR")}
                  </span>
                </div>

                {/* Link para a fonte original */}
                <a
                  href={item.fonte_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-[#bd1522] text-xs font-bold hover:underline"
                >
                  Ler matéria completa →
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-400">
            Nenhuma notícia aprovada no momento.
          </div>
        )}
      </div>
    </section>
  );
}
