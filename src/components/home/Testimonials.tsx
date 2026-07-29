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
        <section className="py-20 bg-white">
            <Container>
                <div className="text-center">
                    <h2 className="text-4xl font-bold">
                        What Our Customers Say
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Trusted by sports lovers across the country.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
                        >
                            <div className="mb-4 flex">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                        key={index}
                                        size={18}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            <p className="text-gray-600 italic">
                                "{item.review}"
                            </p>

                            <div className="mt-6 flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-14 w-14 rounded-full object-cover"
                                />

                                <div>
                                    <h4 className="font-semibold">
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