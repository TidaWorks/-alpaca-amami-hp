import Header from "@/components/Header";
import Hero from "@/components/Hero";

import BusyPersonSection from "@/components/BusyPersonSection";

import Benefits from "@/components/Benefits";
import Services from "@/components/Services";
import Flow from "@/components/Flow";

import FAQ from "@/components/FAQ";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <BusyPersonSection />

        <Benefits />
        <Services />
        <Flow />

        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
