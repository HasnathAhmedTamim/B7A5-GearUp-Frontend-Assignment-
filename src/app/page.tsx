import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <section className="flex h-[70vh] items-center justify-center">
          <h1 className="text-5xl font-bold">
            Welcome to GearUp
          </h1>
        </section>
      </main>

      <Footer />
    </>
  );
}