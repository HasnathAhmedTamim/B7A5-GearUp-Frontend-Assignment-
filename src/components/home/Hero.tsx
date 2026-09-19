"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import Container from "../layout/Container";
import { Button } from "@/components/ui/button";

export default function Hero() {
    const reduce = useReducedMotion();

    return (
        <section className="relative overflow-hidden bg-[oklch(0.22_0.04_155)] text-white">
            <div className="surface-grid pointer-events-none absolute inset-0 opacity-30" />
            <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
            <Container className="relative py-16 sm:py-20 lg:py-24">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <motion.div
                        className="text-center lg:text-left"
                        initial={reduce ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="inline-flex rounded-full border border-white/15 bg-card/10 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-100 sm:text-sm">
                            Sports & outdoor rentals
                        </span>
                        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Premium gear for the trail, court, and weekend.
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg lg:mx-0 mx-auto">
                            Rent high-quality equipment from trusted providers. Book only the days you need, then get outside.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                            <Button asChild size="lg" className="h-12 bg-card px-6 text-primary hover:bg-card/90">
                                <Link href="/gear">Browse gear</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-12 border-white/30 bg-transparent px-6 text-white hover:bg-card/10 hover:text-white">
                                <Link href="/register">Become a provider</Link>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex justify-center"
                        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900"
                            alt="Athlete cycling outdoors with rental sports gear"
                            width={720}
                            height={520}
                            priority
                            className="h-auto w-full max-w-md rounded-3xl object-cover shadow-2xl ring-1 ring-white/10 lg:max-w-xl"
                        />
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
