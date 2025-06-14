"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { Institution } from "@/lib/supabase/types"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { Calendar } from "lucide-react"

const colorClasses = {
  orange: {
    bg: "bg-orange-600",
    hover: "hover:bg-orange-700",
    text: "text-orange-600",
    hoverBg: "hover:bg-orange-50",
  },
  blue: {
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
    text: "text-blue-600",
    hoverBg: "hover:bg-blue-50",
  },
  green: {
    bg: "bg-green-600",
    hover: "hover:bg-green-700",
    text: "text-green-600",
    hoverBg: "hover:bg-green-50",
  },
  purple: {
    bg: "bg-purple-600",
    hover: "hover:bg-purple-700",
    text: "text-purple-600",
    hoverBg: "hover:bg-purple-50",
  },
}

const institutionSpecificNavItems = {
  IPS: [
    { label: "About", href: "#about", icon: "info" },
    { label: "Academics", href: "#programs", icon: "graduation-cap" },
    { label: "Co-Curricular", href: "#co-curricular", icon: "book" },
    { label: "Infrastructure", href: "#facilities", icon: "building" },
    { label: "Admissions", href: "#admissions", icon: "graduation-cap" },
    { label: "Parent's Corner", href: "#parents", icon: "phone" },
  ],
  CHS: [
    { label: "About", href: "#about", icon: "info" },
    { label: "Programs", href: "#programs", icon: "graduation-cap" },
    { label: "Research", href: "#research", icon: "book" },
    { label: "Campus Life", href: "#facilities", icon: "building" },
    { label: "Placements", href: "#placements", icon: "target" },
    { label: "Connect", href: "#contact", icon: "phone" },
  ],
  PC: [
    { label: "About", href: "#about", icon: "info" },
    { label: "Programs", href: "#programs", icon: "flask" },
    { label: "Research", href: "#research", icon: "book" },
    { label: "Labs", href: "#facilities", icon: "building" },
    { label: "Admissions", href: "#admissions", icon: "graduation-cap" },
    { label: "Contact", href: "#contact", icon: "phone" },
  ],
  FA: [
    { label: "About", href: "#about", icon: "info" },
    { label: "Courses", href: "#programs", icon: "calculator" },
    { label: "Study Material", href: "#resources", icon: "book" },
    { label: "Test Series", href: "#tests", icon: "target" },
    { label: "Results", href: "#results", icon: "graduation-cap" },
    { label: "Support", href: "#contact", icon: "phone" },
  ],
}

export function InstitutionNavBar({ institution }: { institution: Institution }) {
  const [isOpen, setIsOpen] = useState(false)
  const institutionCode = institution.code.toUpperCase() as keyof typeof institutionSpecificNavItems
  const navItems = institutionSpecificNavItems[institutionCode] || institutionSpecificNavItems.IPS
  const colors = colorClasses[institution.color as keyof typeof colorClasses] || colorClasses.orange

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={`/institutions/${institution.code.toLowerCase()}`} className="flex items-center space-x-3">
            <img 
              src={institution.logo_url || "/1.jpg"} 
              alt={institution.name} 
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-900">{institution.shortName}</span>
              <span className={`text-xs ${colors.text}`}>{institution.type} • {institution.affiliation}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-gray-600 hover:${colors.text} font-medium flex items-center space-x-1`}
              >
                <DynamicIcon name={item.icon} className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
            <Button className={`${colors.bg} ${colors.hover}`}>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Visit
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className={`h-6 w-6 ${colors.text}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-gray-600 hover:${colors.text} font-medium flex items-center space-x-2 p-2 rounded-lg ${colors.hoverBg}`}
                  onClick={() => setIsOpen(false)}
                >
                  <DynamicIcon name={item.icon} className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <Button className={`${colors.bg} ${colors.hover} w-full`}>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Visit
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
