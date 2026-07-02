"use client"

import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { useIntersectionActive } from "@/hooks/use-intersection-active"

export default function HighConnection({ className, forceInvert, animate = true }: { className?: string, forceInvert?: boolean, animate?: boolean }) {
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

    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className={cn("w-full h-full flex items-center justify-center p-4", className)}>
            <style jsx>{`
                @keyframes travel {
                    from {
                        stroke-dashoffset: 1000;
                    }
                    to {
                        stroke-dashoffset: -1000;
                    }
                }

                .path-animated {
                    stroke-dasharray: 150 850; 
                    stroke-dashoffset: 1000;
                    ${shouldAnimate ? 'animation: travel 22s linear infinite;' : ''}
                }
            `}</style>

            <svg
                width="493"
                height="198"
                viewBox="0 0 493 198"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-full max-h-full"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <filter id="box_filter" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
                        <feGaussianBlur stdDeviation="2" in="SourceAlpha" />
                        <feOffset dx="0" dy="2" result="offsetblur" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <g filter={!isMobile ? "url(#box_filter)" : undefined}>
                    <rect x="56" y="53.5" width="165" height="80" rx="11.5" stroke={forceInvert ? "currentColor" : "#A1B2A8"} strokeWidth="2.5" shapeRendering="crispEdges" />
                    <rect x="271" y="4.5" width="165" height="80" rx="11.5" stroke={forceInvert ? "currentColor" : "#A1B2A8"} strokeWidth="2.5" shapeRendering="crispEdges" />
                    <rect x="271" y="105.5" width="165" height="80" rx="11.5" stroke={forceInvert ? "currentColor" : "#A1B2A8"} strokeWidth="2.5" shapeRendering="crispEdges" />
                </g>

                <g opacity="0.15">
                    {[
                        "M0 94H56V65.5C56 58.8726 61.3726 53.5 68 53.5H209.5C216.127 53.5 221.5 58.8726 221.5 65.5V94H242.5C244.709 94 246.5 92.2091 246.5 90V49C246.5 46.7909 248.291 45 250.5 45H271V16.5C271 9.87258 276.373 4.5 283 4.5H424C430.627 4.5 436 9.87258 436 16.5V45H459.5C461.709 45 463.5 46.7909 463.5 49V90C463.5 92.2091 465.291 94 467.5 94H493",
                        "M0 94H56V121.5C56 128.127 61.3726 133.5 68 133.5H209.5C216.127 133.5 221.5 128.127 221.5 121.5V94H242.5C244.709 94 246.5 95.7909 246.5 98V142C246.5 144.209 248.291 146 250.5 146H271V173.5C271 180.127 276.373 185.5 283 185.5H424C430.627 185.5 436 180.127 436 173.5V146H459.5C461.709 146 463.5 144.209 463.5 142V98C463.5 95.7909 465.291 94 467.5 94H493",
                        "M0 94H56V65.5C56 58.8726 61.3726 53.5 68 53.5H209.5C216.127 53.5 221.5 58.8726 221.5 65.5V94H242.5C244.709 94 246.5 92.2091 246.5 90V49C246.5 46.7909 248.291 45 250.5 45H271V72.5C271 79.1274 276.373 84.5 283 84.5H424C430.627 84.5 436 79.1274 436 72.5V45H459.5C461.709 45 463.5 46.7909 463.5 49V90C463.5 92.2091 465.291 94 467.5 94H493",
                        "M0 94H56V121.5C56 128.127 61.3726 133.5 68 133.5H209.5C216.127 133.5 221.5 128.127 221.5 121.5V94H242.5C244.709 94 246.5 95.7909 246.5 98V142C246.5 144.209 248.291 146 250.5 146H271V117.5C271 110.873 276.373 105.5 283 105.5H424C430.627 105.5 436 110.873 436 117.5V146H459.5C461.709 146 463.5 144.209 463.5 142V98C463.5 95.7909 465.291 94 467.5 94H493"
                    ].map((d, i) => (
                        <path key={i} d={d} stroke={forceInvert ? "currentColor" : "#A1B2A8"} strokeWidth="3.5" />
                    ))}
                </g>

                <g>
                    {[
                        "M0 94H56V65.5C56 58.8726 61.3726 53.5 68 53.5H209.5C216.127 53.5 221.5 58.8726 221.5 65.5V94H242.5C244.709 94 246.5 92.2091 246.5 90V49C246.5 46.7909 248.291 45 250.5 45H271V16.5C271 9.87258 276.373 4.5 283 4.5H424C430.627 4.5 436 9.87258 436 16.5V45H459.5C461.709 45 463.5 46.7909 463.5 49V90C463.5 92.2091 465.291 94 467.5 94H493",
                        "M0 94H56V121.5C56 128.127 61.3726 133.5 68 133.5H209.5C216.127 133.5 221.5 128.127 221.5 121.5V94H242.5C244.709 94 246.5 95.7909 246.5 98V142C246.5 144.209 248.291 146 250.5 146H271V173.5C271 180.127 276.373 185.5 283 185.5H424C430.627 185.5 436 180.127 436 173.5V146H459.5C461.709 146 463.5 144.209 463.5 142V98C463.5 95.7909 465.291 94 467.5 94H493",
                        "M0 94H56V65.5C56 58.8726 61.3726 53.5 68 53.5H209.5C216.127 53.5 221.5 58.8726 221.5 65.5V94H242.5C244.709 94 246.5 92.2091 246.5 90V49C246.5 46.7909 248.291 45 250.5 45H271V72.5C271 79.1274 276.373 84.5 283 84.5H424C430.627 84.5 436 79.1274 436 72.5V45H459.5C461.709 45 463.5 46.7909 463.5 49V90C463.5 92.2091 465.291 94 467.5 94H493",
                        "M0 94H56V121.5C56 128.127 61.3726 133.5 68 133.5H209.5C216.127 133.5 221.5 128.127 221.5 121.5V94H242.5C244.709 94 246.5 95.7909 246.5 98V142C246.5 144.209 248.291 146 250.5 146H271V117.5C271 110.873 276.373 105.5 283 105.5H424C430.627 105.5 436 110.873 436 117.5V146H459.5C461.709 146 463.5 144.209 463.5 142V98C463.5 95.7909 465.291 94 467.5 94H493"
                    ].map((d, i) => (
                        <path
                            key={i}
                            d={d}
                            stroke={forceInvert ? "currentColor" : "#566156"}
                            strokeWidth="4"
                            strokeLinecap="round"
                            className={cn(shouldAnimate && "path-animated")}
                        />
                    ))}
                </g>
            </svg>
        </div>
    )
}