export const SITE_URL = "https://www.cadencio.app"
export const APP_URL = "https://my.cadencio.app"

export const TRIAL_CTA = {
  label: "Teste grátis por 14 dias",
  helper: "Cancele quando quiser. Sem compromisso.",
  href: `${APP_URL}/register`,
} as const

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
