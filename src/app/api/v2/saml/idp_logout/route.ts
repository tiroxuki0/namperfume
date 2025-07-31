import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import getConfig from 'next/config'

const { cookieName, sessionIndex, pmUpstreamUrl } = getConfig().publicRuntimeConfig

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type')

  const authToken = cookies().get(cookieName)?.value
  const sessionIdx = cookies().get(sessionIndex)?.value

  console.log('---trigger---logout_idp---', authToken, sessionIdx)

  if (contentType === 'application/x-www-form-urlencoded') {
    // Parse the form data from the request body
    const formData = await request.formData()

    // Convert formData to an object for easier logging/manipulation
    const formBody: any = {}
    formData.forEach((value, key) => {
      formBody[key] = value
    })

    const targetURL = `${pmUpstreamUrl}/v2/saml/idp_logout`

    console.log({
      formData,
      authToken,
      targetURL,
      ['body-request']: JSON.stringify(formBody),
      sessionIdx,
    })

    console.log('Received form data:', JSON.stringify(formBody))
    console.log('RelayState', formBody?.RelayState)

    const idpLogout = fetch(`${targetURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(formBody),
    })

    const logout = await idpLogout

    cookies().delete(cookieName)
    cookies().delete(sessionIndex)

    if (logout.status === 200) {
      console.log('---logout-with-targetURL---', targetURL, logout)

      const data = await logout.json()

      console.log({ logoutResponse: data })

      if (data.sso_url) {
        return NextResponse.redirect(data.sso_url, 302)
      }

      const host = request.headers.get('host')
      // Dynamically determine protocol (https in production, http otherwise)
      const protocol = (host || '').includes('localhost') ? 'http' : 'https'

      // Construct the full URL using protocol, host, and pathname
      const fullUrl = `${protocol}://${host}`

      return NextResponse.redirect(fullUrl, 302)
    }
  }
  return NextResponse.json({})
}
