import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
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
      navigate("/app");
    } catch (err) {
      setError("Unable to sign in. Check credentials and try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-black px-6">
      <div className="w-full max-w-sm space-y-8 animate-fade-in">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Sign in to ServiceHive</h2>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back. Please enter your details.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="name@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm"></div>
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          {error ? (
            <div className="rounded-md bg-rose-50 dark:bg-rose-500/10 p-3 text-sm text-rose-500 dark:text-rose-400">
              {error}
            </div>
          ) : null}

          <Button type="submit" disabled={isSubmitting} className="w-full h-11 text-sm">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-gray-900 dark:text-white hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};