"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "education", label: "EDUCATION" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "languages", label: "LANGUAGES" },
  { id: "contact", label: "CONTACT" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Show navigation after scrolling 50% of viewport height
      setIsScrolled(scrollPosition > window.innerHeight * 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav 
      className={cn(
        "fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block transition-all duration-500 ease-out",
        isScrolled 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 -translate-x-8 pointer-events-none"
      )}
    >
      <div className="flex flex-col gap-8">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={cn(
              "text-xs font-mono tracking-[0.2em] transition-all duration-300 font-medium",
              "hover:text-primary hover:translate-x-1",
              "relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
              "before:w-0 before:h-px before:bg-primary before:transition-all before:duration-300",
              activeSection === id
                ? "text-primary before:w-6 before:-left-8"
                : "text-muted-foreground hover:before:w-4 hover:before:-left-6",
            )}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
