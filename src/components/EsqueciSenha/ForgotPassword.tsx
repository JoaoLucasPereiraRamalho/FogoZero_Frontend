import React, { useState, FormEvent } from "react";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Adicionei as chaves aqui, que é o padrão mais comum
import { solicitarRecuperacao } from "../../services/auth"; 
import { InputGroup } from "../Cadastro/InputGroup";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleRequest = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      await solicitarRecuperacao(email);
      setEnviado(true);
    } catch (err: any) {
      // Garante que pegamos a string de erro do backend
      setErro(err || "Erro ao processar solicitação.");
    } finally {
      setLoading(false);
    }
  };

  if (enviado) {
    return (
      <div className="max-w-md w-full py-8 text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-extrabold text-black mb-2">E-mail enviado!</h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Se o e-mail <strong>{email}</strong> estiver cadastrado, você receberá um link para criar uma nova senha em instantes.
        </p>
        <button 
          onClick={() => navigate("/login")} 
          className="text-[#bd1522] font-bold hover:underline transition-all"
        >
          Voltar para o login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full py-8">
      <button 
        onClick={() => navigate("/login")} 
        className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 text-sm transition-all"
      >
        <ArrowLeft size={16} /> Voltar ao login
      </button>
      
      <h2 className="text-4xl font-extrabold text-black mb-2">Esqueceu a senha?</h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Não se preocupe! Digite seu e-mail abaixo e enviaremos as instruções para você recuperar o acesso.
      </p>

      {erro && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs font-bold mb-6 border border-red-100 animate-shake">
          {erro}
        </div>
      )}

      <form onSubmit={handleRequest} className="flex flex-col">
        <InputGroup
          label="E-mail cadastrado"
          placeholder="exemplo@email.com"
          icon={<Mail size={18} />}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#bd1522] text-white py-3 rounded-xl font-bold text-lg hover:bg-red-800 transition-all shadow-md flex justify-center items-center gap-2 disabled:opacity-50 mt-4 active:scale-95"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Enviando...</span>
            </>
          ) : (
            "Enviar link"
          )}
        </button>
      </form>
    </div>
  );
}