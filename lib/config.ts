/**
 * Centralized configuration for personal information
 * Update this file to change info across the entire site
 */

export const siteConfig = {
  name: "Wassim Rahim Hachemi",
  shortName: "WRH",
  title: "CHROME",
  role: "Industrial Electronics Engineering Student & Developer",
  tagline: "Building the future through innovation",
  
  contact: {
    email: "wassimhachemi8@gmail.com",
    phone: "+213 55 11 51 23",
    phoneRaw: "+213551151123",
  },
  
  social: {
    github: {
      url: "https://github.com/WRH-05",
      handle: "WRH-05",
    },
    linkedin: {
      url: "https://linkedin.com/in/wassimh",
      handle: "wassimh",
    },
  },
  
  education: {
    university: "University of Science and Technology Houari Boumediene (USTHB)",
    degree: "Industrial Electronics Engineering",
    year: "4th Year",
  },
  
  meta: {
    title: "CHROME - Wassim Rahim Hachemi",
    description: "Industrial Electronics Engineering Student & Developer - Portfolio showcasing electronics, robotics, AI/ML, and backend engineering projects.",
  },
} as const

export type SiteConfig = typeof siteConfig
