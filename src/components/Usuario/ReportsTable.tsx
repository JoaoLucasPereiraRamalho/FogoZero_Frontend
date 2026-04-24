export function ReportsTable() {
  const reportes = Array(9).fill({
    id: "01",
    tipo: "Foco de Incêndio",
    data: "04/02/2026",
  });

  return (
    <div className="mt-12">
      <h2 className="text-4xl font-extrabold mb-2">Seus reportes</h2>
      <p className="text-gray-500 text-sm mb-8">
        Cada reporte contribui para o monitoramento das queimadas. Aqui você
        pode acompanhar todos os registros que já enviou.
      </p>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
        <div className="mb-6">
          <h4 className="font-bold text-gray-800">Reportes enviados</h4>
          <p className="text-[11px] text-gray-400">
            Atualize seus dados pessoais aqui! As informações serão atualizadas
            após a confirmação do envio.
          </p>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-sm font-bold text-gray-800 border-b border-gray-100">
              <th className="pb-4">Reporte</th>
              <th className="pb-4">Tipo de Reporte</th>
              <th className="pb-4">Data</th>
              <th className="pb-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-gray-600">
            {reportes.map((r, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-0">
                <td className="py-4">Reporte {r.id}</td>
                <td className="py-4">{r.tipo}</td>
                <td className="py-4">{r.data}</td>
                <td className="py-4 text-right">
                  <button className="bg-[#bd1522] text-white px-4 py-1.5 rounded-lg text-[11px] font-bold">
                    Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
