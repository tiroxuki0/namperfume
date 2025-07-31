import React from "react"
import StyledComponentsRegistry from "../../lib/AntdRegistry"
import { env, PublicEnvScript } from "next-runtime-env"
import "./globals.css"

const metaTitle = env("NEXT_PUBLIC_META_TITLE") || "Platform Manager"

export const metadata = {
  title: metaTitle,
  description: ""
}
{
  /*
  https://nextjs.org/docs/app/building-your-application/routing/route-groups
  */
}

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="eng">
      <head>
        <link rel="icon" href="data:," />
        <PublicEnvScript />
      </head>
      <body className="bg-[#000] !m-0 overflow-x-hidden">
        <div style={{ height: "100%" }}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
