import Container from "../layout/Container";
import {
    ShieldCheck,
    Truck,
    Wallet,
    Clock3,
} from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Verified Providers",
        description:
            "Rent equipment from trusted and verified providers with confidence.",
    },
    {
        icon: Truck,
        title: "Easy Pickup & Delivery",
        description:
            "Choose convenient pickup locations or delivery options where available.",
    },
    {
        icon: Wallet,
        title: "Affordable Pricing",
        description:
            "Pay only for the days you need. Save money compared to buying new gear.",
    },
    {
        icon: Clock3,
        title: "Quick Booking",
        description:
            "Book your favorite gear in just a few clicks without any hassle.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="bg-slate-50 py-20">
            <Container>
                <div className="text-center">
                    <h2 className="text-4xl font-bold">
                        Why Choose GearUp?
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Everything you need for a smooth and reliable rental experience.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    <Icon size={28} />
                                </div>

                                <h3 className="text-xl font-semibold">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}