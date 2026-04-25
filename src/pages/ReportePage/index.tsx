import { Header } from "../../components/Header";
import { HeroCTA } from "../../components/Report/HeroCTA";
import { ReportForm } from "../../components/Report/ReportForm";
import { EmergencyGuidelines } from "../../components/Report/EmergencyGuidelines";
import { HeatMap } from "../../components/Report/HeatMap";

export function ReportePage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans">
      <Header />
      <HeroCTA />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Títulos fora do card */}
        <div className="mb-6">
          <h2 className="text-[2.5rem] font-extrabold text-black mb-1 tracking-tight">
            Como registrar um reporte
          </h2>
          <p className="text-gray-600 text-sm">
            Se você identificou um incêndio ou possível foco de queimada,
            utilize o formulário abaixo para registrar a ocorrência.
            <br />
            Em caso de emergência, ligue 193.
          </p>
        </div>

        {/* O Grande Card Branco Unificado */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row overflow-hidden border border-gray-100">
          {/* Coluna da Esquerda (Formulário) */}
          <div className="w-full md:w-[55%] p-8 lg:p-10 border-b md:border-b-0 md:border-r border-gray-100 rounded-2xl shadow-sm">
            <ReportForm />
          </div>

          {/* Coluna da Direita (Diretrizes) */}
          <div className="w-full md:w-[45%] p-8 lg:p-10">
            <EmergencyGuidelines />
          </div>
        </div>

        <HeatMap />
      </main>
    </div>
  );
}
