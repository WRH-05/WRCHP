export function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["C (Arduino)", "Python", "C++", "JavaScript (ES6)"],
    },
    {
      title: "Embedded Systems & Electronics",
      skills: [
        "PCB design (KiCad/Altium)",
        "Microcontrollers (Arduino, STM32)",
        "Webots",
        "ROS ecosystem",
        "PlatformIO",
      ],
    },
    {
      title: "Web & Backend Development",
      skills: ["HTML/CSS", "Next.js", "React", "Node.js", "Express", "SQL (MySQL)", "NoSQL (MongoDB)"],
    },
    {
      title: "Machine Learning & Data Science",
      skills: ["scikit-learn", "TensorFlow (introductory)", "pandas", "NumPy", "Matplotlib", "seaborn", "opencv"],
    },
    {
      title: "3D Modeling & Tools",
      skills: ["Fusion 360", "SolidWorks", "Autodesk robot", "AutoCAD"],
    },
    {
      title: "Other Tools",
      skills: ["Git", "Linux", "Docker (basic)", "VS Code"],
    },
  ]

  return (
    <section id="skills" className="py-24 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-light mb-8">Technical Skills</h2>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-sm font-medium text-primary">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
