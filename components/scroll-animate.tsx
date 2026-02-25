"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollAnimateProps {
  children: ReactNode
  className?: string
  delay?: 100 | 200 | 300 | 400
  as?: keyof JSX.IntrinsicElements
}

export function ScrollAnimate({
  children,
  className = "",
  delay,
  as: Tag = "div",
}: ScrollAnimateProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible")
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`scroll-animate ${className}`}
      {...(delay ? { "data-delay": String(delay) } : {})}
    >
      {children}
    </div>
  )
}
