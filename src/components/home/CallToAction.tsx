"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import Container from "../layout/Container";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
    const reduce = useReducedMotion();

    return (
        <section className="pb-16 sm:pb-20">
            <Container>
                <motion.div
                    className="rounded-3xl bg-[oklch(0.27_0.05_155)] px-6 py-12 text-center text-white sm:px-10 sm:py-16"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                >
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready for the next outing?</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-white/75">
                        Find gear, pick your dates, and request a rental in minutes.
                    </p>
                    <Button asChild size="lg" className="mt-8 h-12 bg-card px-8 text-primary hover:bg-card/90">
                        <Link href="/gear">Browse all gear</Link>
                    </Button>
                </motion.div>
            </Container>
        </section>
    );
}
