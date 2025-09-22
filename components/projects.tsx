export function Projects() {
  const projects = [
    {
      title: "Industrial Robotic Arm",
      event: "Boumerdes Hackathon '24",
      description: "STM32-powered arm with motion-control algorithms. Achieved 3rd place out of 20 teams.",
      year: "2024",
    },
    {
      title: "Micromouse Maze Solver",
      event: "Polymaze '24",
      description: "C navigation system with ultrasonic & encoder integration. 30% faster performance.",
      year: "2024",
    },
    {
      title: "IR-Controlled Water Supply PCB",
      event: "Personal Project",
      description: "Complete PCB design & Arduino C firmware including schematic, BOM, and calibration.",
      year: "2024",
    },
    {
      title: "4-bit Full Adder",
      event: "Academic Project",
      description: "Discrete logic gates implementation with DIP switches and 7-segment display verification.",
      year: "2023",
    },
  ]

  return (
    <section id="projects" className="py-24 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-light mb-8">Projects</h2>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {projects.map((project, index) => (
              <div key={index} className="space-y-3 group">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.event}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{project.year}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
