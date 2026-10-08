export const SITE_URL = "https://www.cadencio.app"
export const APP_URL = "https://my.cadencio.app"

export const PRO_PLAN = {
  name: "Pro",
  monthlyPrice: 149,
  priceLabel: "R$ 149/mês",
  studentLimit: 150,
} as const

export const TRIAL_CTA = {
  label: "Teste grátis por 14 dias",
  helper: `${PRO_PLAN.priceLabel} após os 14 dias grátis. Cancele quando quiser.`,
  href: `${APP_URL}/register?plan=pro&interval=month`,
} as const

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
