"use client";

import Image from "next/image";
import { Star } from "lucide-react";

import Container from "../layout/Container";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/Motion";

const testimonials = [
    {
        id: 1,
        name: "Sarah Ahmed",
        role: "Adventure enthusiast",
        image: "https://i.pravatar.cc/150?img=32",
        review: "GearUp made my camping trip effortless. The equipment quality was excellent and booking was straightforward.",
    },
    {
        id: 2,
        name: "Rakib Hasan",
        role: "Cyclist",
        image: "https://i.pravatar.cc/150?img=15",
        review: "Instead of buying an expensive bike, I rented one for the weekend. Clear pricing and a smooth checkout.",
    },
    {
        id: 3,
        name: "Nusrat Jahan",
        role: "Fitness trainer",
        image: "https://i.pravatar.cc/150?img=45",
        review: "The catalog is easy to scan, and I could see availability before requesting a rental.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-16 sm:py-20">
            <Container>
                <FadeIn className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What customers say</h2>
                    <p className="mt-3 text-muted-foreground">Trusted by sports lovers across the country.</p>
                </FadeIn>

                <Stagger className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {testimonials.map((item) => (
                        <StaggerItem key={item.id}>
                            <article className="h-full rounded-2xl border bg-card p-6 shadow-sm">
                                <div className="mb-4 flex gap-1" aria-label="5 out of 5 stars">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Star key={index} size={16} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                                    ))}
                                </div>
                                <p className="text-sm leading-7 text-muted-foreground sm:text-base">“{item.review}”</p>
                                <div className="mt-6 flex items-center gap-3">
                                    <Image
                                        src={item.image}
                                        alt={`${item.name} profile photo`}
                                        width={48}
                                        height={48}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">{item.role}</p>
                                    </div>
                                </div>
                            </article>
                        </StaggerItem>
                    ))}
                </Stagger>
            </Container>
        </section>
    );
}
