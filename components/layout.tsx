"use client" // Add "use client" for usePathname

import { NavigationBar } from "./navigation-bar"
import { Footer } from "./footer"
import { FloatingWhatsAppButton } from "./floating-whatsapp-button" // Import the new component
import { usePathname } from "next/navigation" // Import usePathname

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith("/admin")
  const isInstitutionPage = pathname?.startsWith("/institutions/")

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && !isInstitutionPage && <NavigationBar />}
      <main className={`flex-grow ${!isAdminPage && !isInstitutionPage ? "pt-16" : ""}`}> {/* Adjust padding if navbar is absent */}
        {children}
      </main>
      {!isAdminPage && !isInstitutionPage && <Footer />}
      <FloatingWhatsAppButton /> {/* Add the button here */}
    </div>
  )
}
