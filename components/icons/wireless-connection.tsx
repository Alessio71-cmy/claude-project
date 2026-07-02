"use client"

import React from 'react'
import { cn } from "@/lib/utils"
import { useIntersectionActive } from "@/hooks/use-intersection-active"

export default function SignalConnection({ className, forceInvert, animate = true }: { className?: string, forceInvert?: boolean, animate?: boolean }) {
    const { ref, isIntersecting } = useIntersectionActive(0.1)
    const shouldAnimate = animate && isIntersecting

    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className={cn("w-full h-full flex items-center justify-center p-4", className)}>
            <style jsx>{`
        @keyframes signalSequence {
          0% { fill: ${forceInvert ? 'currentColor' : '#A1B2A8'}; opacity: ${forceInvert ? '0.5' : '1'}; }
          10% { fill: ${forceInvert ? 'currentColor' : '#566156'}; opacity: 1; } 
          85% { fill: ${forceInvert ? 'currentColor' : '#566156'}; opacity: 1; }
          90%, 100% { fill: ${forceInvert ? 'currentColor' : '#A1B2A8'}; opacity: ${forceInvert ? '0.5' : '1'}; }
        }

        .signal-element {
          ${shouldAnimate ? 'animation: signalSequence 5s linear infinite;' : ''}
        }

        .dot { animation-delay: 0s; }
        .wave-1 { animation-delay: 0.4s; }
        .wave-2 { animation-delay: 0.8s; }
        .wave-3 { animation-delay: 1.2s; }
        .wave-4 { animation-delay: 1.6s; }
      `}</style>

            <svg
                width="299"
                height="108"
                viewBox="0 0 299 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-full max-h-full"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <filter id="wireless_box_filter" x="0" y="0" width="75" height="108" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="2" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="4" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                        <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="1" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                        <feBlend mode="normal" in2="shape" result="effect3_innerShadow" />
                    </filter>
                </defs>

                <path className={cn(shouldAnimate && "signal-element wave-4")} d="M162.016 92.316C183.332 68.5087 183.324 31.4817 162.016 7.68385C161.215 6.78892 159.858 6.77145 159.027 7.63682L154.608 12.2378C153.814 13.0629 153.798 14.3905 154.558 15.2478C171.947 34.8558 171.951 65.1413 154.558 84.7533C153.798 85.6107 153.816 86.9383 154.608 87.7633L159.027 92.3643C159.858 93.2284 161.215 93.2109 162.016 92.316Z" fill={forceInvert ? "currentColor" : "#A1B2A8"} />
                <path className={cn(shouldAnimate && "signal-element wave-3")} d="M148.012 79.5228C163.999 62.9131 163.993 37.0802 148.012 20.4771C147.411 19.8527 146.393 19.8405 145.77 20.4443L142.456 23.6543C141.861 24.2299 141.848 25.1562 142.419 25.7543C155.461 39.4343 155.463 60.5637 142.419 74.2465C141.848 74.8446 141.862 75.7709 142.456 76.3465L145.77 79.5565C146.393 80.1593 147.411 80.1471 148.012 79.5228Z" fill={forceInvert ? "currentColor" : "#A1B2A8"} />
                <path className={cn(shouldAnimate && "signal-element wave-2")} d="M136.008 71.65C146.666 59.4696 146.662 40.5255 136.008 28.3499C135.607 27.892 134.929 27.8831 134.513 28.3258L132.304 30.6798C131.907 31.1019 131.899 31.7812 132.279 32.2198C140.974 42.2518 140.976 57.7467 132.279 67.7808C131.899 68.2194 131.908 68.8987 132.304 69.3208L134.513 71.6748C134.929 72.1168 135.607 72.1079 136.008 71.65Z" fill={forceInvert ? "currentColor" : "#A1B2A8"} />
                <path className={cn(shouldAnimate && "signal-element wave-1")} d="M126.006 64.7614C133.999 56.4565 133.997 43.5401 126.006 35.2386C125.705 34.9264 125.197 34.9203 124.885 35.2221L123.228 36.8271C122.93 37.115 122.924 37.5781 123.209 37.8771C129.73 44.7172 129.732 55.2818 123.209 62.1233C122.924 62.4223 122.931 62.8854 123.228 63.1733L124.885 64.7783C125.197 65.0797 125.705 65.0736 126.006 64.7614Z" fill={forceInvert ? "currentColor" : "#A1B2A8"} />

                <ellipse
                    className={cn(shouldAnimate && "signal-element dot")}
                    cx="116.5" cy="50" rx="5" ry="5.5"
                    transform="rotate(90 116.5 50)"
                    fill={forceInvert ? "currentColor" : "#A1B2A8"}
                />

                <g filter="url(#wireless_box_filter)">
                    <rect x="8" y="4" width="59" height="92" rx="12" fill={forceInvert ? "currentColor" : "#566156"} />
                </g>
                <g filter="url(#wireless_box_filter)" transform="translate(224, 0)">
                    <rect x="8" y="4" width="59" height="92" rx="12" fill={forceInvert ? "currentColor" : "#566156"} />
                </g>
            </svg>
        </div>
    )
}