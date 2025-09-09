import Contact from "@/components/contact/Contact";
import Features from "@/components/features/Features";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/dashboard/hero/Hero";
import NavHeader from "@/components/NavComponent";
import FAQ from "@/components/faq/Faq";
import Hero1 from "@/components/dashboard/hero/Hero1";
import Testimonials from "@/components/testimonials/Testimonials";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <NavHeader />
      <Hero />
      <Hero1 />
      <Features />
      <Testimonials/>
      <Contact />
      <FAQ />
      <Footer />
    </div>
  );
}
