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
      navigate("/app");
    } catch (err) {
      setError("Unable to create account. Email might already be in use.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-black px-6">
      <div className="w-full max-w-sm space-y-8 animate-fade-in">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white dark:text-black">Create an account</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Start managing your leads perfectly.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input 
              label="Name" 
              placeholder="Jane Doe"
              error={errors.name?.message} 
              {...register("name")} 
            />
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

          {error ? (
            <div className="rounded-md bg-rose-500/10 p-3 text-sm text-rose-500">
              {error}
            </div>
          ) : null}

          <Button type="submit" disabled={isSubmitting} className="w-full h-11 text-sm">
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-gray-900 dark:text-white dark:text-black hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
