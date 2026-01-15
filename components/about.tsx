import { siteConfig } from "@/lib/config"

export function About() {
  return (
    <section id="about" className="py-24 px-6 lg:px-12 lg:pl-32">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-title-light mb-8 tracking-wide">About</h2>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground font-body">
              I'm a driven {siteConfig.education.year} {siteConfig.education.degree} student at the {siteConfig.education.university}, with solid experience in electronics design, embedded systems, and
              web development.
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground font-body">
              Currently, I'm passionate about developing PCB layouts, programming microcontrollers (Arduino C, Python,
              C), and building IoT prototypes. As an active member of university clubs, I've developed strong
              communication and external relations skills.
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground font-body">
              My interests span robotics, AI/ML, and backend engineering, where I enjoy creating innovative solutions
              that bridge the gap between hardware and software.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
