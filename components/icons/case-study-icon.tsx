"use client"

import React from "react"

interface CaseStudyIconProps {
    animate?: boolean
}

export default function CaseStudyIcon({ animate }: CaseStudyIconProps) {
    return (
        <svg width="798" height="216" viewBox="0 0 798 216" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <style>
                {`
                    @keyframes case-study-1 { 0%, 100% { transform: translate(0, 0) scale(1); } 40%, 60% { transform: translate(291px, 0) scale(1); } }
                    @keyframes case-study-2 { 0%, 100% { transform: translate(0, 0) scale(1); } 40%, 60% { transform: translate(147px, 0) scale(1); } }
                    @keyframes case-study-3 { 0%, 100% { transform: translate(0, 0) scale(1); } 40%, 60% { transform: translate(6px, 0) scale(1); } }
                    @keyframes case-study-4 { 0%, 100% { transform: translate(0, 0) scale(1); } 40%, 60% { transform: translate(-140px, 0) scale(1); } }
                    @keyframes case-study-5 { 0%, 100% { transform: translate(0, 0) scale(1); } 40%, 60% { transform: translate(-291px, 0) scale(1); } }
                    
                    .animate-case-study-1 { animation: case-study-1 6s cubic-bezier(0.4, 0, 0.2, 1) infinite; transform-origin: center; transform-box: fill-box; }
                    .animate-case-study-2 { animation: case-study-2 6s cubic-bezier(0.4, 0, 0.2, 1) infinite; transform-origin: center; transform-box: fill-box; }
                    .animate-case-study-3 { animation: case-study-3 6s cubic-bezier(0.4, 0, 0.2, 1) infinite; z-index: 10; transform-origin: center; transform-box: fill-box; }
                    .animate-case-study-4 { animation: case-study-4 6s cubic-bezier(0.4, 0, 0.2, 1) infinite; transform-origin: center; transform-box: fill-box; }
                    .animate-case-study-5 { animation: case-study-5 6s cubic-bezier(0.4, 0, 0.2, 1) infinite; transform-origin: center; transform-box: fill-box; }
                `}
            </style>
            <circle cx="108" cy="108" r="108" fill="#A1B2A8" fillOpacity="0.2" className={animate ? "animate-case-study-1" : ""} />
            <circle cx="252" cy="108" r="108" fill="#A1B2A8" fillOpacity="0.6" className={animate ? "animate-case-study-2" : ""} />
            <circle cx="393" cy="108" r="108" fill="#A1B2A8" fillOpacity="0.8" className={animate ? "animate-case-study-3" : ""} />
            <circle cx="539" cy="108" r="108" fill="#A1B2A8" className={animate ? "animate-case-study-4" : ""} />
            <circle cx="690" cy="108" r="108" fill="#566156" className={animate ? "animate-case-study-5" : ""} />
        </svg>
    )
}
