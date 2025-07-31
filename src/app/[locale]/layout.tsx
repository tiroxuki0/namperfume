import React from "react"

import { env, PublicEnvScript } from "next-runtime-env"

import StyledComponentsRegistry from "../../lib/AntdRegistry"
import "./globals.css"

const metaTitle = env("NEXT_PUBLIC_META_TITLE") || "NextApp"

export const metadata = {
  title: metaTitle,
  description: ""
}

// https://nextjs.org/docs/app/building-your-application/routing/route-groups

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <link href="data:," rel="icon" />
        <PublicEnvScript />
      </head>
      <body className="m-0 overflow-x-hidden">
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout
