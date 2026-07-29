"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Container from "./Container";
import { useAuthContext } from "@/providers/AuthProvider";

export default function Navbar() {
    const router = useRouter();

    const { user, loading, logout } = useAuthContext();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    if (loading) {
        return (
            <header className="sticky top-0 z-50 border-b bg-white">
                <Container>
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            GearUp
                        </Link>
                    </div>
                </Container>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 border-b bg-white">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        GearUp
                    </Link>

                    <nav className="hidden gap-6 md:flex">
                        <Link href="/">Home</Link>
                        <Link href="/gear">Gear</Link>
                        <Link href="/about">About</Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="rounded-md border px-4 py-2"
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="rounded-md bg-red-600 px-4 py-2 text-white"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="rounded-md border px-4 py-2"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="rounded-md bg-blue-600 px-4 py-2 text-white"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
}