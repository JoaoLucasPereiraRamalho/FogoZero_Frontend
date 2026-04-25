import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InformativoPage } from "./pages/InformativoPage";
import { ReportePage } from "./pages/ReportePage"; // Importe as páginas!
import AdminPage from "./pages/Admin";
import { Cadastro } from "./pages/Cadastro";
import { LoginPage } from "./pages/Login";
import { PerfilUsuario } from "./pages/PerfilUsuario";
import { DashboardPage } from "./pages/Dashboard";
import { ForgotPasswordPage } from "./pages/ForgotPassword";
import { ResetPasswordPage} from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Quando a URL for apenas "/", carrega o Portal Informativo */}
        <Route path="/" element={<InformativoPage />} />

        {/* Quando a URL for "/reporte", carrega a página de Reporte */}
        <Route path="/reporte" element={<ReportePage />} />

        {/* Rota temporária para o Dashboard enquanto ele não existe */}
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/admin" element={<AdminPage />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/perfilusuario" element={<PerfilUsuario />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
