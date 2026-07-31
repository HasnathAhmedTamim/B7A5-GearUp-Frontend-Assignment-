import Image from "next/image";
import Link from "next/link";

import { IGear } from "@/types/gear";

interface GearCardProps {
    gear: IGear;
}

export default function GearCard({ gear }: GearCardProps) {
    return (
        <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Image */}

            <div className="relative h-56 overflow-hidden">
                <Image
                    src={gear.image || "/placeholder-gear.jpg"}
                    alt={gear.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 50vw,
                           33vw"
                />
            </div>

            {/* Content */}

            <div className="space-y-4 p-5">

                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {gear.category.name}
                </span>

                <h3 className="line-clamp-2 min-h-[56px] text-lg font-bold text-gray-900 sm:text-xl">
                    {gear.title}
                </h3>

                <p className="text-sm text-gray-500 sm:text-base">
                    {gear.brand}
                </p>

                <div className="flex items-center justify-between">

                    <span className="text-lg font-bold text-blue-600">
                        ${gear.pricePerDay}
                        <span className="text-sm font-normal text-gray-500">
                            {" "}
                            /day
                        </span>
                    </span>

                    <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${gear.availability
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        {gear.availability
                            ? "Available"
                            : "Unavailable"}
                    </span>

                </div>

                <Link
                    href={`/gear/${gear.id}`}
                    className="block rounded-lg bg-blue-600 py-2.5 text-center font-medium text-white transition hover:bg-blue-700"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
}