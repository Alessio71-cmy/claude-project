"use client"

import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"

export default function AgentAiIcon({ className, forceInvert }: { className?: string, forceInvert?: boolean }) {
        const bars = [
                {
                        x: 10,
                        y: 32,
                        h: 32,
                        delay: 0,
                        rot: false
                },
                {
                        x: 21,
                        y: 25,
                        h: 46,
                        delay: 0.05,
                        rot: false
                },
                {
                        x: 32,
                        y: 19,
                        h: 58,
                        delay: 0.1,
                        rot: false
                },
                {
                        x: 49,
                        y: 71,
                        h: 46,
                        delay: 0.15,
                        rot: true
                },
                {
                        x: 60,
                        y: 64,
                        h: 32,
                        delay: 0.2,
                        rot: true
                },
                {
                        x: 65,
                        y: 12,
                        h: 72,
                        delay: 0.25,
                        rot: false
                },
                {
                        x: 76,
                        y: 4,
                        h: 88,
                        delay: 0.3,
                        rot: false
                },
                {
                        x: 87,
                        y: 12,
                        h: 72,
                        delay: 0.35,
                        rot: false
                },
                {
                        x: 104,
                        y: 71,
                        h: 46,
                        delay: 0.4,
                        rot: true
                },
                {
                        x: 115,
                        y: 64,
                        h: 32,
                        delay: 0.45,
                        rot: true
                },
                {
                        x: 120,
                        y: 25,
                        h: 46,
                        delay: 0.5,
                        rot: false
                },
                {
                        x: 131,
                        y: 12,
                        h: 72,
                        delay: 0.55,
                        rot: false
                },
                {
                        x: 142,
                        y: 19,
                        h: 58,
                        delay: 0.6,
                        rot: false
                },
                {
                        x: 159,
                        y: 71,
                        h: 46,
                        delay: 0.65,
                        rot: true
                },
                {
                        x: 170,
                        y: 64,
                        h: 32,
                        delay: 0.7,
                        rot: true
                },
                {
                        x: 175,
                        y: 32,
                        h: 32,
                        delay: 0.75,
                        rot: false
                },
                {
                        x: 186,
                        y: 25,
                        h: 46,
                        delay: 0.8,
                        rot: false
                },
                {
                        x: 197,
                        y: 19,
                        h: 58,
                        delay: 0.85,
                        rot: false
                },
                {
                        x: 214,
                        y: 71,
                        h: 46,
                        delay: 0.9,
                        rot: true
                },
                {
                        x: 225,
                        y: 64,
                        h: 32,
                        delay: 0.95,
                        rot: true
                },
                {
                        x: 230,
                        y: 12,
                        h: 72,
                        delay: 1,
                        rot: false
                },
                {
                        x: 241,
                        y: 4,
                        h: 88,
                        delay: 1.05,
                        rot: false
                },
                {
                        x: 252,
                        y: 12,
                        h: 72,
                        delay: 1.1,
                        rot: false
                },
                {
                        x: 269,
                        y: 71,
                        h: 46,
                        delay: 1.15,
                        rot: true
                },
                {
                        x: 280,
                        y: 64,
                        h: 32,
                        delay: 1.2,
                        rot: true
                }
        ];

        return (
                <div className={cn("w-full h-full flex items-center justify-center p-2", className)}>
                        <style jsx>{`
                @keyframes waveGrow {
                    0%, 100% {
                        transform: scaleY(1);
                    }
                    50% {
                        transform: scaleY(1.5);
                    }
                }

                .bar-animated {
                    transform-origin: center;
                    transform-box: fill-box;
                    animation: waveGrow 3.5s ease-in-out infinite;
                }
            `}</style>

                        <svg
                                width="100%"
                                height="100%"
                                viewBox="0 -30 290 160"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="max-w-full max-h-full overflow-visible"
                                preserveAspectRatio="xMidYMid meet"
                        >
                                <defs>
                                        <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
                                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                <feOffset dy="4" />
                                                <feGaussianBlur stdDeviation="3" />
                                                <feComposite in2="hardAlpha" operator="out" />
                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                <feOffset dy="6" />
                                                <feGaussianBlur stdDeviation="5" />
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

                                <g filter="url(#glow-filter)">
                                        {bars.map((bar, idx) => {
                                                const rect = (
                                                        <rect
                                                                x={bar.x}
                                                                y={bar.y}
                                                                width="6"
                                                                height={bar.h}
                                                                rx="3"
                                                                fill={forceInvert ? "currentColor" : "#90FD94"}
                                                                className="bar-animated"
                                                                style={{ animationDelay: `${bar.delay}s` }}
                                                        />
                                                );
                                                if (bar.rot) {
                                                        return (
                                                                <g key={idx} transform={`rotate(-180 ${bar.x} ${bar.y})`}>
                                                                        {rect}
                                                                </g>
                                                        )
                                                }
                                                return <g key={idx}>{rect}</g>
                                        })}
                                </g>
                        </svg>
                </div>
        )
}
