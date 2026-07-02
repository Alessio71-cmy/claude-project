"use client"

import React from 'react'
import { cn } from "@/lib/utils"
import { useIntersectionActive } from "@/hooks/use-intersection-active"

export default function NetworkNodeConnection({ className, forceInvert, animate = true }: { className?: string, forceInvert?: boolean, animate?: boolean }) {
  const { ref, isIntersecting } = useIntersectionActive(0.1)
  const shouldAnimate = animate && isIntersecting

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cn("w-full h-full flex items-center justify-center p-4", className)}>
      <style jsx>{`
        @keyframes drawTogether {
          0% {
            stroke-dashoffset: 350;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          70%, 90% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        .iot-animated-line {
          stroke-dasharray: 350;
          stroke-dashoffset: 350;
          ${shouldAnimate ? 'animation: drawTogether 6s ease-in-out infinite;' : ''}
        }
      `}</style>

      <svg
        width="401"
        height="135"
        viewBox="0 0 401 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full max-h-full"
        style={{ overflow: 'visible' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="shadow_clean" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g stroke={forceInvert ? "currentColor" : "#A1B2A8"} strokeWidth="2" opacity="0.15">
          <path d="M195 55.5L127 37" />
          <path d="M250.5 53L294 30.5" />
          <path d="M251 70.5L360.5 67.5" />
          <path d="M242 85L300 102.5" />
          <path d="M159 99L201 81.5" />
          <path d="M194.5 69L40.5 78" />
        </g>

        <g stroke={forceInvert ? "currentColor" : "#566156"} strokeWidth="4" strokeLinecap="round">
          <path className={cn(shouldAnimate && "iot-animated-line")} d="M195 55.5L127 37" />
          <path className={cn(shouldAnimate && "iot-animated-line")} d="M250.5 53L294 30.5" />
          <path className={cn(shouldAnimate && "iot-animated-line")} d="M251 70.5L360.5 67.5" />
          <path className={cn(shouldAnimate && "iot-animated-line")} d="M242 85L300 102.5" />
          <path className={cn(shouldAnimate && "iot-animated-line")} d="M201 81.5L159 99" />
          <path className={cn(shouldAnimate && "iot-animated-line")} d="M194.5 69L40.5 78" />
        </g>

        <g fill={forceInvert ? "currentColor" : "#566156"}>
          <circle cx="223" cy="64" r="30" filter="url(#shadow_clean)" />
          <circle cx="308" cy="21" r="17" filter="url(#shadow_clean)" />
          <circle cx="376" cy="64" r="17" filter="url(#shadow_clean)" />
          <circle cx="112" cy="30" r="17" filter="url(#shadow_clean)" />
          <circle cx="25" cy="77" r="17" filter="url(#shadow_clean)" />
          <circle cx="314" cy="106" r="17" filter="url(#shadow_clean)" />
          <circle cx="145" cy="106" r="17" filter="url(#shadow_clean)" />
        </g>
      </svg>
    </div>
  )
}