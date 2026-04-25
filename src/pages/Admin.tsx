"use client";

import { useEffect, useState } from "react";
import { AdminNewsCard } from "../components/Admin/AdminNewsCard";
import { noticiaService } from "../services/noticia";
import type { Noticia } from "../types/noticia";
import { Header } from "../components/Header";

export default function AdminPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega as notícias assim que a página abre
  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        // Buscamos as notícias (por padrão o robô salva como PENDENTE)
        // Certifique-se que seu service tem o método para filtrar por status
        const data = await noticiaService.listarPendentes(1, 10);
        setNoticias(data.noticias);
      } catch (error) {
        console.error("Erro ao carregar painel:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  // Função para lidar com a aprovação ou rejeição
  const handleStatusChange = async (
    id: number,
    novoStatus: "APROVADA" | "REJEITADA",
  ) => {
    try {
      await noticiaService.atualizarStatus(id, novoStatus);

      // Remove da lista visual após a ação para dar o feedback de "fila de trabalho"
      setNoticias((prev) => prev.filter((n) => n.id !== id));

      console.log(`Notícia ${id} atualizada para ${novoStatus}`);
    } catch (error) {
      alert("Erro ao atualizar o status da notícia. Verifique o console.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Componente do Cabeçalho com o Título e Botões de Opção */}

        {/* Container Branco Arredondado (conforme a imagem Area_adm.jpg) */}
        <div className="mt-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#bd1522]"></div>
              <span className="ml-3 text-gray-500 font-medium">
                Buscando notícias...
              </span>
            </div>
          ) : (
            <>
              {/* Grid que exibe os Cards de Notícia */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {noticias.length > 0 ? (
                  noticias.map((noticia) => (
                    <AdminNewsCard
                      key={noticia.id}
                      noticia={noticia}
                      onAction={handleStatusChange}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <p className="text-gray-400 text-lg">
                      Não há notícias pendentes para moderação no momento.
                    </p>
                  </div>
                )}
              </div>

              {/* Botão de Ação Inferior */}
              <div className="flex justify-end mt-12">
                <button className="bg-[#bd1522] text-white px-10 py-3 rounded-xl font-bold text-sm hover:bg-[#a0121d] transition-all shadow-lg shadow-red-900/10 active:scale-95">
                  Editar notícias
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
