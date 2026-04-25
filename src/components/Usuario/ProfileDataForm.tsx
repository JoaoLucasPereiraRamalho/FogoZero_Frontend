import React, { useState, useEffect } from "react";
import { User, Mail, MapPin, Lock, Loader2 } from "lucide-react";
import { InputGroup } from "../Cadastro/InputGroup";
import { buscarPerfil, atualizarPerfil, excluirConta } from "../../services/crud_usuario";
import { getLoggedUser } from "../../utils/auth";

export function ProfileDataForm() {
  const user = getLoggedUser();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  // Estado para os campos do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cidade: "",
    estado: "",
    senha_atual: "",
    nova_senha: "",
  });

  // Carregar dados ao montar o componente
  useEffect(() => {
    if (user?.id) {
      const carregarDados = async () => {
        try {
          const dados = await buscarPerfil(user.id);
          setFormData((prev) => ({
            ...prev,
            nome: dados.nome || "",
            email: dados.email || "",
            // Caso seu backend retorne a região/município vinculado:
            cidade: dados.municipio?.nome || "", 
            estado: "MG", // FogoZero foca em MG
          }));
        } catch (err) {
          console.error("Erro ao carregar perfil:", err);
        } finally {
          setLoading(false);
        }
      };
      carregarDados();
    }
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const payload: any = {
        nome: formData.nome,
        email: formData.email,
      };

      // Se o usuário digitou uma nova senha, incluímos no patch
      if (formData.nova_senha) {
        payload.senha = formData.nova_senha;
        payload.senha_atual = formData.senha_atual; // Muitos backends pedem a atual para validar a troca
      }

      await atualizarPerfil(user.id, payload);
      alert("Informações atualizadas com sucesso!");
      
      // Limpa campos de senha após sucesso
      setFormData(prev => ({ ...prev, senha_atual: "", nova_senha: "" }));
    } catch (err: any) {
      alert(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-[#bd1522]" />
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full">
      <h3 className="text-lg font-bold text-black mb-1">Seus dados</h3>
      <p className="text-[11px] text-gray-500 mb-6 leading-tight">
        Atualize seus dados para manter seu cadastro completo e garantir o
        acesso às funcionalidades da plataforma.
      </p>

      <form onSubmit={handleSubmit} className="space-y-1">
        <InputGroup
          label="Nome"
          placeholder="Nome completo"
          value={formData.nome}
          onChange={(e: any) => setFormData({ ...formData, nome: e.target.value })}
          icon={<User size={16} />}
        />
        <InputGroup
          label="Email"
          placeholder="Email de acesso"
          value={formData.email}
          onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
          icon={<Mail size={16} />}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputGroup
            label="Cidade"
            placeholder="Sua cidade"
            value={formData.cidade}
            disabled // Geralmente cidade é vinculada ao ID da região no seu banco
            icon={<MapPin size={16} />}
          />
          <InputGroup
            label="Estado"
            placeholder="Estado"
            value={formData.estado}
            disabled
            icon={<MapPin size={16} />}
          />
        </div>

        <div className="pt-2 border-t border-gray-50 mt-4">
          <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase">Alterar senha (opcional)</p>
          <InputGroup
            label="Senha atual"
            type="password"
            placeholder="********"
            value={formData.senha_atual}
            onChange={(e: any) => setFormData({ ...formData, senha_atual: e.target.value })}
            icon={<Lock size={16} />}
          />
          <InputGroup
            label="Nova senha"
            type="password"
            placeholder="Criar nova senha"
            value={formData.nova_senha}
            onChange={(e: any) => setFormData({ ...formData, nova_senha: e.target.value })}
            icon={<Lock size={16} />}
          />
        </div>

        <button 
          type="submit"
          disabled={updating}
          className="mt-4 bg-[#bd1522] text-white px-8 py-2 rounded-lg font-bold text-xs hover:bg-[#a0121d] transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {updating && <Loader2 size={14} className="animate-spin" />}
          Salvar alterações
        </button>
      </form>
    </div>
  );
}