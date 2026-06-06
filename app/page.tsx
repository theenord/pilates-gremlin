import Nav from "./components/Nav";
import Hero from "./components/Hero";
import IntroBand from "./components/IntroBand";
import WaysToTrain from "./components/WaysToTrain";
import PilatesEssentials from "./components/PilatesEssentials";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <IntroBand />
        <WaysToTrain />
        <PilatesEssentials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
