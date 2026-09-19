"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import ReviewModal from "./ReviewModal";

interface ReviewButtonProps {
    rental: {
        gearId: string;
        status: string;
        reviewed: boolean;
    };
}

export default function ReviewButton({ rental }: ReviewButtonProps) {
    const [open, setOpen] = useState(false);

    if (rental.status !== "RETURNED") {
        return null;
    }

    if (rental.reviewed) {
        return (
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                Reviewed
            </span>
        );
    }

    return (
        <>
            <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(true)}
                className="h-11 w-full sm:w-auto"
            >
                Leave a review
            </Button>

            <ReviewModal
                open={open}
                onClose={() => setOpen(false)}
                gearId={rental.gearId}
            />
        </>
    );
}
