import type { MetadataRoute } from "next"

import { demoRoutes, guideRoutes } from "@/lib/organic-content"
import { absoluteUrl } from "@/lib/site"

const STATIC_ROUTES = ["/", "/guias", "/demos"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [...STATIC_ROUTES, ...guideRoutes, ...demoRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : route === "/guias" ? 0.9 : 0.7,
  }))
}
