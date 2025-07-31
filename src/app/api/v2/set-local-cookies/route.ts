import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import getConfig from 'next/config'

const { cookieName, injectToken } = getConfig().publicRuntimeConfig

export async function GET(request: NextRequest) {
  cookies().set(cookieName, injectToken, {
    path: `/`,
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
  })
  const host = request.headers.get('host')
  // Dynamically determine protocol (https in production, http otherwise)
  const protocol = (host || '').includes('localhost') ? 'http' : 'https'

  // Construct the full URL using protocol, host, and pathname
  const fullUrl = `${protocol}://${host}`

  return NextResponse.redirect(fullUrl, 302)
}
