"use client"

import * as Icons from "lucide-react"
import { LucideProps } from "lucide-react"

interface DynamicIconProps extends LucideProps {
  name: string
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = (Icons as any)[name.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("")]
  return Icon ? <Icon {...props} /> : null
}
