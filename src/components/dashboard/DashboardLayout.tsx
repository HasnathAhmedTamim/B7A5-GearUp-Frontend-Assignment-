"use client";

import { ReactNode, useEffect } from "react";
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



    useEffect(() => {

        if (!loading && !user) {
            router.push("/login");
        }

    }, [user, loading, router]);




    if (loading || !user) {

        return (
            <div className="flex min-h-screen items-center justify-center">

                <p className="text-gray-500">
                    Checking authentication...
                </p>

            </div>
        );

    }



    return (

        <div className="flex min-h-screen bg-gray-100">


            <DashboardSidebar />

            <DashboardTopbar />


            <main
                className="
                    flex-1
                    p-4
                    pt-24
                    md:p-8
                    md:pt-24
                "
            >

                {children}

            </main>


        </div>

    );
}