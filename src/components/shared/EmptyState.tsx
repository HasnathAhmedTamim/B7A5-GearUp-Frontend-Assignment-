import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon: LucideIcon;
    action?: React.ReactNode;
}

export default function EmptyState({
    title,
    description,
    icon: Icon,
    action,
}: EmptyStateProps) {

    return (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-white px-6 py-16 text-center shadow-sm">

            <div className="mb-5 rounded-full bg-gray-100 p-4">
                <Icon className="h-10 w-10 text-gray-400" />
            </div>


            <h2 className="text-xl font-semibold text-gray-800">
                {title}
            </h2>


            {
                description && (
                    <p className="mt-2 max-w-md text-sm text-gray-500">
                        {description}
                    </p>
                )
            }


            {
                action && (
                    <div className="mt-6">
                        {action}
                    </div>
                )
            }


        </div>
    );
}