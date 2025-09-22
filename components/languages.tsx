export function Languages() {
  const languages = [
    { language: "Arabic", level: "Native" },
    { language: "English", level: "Fluent (IELTS 6.5 approximate)" },
    { language: "French", level: "DELF B2 – Institut Français d'Algérie" },
    { language: "German", level: "Beginner (ongoing)" },
  ]

  return (
    <section id="languages" className="py-24 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-light mb-8">Languages</h2>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="font-medium">{lang.language}</span>
                <span className="text-muted-foreground text-sm">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
