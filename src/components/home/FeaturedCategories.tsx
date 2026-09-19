"use client";

import Link from "next/link";
import { Bike, Dumbbell, Tent, Waves, Volleyball, Snowflake } from "lucide-react";

import Container from "../layout/Container";
import { FadeIn, Stagger, StaggerItem, MotionCard } from "@/components/shared/Motion";

const categories = [
    { title: "Cycling", icon: Bike, description: "Mountain bikes, road bikes and accessories." },
    { title: "Fitness", icon: Dumbbell, description: "Gym equipment for your workout." },
    { title: "Camping", icon: Tent, description: "Tents, packs and camp essentials." },
    { title: "Water Sports", icon: Waves, description: "Kayaks, surfboards and more." },
    { title: "Team Sports", icon: Volleyball, description: "Football, cricket, badminton and more." },
    { title: "Winter Sports", icon: Snowflake, description: "Skiing and snowboarding equipment." },
];

export default function FeaturedCategories() {
    return (
        <section className="py-16 sm:py-20">
            <Container>
                <FadeIn className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Catalog</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Featured categories</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                        Explore the most requested sports and outdoor collections.
                    </p>
                </FadeIn>

                <Stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <StaggerItem key={category.title}>
                                <MotionCard>
                                    <Link
                                        href="/gear"
                                        className="block h-full rounded-2xl border bg-card p-6 shadow-sm"
                                    >
                                        <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                                            <Icon size={28} aria-hidden="true" />
                                        </div>
                                        <h3 className="text-xl font-semibold">{category.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
                                    </Link>
                                </MotionCard>
                            </StaggerItem>
                        );
                    })}
                </Stagger>
            </Container>
        </section>
    );
}
