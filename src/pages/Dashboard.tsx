import { StatCard } from "../components/Dashboard//StatCard";
import { HeatMapSection } from "../components/Dashboard//HeatMapSection";
import { EvolutionChart } from "../components/Dashboard/EvolutionChart";
import { Header } from "../components/Header";

export function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] pb-20">
      <Header />
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <header className="mb-12">
          <h1 className="text-[2.5rem] font-extrabold text-black mb-2 leading-tight">
            Analise o risco de <br /> incêndios na sua região
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl">
            Visualize os dados e entenda os focos de incêndio. Utilize os
            filtros para uma análise personalizada.
          </p>
        </header>

        {/* Filtros de topo */}
        <div className="flex gap-4 mb-8 items-center">
          <span className="text-xs font-bold">Escolha uma região:</span>
          <select className="border rounded-lg px-4 py-2 text-xs outline-none bg-white">
            <option>Lavras-MG</option>
          </select>
          <button className="bg-[#bd1522] text-white px-6 py-2 rounded-lg text-xs font-bold">
            Município
          </button>
          <button className="bg-[#bd1522] text-white px-6 py-2 rounded-lg text-xs font-bold">
            Bioma
          </button>
        </div>

        {/* Grid de Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard
            label="Total de focos registrados"
            value="1.000%"
            description="Dados coletados na região"
          />
          <StatCard
            label="Média Estadual"
            value="1.000%"
            description="Comparativo com Minas Gerais"
          />
          <StatCard
            label="Bioma predominante"
            value="Cerrado"
            description="Vegetação local"
          />
          <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-center">
            <div className="text-center font-bold text-green-600 text-3xl">
              +12%
            </div>
          </div>
        </div>

        <HeatMapSection />

        <EvolutionChart title="Evolução das queimadas ao longo do tempo" />

        {/* Seção de Análise Ambiental (Gráfico de Rosca) */}
        <div className="mt-20">
          <h2 className="text-3xl font-extrabold mb-8">
            Análise ambiental das queimadas
          </h2>
          <EvolutionChart title="Evolução das queimadas nos biomas da região" />
        </div>
      </div>
    </main>
  );
}
