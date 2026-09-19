"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.45, delay, ease: easeOut }}
        >
            {children}
        </motion.div>
    );
}

interface StaggerProps {
    children: ReactNode;
    className?: string;
}

export function Stagger({ children, className }: StaggerProps) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, margin: "-48px" }}
            variants={{
                hidden: {},
                show: {
                    transition: { staggerChildren: 0.08 },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: StaggerProps) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            className={className}
            variants={
                reduce
                    ? undefined
                    : {
                          hidden: { opacity: 0, y: 16 },
                          show: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.4, ease: easeOut },
                          },
                      }
            }
        >
            {children}
        </motion.div>
    );
}

export function MotionCard({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            className={cn("h-full", className)}
            whileHover={reduce ? undefined : { y: -4 }}
            transition={{ duration: 0.25, ease: easeOut }}
        >
            {children}
        </motion.div>
    );
}
