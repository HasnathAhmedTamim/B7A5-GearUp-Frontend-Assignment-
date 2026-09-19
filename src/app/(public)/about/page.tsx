"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/Motion";

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="py-14 sm:py-20">
                <Container>
                    <div className="mx-auto max-w-4xl">
                        <FadeIn className="text-center">
                            <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                                About GearUp
                            </span>
                            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                                Sports and outdoor gear, without buying everything.
                            </h1>
                            <p className="mt-5 text-lg leading-8 text-muted-foreground">
                                GearUp connects customers with trusted providers so you can rent quality equipment when you need it.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.08} className="mt-12 rounded-2xl border bg-card p-8 shadow-sm">
                            <h2 className="text-2xl font-semibold">Our mission</h2>
                            <p className="mt-4 leading-8 text-muted-foreground">
                                Make premium sports and outdoor equipment accessible without the cost of owning every item. Adventures, training, and weekends should be easier to start.
                            </p>
                        </FadeIn>

                        <Stagger className="mt-8 grid gap-5 md:grid-cols-3">
                            {[
                                {
                                    title: "Premium gear",
                                    body: "Browse sports and outdoor equipment from verified providers.",
                                },
                                {
                                    title: "Secure payments",
                                    body: "Checkout with Stripe after a provider confirms your rental.",
                                },
                                {
                                    title: "Trusted community",
                                    body: "Reviews, ratings, and clear rental status keep the process honest.",
                                },
                            ].map((item) => (
                                <StaggerItem key={item.title}>
                                    <div className="h-full rounded-2xl border bg-card p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <p className="mt-3 leading-7 text-muted-foreground">{item.body}</p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </div>
                </Container>
            </main>
            <Footer />
        </>
    );
}
