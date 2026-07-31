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
    Menu,
    X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/providers/AuthProvider";


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


export default function DashboardSidebar() {

    const pathname = usePathname();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);


    const { user, logout } = useAuthContext();



    // close mobile sidebar after route change
    useEffect(() => {
        setOpen(false);
    }, [pathname]);



    const handleLogout = async () => {

        try {

            setLoggingOut(true);

            await logout();

            router.push("/");

        } finally {

            setLoggingOut(false);

        }

    };



    const sidebarMenus =
        menus[user?.role as keyof typeof menus] ?? [];



    return (
        <>

            {/* Mobile Menu Button */}

            <button
                onClick={() => setOpen(true)}
                className="
                    fixed
                    left-4
                    top-4
                    z-50
                    rounded-lg
                    bg-blue-600
                    p-2
                    text-white
                    shadow-md
                    md:hidden
                "
            >
                <Menu size={22} />
            </button>



            {/* Overlay */}

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/40
                        backdrop-blur-sm
                        md:hidden
                    "
                />
            )}



            {/* Sidebar */}

            <aside
                className={`
                    fixed
                    inset-y-0
                    left-0
                    z-50
                    flex
                    w-64
                    flex-col
                    border-r
                    bg-white
                    transition-transform
                    duration-300

                    ${open
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }

                    md:static
                    md:min-h-screen
                    md:translate-x-0
                `}
            >


                {/* Header */}

                <div className="border-b p-6">


                    <div className="flex items-center justify-between">


                        <h2 className="text-2xl font-bold text-blue-600">
                            GearUp
                        </h2>


                        <button
                            onClick={() => setOpen(false)}
                            className="md:hidden"
                        >
                            <X size={22} />
                        </button>


                    </div>



                    <div className="mt-5">

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-blue-600
                                text-lg
                                font-bold
                                text-white
                            "
                        >
                            {user?.name?.charAt(0)}
                        </div>


                        <p className="mt-3 font-semibold">
                            {user?.name}
                        </p>


                        <span
                            className="
                                mt-1
                                inline-block
                                rounded-full
                                bg-blue-100
                                px-3
                                py-1
                                text-xs
                                font-medium
                                text-blue-700
                            "
                        >
                            {user?.role}
                        </span>


                    </div>


                </div>





                {/* Navigation */}

                <nav className="flex-1 space-y-2 overflow-y-auto p-4">


                    {sidebarMenus.map((menu) => {


                        const Icon = menu.icon;


                        const active =
                            pathname === menu.href ||
                            pathname.startsWith(
                                menu.href + "/"
                            );


                        return (

                            <Link
                                key={menu.href}
                                href={menu.href}
                                className={`
                                    flex
                                    items-center
                                    gap-3
                                    rounded-lg
                                    px-4
                                    py-3
                                    transition

                                    ${active
                                        ?
                                        "bg-blue-600 text-white shadow"
                                        :
                                        "text-gray-700 hover:bg-gray-100"
                                    }
                                `}
                            >

                                <Icon size={18} />

                                <span className="font-medium">
                                    {menu.title}
                                </span>


                            </Link>

                        );


                    })}


                </nav>





                {/* Logout */}

                <div className="border-t p-4">


                    <button
                        disabled={loggingOut}
                        onClick={handleLogout}
                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            bg-red-500
                            px-4
                            py-3
                            text-white
                            transition
                            hover:bg-red-600
                            disabled:cursor-not-allowed
                            disabled:opacity-70
                        "
                    >

                        <LogOut size={18} />

                        {
                            loggingOut
                                ? "Logging out..."
                                : "Logout"
                        }


                    </button>


                </div>


            </aside>

        </>
    );
}