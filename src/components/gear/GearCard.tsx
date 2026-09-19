"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IGear } from "@/types/gear";

interface GearCardProps {
    gear: IGear;
}

export default function GearCard({ gear }: GearCardProps) {
    const reduce = useReducedMotion();
    const available = Boolean(gear.availability && gear.stock > 0);
    const reviewCount = gear.reviews?.length ?? 0;
    const averageRating =
        reviewCount > 0
            ? (gear.reviews!.reduce((sum, review) => sum + review.rating, 0) / reviewCount).toFixed(1)
            : null;

    return (
        <motion.article
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            whileHover={reduce ? undefined : { y: -4 }}
            transition={{ duration: 0.25 }}
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                    src={gear.image || "/placeholder-gear.jpg"}
                    alt={`${gear.title} rental photo`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute left-3 top-3">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                        {gear.category.name}
                    </Badge>
                </div>
                <div className="absolute bottom-3 right-3">
                    <Badge variant={available ? "secondary" : "destructive"} className={available ? "bg-primary text-primary-foreground" : undefined}>
                        {available ? "Available to rent" : "Unavailable"}
                    </Badge>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="mb-2 flex items-center justify-between gap-3 text-sm text-muted-foreground">
                    <p className="truncate font-medium">{gear.brand}</p>
                    <p>{gear.stock} in stock</p>
                </div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight">{gear.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{gear.description}</p>
                {averageRating && (
                    <p className="mt-3 text-sm text-muted-foreground">
                        Rated {averageRating} from {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                    </p>
                )}
                <div className="mt-auto pt-4">
                    <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Daily rate</p>
                    <p className="mt-1 text-2xl font-semibold">
                        ৳ {gear.pricePerDay}
                        <span className="ml-1 text-sm font-medium text-muted-foreground">/ day</span>
                    </p>
                    <Button asChild size="lg" className="mt-4 h-11 w-full">
                        <Link href={`/gear/${gear.id}`}>View details</Link>
                    </Button>
                </div>
            </div>
        </motion.article>
    );
}
