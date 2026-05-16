import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema, RegisterFormValues } from "../features/auth/schema";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAuth } from "../store/auth";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setError(null);
    try {
      await registerUser(values);
      navigate("/");
    } catch (err) {
      setError("Unable to create account. Email might already be in use.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-soft backdrop-blur-xl border border-white/20">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-500 mb-2">
            ServiceHive
          </p>
          <h1 className="font-display text-4xl text-ink-900 mb-2 tracking-tight">Create Account</h1>
          <p className="text-sm text-ink-500">
            Join us and start managing your leads like a pro.
          </p>
        </div>
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Name" error={errors.name?.message} {...register("name")} />
          <Input label="Email" error={errors.email?.message} {...register("email")} />
          <Input
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />
          {error ? <p className="text-sm font-medium text-rose-500">{error}</p> : null}
          <Button type="submit" disabled={isSubmitting} className="mt-2 h-12 text-base shadow-brand-500/20 shadow-lg">
            {isSubmitting ? "Creating account..." : "Sign up"}
          </Button>
          <p className="text-center text-sm text-ink-500 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-brand-500 hover:text-brand-700 underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
