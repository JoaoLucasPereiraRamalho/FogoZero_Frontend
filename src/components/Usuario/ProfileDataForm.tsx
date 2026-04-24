import { User, Mail, MapPin, Lock } from "lucide-react";
import { InputGroup } from "../Cadastro/InputGroup"; // Reutilizando o que fizemos no cadastro

export function ProfileDataForm() {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full">
      <h3 className="text-lg font-bold text-black mb-1">Seus dados</h3>
      <p className="text-[11px] text-gray-500 mb-6 leading-tight">
        Atualize seus dados para manter seu cadastro completo e garantir o
        acesso às funcionalidades da plataforma.
      </p>

      <form className="space-y-1">
        <InputGroup
          label="Nome"
          placeholder="Nome completo"
          icon={<User size={16} />}
        />
        <InputGroup
          label="Email"
          placeholder="Email de acesso"
          icon={<Mail size={16} />}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputGroup
            label="Cidade"
            placeholder="Sua cidade"
            icon={<MapPin size={16} />}
          />
          <InputGroup
            label="Estado"
            placeholder="Estado"
            icon={<MapPin size={16} />}
          />
        </div>

        <InputGroup
          label="Senha atual"
          type="password"
          placeholder="********"
          icon={<Lock size={16} />}
        />
        <InputGroup
          label="Nova senha"
          type="password"
          placeholder="Criar nova senha"
          icon={<Lock size={16} />}
        />

        <button className="mt-4 bg-[#bd1522] text-white px-8 py-2 rounded-lg font-bold text-xs hover:bg-[#a0121d] transition-colors">
          Editar informações
        </button>
      </form>
    </div>
  );
}
