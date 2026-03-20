import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Urgency } from "./components/Urgency";
import { Tickets } from "./components/Tickets";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A1628]">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Urgency />
      <Tickets />
      <Footer />
    </main>
  );
}
