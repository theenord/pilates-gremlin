import Nav from "./components/Nav";
import SiteMotion from "./components/SiteMotion";
import Hero from "./components/Hero";
import IntroBand from "./components/IntroBand";
import About from "./components/About";
import Schedule from "./components/Schedule";
import WaysToTrain from "./components/WaysToTrain";
import PilatesEssentials from "./components/PilatesEssentials";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

// Regenerate the page in the background at most every 15 minutes so the
// schedule's "now" advances without a redeploy. Classes drop at their END time
// (see Schedule.tsx), so this bounds how long a just-finished class lingers -
// an hour was too coarse for a window that closes at, say, 12:45.
export const revalidate = 900;

export default function Home() {
  return (
    <>
      <SiteMotion />
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <IntroBand />
        <About />
        <Schedule />
        <WaysToTrain />
        <FAQ />
        <PilatesEssentials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
