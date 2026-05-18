import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import api from "../api/axios";

export const ResetPasswordConfirmPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    setStatus("submitting");

    try {
      const email = atob(token);
      
      await api.post("/auth/reset-password", {
        email,
        newPassword: password
      });
      
      setStatus("success");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password. The link might be expired.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black p-4 font-sans animate-fade-in">
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-8 shadow-sm text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10">
            <svg className="h-6 w-6 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Password reset complete</h2>
          <p className="mt-2 text-sm text-gray-500">
            Your password has been successfully updated. You can now sign in with your new password.
          </p>
          <Link to="/login">
            <Button className="mt-6 w-full h-11">Sign in to your account</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black p-4 font-sans animate-fade-in">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-sm bg-gray-900 dark:bg-white text-[10px] font-bold text-white dark:text-black flex items-center justify-center">
              SH
            </div>
            <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">ServiceHive</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create new password</h2>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your new password below.
          </p>

          {error && (
            <div className="mt-4 rounded-md bg-rose-50 dark:bg-rose-500/10 p-3 text-sm text-rose-600 dark:text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Input
              label="New password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Input
              label="Confirm new password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full h-11"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Updating..." : "Reset password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
