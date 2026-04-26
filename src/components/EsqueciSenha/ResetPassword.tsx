import { useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Lock, Loader2, CheckCircle } from "lucide-react";
import { resetarSenha } from "../../services/auth";
import { InputGroup } from "../Cadastro/InputGroup";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Extrai o token da URL (?token=...)

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const navigate = useNavigate();

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!token) {
      setErro("Token de recuperação não encontrado. Solicite um novo link.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await resetarSenha(token, senha);
      setSucesso(true);
      // Redireciona após 3 segundos ou deixa o usuário clicar
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      setErro(err || "Link expirado ou inválido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (sucesso) {
    return (
      <div className="max-w-md w-full py-8 text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-extrabold text-black mb-2">Sucesso!</h2>
        <p className="text-gray-500 text-sm mb-8">
          Sua senha foi alterada. Você será redirecionado para o login...
        </p>
        <button
          onClick={() => navigate("/login")}
          className="text-[#bd1522] font-bold hover:underline cursor-pointer"
        >
          Ir para o login agora
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full py-8">
      <h2 className="text-4xl font-extrabold text-black mb-2">Nova senha</h2>
      <p className="text-gray-500 text-sm mb-8">
        Crie uma nova senha segura para o seu acesso.
      </p>

      {erro && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs font-bold mb-6 border border-red-100">
          {erro}
        </div>
      )}

      <form onSubmit={handleReset} className="flex flex-col gap-2">
        <InputGroup
          label="Nova Senha"
          placeholder="********"
          type="password"
          icon={<Lock size={18} />}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <InputGroup
          label="Confirmar Nova Senha"
          placeholder="********"
          type="password"
          icon={<Lock size={18} />}
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading || !token}
          className="w-full bg-[#bd1522] text-white py-3 rounded-xl font-bold text-lg hover:bg-red-800 transition-all mt-4 flex justify-center items-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Redefinir Senha"
          )}
        </button>
      </form>
    </div>
  );
}
