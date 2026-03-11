import Link from "next/link";
import HeroSection from "../components/HeroSection";
import TrustStrip from "../components/TrustStrip";
import HowItWorks from "../components/HowItWorks";
import EnterpriseDifferentiators from "../components/EnterpriseDifferentiators";
import PricingSection from "../components/PricingSection";
import FAQSection from "../components/FAQSection";
import FinalCTA from "../components/FinalCTA";
import Reveal from "../components/Reveal";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full bg-background-primary font-sans">

      <HeroSection />

      <Reveal>
        <TrustStrip />
      </Reveal>

      <div id="how-it-works">
        <Reveal>
          <HowItWorks />
        </Reveal>
      </div>

      <div id="enterprise">
        <Reveal>
          <EnterpriseDifferentiators />
        </Reveal>
      </div>

      <div id="pricing">
        <Reveal>
          <PricingSection />
        </Reveal>
      </div>

      <div id="faq">
        <Reveal>
          <FAQSection />
        </Reveal>
      </div>

      <Reveal>
        <FinalCTA />
      </Reveal>

      <ContactSection />
    </main>
  );
}
