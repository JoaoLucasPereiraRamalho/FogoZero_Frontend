import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// Importando as duas funções de serviço
import { criarReporte, criarPrimeiroReporte } from "../../../services/reporte";
import { getCoordsByRegiao } from "../../../utils/geo";
import { isUserLogged } from "../../../utils/auth";

export function ReportForm() {
  const navigate = useNavigate();
  const logado = isUserLogged();

  // --- ESTADOS DO USUÁRIO (Aparecem se deslogado) ---
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  // --- ESTADOS DO REPORTE (Sempre visíveis) ---
  const [idRegiao, setIdRegiao] = useState<number>(2); // Default Lavras
  const [tipoReporte, setTipoReporte] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { lat, lng } = getCoordsByRegiao(idRegiao);
      const assuntoFinal = `${tipoReporte}: ${descricao}`;

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
            assunto: assuntoFinal,
            latitude: lat,
            longitude: lng,
            imagem_url: imagemUrl || "https://via.placeholder.com/400"
          }
        };

        const response = await criarPrimeiroReporte(payload);
        
        // Salvamos o token retornado para logar o usuário automaticamente
        if (response.token) {
          localStorage.setItem("@FogoZero:token", response.token);
          localStorage.setItem("@FogoZero:user", JSON.stringify(response.usuario));
        }

        alert("Cadastro realizado e reporte enviado com sucesso!");
        navigate("/dashboard"); // Opcional: Redireciona para área logada
      } else {
        // CASO 2: COM TOKEN -> Chamada para criarReporte (JSON Simples)
        await criarReporte({
          id_regiao: idRegiao,
          assunto: assuntoFinal,
          latitude: lat,
          longitude: lng,
          imagem_url: imagemUrl || "https://via.placeholder.com/400",
        });
        alert("Reporte enviado com sucesso!");
      }

      // Limpeza dos campos
      setDescricao("");
      setImagemUrl("");
      setTipoReporte("");
      
    } catch (error: any) {
      alert("Erro no envio: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-black mb-1 text-center">Registrar ocorrência</h3>
      <p className="text-gray-600 text-sm mb-6 text-center">
        {logado ? "Envie um novo reporte." : "Cadastre-se rapidinho para enviar seu reporte."}
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        
        {/* BLOCO DE CADASTRO: Só aparece se estiver deslogado */}
        {!logado && (
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col gap-3 animate-in fade-in duration-500">
            <h4 className="text-xs font-bold text-red-700 uppercase mb-1">Seus Dados (Criação de Conta)</h4>
            
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">Onde está ocorrendo?</label>
            <select 
              value={idRegiao}
              onChange={(e) => setIdRegiao(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white"
            >
              <option value={1}>Belo Horizonte - MG</option>
              <option value={2}>Lavras - MG</option>
              <option value={3}>Uberlândia - MG</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">Tipo de Reporte</label>
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
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1">Descrição</label>
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
          <label className="block text-xs font-bold text-gray-800 mb-1">URL da Imagem</label>
          <input
            type="text"
            value={imagemUrl}
            onChange={(e) => setImagemUrl(e.target.value)}
            placeholder="http://exemplo.com/foto.jpg"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#bd1522] text-white font-bold py-3.5 rounded-xl hover:bg-red-800 transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Processando..." : (logado ? "Enviar Reporte" : "Cadastrar e Reportar")}
        </button>

        <p className="text-[10px] text-center text-gray-400">
          Sua localização aproximada será enviada para as autoridades ambientais.
        </p>
      </form>
    </div>
  );
}