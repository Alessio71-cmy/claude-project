"use client"

import { useEffect, useRef, useState } from "react"

export function useIntersectionActive(threshold = 0.1, rootMargin = "0px") {
  const ref = useRef<HTMLDivElement | SVGSVGElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  return { ref, isIntersecting }
}
