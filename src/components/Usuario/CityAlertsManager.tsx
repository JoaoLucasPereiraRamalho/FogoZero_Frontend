export function CityAlertsManager() {
  const cidades = [
    "São José dos Campos",
    "Cidade2",
    "Cidade3",
    "Cidade4",
    "Cidade5",
  ];

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full">
      <h3 className="text-lg font-bold text-black mb-1">
        Alertas por município
      </h3>
      <p className="text-[11px] text-gray-500 mb-6 leading-tight">
        Escolha as cidades que você deseja acompanhar e receba alertas sobre
        focos de incêndio e riscos ambientais.
      </p>

      <div className="flex flex-col gap-2 mb-8">
        <select className="w-full p-2.5 border border-gray-300 rounded-lg text-sm text-gray-400 outline-none">
          <option>Placeholder</option>
        </select>
        <button className="self-end bg-[#bd1522] text-white px-6 py-2 rounded-lg font-bold text-xs uppercase">
          Adicionar município
        </button>
      </div>

      <div className="border border-gray-100 rounded-xl p-4">
        <h4 className="text-sm font-bold mb-1">Cidades monitoradas</h4>
        <p className="text-[10px] text-gray-400 mb-4">
          Ative ou desative os alertas e remova municípios conforme seu
          interesse.
        </p>

        <div className="space-y-3">
          {cidades.map((cidade, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-[11px] pb-2 border-b border-gray-50 last:border-0"
            >
              <span className="font-medium text-gray-600">{cidade}</span>
              <div className="flex gap-2">
                <select className="bg-[#bd1522] text-white px-2 py-1 rounded text-[10px] outline-none">
                  <option>Desativado</option>
                  <option>Ativado</option>
                </select>
                <button className="bg-gray-800 text-white px-3 py-1 rounded text-[10px] font-bold">
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
