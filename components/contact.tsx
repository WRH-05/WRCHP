"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-24 px-6 lg:px-12 lg:pl-32">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-display font-light mb-8 tracking-wide">Contact</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-mono tracking-[0.2em] uppercase">Email</p>
                <a
                  href="mailto:wassimhachemi8@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-sans"
                >
                  wassimhachemi8@gmail.com
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-mono tracking-[0.2em] uppercase">Phone</p>
                <a
                  href="tel:+213551151123"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-sans"
                >
                  +213 55 11 51 23
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-mono tracking-[0.2em] uppercase">Location</p>
                <div className="text-muted-foreground font-sans">
                  <p>01 Bd Basta Ali, Bab El Oued</p>
                  <p>16008 Alger</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <Textarea
                name="message"
                placeholder="Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              />

              <Button type="submit" className="w-full md:w-auto font-mono tracking-wider uppercase">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-24 pt-8 border-t border-border text-center">
        <p className="text-xs text-muted-foreground font-mono tracking-[0.2em] uppercase">
          © 2025 Wassim Rahim Hachemi. Built with precision and passion.
        </p>
      </div>
    </section>
  )
}
