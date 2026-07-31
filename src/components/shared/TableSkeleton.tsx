import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
    rows?: number;
    columns?: number;
}

export default function TableSkeleton({
    rows = 5,
    columns = 5,
}: TableSkeletonProps) {
    return (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

            {/* Header */}
            <div className="grid grid-cols-5 gap-4 border-b bg-gray-50 p-4">
                {Array.from({ length: columns }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-5 w-24"
                    />
                ))}
            </div>


            {/* Rows */}
            <div className="divide-y">

                {Array.from({ length: rows }).map((_, rowIndex) => (

                    <div
                        key={rowIndex}
                        className="grid grid-cols-5 gap-4 p-4"
                    >

                        {Array.from({
                            length: columns,
                        }).map((_, colIndex) => (

                            <Skeleton
                                key={colIndex}
                                className="h-5 w-full"
                            />

                        ))}

                    </div>

                ))}

            </div>

        </div>
    );
}