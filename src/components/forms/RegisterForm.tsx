"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    registerUser,
    RegisterPayload,
} from "@/services/auth/auth.api";

type RegisterFormData = RegisterPayload;

export default function RegisterForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const { mutate, isPending } = useMutation({
        mutationFn: registerUser,

        onSuccess: (res) => {
            toast.success(res.message || "Registration successful");

            router.push("/login");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Registration failed"
            );
        },
    });

    const onSubmit = (data: RegisterFormData) => {
        mutate(data);
    };

    return (
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
            <h1 className="text-center text-3xl font-bold">
                Create Account
            </h1>

            <p className="mt-2 text-center text-gray-500">
                Join GearUp today
            </p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
            >
                <div>
                    <label className="mb-2 block font-medium">
                        Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        {...register("name", {
                            required: "Name is required",
                        })}
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                    />

                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>

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
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                    />

                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                    />

                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
                >
                    {isPending ? "Creating Account..." : "Register"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-blue-600 hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>
    );
}