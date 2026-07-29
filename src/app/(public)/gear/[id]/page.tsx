"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

import { getSingleGear } from "@/services/gear/gear.api";

export default function GearDetailsPage() {
    const params = useParams();

    const { data: gear, isLoading, isError } = useQuery({
        queryKey: ["gear", params.id],
        queryFn: () => getSingleGear(params.id as string),
    });

    if (isLoading) {
        return (
            <>
                <Navbar />
                <Container>
                    <div className="flex h-[60vh] items-center justify-center">
                        Loading...
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    if (isError || !gear) {
        return (
            <>
                <Navbar />
                <Container>
                    <div className="flex h-[60vh] items-center justify-center">
                        Gear not found.
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="py-16">
                <Container>
                    <div className="grid gap-10 lg:grid-cols-2">
                        <img
                            src={gear.image}
                            alt={gear.title}
                            className="h-[500px] w-full rounded-xl object-cover"
                        />

                        <div>
                            <span className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-600">
                                {gear.category.name}
                            </span>

                            <h1 className="mt-4 text-4xl font-bold">
                                {gear.title}
                            </h1>

                            <p className="mt-3 text-gray-500">
                                {gear.description}
                            </p>

                            <div className="mt-8 space-y-3">
                                <p>
                                    <strong>Brand:</strong> {gear.brand}
                                </p>

                                <p>
                                    <strong>Price:</strong> ৳{gear.pricePerDay} / day
                                </p>

                                <p>
                                    <strong>Stock:</strong> {gear.stock}
                                </p>

                                <p>
                                    <strong>Availability:</strong>{" "}
                                    <span
                                        className={
                                            gear.availability
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }
                                    >
                                        {gear.availability
                                            ? "Available"
                                            : "Unavailable"}
                                    </span>
                                </p>

                                <p>
                                    <strong>Provider:</strong> {gear.provider.name}
                                </p>

                                <p>
                                    <strong>Email:</strong> {gear.provider.email}
                                </p>
                            </div>

                            <button
                                className="mt-10 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                Rent Now
                            </button>
                        </div>
                    </div>
                </Container>
            </main>

            <Footer />
        </>
    );
}