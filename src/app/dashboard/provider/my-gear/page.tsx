"use client";

import MyGearTable from "@/components/providers/MyGearTable";


export default function MyGearPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    My Gear
                </h1>

                <p className="text-gray-500">
                    Manage all your listed gear.
                </p>
            </div>

            <MyGearTable />
        </div>
    );
}