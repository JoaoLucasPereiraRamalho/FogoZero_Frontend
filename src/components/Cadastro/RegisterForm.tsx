import { User, Mail, MapPin, Lock } from "lucide-react";
import { InputGroup } from "./InputGroup";

export function RegisterForm() {
  return (
    <div className="max-w-md w-full py-8">
      <h2 className="text-4xl font-extrabold text-black mb-2">
        Crie sua conta
      </h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Crie sua conta para acompanhar o risco de incêndios na sua região,
        receber alertas e contribuir com reportes.
      </p>

      <form className="flex flex-col">
        <InputGroup
          label="Nome"
          placeholder="Nome completo"
          icon={<User size={18} />}
        />
        <InputGroup
          label="Sobrenome"
          placeholder="Sobrenome"
          icon={<User size={18} />}
        />
        <InputGroup
          label="Email"
          placeholder="Coloque seu email aqui"
          icon={<Mail size={18} />}
          type="email"
        />

        <InputGroup
          label="Localização"
          placeholder="Escolha a sua localização"
          icon={<MapPin size={18} />}
          helperText="Ex: Lavras-MG"
        />

        <InputGroup
          label="Senha"
          placeholder="Insira sua senha aqui"
          icon={<Lock size={18} />}
          type="password"
          helperText="Mínimo de 8 caracteres"
        />

        <InputGroup
          label="Confirmação de senha"
          placeholder="Insira sua senha aqui"
          icon={<Lock size={18} />}
          type="password"
        />

        {/* Checkboxes */}
        <div className="flex flex-col gap-3 mt-2 mb-8">
          <label className="flex items-center gap-3 text-xs text-gray-600 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-[#bd1522]" />
            Termos e Condições
          </label>
          <label className="flex items-center gap-3 text-xs text-gray-600 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-[#bd1522]" />
            Quero receber alertas de risco na minha região
          </label>
        </div>

        <button className="w-full bg-[#bd1522] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#a0121d] transition-all shadow-md active:scale-[0.98]">
          Criar Conta
        </button>

        <p className="text-center mt-4 text-xs text-gray-500">
          Já tem uma conta?{" "}
          <a href="/login" className="text-red-700 font-bold hover:underline">
            Entre aqui!
          </a>
        </p>
        <p className="text-[10px] text-center text-gray-400 mt-2">
          Seus dados são usados apenas para alertas e monitoramento.
        </p>
      </form>
    </div>
  );
}
