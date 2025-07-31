import { NextResponse } from "next/server"

const beURL = process.env.NEXT_PUBLIC_API_URL || ""

export async function GET() {
  const targetUrl = `${beURL}/v2/saml/sso`

  const request = fetch(targetUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  console.log({
    targetUrl,
    request
  })

  try {
    const result = await request

    console.log({
      result
    })

    if (result.status) {
      const data = await result.json()

      console.log({
        data
      })

      return NextResponse.json({
        ssoUrl: data.sso_url || "",
        success: true
      })
    }

    return NextResponse.json({
      success: false,
      errorMessage: "Something went wrong"
    })
  } catch (error) {
    console.log("error-saml-request", error)
    return NextResponse.json({
      success: false,
      errorMessage: "Something went wrong"
    })
  }
}
