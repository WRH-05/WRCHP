export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 lg:px-12 lg:pl-32">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="font-neue-haas-medium text-4xl lg:text-6xl text-balance leading-tight">
              Wassim Rahim Hachemi
            </h1>
            <p className="font-kudryashev-display text-xl lg:text-2xl text-muted-foreground font-normal tracking-wide">
              Industrial Electronics Engineering Student & Developer
            </p>
            <p className="font-neue-haas-grotesk text-base lg:text-lg text-muted-foreground max-w-lg leading-relaxed">
              I build accessible, innovative solutions that blend electronics design with robust engineering. My passion
              lies at the intersection of <span className="font-emphasis text-foreground">robotics</span>, <span className="font-emphasis text-foreground">AI/ML</span>, and <span className="font-emphasis text-foreground">backend development</span>.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-8">
              <a
                href="https://github.com/WRH-05"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 uppercase"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/wassimh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 uppercase"
              >
                LinkedIn
              </a>
            </div>
            <a
              href="mailto:wassimhachemi8@gmail.com"
              className="text-sm font-mono tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 w-fit"
            >
              wassimhachemi8@gmail.com
            </a>
            <a
              href="tel:+213551151123"
              className="text-sm font-mono tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 w-fit"
            >
              +213 55 11 51 23
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-muted to-background border border-border rounded-sm flex items-center justify-center relative overflow-hidden">
            {/* Abstract geometric pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 opacity-10">
                <div className="w-16 h-16 border border-primary/30" />
                <div className="w-16 h-16 bg-primary/10" />
                <div className="w-16 h-16 border border-primary/30" />
                <div className="w-16 h-16 bg-primary/10" />
                <div className="w-16 h-16 border-2 border-primary/50" />
                <div className="w-16 h-16 bg-primary/10" />
                <div className="w-16 h-16 border border-primary/30" />
                <div className="w-16 h-16 bg-primary/10" />
                <div className="w-16 h-16 border border-primary/30" />
              </div>
            </div>
            <div className="font-kudryashev-display text-4xl lg:text-6xl font-normal text-primary/30 tracking-wider relative z-10">
              WRH
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
