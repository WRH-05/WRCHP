import { siteConfig } from "@/lib/config"

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 lg:px-12 lg:pl-32">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="font-title-bold text-4xl lg:text-6xl text-balance leading-tight">
              {siteConfig.name}
            </h2>
            <p className="font-title text-xl lg:text-2xl text-muted-foreground font-normal tracking-wide">
              {siteConfig.role}
            </p>
            <p className="font-body text-base lg:text-lg text-muted-foreground max-w-lg leading-relaxed">
              I build accessible, innovative solutions that blend electronics design with robust engineering. My passion
              lies at the intersection of <span className="font-emphasis">robotics</span>, <span className="font-emphasis">AI/ML</span>, and <span className="font-emphasis">backend development</span>.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-8">
              <a
                href={siteConfig.social.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent text-sm font-mono tracking-wider uppercase"
              >
                GitHub
              </a>
              <a
                href={siteConfig.social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent text-sm font-mono tracking-wider uppercase"
              >
                LinkedIn
              </a>
            </div>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="link-accent text-sm font-mono tracking-wider w-fit"
            >
              {siteConfig.contact.email}
            </a>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="link-accent text-sm font-mono tracking-wider w-fit"
            >
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
