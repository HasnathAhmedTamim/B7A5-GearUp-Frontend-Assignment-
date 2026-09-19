"use client";

import { ShieldCheck, Truck, Wallet, Clock3 } from "lucide-react";

import Container from "../layout/Container";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/Motion";

const features = [
    {
        icon: ShieldCheck,
        title: "Verified providers",
        description: "Rent from trusted listings with clear availability and stock.",
    },
    {
        icon: Truck,
        title: "Simple pickup",
        description: "Coordinate pickup after payment is confirmed.",
    },
    {
        icon: Wallet,
        title: "Pay for the days you need",
        description: "Transparent daily rates before you request a rental.",
    },
    {
        icon: Clock3,
        title: "Quick booking",
        description: "Choose dates, submit a request, then checkout when confirmed.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="bg-muted/50 py-16 sm:py-20">
            <Container>
                <FadeIn className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Why GearUp</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Built for a clean rental flow</h2>
                    <p className="mt-3 text-muted-foreground">Browse, request, pay, and return — without extra steps.</p>
                </FadeIn>

                <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <StaggerItem key={feature.title}>
                                <div className="h-full rounded-2xl border bg-card p-6 text-center shadow-sm">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Icon size={24} aria-hidden="true" />
                                    </div>
                                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </Stagger>
            </Container>
        </section>
    );
}
