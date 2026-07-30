"use client";

import AddGearForm from "@/components/forms/AddGearForm";

export default function AddGearPage() {
    return (
        <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-3xl font-bold">
                Add New Gear
            </h1>

            <AddGearForm />
        </div>
    );
}