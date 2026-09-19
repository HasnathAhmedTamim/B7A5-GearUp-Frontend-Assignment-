"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Mountain, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import Container from "./Container";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuthContext();

    const handleLogout = async () => {
        await logout();
        setMobileOpen(false);
        router.push("/");
        router.refresh();
    };

    const closeMenu = () => setMobileOpen(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/gear", label: "Gear" },
        { href: "/about", label: "About" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="inline-flex items-center gap-2 text-foreground">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                            <Mountain className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="text-xl font-semibold tracking-tight">GearUp</span>
                    </Link>

                    <nav className="hidden items-center gap-1 md:flex">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                                    pathname === item.href
                                        ? "bg-muted text-foreground"
                                        : "text-muted-foreground",
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-2 md:flex">
                        {user ? (
                            <>
                                <Button asChild variant="outline">
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                                <Button variant="destructive" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button asChild variant="ghost">
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/register">Register</Link>
                                </Button>
                            </>
                        )}
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation"
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X /> : <Menu />}
                    </Button>
                </div>

                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t md:hidden"
                        >
                            <nav className="flex flex-col gap-1 py-4">
                                {navLinks.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={closeMenu}
                                        className={cn(
                                            "rounded-xl px-3 py-3 text-sm font-medium",
                                            pathname === item.href
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-muted",
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <div className="mt-3 grid gap-2 border-t pt-3">
                                    {user ? (
                                        <>
                                            <Button asChild variant="outline" className="h-11">
                                                <Link href="/dashboard" onClick={closeMenu}>Dashboard</Link>
                                            </Button>
                                            <Button variant="destructive" className="h-11" onClick={handleLogout}>
                                                Logout
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button asChild variant="outline" className="h-11">
                                                <Link href="/login" onClick={closeMenu}>Login</Link>
                                            </Button>
                                            <Button asChild className="h-11">
                                                <Link href="/register" onClick={closeMenu}>Register</Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Container>
        </header>
    );
}
