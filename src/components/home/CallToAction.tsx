import Link from "next/link";
import Container from "../layout/Container";

export default function CallToAction() {
    return (
        <section className="bg-blue-600 py-20 text-white">
            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-4xl font-bold">
                        Ready for Your Next Adventure?
                    </h2>

                    <p className="mt-5 text-lg text-blue-100">
                        Rent premium sports and outdoor gear in minutes.
                        Affordable, reliable, and hassle-free.
                    </p>

                    <div className="mt-8">
                        <Link
                            href="/gear"
                            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
                        >
                            Browse All Gear
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}