import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DailyCoupon from "@/components/DailyCoupon";
import CategorySection from "@/components/CategorySection";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <DailyCoupon />
      <CategorySection />
      <ProductSection />
      <Footer />
    </main>
  );
}
