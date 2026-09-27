import { ImageResponse } from "takumi-js/response"

import OgImage from "./og-image"

export const runtime = "nodejs"

export function GET() {
  return new ImageResponse(
    <OgImage
      title="Built Sharp. Built Fast. Built to Convert."
      description="Website yang cepat, jelas, dan punya tujuan bisnis."
    />,
    {
      width: 1200,
      height: 630,
    }
  )
}
