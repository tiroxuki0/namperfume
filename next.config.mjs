/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    apiKey: "secret"
  },
  reactStrictMode: false,
  output: "standalone",
  publicRuntimeConfig: {
    dictAppName: process.env.DICT_APP_NAME || "Next.js App",
    apiURL: process.env.NEXT_PUBLIC_PROXY_PATH || "/api",
    beURL: `${process.env.EXTERNAL_API_URL}/v1`,
    cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME || "authToken",
    cookieSecure: process.env.COOKIE_SECURE,
    appVersion: process.env.APP_VERSION,
    disableInterval: process.env.DISABLE_INTERVAL,
    defaultTheme: process.env.THEME || "#19aa8d",
    buildPath: process.env.BUILD_PATH,
    menuLayout: process.env.MENU_LAYOUT,
    defaultApps: process.env.DEFAULT_APPS,
    homeChannelLimit: 12,
    channelLimit: 48,
    whiteListPages: [],
    cookieDomain: process.env.COOKIE_DOMAIN,
    appEnv: process.env.NEXT_PUBLIC_NODE_ENV,
    injectToken: process.env.INJECT_TOKEN,
    webSocket: process.env.WEB_SOCKET,
    sessionIndex: process.env.SESSION_INDEX || "sessionIndex",
    logoUrl: process.env.LOGO_URL || "/img/logo.png",
    maxAge: process.env.NEXT_PUBLIC_MAX_AGE,
    ffOrigin: process.env.DOMAIN,
    flowFileDownloadUrl: process.env.FLOWFILE_DOWNLOAD_URL,
    profileDownloadUrl: process.env.PROFILE_DOWNLOAD_URL,
    documentDownloadUrl: process.env.DOCUMENT_DOWNLOAD_URL,
    themeBackgroundColor: process.env.THEME_BACKGROUND_COLOR,
    themePrimaryColor: process.env.THEME_PRIMARY_COLOR,
    themeSecondaryColor: process.env.THEME_SECONDARY_COLOR,
    themeTextPrimary: process.env.THEME_TEXT_PRIMARY,
    themeTextSecondary: process.env.THEME_TEXT_SECONDARY,
    themeFont: process.env.THEME_FONT,
    customerCode: process.env.CUSTOMER_CODE,
    currencyType: process.env.CURRENCY_TYPE || "symbol",
    currencyPosition: process.env.CURRENCY_POSITION || "prefix",
    // term
    trailingSlash: true,
    pmOrigin: process.env.DOMAIN,
    beUrl: process.env.NEXT_PUBLIC_API_URL
  },
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*"
      }
    ]
  }
}

export default nextConfig
