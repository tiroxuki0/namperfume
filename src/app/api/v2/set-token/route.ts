import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import getConfig from "next/config"

const { cookieName, maxAge = 14 * 24 * 60 * 60 } = getConfig().publicRuntimeConfig

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const q = searchParams.get("token") || "" // e.g., /api/user/123?q=test

  cookies().set(cookieName, q, {
    path: `/`,
    httpOnly: true,
    maxAge: maxAge,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === "production"
  })

  const host = request.headers.get("host")
  // Dynamically determine protocol (https in production, http otherwise)
  const protocol = (host || "").includes("localhost") ? "http" : "https"

  // Construct the full URL using protocol, host, and pathname
  const fullUrl = `${protocol}://${host}`

  return NextResponse.redirect(fullUrl, 302)
}
