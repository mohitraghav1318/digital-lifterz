import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <main className="relative overflow-x-clip pb-10">
      <Navbar />
      <Hero />
      <Services />
      <Contact />
    </main>
  );
}
