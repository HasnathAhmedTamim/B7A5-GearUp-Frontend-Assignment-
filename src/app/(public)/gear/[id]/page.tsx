"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import RentalForm from "@/components/forms/RentalForm";

import { getSingleGear } from "@/services/gear/gear.api";

export default function GearDetailsPage() {
    const params = useParams();

    const {
        data: gear,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["gear", params.id],
        queryFn: () => getSingleGear(params.id as string),
        enabled: !!params.id,
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
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Image */}
                        <div>
                            <img
                                src={gear.image}
                                alt={gear.title}
                                className="h-[500px] w-full rounded-xl border object-cover"
                            />
                        </div>

                        {/* Details */}
                        <div>
                            <span className="rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                {gear.category.name}
                            </span>

                            <h1 className="mt-4 text-4xl font-bold">
                                {gear.title}
                            </h1>

                            <p className="mt-4 text-gray-600">
                                {gear.description}
                            </p>

                            <div className="mt-8 space-y-4 rounded-xl border bg-gray-50 p-6">
                                <div className="flex justify-between">
                                    <span className="font-medium">Brand</span>
                                    <span>{gear.brand}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Price / Day
                                    </span>

                                    <span className="font-semibold text-blue-600">
                                        ৳ {gear.pricePerDay}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Available Stock
                                    </span>

                                    <span>{gear.stock}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Availability
                                    </span>

                                    <span
                                        className={
                                            gear.availability
                                                ? "font-semibold text-green-600"
                                                : "font-semibold text-red-600"
                                        }
                                    >
                                        {gear.availability
                                            ? "Available"
                                            : "Unavailable"}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Provider
                                    </span>

                                    <span>{gear.provider.name}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Email
                                    </span>

                                    <span>{gear.provider.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rental Form */}
                    <div className="mt-16">
                        <RentalForm
                            gearId={gear.id}
                            pricePerDay={Number(gear.pricePerDay)}
                            stock={gear.stock}
                        />
                    </div>
                </Container>
            </main>

            <Footer />
        </>
    );
}