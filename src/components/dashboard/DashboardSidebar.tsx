"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    PlusCircle,
    CalendarDays,
    Users,
    User,
    LogOut,
    X,
    Mountain,
    CreditCard,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const menus = {
    CUSTOMER: [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "My Rentals", href: "/dashboard/customer/rentals", icon: CalendarDays },
        { title: "Payments", href: "/dashboard/customer/payments", icon: CreditCard },
        { title: "Profile", href: "/dashboard/customer/profile", icon: User },
    ],
    PROVIDER: [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "My Gear", href: "/dashboard/provider/my-gear", icon: Package },
        { title: "Add Gear", href: "/dashboard/provider/add-gear", icon: PlusCircle },
        { title: "Rental Orders", href: "/dashboard/provider/orders", icon: CalendarDays },
        { title: "Profile", href: "/dashboard/provider/profile", icon: User },
    ],
    ADMIN: [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "Users", href: "/dashboard/admin/users", icon: Users },
        { title: "Gear", href: "/dashboard/admin/gear", icon: Package },
        { title: "Rentals", href: "/dashboard/admin/rentals", icon: CalendarDays },
        { title: "Categories", href: "/dashboard/admin/categories", icon: Package },
    ],
};

export default function DashboardSidebar({ open, setOpen }: Props) {
    const pathname = usePathname();
    const [loggingOut, setLoggingOut] = useState(false);
    const { user, logout } = useAuthContext();

    useEffect(() => {
        setOpen(false);
    }, [pathname, setOpen]);

    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            await logout();
            window.location.href = "/";
        } finally {
            setLoggingOut(false);
        }
    };

    const sidebarMenus = menus[user?.role as keyof typeof menus] ?? [];

    return (
        <>
            <button
                type="button"
                aria-label="Close sidebar"
                onClick={() => setOpen(false)}
                className={cn(
                    "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition md:hidden",
                    open ? "visible opacity-100" : "invisible opacity-0",
                )}
            />

            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 md:static md:w-64 md:min-h-screen md:translate-x-0",
                    open ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="border-b border-sidebar-border p-5">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                                <Mountain className="h-4 w-4" />
                            </span>
                            <span className="text-lg font-semibold">GearUp</span>
                        </Link>
                        <Button type="button" variant="ghost" size="icon" className="text-sidebar-foreground md:hidden" onClick={() => setOpen(false)}>
                            <X />
                        </Button>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold">
                            {user?.name?.charAt(0)}
                        </div>
                        <div>
                            <p className="font-medium">{user?.name}</p>
                            <span className="text-xs text-sidebar-foreground/70">{user?.role}</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                    {sidebarMenus.map((menu) => {
                        const Icon = menu.icon;
                        const active = pathname === menu.href || pathname.startsWith(menu.href + "/");
                        return (
                            <Link
                                key={menu.href}
                                href={menu.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                                    active
                                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent",
                                )}
                            >
                                <Icon size={18} />
                                {menu.title}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-sidebar-border p-4">
                    <Button
                        type="button"
                        variant="destructive"
                        className="h-11 w-full"
                        onClick={handleLogout}
                        disabled={loggingOut}
                    >
                        <LogOut size={16} />
                        {loggingOut ? "Logging out..." : "Logout"}
                    </Button>
                </div>
            </aside>
        </>
    );
}
