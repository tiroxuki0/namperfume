import "isomorphic-fetch"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { getCookie } from "cookies-next"

// Utils

const getTargetUrl = (request: NextRequest) =>
  `${process.env.NEXT_PUBLIC_API_URL}${(request?.url || "").split("/api")[1]}`

const getToken = () => {
  const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME || "authToken"
  return getCookie(cookieName, { cookies })
}

const getSessionIndex = () => {
  const sessionIndexName = process.env.SESSION_INDEX || "sessionIndex"
  return getCookie(sessionIndexName, { cookies })
}

const buildHeaders = ({
  token,
  contentType,
  sessionIndex
}: {
  token: string | undefined
  sessionIndex?: string | undefined
  contentType?: string
}) => {
  console.log("DEBUG-----buildHeaders", {
    sessionIndex,
    token
  })

  return new Headers({
    Authorization: `Bearer ${token}`,
    ...(!!contentType && {
      "Content-Type": contentType
    }),

    ...(typeof sessionIndex !== "undefined" && {
      "Session-Index": sessionIndex
    })
  })
}

const handleResponse = async (response: Response) => {
  const special = await handleSpecialContentTypes(response)
  if (special) return special

  const contentType = response.headers.get("Content-Type") || ""
  const isJson = contentType.includes("application/json")

  const data = isJson ? await response.json() : await response.text()

  if (response.ok) {
    return NextResponse.json(data, { status: 200 })
  }

  return NextResponse.json(
    {
      statusCode: response.status,
      statusText: response.statusText,
      ...(typeof data === "object" && data)
    },
    { status: response.status }
  )
}

const handleSpecialContentTypes = async (response: Response) => {
  const contentType = response.headers.get("Content-Type")

  if (contentType?.includes("text/csv")) {
    const csv = await response.text()
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment"
      }
    })
  }

  if (contentType?.includes("pdf")) {
    const pdf = await response.arrayBuffer()
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment"
      }
    })
  }

  return null
}

async function handleWriteMethod(
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  request: NextRequest
) {
  const url = getTargetUrl(request)

  const token = getToken()
  let isFormData = false
  const contentType = request.headers.get("Content-Type") || ""
  isFormData = contentType.includes("multipart/form-data")

  console.log({
    contentType,
    isFormData,
    request
  })

  const sessionIndex = getSessionIndex()
  console.log("DEBUG-----request---formData-before-set")
  const params = isFormData ? await request.formData() : await request.json()
  console.log("DEBUG-----request---formData", params)

  const newFormData = new FormData()

  if (isFormData) {
    // Append the entries from the received formData to the new one
    for (const [key, value] of params.entries()) {
      newFormData.append(key, value)
    }
  }
  const headers = buildHeaders({
    token: token,
    sessionIndex: sessionIndex,
    ...(!isFormData && {
      contentType: contentType
    })
  })

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: isFormData ? newFormData : JSON.stringify(params)
    })

    console.log(`[DEBUG] ${method} ${url}`, `Payload`, params)
    console.log(`res`, res)

    return await handleResponse(res)
  } catch (error) {
    console.error("[ERROR]", `${method} ${url}`, error)
    return NextResponse.json(
      { statusCode: 500, statusText: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const token = getToken()
  console.log(token)
  const sessionIndex = getSessionIndex()

  const targetURL = getTargetUrl(request)

  const header = buildHeaders({
    token: token,
    contentType: "application/json",
    sessionIndex
  })

  header.set("Accept", request.headers.get("Accept") || "application/json")

  try {
    const response = await fetch(targetURL, {
      headers: header,
      method: "GET"
    })

    return await handleResponse(response)
  } catch (error) {
    console.log("[ERROR]", `GET ${targetURL}`, error)

    return NextResponse.json(
      {
        statusCode: 500,
        statusText: "Something went wrong"
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  return handleWriteMethod("POST", request)
}

export async function DELETE(request: NextRequest) {
  return handleWriteMethod("DELETE", request)
}

export async function PUT(request: NextRequest) {
  return handleWriteMethod("PUT", request)
}

export async function PATCH(request: NextRequest) {
  return handleWriteMethod("PATCH", request)
}
