import AboutSideAccents from "../components/sections/about/AboutSideAccents";
import AboutHero from "../components/sections/about/AboutHero";
import AboutVision from "../components/sections/about/AboutVision";
import AboutWhatWeDo from "../components/sections/about/AboutWhatWeDo";
import AboutWhy from "../components/sections/about/AboutWhy";
import AboutCta from "../components/sections/about/AboutCta";
import "../components/sections/about/About.css";

export default function AboutUs() {
  return (
    <main className="about-page">
      <AboutSideAccents />

      <div className="about-inner section-shell px-4 sm:px-6">
        <AboutHero />
        <AboutVision />
        <AboutWhatWeDo />
        <AboutWhy />
        <AboutCta />
      </div>
    </main>
  );
}