"use client"

import { cn } from "@/lib/utils"

export default function CybersecurityIcon({ className, forceInvert, animate = true }: { className?: string, forceInvert?: boolean, animate?: boolean }) {
    const fillColor = forceInvert ? "currentColor" : "#566156"
    
    return (
        <div className={cn("w-full h-full flex items-center justify-center", className)}>
            <style jsx>{`
                @keyframes unite-left {
                    0%, 25% { transform: translateX(0); }
                    45%, 55% { transform: translateX(10px); }
                    75%, 100% { transform: translateX(0); }
                }
                @keyframes unite-right {
                    0%, 25% { transform: translateX(0); }
                    45%, 55% { transform: translateX(-10px); }
                    75%, 100% { transform: translateX(0); }
                }
                .piece-left {
                    animation: ${animate ? 'unite-left 6s cubic-bezier(0.65, 0, 0.35, 1) infinite' : 'none'};
                }
                .piece-right {
                    animation: ${animate ? 'unite-right 6s cubic-bezier(0.65, 0, 0.35, 1) infinite' : 'none'};
                }
            `}</style>
            <svg width="290" height="104" viewBox="0 0 290 104" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-full">
                <g className="piece-left" filter="url(#filter0_ddi_1043_26513)">
                    <path d="M117 5C123.627 5 129 10.3726 129 17V30H113.604C106.976 30 101.604 35.3726 101.604 42V52C101.604 58.6274 106.976 64 113.604 64H129V80C129 86.6274 123.627 92 117 92H20C13.3726 92 8 86.6274 8 80V17C8 10.3726 13.3726 5 20 5H117Z" fill={fillColor}/>
                </g>
                <g className="piece-right" filter="url(#filter1_ddi_1043_26513)">
                    <path d="M270 4C276.627 4 282 9.37258 282 16V80C282 86.6274 276.627 92 270 92H177.432C170.804 92 165.432 86.6274 165.432 80V64H149C142.373 64 137 58.6274 137 52V42C137 35.3726 142.373 30 149 30H165.432V16C165.432 9.37258 170.804 4 177.432 4H270Z" fill={fillColor}/>
                </g>
                <defs>
                    <filter id="filter0_ddi_1043_26513" x="0" y="1" width="137" height="103" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1043_26513"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="4"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                        <feBlend mode="normal" in2="effect1_dropShadow_1043_26513" result="effect2_dropShadow_1043_26513"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1043_26513" result="shape"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="1"/>
                        <feGaussianBlur stdDeviation="1"/>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                        <feBlend mode="normal" in2="shape" result="effect3_innerShadow_1043_26513"/>
                    </filter>
                    <filter id="filter1_ddi_1043_26513" x="129" y="0" width="161" height="104" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1043_26513"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="4"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                        <feBlend mode="normal" in2="effect1_dropShadow_1043_26513" result="effect2_dropShadow_1043_26513"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1043_26513" result="shape"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="1"/>
                        <feGaussianBlur stdDeviation="1"/>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                        <feBlend mode="normal" in2="shape" result="effect3_innerShadow_1043_26513"/>
                    </filter>
                </defs>
            </svg>
        </div>
    )
}
