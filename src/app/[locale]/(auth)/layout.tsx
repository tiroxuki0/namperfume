import React from "react"

import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import getConfig from "next/config"
import { redirect } from "next/navigation"
import { env } from "next-runtime-env"

import { getSSOUrl } from "@utils/request/request"

const metaTitle = env("NEXT_PUBLIC_META_TITLE") || "NextApp"

const { appEnv, cookieName } = getConfig().publicRuntimeConfig

export const metadata = {
  title: metaTitle,
  description: ""
}

{
  /*
  https://nextjs.org/docs/app/building-your-application/routing/route-groups
  */
}

const DynamicBaseAppLayout = dynamic(() => import("@components/AppLayout"), {
  ssr: false
})

const RootLayout = async ({ children }: React.PropsWithChildren) => {
  const cookie = cookies()?.get(cookieName)

  console.log({
    appEnv,
    cookie
  })

  if (!cookie || typeof cookie === "undefined") {
    // TODO: implement later
    try {
      const result = await getSSOUrl("")
      redirect(result?.ssoUrl)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <DynamicBaseAppLayout>{children}</DynamicBaseAppLayout>
    </>
  )
}

export default RootLayout
