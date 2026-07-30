"use client";

import EditGearForm from "@/components/forms/EditGearForm";

export default function EditGearPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Edit Gear</h1>
                <p className="text-gray-500">
                    Update your gear information.
                </p>
            </div>

            <EditGearForm />
        </div>
    );
}