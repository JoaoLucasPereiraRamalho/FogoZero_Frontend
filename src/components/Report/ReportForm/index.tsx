export function ReportForm() {
  return (
    <div>
      <h3 className="text-xl font-bold text-black mb-1">
        Registrar ocorrência
      </h3>
      <p className="text-gray-700 text-sm mb-4">
        Informe os dados do local e descreva o que foi observado.
      </p>

      <hr className="border-gray-100 mb-6" />

      <form className="flex flex-col gap-4">
        {/* Input Nome */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1">
            Label
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Primeiro nome"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:border-fogo-red focus:outline-none placeholder-gray-500"
            />
          </div>
        </div>

        {/* Select Localização */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1">
            Localização
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <select className="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 rounded focus:border-fogo-red focus:outline-none text-gray-500 appearance-none bg-white">
              <option>Escolha a sua localização</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>
        </div>

        {/* Select Tipo de Reporte */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1">
            Tipo de reporte
          </label>
          <div className="relative">
            <select className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded focus:border-fogo-red focus:outline-none text-gray-500 appearance-none bg-white">
              <option>Escolha a sua localização</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1">
            Label
          </label>
          <textarea
            placeholder="Placeholder"
            rows={3}
            className="w-full p-3 text-sm border border-gray-300 rounded focus:border-fogo-red focus:outline-none italic placeholder-gray-500"
          ></textarea>
        </div>

        {/* Envio de Arquivos */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1">
            Envio de arquivos
          </label>
          <div className="w-full border border-dashed border-blue-400 bg-blue-50/30 rounded py-2.5 flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <span className="text-sm italic text-blue-500">
              Selecione o(s) arquivo(s)
            </span>
          </div>
        </div>

        {/* Botão Enviar */}
        <button
          type="button"
          className="w-full bg-[#bd1522] text-white font-bold py-3 rounded hover:bg-red-800 transition-colors mt-2"
        >
          Enviar Reporte
        </button>
        <p className="text-[10px] text-center text-gray-400 mt-1">
          As informações enviadas são utilizadas apenas para fins de
          monitoramento ambiental.
        </p>
      </form>
    </div>
  );
}
