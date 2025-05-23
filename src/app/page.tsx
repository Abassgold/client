import Contact from "@/components/contact/Contact";
import Features from "@/components/features/Features";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/dashboard/hero/Hero";
import NavHeader from "@/components/NavComponent";

export default function Home() {
  return (
<>
<NavHeader/>
<Hero/>
<Features/>
<Contact/>
<Footer/>
</>
  );
}
