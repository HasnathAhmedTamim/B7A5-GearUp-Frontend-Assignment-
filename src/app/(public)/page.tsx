import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedGear from "@/components/home/FeaturedGear";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/layout/Footer";
import Testimonials from "@/components/home/Testimonials";
export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <FeaturedCategories />
        <FeaturedGear />
        <WhyChooseUs />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}