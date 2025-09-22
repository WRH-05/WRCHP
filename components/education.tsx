export function Education() {
  return (
    <section id="education" className="py-24 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-light mb-8">Education</h2>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-mono">September 2022 — Expected June 2027</p>
                <h3 className="text-lg font-medium">B.Eng. in Industrial Electronics Engineering</h3>
                <p className="text-muted-foreground">
                  University of Science and Technology Houari Boumediene (USTHB), Algiers, Algeria
                </p>
                <p className="text-sm text-muted-foreground">GPA: 3.4/4.0</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Relevant Coursework:</p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <span>DSP</span>
                  <span>Signal Analysis</span>
                  <span>Microprocessor Systems</span>
                  <span>Digital Electronics</span>
                  <span>Computer Networking</span>
                  <span>Data Structures & Algorithms</span>
                  <span>Control Systems</span>
                  <span>Python</span>
                  <span>C/C++</span>
                  <span>MATLAB</span>
                  <span>CAO/DAO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
