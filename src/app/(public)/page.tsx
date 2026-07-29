import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <FeaturedCategories />
      </main>

      <Footer />
    </>
  );
}