import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import getConfig from "next/config"

const {
  cookieName,
  sessionIndex,
  maxAge = 14 * 24 * 60 * 60,
  pmUpstreamUrl,
  pmOrigin,
  cookieSecure
} = getConfig().publicRuntimeConfig

export async function POST(request: NextRequest) {
  console.log("---trigger-callback---")

  const contentType = request.headers.get("content-type")

  console.log("---trigger-contentType---", contentType)

  if (contentType === "application/x-www-form-urlencoded") {
    const options = {
      path: `/`,
      httpOnly: true,
      maxAge: maxAge,
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production" && cookieSecure === "true"
    }
    // Parse the form data from the request body
    const formData = await request.formData()

    // Convert formData to an object for easier logging/manipulation
    interface FormBody {
      [key: string]: FormDataEntryValue
    }
    const formBody: FormBody = {}
    formData.forEach((value, key) => {
      formBody[key] = value
    })

    const targetURL = `${pmUpstreamUrl}/v2/saml/acs`

    console.log({
      formData,
      RelayState: formBody.RelayState,
      targetURL,
      ["body-request"]: JSON.stringify(formBody)
    })

    console.log("[POST] --- Received form data:", JSON.stringify(formBody))

    const acs = fetch(targetURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: pmOrigin
      },
      body: JSON.stringify(formBody)
    })

    try {
      const acsRes = await acs

      console.log({
        acsRes
      })

      if (acsRes.status === 200) {
        const host = request.headers.get("host")
        // Dynamically determine protocol (https in production, http otherwise)
        const protocol = (host || "").includes("localhost") ? "http" : "https"

        const data = await acsRes.json()
        console.log("ACS: Set Cookie", data, {
          sessionIndex,
          cookieName,
          maxAge
        })

        // Construct the full URL using protocol, host, and pathname
        const fullUrl = `${protocol}://${host}/${formBody.RelayState}`

        cookies().set(cookieName, data?.auth_token, options)

        cookies().set(sessionIndex, data?.session_index, options)

        console.log(`ACS-CurrentState: authToken ${cookies().get(cookieName)?.value}`)

        console.log(`ACS-CurrentState: sessionIndex ${cookies().get(sessionIndex)?.value}`)

        return NextResponse.redirect(fullUrl, 302)
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    return NextResponse.json({
      success: true
    })
  }
}
