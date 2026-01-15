import { LandingFluid } from "@/components/landing-fluid"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Education } from "@/components/education"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Languages } from "@/components/languages"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      {/* Landing section with isolated fluid effect on black background */}
      <LandingFluid />
      {/* Rest of the site without fluid effect */}
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Languages />
      <Contact />
    </main>
  )
}
