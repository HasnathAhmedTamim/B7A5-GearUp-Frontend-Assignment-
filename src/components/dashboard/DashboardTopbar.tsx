"use client";

import Link from "next/link";
import { Home, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export default function DashboardTopbar({ open, setOpen }: Props) {
    const { user } = useAuthContext();

    return (
        <header className="fixed top-0 right-0 left-0 z-30 flex h-16 items-center justify-between border-b bg-background/90 px-4 backdrop-blur-md md:left-64 md:px-8">
            <div className="flex items-center gap-3">
                <Button
                    type="button"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setOpen(!open)}
                    aria-label="Open sidebar"
                    aria-expanded={open}
                >
                    <Menu />
                </Button>
                <Button asChild variant="outline">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <Home size={16} />
                        <span className="hidden sm:inline">Home</span>
                    </Link>
                </Button>
                <p className="hidden text-sm text-muted-foreground lg:block">
                    Welcome back, <span className="font-medium text-foreground">{user?.name}</span>
                </p>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {user?.name?.charAt(0)}
                </div>
                <div className="hidden md:block">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{user?.role}</p>
                </div>
            </div>
        </header>
    );
}
