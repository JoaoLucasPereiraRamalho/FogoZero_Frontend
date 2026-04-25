import { CityAlertsManager } from "../components/Usuario/CityAlertsManager";
import { ProfileDataForm } from "../components/Usuario/ProfileDataForm";
import { ReportsTable } from "../components/Usuario/ReportsTable";
import { Header } from "../components/Header";

export function PerfilUsuario() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] pb-20">
      <Header />
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <h2 className="text-[2.5rem] font-extrabold text-black mb-2">
          Seus dados pessoais
        </h2>
        <p className="text-gray-600 text-sm mb-12 max-w-2xl">
          Mantenha seus dados atualizados para receber alertas da sua região e
          acompanhar seus reportes de forma personalizada.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <ProfileDataForm />
          <CityAlertsManager />
        </div>

        <ReportsTable />
      </div>
    </main>
  );
}
