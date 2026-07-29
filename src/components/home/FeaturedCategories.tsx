import Container from "../layout/Container";
import {
    Bike,
    Dumbbell,
    Tent,
    Waves,
    Volleyball,
    Snowflake,
} from "lucide-react";

const categories = [
    {
        title: "Cycling",
        icon: Bike,
        description: "Mountain bikes, road bikes & accessories.",
    },
    {
        title: "Fitness",
        icon: Dumbbell,
        description: "Gym equipment for your workout.",
    },
    {
        title: "Camping",
        icon: Tent,
        description: "Everything for your outdoor adventure.",
    },
    {
        title: "Water Sports",
        icon: Waves,
        description: "Kayaks, surfboards and more.",
    },
    {
        title: "Team Sports",
        icon: Volleyball,
        description: "Football, cricket, badminton and more.",
    },
    {
        title: "Winter Sports",
        icon: Snowflake,
        description: "Skiing and snowboarding equipment.",
    },
];

export default function FeaturedCategories() {
    return (
        <section className="py-20 bg-slate-50">
            <Container>
                <div className="text-center">
                    <h2 className="text-4xl font-bold">Featured Categories</h2>
                    <p className="mt-4 text-gray-600">
                        Explore gear from our most popular categories.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <div
                                key={category.title}
                                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-4 inline-flex rounded-xl bg-blue-100 p-3 text-blue-600">
                                    <Icon size={30} />
                                </div>

                                <h3 className="text-xl font-semibold">{category.title}</h3>

                                <p className="mt-2 text-gray-600">
                                    {category.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}