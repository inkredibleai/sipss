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

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <NavigationBar />}
      <main className={`flex-grow ${!isAdminPage ? "pt-16" : ""}`}> {/* Adjust padding if navbar is absent */}
        {children}
      </main>
      <Footer />
      <FloatingWhatsAppButton /> {/* Add the button here */}
    </div>
  )
}
