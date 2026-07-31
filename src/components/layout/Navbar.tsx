"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import Container from "./Container";
import { useAuthContext } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const [mobileOpen, setMobileOpen] = useState(false);

    const { user, loading, logout } = useAuthContext();

    const handleLogout = async () => {
        await logout();
        setMobileOpen(false);
        router.push("/");
    };

    const closeMenu = () => setMobileOpen(false);

    const navLinks = [
        {
            href: "/",
            label: "Home",
        },
        {
            href: "/gear",
            label: "Gear",
        },
        {
            href: "/about",
            label: "About",
        },
    ];

    if (loading) {
        return (
            <header className="sticky top-0 z-50 border-b bg-white">
                <Container>
                    <div className="flex h-16 items-center justify-between">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-blue-600"
                        >
                            GearUp
                        </Link>
                    </div>
                </Container>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
            <Container>
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}

                    <Link
                        href="/"
                        className="text-2xl font-bold text-blue-600"
                    >
                        GearUp
                    </Link>

                    {/* Desktop Navigation */}

                    <nav className="hidden items-center gap-8 md:flex">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "transition-colors hover:text-blue-600",
                                    pathname === item.href
                                        ? "font-semibold text-blue-600"
                                        : "text-gray-700"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Buttons */}

                    <div className="hidden items-center gap-3 md:flex">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="rounded-md border px-4 py-2 transition hover:bg-gray-100"
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="rounded-md border px-4 py-2 transition hover:bg-gray-100"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="rounded-md p-2 md:hidden"
                        aria-label="Toggle navigation"
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}

                {mobileOpen && (
                    <div className="border-t py-4 md:hidden">

                        <nav className="flex flex-col gap-2">

                            {navLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className={cn(
                                        "rounded-md px-3 py-2 transition hover:bg-gray-100",
                                        pathname === item.href
                                            ? "bg-blue-50 font-semibold text-blue-600"
                                            : ""
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <div className="mt-3 border-t pt-3">

                                {user ? (
                                    <div className="flex flex-col gap-2">

                                        <Link
                                            href="/dashboard"
                                            onClick={closeMenu}
                                            className="rounded-md border px-3 py-2 text-center"
                                        >
                                            Dashboard
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="rounded-md bg-red-600 px-3 py-2 text-white"
                                        >
                                            Logout
                                        </button>

                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">

                                        <Link
                                            href="/login"
                                            onClick={closeMenu}
                                            className="rounded-md border px-3 py-2 text-center"
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            href="/register"
                                            onClick={closeMenu}
                                            className="rounded-md bg-blue-600 px-3 py-2 text-center text-white"
                                        >
                                            Register
                                        </Link>

                                    </div>
                                )}

                            </div>

                        </nav>

                    </div>
                )}

            </Container>
        </header>
    );
}