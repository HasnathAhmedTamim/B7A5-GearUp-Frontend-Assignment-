import Link from "next/link";
import Container from "../layout/Container";

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-20 text-white">
            <Container>
                <div className="grid items-center gap-10 md:grid-cols-2">
                    {/* Left */}
                    <div>
                        <span className="rounded-full bg-blue-500/20 px-4 py-2 text-sm text-blue-300">
                            Sports & Outdoor Rental Platform
                        </span>

                        <h1 className="mt-6 text-5xl font-bold leading-tight">
                            Rent Premium Sports & Outdoor Gear
                        </h1>

                        <p className="mt-6 text-lg text-gray-300">
                            Discover high-quality sports and outdoor equipment from trusted
                            providers. Rent only when you need it and enjoy your adventure.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <Link
                                href="/gear"
                                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
                            >
                                Browse Gear
                            </Link>

                            <Link
                                href="/auth/register"
                                className="rounded-lg border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black"
                            >
                                Become a Provider
                            </Link>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=700"
                            alt="Sports Gear"
                            className="rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}