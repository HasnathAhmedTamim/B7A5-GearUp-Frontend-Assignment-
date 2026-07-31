import Image from "next/image";
import Container from "../layout/Container";
import { Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah Ahmed",
        role: "Adventure Enthusiast",
        image: "https://i.pravatar.cc/150?img=32",
        review:
            "GearUp made my camping trip effortless. The equipment quality was excellent and the booking process was super smooth.",
    },
    {
        id: 2,
        name: "Rakib Hasan",
        role: "Cyclist",
        image: "https://i.pravatar.cc/150?img=15",
        review:
            "Instead of buying an expensive bike, I rented one for the weekend. Great service and affordable pricing.",
    },
    {
        id: 3,
        name: "Nusrat Jahan",
        role: "Fitness Trainer",
        image: "https://i.pravatar.cc/150?img=45",
        review:
            "The platform is clean, easy to use and has a wide range of sports equipment. Highly recommended!",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-white py-14 sm:py-16 lg:py-20">
            <Container>
                {/* Section Header */}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        What Our Customers Say
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                        Trusted by sports lovers across the country.
                    </p>
                </div>

                {/* Testimonials */}
                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            {/* Rating */}
                            <div className="mb-4 flex gap-1">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                        key={index}
                                        size={18}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Review */}
                            <p className="min-h-[110px] text-sm italic leading-7 text-gray-600 sm:text-base">
                                "{item.review}"
                            </p>

                            {/* User */}
                            <div className="mt-6 flex items-center gap-4">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={56}
                                    height={56}
                                    className="rounded-full object-cover"
                                />

                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        {item.name}
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}