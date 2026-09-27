import createMiddleware from "next-intl/middleware"
import { NextResponse, type NextRequest } from "next/server"

import { LOCALE_COOKIE_NAME, locales } from "@/cfgs/i18n.cfg"
import { isSupportedLocale } from "@/lib/i18n/locale-cookie"
import { routing } from "@/lib/i18n/routing"
import { isProductionHost } from "@/lib/seo"

// OpenNext Cloudflare does not support Next 16's Node.js `proxy.ts` yet.
// Keep this filename so Next compiles the request interceptor for Edge.
const intlMiddleware = createMiddleware(routing)

const LOCALE_PREFIX_RE = new RegExp(`^/(${locales.join("|")})(?:/|$)`)

function tagRobots(
  response: NextResponse,
  pathname: string,
  host: string | null
) {
  if (!isProductionHost(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow")
    return response
  }
  return response
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (LOCALE_PREFIX_RE.test(pathname)) {
    return tagRobots(
      intlMiddleware(request),
      pathname,
      request.headers.get("host")
    )
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value
  if (isSupportedLocale(cookieLocale)) {
    const url = request.nextUrl.clone()
    url.pathname =
      pathname === "/" ? `/${cookieLocale}` : `/${cookieLocale}${pathname}`
    return NextResponse.redirect(url)
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: "/((?!api|_next|_vercel|og|.*\\..*).*)",
}
