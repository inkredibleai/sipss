import type { Metadata } from "next"
import { institutionData } from "./institutionData"
import { InstitutionNavBar } from "@/components/institutions/institution-navbar"
import { InstitutionFooter } from "@/components/institutions/institution-footer"
import { MarqueeUpdates } from "@/components/marquee-updates"

interface LayoutProps {
  children: React.ReactNode
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = params
  const institution = institutionData[slug as keyof typeof institutionData]

  if (!institution) {
    return {
      title: "Institution Not Found",
    }
  }

  return {
    title: `${institution.name} - ${institution.type}`,
    description: institution.description,
    openGraph: {
      title: `${institution.name} - ${institution.type}`,
      description: institution.description,
      images: [institution.logo_url || "/placeholder-logo.png"],
    },
    icons: {
      icon: institution.logo_url || "/placeholder-logo.png",
      shortcut: institution.logo_url || "/placeholder-logo.png",
      apple: institution.logo_url || "/placeholder-logo.png",
    },
  }
}

export default function InstitutionLayout({ children, params }: LayoutProps) {
  const { slug } = params
  const institution = institutionData[slug as keyof typeof institutionData]

  if (!institution) {
    return children
  }

  return (
    <div className="flex min-h-screen flex-col">
      <InstitutionNavBar institution={institution} />
      <MarqueeUpdates institutionId={slug} />
      <main className="flex-grow">{children}</main>
      <InstitutionFooter institution={institution} />
    </div>
  )
}
