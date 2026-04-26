import type { Noticia } from "../../types/noticia";

interface AdminNewsCardProps {
  noticia: Noticia;
  onAction: (id: number, status: "APROVADA" | "REJEITADA") => void;
}

export function AdminNewsCard({ noticia, onAction }: AdminNewsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="relative h-44 bg-gray-200">
        <img
          src={"/noticia2.jpeg"}
          className="w-full h-full object-cover"
          alt={noticia.titulo}
        />
        <span className="absolute top-3 left-3 bg-[#bd1522] text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
          Pendente
        </span>
      </div>

      <div className="p-5 flex flex-col grow">
        <h4 className="font-bold text-black text-sm leading-snug mb-2 line-clamp-2">
          {noticia.titulo}
        </h4>
        <a
          href={noticia.fonte_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-[#bd1522] text-xs font-bold hover:underline"
        >
          Ler matéria completa →
        </a>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex gap-2">
            <button
              onClick={() => onAction(noticia.id, "APROVADA")}
              className="text-[10px] bg-green-600 text-white px-2 py-1 rounded font-bold hover:bg-green-700 cursor-pointer"
            >
              APROVAR
            </button>
            <button
              onClick={() => onAction(noticia.id, "REJEITADA")}
              className="text-[10px] bg-gray-200 text-gray-700 px-2 py-1 rounded font-bold hover:bg-gray-300 cursor-pointer"
            >
              REJEITAR
            </button>
          </div>
          <span className="text-[10px] text-gray-400">
            {new Date(noticia.data_importacao).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
