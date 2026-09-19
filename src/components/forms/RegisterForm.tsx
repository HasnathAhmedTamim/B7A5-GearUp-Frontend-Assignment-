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
import { registerUser, RegisterPayload } from "@/services/auth/auth.api";
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
            <h1 className="text-3xl font-semibold tracking-tight">Create account</h1>
            <p className="mt-2 text-sm text-muted-foreground">Join GearUp to rent or list sports gear.</p>

            <form onSubmit={handleSubmit((data) => mutate(data))} className="mt-8 space-y-5" noValidate>
                <div>
                    <label htmlFor="reg-name" className="mb-2 block text-sm font-medium">Full name</label>
                    <Input id="reg-name" className="h-11" placeholder="Your name" {...register("name", { required: "Name is required" })} />
                    {errors.name && <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="reg-email" className="mb-2 block text-sm font-medium">Email</label>
                    <Input id="reg-email" type="email" className="h-11" placeholder="you@email.com" {...register("email", { required: "Email is required" })} />
                    {errors.email && <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="reg-password" className="mb-2 block text-sm font-medium">Password</label>
                    <div className="relative">
                        <Input
                            id="reg-password"
                            type={showPassword ? "text" : "password"}
                            className="h-11 pr-12"
                            placeholder="At least 6 characters"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                            })}
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
                    {isPending ? "Creating account..." : "Create account"}
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">Login</Link>
            </p>
        </motion.div>
    );
}
