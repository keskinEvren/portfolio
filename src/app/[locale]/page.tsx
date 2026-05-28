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

// Import localized Sanity API client functions
import {
  getPersonalInfo,
  getExperienceList,
  getProjectsList,
  getSkillsList,
} from "@/lib/sanity.client";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  // Safely execute server-side CMS requests
  const personalInfo = await getPersonalInfo(locale);
  const experiences = await getExperienceList(locale);
  const projects = await getProjectsList(locale);
  const skills = await getSkillsList(locale);

  return (
    <>
      <VideoBackground />
      <Navbar />
      <main>
        <Hero data={personalInfo} />
        <TechStack />
        <About data={personalInfo} />
        <Features data={skills} />
        <Projects data={projects} />
        <Experience data={experiences} />
        <CTA />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
