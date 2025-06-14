"use client"

import Link from "next/link"
import type { Institution } from "@/lib/supabase/types"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function InstitutionFooter({ institution }: { institution: Institution }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <img 
              src={institution.logo_url || "/1.jpg"} 
              alt={institution.name}
              className="h-12 w-auto"
            />
            <p className="text-sm">
              {institution.description}
            </p>
            <div className="flex space-x-4">
              {institution.website && (
                <a href={institution.website} target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-5 h-5 hover:text-blue-500 transition-colors" />
                </a>
              )}
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#programs" className="hover:text-white transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="#facilities" className="hover:text-white transition-colors">
                  Facilities
                </Link>
              </li>
              <li>
                <Link href="#admissions" className="hover:text-white transition-colors">
                  Admissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{institution.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a href={`tel:${institution.phone}`} className="hover:text-white transition-colors">
                  {institution.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a href={`mailto:${institution.email}`} className="hover:text-white transition-colors">
                  {institution.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-white font-semibold mb-4">Working Hours</h3>
            <ul className="space-y-2">
              <li>Monday - Friday: 8:00 AM - 4:00 PM</li>
              <li>Saturday: 8:00 AM - 1:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-sm text-center">
          <p>© {currentYear} {institution.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
