import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema, LoginFormValues } from "../features/auth/schema";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAuth } from "../store/auth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    try {
      await login(values);
      navigate("/");
    } catch (err) {
      setError("Unable to sign in. Check credentials and try again.");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-soft">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-sand-400">
            ServiceHive
          </p>
          <h1 className="font-display text-3xl text-ink-900">Sign in</h1>
          <p className="mt-1 text-sm text-ink-500">
            Welcome back. Manage your lead pipeline in one place.
          </p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" error={errors.email?.message} {...register("email")} />
          <Input
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};