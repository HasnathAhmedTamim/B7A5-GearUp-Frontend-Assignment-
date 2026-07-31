import Image from "next/image";
import Link from "next/link";

import Container from "../layout/Container";

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-14 text-white sm:py-16 lg:py-24">
            <Container>
                <div className="grid items-center gap-10 lg:grid-cols-2">

                    {/* Left */}

                    <div className="text-center lg:text-left">

                        <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-xs font-medium text-blue-300 sm:text-sm">
                            Sports & Outdoor Rental Platform
                        </span>

                        <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-6xl">
                            Rent Premium Sports & Outdoor Gear
                        </h1>

                        <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg">
                            Discover high-quality sports and outdoor equipment
                            from trusted providers. Rent only when you need it
                            and enjoy your next adventure with confidence.
                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">

                            <Link
                                href="/gear"
                                className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold transition hover:bg-blue-700"
                            >
                                Browse Gear
                            </Link>

                            <Link
                                href="/auth/register"
                                className="rounded-lg border border-white px-6 py-3 text-center font-semibold transition hover:bg-white hover:text-black"
                            >
                                Become a Provider
                            </Link>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="flex justify-center">

                        <Image
                            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=700"
                            alt="Sports Gear"
                            width={700}
                            height={500}
                            priority
                            className="h-auto w-full max-w-md rounded-2xl object-cover shadow-2xl lg:max-w-xl"
                        />

                    </div>

                </div>
            </Container>
        </section>
    );
}