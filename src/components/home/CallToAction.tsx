import Link from "next/link";

import Container from "../layout/Container";

export default function CallToAction() {
    return (
        <section className="bg-blue-600 py-14 text-white sm:py-16 lg:py-20">
            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        Ready for Your Next Adventure?
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
                        Rent premium sports and outdoor gear in minutes.
                        Affordable, reliable, and hassle-free.
                    </p>

                    <div className="mt-8 flex justify-center">
                        <Link
                            href="/gear"
                            className="w-full rounded-lg bg-white px-8 py-3 text-center font-semibold text-blue-600 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg sm:w-auto"
                        >
                            Browse All Gear
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}