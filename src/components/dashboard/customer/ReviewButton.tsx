"use client";

import { useState } from "react";

import ReviewModal from "./ReviewModal";

interface ReviewButtonProps {
    rental: {
        gearId: string;
        status: string;
        reviewed: boolean;
    };
}

export default function ReviewButton({
    rental,
}: ReviewButtonProps) {
    const [open, setOpen] = useState(false);

    // Only returned rentals can be reviewed
    if (rental.status !== "RETURNED") {
        return (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                Not Available
            </span>
        );
    }

    // Already reviewed
    if (rental.reviewed) {
        return (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Reviewed ✓
            </span>
        );
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
                Leave Review
            </button>

            <ReviewModal
                open={open}
                onClose={() => setOpen(false)}
                gearId={rental.gearId}
            />
        </>
    );
}