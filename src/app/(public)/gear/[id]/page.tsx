"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import RentalForm from "@/components/forms/RentalForm";
import GearReviews from "@/components/gear/GearReviews";
import { getSingleGear } from "@/services/gear/gear.api";

export default function GearDetailsPage() {
    const params = useParams();

    const {
        data: gear,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["gear", params.id],
        queryFn: () => getSingleGear(params.id as string),
        enabled: !!params.id,
    });

    if (isLoading) {
        return (
            <>
                <Navbar />

                <main className="py-12 sm:py-16">
                    <Container>
                        <div className="flex min-h-[60vh] items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                                <p className="mt-4 text-gray-600">
                                    Loading gear details...
                                </p>
                            </div>
                        </div>
                    </Container>
                </main>

                <Footer />
            </>
        );
    }

    if (isError) {
        return (
            <>
                <Navbar />

                <main className="py-12 sm:py-16">
                    <Container>
                        <div className="flex min-h-[60vh] items-center justify-center">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-red-600">
                                    Failed to Load Gear
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    {(error as Error)?.message ||
                                        "Something went wrong."}
                                </p>
                            </div>
                        </div>
                    </Container>
                </main>

                <Footer />
            </>
        );
    }

    if (!gear) {
        return (
            <>
                <Navbar />

                <main className="py-12 sm:py-16">
                    <Container>
                        <div className="flex min-h-[60vh] items-center justify-center">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold">
                                    Gear Not Found
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    This gear does not exist.
                                </p>
                            </div>
                        </div>
                    </Container>
                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="py-12 sm:py-14 lg:py-16">
                <Container>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

                        {/* Image */}

                        <div>
                            <Image
                                src={gear.image}
                                alt={gear.title}
                                width={700}
                                height={500}
                                priority
                                className="h-[280px] w-full rounded-xl border object-cover shadow-sm sm:h-[400px] lg:h-[500px]"
                            />
                        </div>

                        {/* Details */}

                        <div>

                            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                {gear.category.name}
                            </span>

                            <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                                {gear.title}
                            </h1>

                            <p className="mt-5 leading-7 text-gray-600">
                                {gear.description}
                            </p>

                            <div className="mt-8 rounded-xl border bg-gray-50 p-5 sm:p-6">

                                <div className="space-y-5">

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="font-medium">
                                            Brand
                                        </span>

                                        <span>{gear.brand}</span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="font-medium">
                                            Price / Day
                                        </span>

                                        <span className="font-semibold text-blue-600">
                                            ৳ {gear.pricePerDay}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="font-medium">
                                            Available Stock
                                        </span>

                                        <span>{gear.stock}</span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
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

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="font-medium">
                                            Provider
                                        </span>

                                        <span>{gear.provider.name}</span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="font-medium">
                                            Email
                                        </span>

                                        <span className="break-all text-right">
                                            {gear.provider.email}
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Rental Form */}

                    <div className="mt-12 lg:mt-16">
                        <RentalForm
                            gearId={gear.id}
                            pricePerDay={Number(gear.pricePerDay)}
                            stock={gear.stock}
                        />
                    </div>

                    {/* Reviews */}

                    <div className="mt-16">
                        <GearReviews gearId={gear.id} />
                    </div>

                </Container>
            </main>

            <Footer />
        </>
    );
}