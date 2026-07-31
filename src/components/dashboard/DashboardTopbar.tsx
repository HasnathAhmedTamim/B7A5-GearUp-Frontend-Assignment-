"use client";

import Link from "next/link";

import {
    Bell,
    Home,
    Menu,
    UserCircle,
} from "lucide-react";

import { useAuthContext } from "@/providers/AuthProvider";


interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
}


export default function DashboardTopbar({
    open,
    setOpen,
}: Props) {


    const { user } = useAuthContext();



    return (

        <header
            className="
                fixed
                top-0
                right-0
                left-0
                z-30
                flex
                h-16
                items-center
                justify-between
                border-b
                bg-white
                px-4
                shadow-sm

                md:left-64
                md:px-8
            "
        >


            {/* Left Section */}

            <div className="flex items-center gap-3">


                {/* Mobile Menu Button */}

                <button
                    onClick={() => setOpen(!open)}
                    className="
                        rounded-lg
                        bg-blue-600
                        p-2
                        text-white
                        shadow
                        transition
                        hover:bg-blue-700
                        md:hidden
                    "
                >
                    <Menu size={20} />
                </button>



                {/* Home Button */}

                <Link
                    href="/"
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        px-3
                        py-2
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-100
                    "
                >

                    <Home size={18} />


                    <span className="hidden sm:inline">
                        Home
                    </span>


                </Link>




                {/* Welcome */}

                <div className="hidden lg:block">


                    <h2 className="text-lg font-semibold text-gray-800">
                        Welcome back 👋
                    </h2>


                </div>


            </div>






            {/* Right Section */}


            <div className="flex items-center gap-3 sm:gap-5">



                {/* Notification */}

                <button
                    className="
                        relative
                        rounded-full
                        p-2
                        transition
                        hover:bg-gray-100
                    "
                >

                    <Bell size={20} />


                    <span
                        className="
                            absolute
                            right-1
                            top-1
                            h-2
                            w-2
                            rounded-full
                            bg-red-500
                        "
                    />


                </button>





                {/* User */}

                <div
                    className="
                        flex
                        items-center
                        gap-2
                    "
                >



                    <div
                        className="
                            rounded-full
                            bg-blue-100
                            p-2
                        "
                    >

                        <UserCircle
                            size={28}
                            className="text-blue-600"
                        />

                    </div>





                    <div className="hidden md:block">


                        <p className="text-sm font-semibold">
                            {user?.name}
                        </p>



                        <span
                            className="
                                rounded-full
                                bg-blue-100
                                px-2
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


        </header>

    );
}