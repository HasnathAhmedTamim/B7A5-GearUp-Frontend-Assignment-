"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { loginUser } from "@/services/auth/auth.api";
import { useAuthContext } from "@/providers/AuthProvider";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const { refreshUser } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,

    onSuccess: async (res) => {
      toast.success(res.message || "Login successful");

      // Refresh logged in user
      await refreshUser();

      // Redirect to home
      router.push("/");
      router.refresh();
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="text-center text-3xl font-bold">
        Welcome Back
      </h1>

      <p className="mt-2 text-center text-gray-500">
        Login to your GearUp account
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
      >
        {/* Email */}
        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}