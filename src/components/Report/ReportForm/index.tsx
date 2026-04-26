import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// Importando as duas funções de serviço
import { criarReporte, criarPrimeiroReporte } from "../../../services/reporte";
import { municipioService } from "../../../services/municipio";
import { isUserLogged } from "../../../utils/auth";
import { getBiomaRegiao } from "../../../utils/geo";
import type { MunicipioMG } from "../../../types/models";

export function ReportForm() {
  const navigate = useNavigate();
  const logado = isUserLogged();

  // --- ESTADOS DO USUÁRIO (Aparecem se deslogado) ---
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  // --- ESTADOS DO REPORTE (Sempre visíveis) ---
  const [municipios, setMunicipios] = useState<MunicipioMG[]>([]);
  const [municipioNome, setMunicipioNome] = useState<string>("");
  const [tipoReporte, setTipoReporte] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const carregarMunicipios = async () => {
      const lista = (await municipioService.listar()) as MunicipioMG[];
      const ordenados = [...lista].sort((a, b) =>
        (a.municipio || "").localeCompare(b.municipio || ""),
      );
      setMunicipios(ordenados);
    };
    carregarMunicipios();
  }, []);

  const municipioSelecionado = useMemo(
    () => municipios.find((m) => m.municipio === municipioNome) || null,
    [municipios, municipioNome],
  );

  const isValidImageUrl = (url: string) => {
    const value = url.trim();
    if (!value) return false;
    try {
      const parsed = new URL(value);
      const isHttp =
        parsed.protocol === "http:" || parsed.protocol === "https:";
      const hasImageExt = /\.(png|jpe?g|webp|gif|bmp|tiff|svg)(\?.*)?$/i.test(
        parsed.pathname + parsed.search,
      );
      return isHttp && hasImageExt;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!municipioSelecionado) {
        throw new Error("Selecione um município válido.");
      }

      const tituloFinal = tipoReporte;
      const assuntoFinal = descricao;
      const latitudeFinal = Number(municipioSelecionado.lat ?? -21.0);
      const longitudeFinal = Number(municipioSelecionado.lon ?? -45.0);
      const idRegiao = getBiomaRegiao(municipioSelecionado.bioma_mais_afetado);
      const imagemUrlFinal = imagemUrl.trim();

      if (!isValidImageUrl(imagemUrlFinal)) {
        throw new Error(
          "Informe uma URL de imagem válida (http/https com extensão .jpg, .png, .webp...).",
        );
      }

      if (!logado) {
        // CASO 1: SEM TOKEN -> Chamada para criarPrimeiroReporte (JSON Estruturado)
        const payload = {
          usuario: {
            nome,
            email,
            telefone,
            senha,
            id_regiao: idRegiao,
          },
          reporte: {
            titulo: tituloFinal,
            assunto: assuntoFinal,
            latitude: latitudeFinal,
            longitude: longitudeFinal,
            imagem_url: imagemUrlFinal,
          },
        };

        const response = await criarPrimeiroReporte(payload);

        // Salvamos o token retornado para logar o usuário automaticamente
        if (response.token) {
          localStorage.setItem("@FogoZero:token", response.token);
          localStorage.setItem(
            "@FogoZero:user",
            JSON.stringify(response.usuario),
          );
        }

        alert("Cadastro realizado e reporte enviado com sucesso!");
        navigate("/dashboard"); // Opcional: Redireciona para área logada
      } else {
        // CASO 2: COM TOKEN -> Chamada para criarReporte (JSON Simples)
        await criarReporte({
          id_regiao: idRegiao,
          titulo: tituloFinal,
          assunto: assuntoFinal,
          latitude: latitudeFinal,
          longitude: longitudeFinal,
          imagem_url: imagemUrlFinal,
        });
        alert("Reporte enviado com sucesso!");
      }

      // Limpeza dos campos
      setDescricao("");
      setImagemUrl("");
      setTipoReporte("");
      setMunicipioNome("");
    } catch (error: unknown) {
      alert(
        `Erro no envio: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-black mb-1 text-center">
        Registrar ocorrência
      </h3>
      <p className="text-gray-600 text-sm mb-6 text-center">
        {logado
          ? "Envie um novo reporte."
          : "Cadastre-se rapidinho para enviar seu reporte."}
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* BLOCO DE CADASTRO: Só aparece se estiver deslogado */}
        {!logado && (
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col gap-3 animate-in fade-in duration-500">
            <h4 className="text-xs font-bold text-red-700 uppercase mb-1">
              Seus Dados (Criação de Conta)
            </h4>

            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none"
                required
              />
            </div>

            <input
              type="password"
              placeholder="Crie uma senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none"
              required
            />
          </div>
        )}

        {/* BLOCO DO REPORTE: Sempre visível */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Onde está ocorrendo?
            </label>
            <select
              value={municipioNome}
              onChange={(e) => setMunicipioNome(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white"
              required
            >
              <option value="">Selecione um município...</option>
              {municipios.map((m) => (
                <option key={m.id} value={m.municipio}>
                  {m.municipio} - MG
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1">
            Tipo de Reporte
          </label>
          <select
            value={tipoReporte}
            onChange={(e) => setTipoReporte(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white"
            required
          >
            <option value="">Selecione...</option>
            <option value="Incêndio Florestal">Incêndio Florestal</option>
            <option value="Fogo em Terreno">Fogo em Terreno</option>
            <option value="Fumaça Intensa">Fumaça Intensa</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1">
            Descrição
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="O que está acontecendo? Pontos de referência?"
            rows={3}
            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none italic"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1">
            URL da Imagem
          </label>
          <input
            type="text"
            value={imagemUrl}
            onChange={(e) => setImagemUrl(e.target.value)}
            placeholder="https://exemplo.com/foto.jpg"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#bd1522] text-white font-bold py-3.5 rounded-xl hover:bg-red-800 transition-all shadow-md active:scale-[0.98] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading
            ? "Processando..."
            : logado
              ? "Enviar Reporte"
              : "Cadastrar e Reportar"}
        </button>

        <p className="text-[10px] text-center text-gray-400">
          Sua localização aproximada será enviada para as autoridades
          ambientais.
        </p>
      </form>
    </div>
  );
}
