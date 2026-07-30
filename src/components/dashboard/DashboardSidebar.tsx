"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    PlusCircle,
    CalendarDays,
    Users,
    User,
    LogOut,
} from "lucide-react";

import { useAuthContext } from "@/providers/AuthProvider";

export default function DashboardSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const { user, logout } = useAuthContext();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    const menus = {
        CUSTOMER: [
            {
                title: "Dashboard",
                href: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "My Rentals",
                href: "/dashboard/customer/rentals",
                icon: CalendarDays,
            },
            {
                title: "Payments",
                href: "/dashboard/customer/payments",
                icon: Package,
            },
            {
                title: "Profile",
                href: "/dashboard/customer/profile",
                icon: User,
            },
        ],

        PROVIDER: [
            {
                title: "Dashboard",
                href: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "My Gear",
                href: "/dashboard/provider/my-gear",
                icon: Package,
            },
            {
                title: "Add Gear",
                href: "/dashboard/provider/add-gear",
                icon: PlusCircle,
            },
            {
                title: "Rental Orders",
                href: "/dashboard/provider/orders",
                icon: CalendarDays,
            },
            {
                title: "Profile",
                href: "/dashboard/provider/profile",
                icon: User,
            },
        ],

        ADMIN: [
            {
                title: "Dashboard",
                href: "/dashboard", 
                icon: LayoutDashboard,
            },
            {
                title: "Users",
                href: "/dashboard/admin/users",
                icon: Users,
            },
            {
                title: "Gear",
                href: "/dashboard/admin/gear",
                icon: Package,
            },
            {
                title: "Rentals",
                href: "/dashboard/admin/rentals",
                icon: CalendarDays,
            },
            {
                title: "Categories",
                href: "/dashboard/admin/categories",
                icon: Package,
            },
        ],
    };

    const sidebarMenus =
        menus[user?.role as keyof typeof menus] ?? [];

    return (
        <aside className="flex min-h-screen w-64 flex-col border-r bg-white">
            {/* Logo & User */}
            <div className="border-b p-6">
                <h2 className="text-2xl font-bold text-blue-600">
                    GearUp
                </h2>

                <p className="mt-3 font-medium">
                    {user?.name}
                </p>

                <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    {user?.role}
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 p-4">
                {sidebarMenus.map((menu) => {
                    const Icon = menu.icon;

                    const active =
                        pathname === menu.href ||
                        pathname.startsWith(menu.href + "/");

                    return (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${active
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <Icon size={18} />
                            <span>{menu.title}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="border-t p-4">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 text-white transition hover:bg-red-600"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}