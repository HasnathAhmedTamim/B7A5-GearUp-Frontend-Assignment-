"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

import { useAuthContext } from "@/providers/AuthProvider";

interface Props {
    children: ReactNode;
}

export default function DashboardLayout({
    children,
}: Props) {

    const router = useRouter();

    const { user, loading } = useAuthContext();

    const [sidebarOpen, setSidebarOpen] = useState(false);


    useEffect(() => {

        if (!loading && !user) {
            router.push("/login");
        }

    }, [user, loading, router]);



    if (loading || !user) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">

                <p className="text-gray-500">
                    Checking authentication...
                </p>

            </div>
        );

    }



    return (

        <div className="flex min-h-screen w-full overflow-x-hidden bg-gray-100">


            <DashboardSidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />



            <div className="flex min-w-0 flex-1 flex-col">


                <DashboardTopbar
                    open={sidebarOpen}
                    setOpen={setSidebarOpen}
                />



                <main
                    className="
                        min-w-0
                        flex-1
                        overflow-x-hidden
                        p-4
                        pt-20
                        sm:p-5
                        md:p-8
                        md:pt-24
                    "
                >

                    <div className="w-full max-w-full">

                        {children}

                    </div>

                </main>


            </div>


        </div>

    );
}