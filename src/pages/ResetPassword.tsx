import { ResetPassword } from "../components/EsqueciSenha/ResetPassword";

export function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
        <ResetPassword />
      </div>
    </div>
  );
}