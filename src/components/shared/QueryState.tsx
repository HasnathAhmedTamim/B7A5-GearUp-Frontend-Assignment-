import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface QueryErrorStateProps {
    title: string;
    description?: string;
    onRetry?: () => void;
}

export function QueryErrorState({
    title,
    description,
    onRetry,
}: QueryErrorStateProps) {
    return (
        <div
            role="alert"
            className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-10 text-center"
        >
            <AlertCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold text-foreground">{title}</h2>
            {description && (
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    {description}
                </p>
            )}
            {onRetry && (
                <Button type="button" variant="outline" onClick={onRetry} className="mt-5 h-11 gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Try again
                </Button>
            )}
        </div>
    );
}
