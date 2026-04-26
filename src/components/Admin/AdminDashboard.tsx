"use client";
import { useEffect, useState } from "react";
import { AdminNewsCard } from "./AdminNewsCard";
import { noticiaService } from "../../services/noticia";
import type { Noticia } from "../../types/noticia";

export default function AdminDashboard() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  const fetchNoticias = async () => {
    // Buscamos apenas as PENDENTES para a área de moderação
    const response = await noticiaService.listarPendentes();
    setNoticias(response.noticias);
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  const handleStatusChange = async (
    id: number,
    status: "APROVADA" | "REJEITADA",
  ) => {
    try {
      await noticiaService.atualizarStatus(id, status);
      // Remove da lista local após a ação
      setNoticias((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      alert("Erro ao processar notícia.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((n) => (
              <AdminNewsCard
                key={n.id}
                noticia={n}
                onAction={handleStatusChange}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
