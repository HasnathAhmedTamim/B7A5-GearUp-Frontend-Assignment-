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
    X,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useAuthContext } from "@/providers/AuthProvider";


interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
}


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



export default function DashboardSidebar({
    open,
    setOpen,
}: Props) {


    const pathname = usePathname();

    const router = useRouter();


    const [loggingOut, setLoggingOut] = useState(false);


    const { user, logout } = useAuthContext();



    useEffect(() => {

        setOpen(false);

    }, [pathname, setOpen]);



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

            {/* Overlay */}

            <div
                onClick={() => setOpen(false)}
                className={`
                    fixed
                    inset-0
                    z-40
                    bg-black/40
                    backdrop-blur-sm
                    transition

                    ${open
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    }

                    md:hidden
                `}
            />



            {/* Sidebar */}

            <aside

                className={`
                    fixed
                    inset-y-0
                    left-0
                    z-50
                    flex
                    w-72
                    flex-col
                    border-r
                    bg-white
                    shadow-xl
                    transition-transform
                    duration-300


                    ${open
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }


                    md:static
                    md:w-64
                    md:min-h-screen
                    md:translate-x-0
                    md:shadow-none
                `}

            >



                {/* Header */}

                <div className="border-b p-5">


                    <div className="flex items-center justify-between">


                        <h2 className="text-2xl font-bold text-blue-600">
                            GearUp
                        </h2>



                        <button
                            onClick={() => setOpen(false)}
                            className="rounded-md p-1 hover:bg-gray-100 md:hidden"
                        >
                            <X size={22} />
                        </button>


                    </div>
                    


                    <div className="mt-6 flex items-center gap-3">


                        <div
                            className="
                                flex
                                h-11
                                w-11
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



                        <div>

                            <p className="font-semibold">
                                {user?.name}
                            </p>


                            <span
                                className="
                                    rounded-full
                                    bg-blue-100
                                    px-3
                                    py-1
                                    text-xs
                                    text-blue-700
                                "
                            >
                                {user?.role}
                            </span>


                        </div>


                    </div>


                </div>
                <div className="border-t p-4">


                    <button

                        onClick={handleLogout}

                        disabled={loggingOut}

                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-red-500
                            px-4
                            py-3
                            text-white
                            hover:bg-red-600
                            disabled:opacity-60
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



                {/* Navigation */}


                <nav className="flex-1 space-y-2 overflow-y-auto p-4">


                    {sidebarMenus.map((menu) => {


                        const Icon = menu.icon;


                        const active =
                            pathname === menu.href ||
                            pathname.startsWith(menu.href + "/");



                        return (

                            <Link

                                key={menu.href}

                                href={menu.href}

                                className={`
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    text-sm
                                    font-medium
                                    transition


                                    ${active
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }
                                `}
                            >


                                <Icon size={18} />


                                {menu.title}


                            </Link>

                        );


                    })}


                </nav>





                {/* Logout */}


                {/* <div className="border-t p-4">


                    <button

                        onClick={handleLogout}

                        disabled={loggingOut}

                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-red-500
                            px-4
                            py-3
                            text-white
                            hover:bg-red-600
                            disabled:opacity-60
                        "

                    >

                        <LogOut size={18} />


                        {
                            loggingOut
                                ? "Logging out..."
                                : "Logout"
                        }


                    </button>


                </div> */}


            </aside>


        </>

    );
}