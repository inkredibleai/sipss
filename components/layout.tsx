import { NavigationBar } from "./navigation-bar"
import { Footer } from "./footer"
import { FloatingWhatsAppButton } from "./floating-whatsapp-button" // Import the new component

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow pt-16"> {/* Ensure main content is pushed below fixed navbar */}
        {children}
      </main>
      <Footer />
      <FloatingWhatsAppButton /> {/* Add the button here */}
    </div>
  )
}
