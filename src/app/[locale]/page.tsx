import { VideoBackground } from "@/components/shared/VideoBackground";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { About } from "@/components/sections/About";
import { Features } from "@/components/sections/Features";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <VideoBackground />
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <About />
        <Features />
        <Projects />
        <Experience />
        <CTA />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
