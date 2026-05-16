import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { ProgramFlow } from "./components/ProgramFlow";
import { Urgency } from "./components/Urgency";
import { Tickets } from "./components/Tickets";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A1628]">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <ProgramFlow />
      <Urgency />
      <Tickets />
      <Faq />
      <Footer />
    </main>
  );
}
