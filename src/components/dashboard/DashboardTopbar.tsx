"use client";

import {
    Bell,
    UserCircle,
} from "lucide-react";

import { useAuthContext } from "@/providers/AuthProvider";


export default function DashboardTopbar() {

    const { user } = useAuthContext();


    return (
        <header
            className="
                fixed
                right-0
                top-0
                z-30
                flex
                h-16
                w-full
                items-center
                justify-between
                border-b
                bg-white
                px-4
                md:px-8
                md:pl-72
            "
        >


            {/* Left */}

            <div>

                <h2 className="text-lg font-semibold text-gray-800">
                    Welcome back 👋
                </h2>

            </div>




            {/* Right */}

            <div className="flex items-center gap-5">


                <button
                    className="
                        relative
                        rounded-full
                        p-2
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





                <div
                    className="
                        flex
                        items-center
                        gap-3
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
                            className="text-blue-600"
                            size={28}
                        />
                    </div>



                    <div className="hidden md:block">

                        <p className="text-sm font-semibold">
                            {user?.name}
                        </p>


                        <span
                            className="
                                rounded
                                bg-blue-100
                                px-2
                                py-0.5
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