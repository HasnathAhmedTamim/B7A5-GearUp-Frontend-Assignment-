import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon: LucideIcon;
    action?: ReactNode;
}

export default function EmptyState({
    title,
    description,
    icon: Icon,
    action,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-6 py-12 text-center sm:py-16">
            <div className="mb-4 rounded-full bg-muted p-3">
                <Icon className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
            </div>

            <h2 className="text-xl font-semibold text-foreground">{title}</h2>

            {description && (
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    {description}
                </p>
            )}

            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}
