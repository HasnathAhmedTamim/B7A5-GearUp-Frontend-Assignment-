import Link from "next/link";
import { Gear } from "@/types/gear";

interface GearCardProps {
    gear: Gear;
}

export default function GearCard({ gear }: GearCardProps) {
    return (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <img
                src={gear.image}
                alt={gear.title}
                className="h-56 w-full object-cover"
                // onError={(e) => {
                //     e.currentTarget.src = "/placeholder-gear.jpg";
                // }}
            />

            <div className="space-y-3 p-5">
                <span className="inline-block rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {gear.category.name}
                </span>

                <h3 className="text-xl font-bold">{gear.title}</h3>

                <p className="text-gray-500">{gear.brand}</p>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                        ${gear.pricePerDay}/day
                    </span>

                    <span
                        className={`text-sm font-medium ${gear.availability ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {gear.availability ? "Available" : "Unavailable"}
                    </span>
                </div>

                <Link
                    href={`/gear/${gear.id}`}
                    className="block rounded-lg bg-blue-600 py-2 text-center font-medium text-white transition hover:bg-blue-700"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}