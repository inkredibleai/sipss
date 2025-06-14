"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react" // Using MessageCircle as a stand-in for WhatsApp

export function FloatingWhatsAppButton() {
  // Replace with your actual WhatsApp number (including country code) or channel link
  const whatsAppNumber = "911234567890" // Example: Indian number
  const defaultMessage = "Hello, I have a question about admissions."
  const whatsAppChannelLink = "https://whatsapp.com/channel/0029Vay5ok77DAWwFEhtwF2p";

//   const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(defaultMessage)}`
  // Or for a channel:
  const whatsAppLink = whatsAppChannelLink;

  return (
    <Link
      href={whatsAppLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </Link>
  )
}