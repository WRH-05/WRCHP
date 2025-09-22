export function Experience() {
  const experiences = [
    {
      period: "July 2025 — Present",
      title: "Co-Founder & President",
      company: "Kennedy School, Language & Science Cram School",
      location: "Algiers, Algeria",
      description: [
        "Established comprehensive curricula for English, French, physics, and mathematics for high-school students.",
        "Oversee daily operations, budgeting, and recruitment of instructors.",
        "Develop marketing strategies, partnerships, and community outreach initiatives.",
      ],
    },
    {
      period: "July 2025 — December 2025 (Expected)",
      title: "Intern",
      company: "Centre de Recherche Nucléaire d'Alger (CRNA)",
      location: "Algiers, Algeria",
      description: [
        "Support electronic instrumentation calibration and data acquisition for nuclear research projects.",
        "Assist researchers with experimental setups, circuit design, and data analysis using Python and MATLAB.",
        "Document laboratory procedures and maintain critical test equipment.",
      ],
    },
  ]

  return (
    <section id="experience" className="py-24 px-6 lg:px-12 lg:pl-32">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-display font-light mb-8 tracking-wide">Experience</h2>
          </div>

          <div className="lg:col-span-2 space-y-16">
            {experiences.map((exp, index) => (
              <div key={index} className="space-y-6">
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground font-mono tracking-[0.2em] uppercase">{exp.period}</p>
                  <h3 className="text-xl font-serif-jp font-medium leading-tight">{exp.title}</h3>
                  <p className="text-lg font-display font-light text-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground font-mono">{exp.location}</p>
                </div>

                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-muted-foreground leading-relaxed font-sans relative pl-4">
                      <span className="absolute left-0 top-2 w-1 h-1 bg-primary rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
