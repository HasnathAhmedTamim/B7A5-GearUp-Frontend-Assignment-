import {
    Ban,
    CheckCircle2,
    Clock3,
    CreditCard,
    PackageCheck,
    RotateCcw,
    Truck,
} from "lucide-react";

import { cn } from "@/lib/utils";

const STATUS_MAP = {
    PLACED: {
        label: "Placed",
        icon: Clock3,
        className: "border-amber-200 bg-amber-50 text-amber-900",
    },
    CONFIRMED: {
        label: "Confirmed",
        icon: CheckCircle2,
        className: "border-sky-200 bg-sky-50 text-sky-900",
    },
    PAID: {
        label: "Paid",
        icon: CreditCard,
        className: "border-emerald-200 bg-emerald-50 text-emerald-900",
    },
    PICKED_UP: {
        label: "Picked up",
        icon: Truck,
        className: "border-violet-200 bg-violet-50 text-violet-900",
    },
    RETURNED: {
        label: "Returned",
        icon: RotateCcw,
        className: "border-emerald-200 bg-emerald-50 text-emerald-900",
    },
    CANCELLED: {
        label: "Cancelled",
        icon: Ban,
        className: "border-red-200 bg-red-50 text-red-800",
    },
    REJECTED: {
        label: "Rejected",
        icon: Ban,
        className: "border-red-200 bg-red-50 text-red-800",
    },
    COMPLETED: {
        label: "Completed",
        icon: CheckCircle2,
        className: "border-emerald-200 bg-emerald-50 text-emerald-900",
    },
    PENDING: {
        label: "Pending",
        icon: Clock3,
        className: "border-amber-200 bg-amber-50 text-amber-900",
    },
    FAILED: {
        label: "Failed",
        icon: Ban,
        className: "border-red-200 bg-red-50 text-red-800",
    },
} as const;

type KnownStatus = keyof typeof STATUS_MAP;

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = STATUS_MAP[status as KnownStatus] ?? {
        label: status.replaceAll("_", " "),
        icon: PackageCheck,
        className: "border-border bg-muted text-foreground",
    };

    const Icon = config.icon;

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold capitalize",
                config.className,
                className,
            )}
        >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {config.label}
        </span>
    );
}

export function getRentalNextStep(status: string, hasPayment: boolean) {
    if (hasPayment && status === "PAID") {
        return "Payment received. Wait for pickup instructions from the provider.";
    }

    switch (status) {
        case "PLACED":
            return "Waiting for the provider to confirm this rental.";
        case "CONFIRMED":
            return "Provider confirmed. Pay now to secure the booking.";
        case "PAID":
            return "Ready for pickup.";
        case "PICKED_UP":
            return "This gear is currently with you. Return it by the end date.";
        case "RETURNED":
            return "Rental completed. You can leave a review.";
        case "CANCELLED":
            return "This rental was cancelled.";
        case "REJECTED":
            return "The provider declined this rental request.";
        default:
            return "Track this booking from your rental history.";
    }
}
