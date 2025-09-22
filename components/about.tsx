export function About() {
  return (
    <section id="about" className="py-24 px-6 lg:px-12 lg:pl-32">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-display font-light mb-8 tracking-wide">About</h2>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground font-sans">
              I'm a driven 4th-year Industrial Electronics Engineering student at the University of Science and
              Technology Houari Boumediene (USTHB), with solid experience in electronics design, embedded systems, and
              web development.
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground font-sans">
              Currently, I'm passionate about developing PCB layouts, programming microcontrollers (Arduino C, Python,
              C), and building IoT prototypes. As an active member of university clubs, I've developed strong
              communication and external relations skills.
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground font-sans">
              My interests span robotics, AI/ML, and backend engineering, where I enjoy creating innovative solutions
              that bridge the gap between hardware and software.
            </p>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4 font-mono tracking-wider uppercase">Connect</p>
              <div className="flex gap-8">
                <a
                  href="https://linkedin.com/in/wassimh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 uppercase"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/WRH-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 uppercase"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
