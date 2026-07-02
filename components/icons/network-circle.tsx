"use client"

import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { useIntersectionActive } from "@/hooks/use-intersection-active"

export default function NetworkCircle({ className, forceInvert, animate = true }: { className?: string, forceInvert?: boolean, animate?: boolean }) {
    const [isMobile, setIsMobile] = useState(false)
    const { ref, isIntersecting } = useIntersectionActive(0.1)
    const shouldAnimate = animate && isIntersecting

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const centerY = 91 // Centro esatto di 182

    const barsList = [
        { x: 8, height: 85, width: 81, rx: 12, group: "g1" },
        { x: 115, height: 108, width: 81, rx: 12, group: "g2" },
        { x: 222, height: 125, width: 81, rx: 12, group: "g3" },
        { x: 329, height: 166, width: 81, rx: 12, group: "g4" },
        { x: 436, height: 125, width: 81, rx: 12, group: "g3" },
        { x: 543, height: 108, width: 81, rx: 12, group: "g2" },
        { x: 650, height: 85, width: 81, rx: 12, group: "g1" },
    ]

    const color1 = forceInvert ? 'currentColor' : '#A1B2A8'
    const color2 = forceInvert ? 'currentColor' : '#566156'
    const opacity1 = forceInvert ? '0.5' : '1'

    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className={cn("w-full h-full flex items-center justify-center p-4", className)}>
            <style jsx>{`
                @keyframes bar-g1-slow {
                    0% { fill: ${color1}; opacity: ${opacity1}; }
                    12% { fill: ${color2}; opacity: 1; }
                    75% { fill: ${color2}; opacity: 1; }
                    85% { fill: ${color1}; opacity: ${opacity1}; }
                    100% { fill: ${color1}; opacity: ${opacity1}; }
                }

                @keyframes bar-g2-slow {
                    0%, 12% { fill: ${color1}; opacity: ${opacity1}; }
                    24% { fill: ${color2}; opacity: 1; }
                    75% { fill: ${color2}; opacity: 1; }
                    85% { fill: ${color1}; opacity: ${opacity1}; }
                    100% { fill: ${color1}; opacity: ${opacity1}; }
                }

                @keyframes bar-g3-slow {
                    0%, 24% { fill: ${color1}; opacity: ${opacity1}; }
                    36% { fill: ${color2}; opacity: 1; }
                    75% { fill: ${color2}; opacity: 1; }
                    85% { fill: ${color1}; opacity: ${opacity1}; }
                    100% { fill: ${color1}; opacity: ${opacity1}; }
                }

                @keyframes bar-g4-slow {
                    0%, 36% { fill: ${color1}; opacity: ${opacity1}; }
                    48% { fill: ${color2}; opacity: 1; }
                    75% { fill: ${color2}; opacity: 1; }
                    85% { fill: ${color1}; opacity: ${opacity1}; }
                    100% { fill: ${color1}; opacity: ${opacity1}; }
                }

                .bar-g1 { ${shouldAnimate ? 'animation: bar-g1-slow 8s ease-in-out infinite;' : ''} }
                .bar-g2 { ${shouldAnimate ? 'animation: bar-g2-slow 8s ease-in-out infinite;' : ''} }
                .bar-g3 { ${shouldAnimate ? 'animation: bar-g3-slow 8s ease-in-out infinite;' : ''} }
                .bar-g4 { ${shouldAnimate ? 'animation: bar-g4-slow 8s ease-in-out infinite;' : ''} }
            `}</style>

            <svg
                width="739"
                height="182"
                viewBox="0 0 739 182"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-full max-h-full overflow-visible"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <filter id="filter_network_v2" x="-20" y="-20" width="780" height="230" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="2" />
                        <feGaussianBlur stdDeviation="3" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                    </filter>
                </defs>
                <g filter={!isMobile ? "url(#filter_network_v2)" : undefined}>
                    {barsList.map((bar, index) => (
                        <rect
                            key={index}
                            x={bar.x}
                            y={centerY - (bar.height / 2)}
                            width={bar.width}
                            height={bar.height}
                            rx={bar.rx}
                            fill={color1}
                            className={cn(shouldAnimate && `bar-${bar.group}`)}
                        />
                    ))}
                </g>
            </svg>
        </div>
    )
}