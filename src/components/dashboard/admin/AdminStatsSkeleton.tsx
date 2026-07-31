import { Skeleton } from "@/components/ui/skeleton";

export default function AdminStatsSkeleton() {
    return (
        <div className="space-y-8">
            <div>
                <Skeleton className="h-8 w-60" />
                <Skeleton className="mt-2 h-4 w-96" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-16" />
                            </div>

                            <Skeleton className="h-14 w-14 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <Skeleton className="mb-6 h-6 w-48" />

                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}