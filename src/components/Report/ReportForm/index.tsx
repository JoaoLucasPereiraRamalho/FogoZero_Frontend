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
    <div className="w-full">
      <h3 className="text-xl font-extrabold text-black mb-1">
        {logado
          ? "Registrar ocorrência"
          : "Informe seus dados e registre a ocorrência"}
      </h3>
      <p className="text-gray-500 text-xs mb-6 leading-relaxed">
        {logado
          ? "Informe os dados do local e descreva o que foi observado."
          : "Essas informações ajudam a ampliar o monitoramento e podem contribuir para a prevenção de novos incêndios."}
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* BLOCO DE CADASTRO (somente quando deslogado) */}
        {!logado && (
          <fieldset className="border-t border-gray-200 pt-4">
            <legend className="px-2 -ml-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
              Seus dados
            </legend>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Informe seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Telefone
                </label>
                <input
                  type="text"
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="Insira sua senha aqui"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none"
                  required
                />
              </div>
            </div>
          </fieldset>
        )}

        {/* BLOCO DA OCORRÊNCIA */}
        <fieldset className="border-t border-gray-200 pt-4">
          <legend className="px-2 -ml-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Dados da ocorrência
          </legend>

          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Tipo de reporte
              </label>
              <select
                value={tipoReporte}
                onChange={(e) => setTipoReporte(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white"
                required
              >
                <option value="">Selecione um tipo de reporte</option>
                <option value="Incêndio Florestal">Incêndio Florestal</option>
                <option value="Fogo em Terreno">Fogo em Terreno</option>
                <option value="Fumaça Intensa">Fumaça Intensa</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Localização
              </label>
              <select
                value={municipioNome}
                onChange={(e) => setMunicipioNome(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white"
                required
              >
                <option value="">
                  Utilize sua localização atual ou informe manualmente
                </option>
                {municipios.map((m) => (
                  <option key={m.id} value={m.municipio}>
                    {m.municipio} - MG
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Descrição
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva o que você observou e como a situação se apresenta"
                rows={3}
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Envio de arquivos
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg px-3 py-3 hover:border-red-400 transition-colors focus-within:border-red-500">
                <div className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 shrink-0"
                  >
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"></path>
                  </svg>
                  <input
                    type="text"
                    value={imagemUrl}
                    onChange={(e) => setImagemUrl(e.target.value)}
                    placeholder="Cole a URL da foto ou vídeo da ocorrência"
                    className="w-full text-sm bg-transparent outline-none placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#bd1522] text-white font-bold py-3.5 rounded-xl hover:bg-red-800 transition-all shadow-md active:scale-[0.98] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed mt-2"
        >
          {loading
            ? "Processando..."
            : logado
              ? "Enviar ocorrência"
              : "Cadastrar e enviar ocorrência"}
        </button>

        <p className="text-[10px] text-center text-gray-400">
          {logado
            ? "Seus dados serão utilizados apenas para monitoramento ambiental."
            : "Seus dados serão utilizados apenas para monitoramento e acesso à sua conta na plataforma."}
        </p>
      </form>
    </div>
  );
}
