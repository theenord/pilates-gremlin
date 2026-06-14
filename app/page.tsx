import Nav from "./components/Nav";
import SiteMotion from "./components/SiteMotion";
import Hero from "./components/Hero";
import IntroBand from "./components/IntroBand";
import About from "./components/About";
import Schedule from "./components/Schedule";
import WaysToTrain from "./components/WaysToTrain";
import PilatesEssentials from "./components/PilatesEssentials";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

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
        <PilatesEssentials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
