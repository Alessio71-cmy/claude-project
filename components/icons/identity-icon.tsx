"use client"

import React from "react"

interface IdentityIconProps {
    animate?: boolean
}

export default function IdentityIcon({ animate }: IdentityIconProps) {
    console.log("Rendering IdentityIcon, animate:", animate);
    return (
        <svg width="837" height="153" viewBox="0 0 837 153" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <style>
                {`
                    @keyframes identity-pop {
                        0%, 100% { transform: scale(0.8); }
                        50% { transform: scale(0.95); }
                    }
                    .animate-identity-1-5 { animation: identity-pop 5s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
                    .animate-identity-2-4 { animation: identity-pop 5s ease-in-out infinite; animation-delay: 1s; transform-origin: center; transform-box: fill-box; }
                    .animate-identity-3 { animation: identity-pop 5s ease-in-out infinite; animation-delay: 2s; transform-origin: center; transform-box: fill-box; }
                `}
            </style>
            <rect width="153" height="153" rx="8" fill="#566156" className={animate ? "animate-identity-1-5" : ""} style={{ transformOrigin: 'center', transformBox: 'fill-box' }} />
            <rect x="171" width="153" height="153" rx="8" fill="#566156" className={animate ? "animate-identity-2-4" : ""} style={{ transformOrigin: 'center', transformBox: 'fill-box' }} />
            <rect x="342" width="153" height="153" rx="8" fill="#EBFFF3" className={animate ? "animate-identity-3" : ""} style={{ transformOrigin: 'center', transformBox: 'fill-box' }} />
            <rect x="513" width="153" height="153" rx="8" fill="#566156" className={animate ? "animate-identity-2-4" : ""} style={{ transformOrigin: 'center', transformBox: 'fill-box' }} />
            <rect x="684" width="153" height="153" rx="8" fill="#566156" className={animate ? "animate-identity-1-5" : ""} style={{ transformOrigin: 'center', transformBox: 'fill-box' }} />
            <path d="M419 69C420.839 69 422.659 68.6379 424.358 67.9343C426.056 67.2307 427.599 66.1995 428.899 64.8995C430.2 63.5995 431.231 62.0561 431.934 60.3576C432.638 58.659 433 56.8385 433 55C433 53.1615 432.638 51.341 431.934 49.6424C431.231 47.9439 430.2 46.4005 428.899 45.1005C427.599 43.8005 426.056 42.7693 424.358 42.0657C422.659 41.3621 420.839 41 419 41C415.287 41 411.726 42.475 409.101 45.1005C406.475 47.726 405 51.287 405 55C405 58.713 406.475 62.274 409.101 64.8995C411.726 67.525 415.287 69 419 69ZM383 110.6V113H455V110.6C455 101.64 455 97.16 453.256 93.736C451.722 90.7255 449.274 88.278 446.264 86.744C442.84 85 438.36 85 429.4 85H408.6C399.64 85 395.16 85 391.736 86.744C388.726 88.278 386.278 90.7255 384.744 93.736C383 97.16 383 101.64 383 110.6Z" fill="#566156" stroke="#566156" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
