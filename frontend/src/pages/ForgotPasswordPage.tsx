import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues
} from "../features/auth/schema";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export const ForgotPasswordPage = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setError(null);
    setStatus("sending");

    try {
      const token = btoa(values.email);
      const templateParams = {
        email: values.email,
        name: values.email.split("@")[0],
        reset_link: `${window.location.origin}/reset-password-confirm?token=${token}`
      };

      await emailjs.send(
        "service_llo9dcm",
        "template_synj5zx",
        templateParams,
        "v_FwKmoBH7cVNPOZs"
      );
      
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setError("Unable to send the reset email. Try again soon.");
      setStatus("error");
    }
  };

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
          {status === "sent" ? (
            <div className="text-center animate-fade-in">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10">
                <svg className="h-6 w-6 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Check your email</h2>
              <p className="mt-2 text-sm text-gray-500">
                We've sent a password reset link to <span className="font-medium text-gray-900 dark:text-white">your email address</span>.
              </p>
              <Link to="/login">
                <Button className="mt-6 w-full h-11">Return to sign in</Button>
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Reset password</h2>
              <p className="mt-2 text-sm text-gray-500">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {error && (
                <div className="mt-4 rounded-md bg-rose-50 dark:bg-rose-500/10 p-3 text-sm text-rose-600 dark:text-rose-400">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <Input
                  label="Email address"
                  type="email"
                  placeholder="name@company.com"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={isSubmitting || status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send reset link"}
                </Button>
              </form>
              
              <p className="mt-6 text-center text-sm text-gray-500">
                Remember your password?{" "}
                <Link to="/login" className="font-medium text-gray-900 dark:text-white hover:underline">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
