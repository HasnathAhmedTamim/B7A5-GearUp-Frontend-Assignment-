import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

export default function AboutPage() {
    return (
        <>
            <Navbar />

            <main className="py-14 sm:py-16 lg:py-20">
                <Container>
                    <div className="mx-auto max-w-4xl">

                        {/* Header */}

                        <div className="text-center">
                            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                                About GearUp
                            </span>

                            <h1 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl">
                                Sports & Outdoor Gear Rental Platform
                            </h1>

                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                GearUp is a modern rental platform that connects
                                customers with trusted providers, making it easy
                                to rent high-quality sports and outdoor
                                equipment anytime, anywhere.
                            </p>
                        </div>

                        {/* Mission */}

                        <div className="mt-16 rounded-2xl border bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Our Mission
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                Our mission is to make premium sports and
                                outdoor equipment accessible to everyone without
                                the need to purchase expensive gear. We believe
                                that everyone should have the opportunity to
                                enjoy adventures, fitness, and outdoor
                                activities through a reliable rental platform.
                            </p>
                        </div>

                        {/* What We Offer */}

                        <div className="mt-10 grid gap-6 md:grid-cols-3">

                            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                                <h3 className="text-xl font-semibold">
                                    Premium Gear
                                </h3>

                                <p className="mt-3 text-gray-600">
                                    Browse a wide collection of sports and
                                    outdoor equipment from verified providers.
                                </p>
                            </div>

                            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                                <h3 className="text-xl font-semibold">
                                    Secure Payments
                                </h3>

                                <p className="mt-3 text-gray-600">
                                    Safe and seamless online payments powered
                                    by Stripe Checkout integration.
                                </p>
                            </div>

                            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                                <h3 className="text-xl font-semibold">
                                    Trusted Community
                                </h3>

                                <p className="mt-3 text-gray-600">
                                    Verified providers, customer reviews, and
                                    secure rentals ensure a trustworthy
                                    experience.
                                </p>
                            </div>

                        </div>

                        {/* Closing */}

                        <div className="mt-16 rounded-2xl bg-blue-600 p-8 text-center text-white">
                            <h2 className="text-3xl font-bold">
                                Why Choose GearUp?
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-8 text-blue-100">
                                Whether you&apos;re planning a weekend adventure,
                                training for your next competition, or trying a
                                new sport, GearUp provides a convenient,
                                affordable, and reliable way to rent the gear
                                you need.
                            </p>
                        </div>

                    </div>
                </Container>
            </main>

            <Footer />
        </>
    );
}