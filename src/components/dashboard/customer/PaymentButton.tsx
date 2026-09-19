"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/services/payment/payment.api";
import { getErrorMessage } from "@/utils/getErrorMessage";

type PaymentButtonProps = {
    rental: {
        id: string;
        payment: { id: string } | null;
        status: string;
    };
};

export default function PaymentButton({ rental }: PaymentButtonProps) {
    const { mutate, isPending } = useMutation({
        mutationFn: () => createCheckoutSession(rental.id),
        onSuccess: (data) => {
            toast.success("Opening secure checkout...");
            window.location.href = data.checkoutUrl;
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    if (rental.payment) {
        return (
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                Paid
            </span>
        );
    }

    if (rental.status === "CONFIRMED") {
        return (
            <Button
                type="button"
                onClick={() => mutate()}
                disabled={isPending}
                aria-busy={isPending}
                className="h-11 w-full sm:w-auto"
            >
                {isPending ? "Redirecting to checkout..." : "Pay now"}
            </Button>
        );
    }

    if (rental.status === "PLACED") {
        return (
            <span className="text-sm text-muted-foreground">
                Payment opens after confirmation
            </span>
        );
    }

    return null;
}
