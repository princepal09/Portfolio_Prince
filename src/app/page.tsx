import Contact from "@/components/Sections/Contact";
import Experience from "@/components/Sections/Experience";
import Github from "@/components/Sections/Github";
import Hero from "@/components/Sections/Hero";
import Projects from "@/components/Sections/Projects";
import Skills from "@/components/Sections/Skills";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-background">
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Github />
      <Contact />
    </main>
  );
}
