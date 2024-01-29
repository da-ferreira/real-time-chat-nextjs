'use client';

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isLogged } from './lib/utils'

const authRoutes = ['/']

export function middleware(request: NextRequest) {
  // if (!isLogged() && authRoutes.includes(request.nextUrl.pathname)) {
  //   return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
  // }

  // if (isLogged() && request.nextUrl.pathname === '/login') {
  //   return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`)
  // }

  console.log('middleware', isLogged())

  return NextResponse.next()
}
