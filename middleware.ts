import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Common optimization headers
const optimizationHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
  'Cache-Control': 'public, max-age=3600, must-revalidate'
}

export default function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Apply optimization headers
  Object.entries(optimizationHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

// Configure which routes to apply middleware to
export const config = {
  matcher: [
    '/',
    '/about',
    '/contact',
    '/institutions/:path*',
    '/admissions',
    '/achievements',
    '/resources'
  ]
}