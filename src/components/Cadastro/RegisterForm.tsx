import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, MapPin, Lock, Loader2, Phone } from "lucide-react";
import { InputGroup } from "./InputGroup";
import authService from "../../services/auth"; // Importando seu service

export function RegisterForm() {
  // Estados para os campos
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idRegiao, setIdRegiao] = useState<number>(2);

  // Estados de controle da UI
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");

    // Validação básica de senha no front
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      // Concatenamos nome e sobrenome para enviar ao backend
      const nomeCompleto = `${nome} ${sobrenome}`.trim();

      await authService.register(
        nomeCompleto,
        email,
        senha,
        telefone,
        idRegiao,
      );

      alert("Conta criada com sucesso!");
      navigate("/login");
    } catch (err: any) {
      setErro(err || "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full py-8">
      <h2 className="text-4xl font-extrabold text-black mb-2">
        Crie sua conta
      </h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Crie sua conta para acompanhar o risco de incêndios na sua região,
        receber alertas e contribuir com reportes.
      </p>

      {/* Exibição de erro */}
      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs font-bold mb-6">
          {erro}
        </div>
      )}

      <form className="flex flex-col" onSubmit={handleRegister}>
        <div className="grid grid-cols-2 gap-4">
          <InputGroup
            label="Nome"
            placeholder="Nome"
            icon={<User size={18} />}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <InputGroup
            label="Sobrenome"
            placeholder="Sobrenome"
            icon={<User size={18} />}
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            required
          />
        </div>

        <InputGroup
          label="Email"
          placeholder="Coloque seu email aqui"
          icon={<Mail size={18} />}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Campo Telefone */}
        <InputGroup
          label="Telefone (WhatsApp)"
          placeholder="(35) 99999-9999"
          icon={<Phone size={18} />} // Importe o Phone do lucide-react
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />

        {/* Campo Região (Select) */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-sm font-bold text-gray-700">
            Região de Monitoramento
          </label>
          <div className="relative flex items-center">
            <MapPin className="absolute left-3 text-gray-400" size={18} />
            <select
              value={idRegiao}
              onChange={(e) => setIdRegiao(Number(e.target.value))}
              className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none appearance-none bg-white"
              required
            >
              <option value={1}>Belo Horizonte - MG</option>
              <option value={2}>Lavras - MG</option>
              <option value={3}>Uberlândia - MG</option>
            </select>
          </div>
          <span className="text-[10px] text-gray-400">
            Você receberá alertas desta cidade.
          </span>
        </div>

        <InputGroup
          label="Senha"
          placeholder="Insira sua senha aqui"
          icon={<Lock size={18} />}
          type="password"
          helperText="Mínimo de 8 caracteres"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <InputGroup
          label="Confirmação de senha"
          placeholder="Repita sua senha"
          icon={<Lock size={18} />}
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />

        {/* Checkboxes */}
        <div className="flex flex-col gap-3 mt-2 mb-8">
          <label className="flex items-center gap-3 text-xs text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#bd1522]"
              required
            />
            Termos e Condições
          </label>
          <label className="flex items-center gap-3 text-xs text-gray-600 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-[#bd1522]" />
            Quero receber alertas de risco na minha região
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#bd1522] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#a0121d] transition-all shadow-md active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Criando...
            </>
          ) : (
            "Criar Conta"
          )}
        </button>

        <p className="text-center mt-4 text-xs text-gray-500">
          Já tem uma conta?{" "}
          <a href="/login" className="text-red-700 font-bold hover:underline">
            Entre aqui!
          </a>
        </p>
      </form>
    </div>
  );
}
