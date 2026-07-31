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
        <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
            <Container>
                {/* Section Header */}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Featured Categories
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                        Explore gear from our most popular categories and find
                        everything you need for your next adventure.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <div
                                key={category.title}
                                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="mb-5 inline-flex rounded-xl bg-blue-100 p-3 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                                    <Icon size={30} />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900">
                                    {category.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
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