"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mountain } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/auth/auth.api";
import { useAuthContext } from "@/providers/AuthProvider";
import { getErrorMessage } from "@/utils/getErrorMessage";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const { refreshUser } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (res) => {
      toast.success(res.message || "Login successful");
      await refreshUser();
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
    >
      <Link href="/" className="mb-6 inline-flex items-center gap-2 font-semibold">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Mountain className="h-4 w-4" />
        </span>
        GearUp
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">Login to manage rentals, payments, and listings.</p>

      <form onSubmit={handleSubmit((data) => mutate(data))} className="mt-8 space-y-5" noValidate>
        <div>
          <label htmlFor="login-email" className="mb-2 block text-sm font-medium">Email</label>
          <Input
            id="login-email"
            type="email"
            className="h-11"
            placeholder="you@email.com"
            aria-invalid={!!errors.email}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="login-password" className="mb-2 block text-sm font-medium">Password</label>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              className="h-11 pr-12"
              placeholder="Enter your password"
              aria-invalid={!!errors.password}
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="mt-2 text-sm text-destructive">{errors.password.message}</p>}
        </div>
        <Button type="submit" disabled={isPending} className="h-11 w-full">
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">Register</Link>
      </p>
    </motion.div>
  );
}
