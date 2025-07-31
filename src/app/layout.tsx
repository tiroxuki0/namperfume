import React from 'react'
import { env } from 'next-runtime-env'
const favicon = env('NEXT_PUBLIC_FAVICON')

export const metadata = {
  title: '',
  description: '',
  icons: {
    icon: favicon,
  },
}

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="eng">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
