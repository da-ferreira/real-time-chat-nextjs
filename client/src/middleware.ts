'use client';

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const authRoutes = ['/']

export function middleware(request: NextRequest) {
  const isLogged = request.cookies.get('session') !== undefined

  if (!isLogged && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
  }

  if (isLogged && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`)
  }

  return NextResponse.next()
}
