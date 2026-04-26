import { useEffect, useState } from "react";
import {
  Users,
  Mail,
  ShieldCheck,
  Loader2,
  Search,
  MapPin,
  Trash2,
} from "lucide-react";
import {
  listarTodosUsuarios,
  excluirUsuarioPorId,
} from "../../services/crud_usuario";
import type { UsuarioAdmin } from "../../types/models";

export function AdminUserList() {
  const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [deletandoId, setDeletandoId] = useState<number | null>(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      const resposta = await listarTodosUsuarios();

      // De acordo com o JSON que você postou, a chave correta é "dados"
      // Adicionamos o fallback para array vazio caso venha nulo
      const listaFinal = resposta.dados || [];

      setUsuarios(listaFinal);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtro seguro: usa optional chaining (?.) para evitar erros se os dados forem nulos
  const usuariosFiltrados =
    usuarios?.filter(
      (u) =>
        u.nome?.toLowerCase().includes(busca.toLowerCase()) ||
        u.email?.toLowerCase().includes(busca.toLowerCase()),
    ) || [];

  const getUsuarioId = (usuario: UsuarioAdmin): number | null => {
    const rawId = usuario?.id ?? usuario?.id_usuario ?? usuario?.usuario_id;
    const idNumerico = Number(rawId);
    return Number.isFinite(idNumerico) ? idNumerico : null;
  };

  const handleExcluirUsuario = async (usuario: UsuarioAdmin) => {
    const usuarioId = getUsuarioId(usuario);
    if (!usuarioId) {
      alert("Não foi possível identificar o ID deste usuário.");
      return;
    }

    const confirmado = window.confirm(
      `Deseja realmente excluir o usuário "${usuario.nome}"?`,
    );
    if (!confirmado) return;

    try {
      setDeletandoId(usuarioId);
      await excluirUsuarioPorId(usuarioId);
      setUsuarios((prev) => prev.filter((u) => getUsuarioId(u) !== usuarioId));
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
      alert(`Não foi possível excluir o usuário: ${String(err)}`);
    } finally {
      setDeletandoId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm h-64 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#bd1522]" />
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-black flex items-center gap-2">
            <Users size={20} className="text-[#bd1522]" />
            Gestão de Usuários
          </h3>
          <p className="text-[11px] text-gray-500">
            {usuariosFiltrados.length === usuarios.length
              ? `Total de ${usuarios.length} cadastrados`
              : `Encontrados ${usuariosFiltrados.length} usuários`}
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={14}
          />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none focus:bg-white focus:ring-1 focus:ring-red-100 transition-all"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="pb-3 pl-2">Usuário</th>
              <th className="pb-3">Contato</th>
              <th className="pb-3">Região</th>
              <th className="pb-3 text-center">Status</th>
              <th className="pb-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((u) => (
                <tr
                  key={getUsuarioId(u) ?? `${u.email}-${u.nome}`}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#bd1522] font-bold text-xs uppercase">
                        {u.nome?.substring(0, 2)}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {u.nome}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <Mail size={12} /> {u.email}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {u.telefone || "Sem telefone"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin size={12} />{" "}
                      {u.id_regiao === 1
                        ? "Minas Gerais"
                        : `Região ${u.id_regiao}`}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold capitalize">
                      <ShieldCheck size={12} /> {u.tipo || "usuario"}
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleExcluirUsuario(u)}
                      disabled={deletandoId === getUsuarioId(u)}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                      title="Excluir usuário"
                      aria-label={`Excluir usuário ${u.nome}`}
                    >
                      {deletandoId === getUsuarioId(u) ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-gray-400 text-xs italic"
                >
                  Nenhum usuário encontrado para esta busca.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
