"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    registerUser,
    RegisterPayload,
} from "@/services/auth/auth.api";
import { getErrorMessage } from "@/utils/getErrorMessage";

type RegisterFormData = RegisterPayload;

export default function RegisterForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const { mutate, isPending } = useMutation({
        mutationFn: registerUser,

        onSuccess: (res) => {
            toast.success(res.message || "Registration successful. Please login.");
            router.push("/login");
        },

        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    const onSubmit = (data: RegisterFormData) => {
        mutate(data);
    };

    return (
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">

            {/* Heading */}

            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    Create Account
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                    Join GearUp and start renting sports gear today.
                </p>
            </div>

            {/* Form */}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
            >

                {/* Name */}

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Full Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        {...register("name", {
                            required: "Name is required",
                        })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.name && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Email */}

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Email Address
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.email && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Password
                    </label>

                    <div className="relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 transition hover:text-blue-600"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>

                    </div>

                    {errors.password && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Submit */}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isPending
                        ? "Creating Account..."
                        : "Create Account"}
                </button>

            </form>

            {/* Footer */}

            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-blue-600 transition hover:underline"
                >
                    Login
                </Link>
            </p>

        </div>
    );
}