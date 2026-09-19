import { ReactNode } from "react";

interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    description?: string;
    action?: ReactNode;
}

export default function SectionHeader({
    eyebrow,
    title,
    description,
    action,
}: SectionHeaderProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
                {eyebrow && (
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {eyebrow}
                    </p>
                )}
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                        {description}
                    </p>
                )}
            </div>
            {action}
        </div>
    );
}
