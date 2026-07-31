export default function GearCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Image */}
            <div className="h-56 w-full animate-pulse bg-gray-200" />

            <div className="space-y-4 p-5">
                {/* Category */}
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                {/* Title */}
                <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
                </div>

                {/* Price & Availability */}
                <div className="flex items-center justify-between pt-2">
                    <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
                    <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
                </div>

                {/* Button */}
                <div className="pt-2">
                    <div className="h-11 w-full animate-pulse rounded-lg bg-gray-300" />
                </div>
            </div>
        </div>
    );
}