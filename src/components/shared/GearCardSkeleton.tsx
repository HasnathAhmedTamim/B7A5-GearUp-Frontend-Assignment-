import { Skeleton } from "@/components/ui/skeleton";

export default function GearCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border bg-card" aria-hidden="true">
            <Skeleton className="aspect-[4/3] w-full rounded-none" />
            <div className="space-y-3 p-5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-11 w-full" />
            </div>
        </div>
    );
}
