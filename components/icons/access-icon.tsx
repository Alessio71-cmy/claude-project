"use client"

import React from 'react'
import { cn } from "@/lib/utils"

export default function AccessIcon({ className, forceInvert }: { className?: string, forceInvert?: boolean }) {
    return (
        <div className={cn("w-full h-full flex items-center justify-center", className)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-2">
                <path d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0ZM10 3C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4C9 4.26522 9.10536 4.51957 9.29289 4.70711C9.48043 4.89464 9.73478 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 10.2652 15.1054 10.5196 15.2929 10.7071C15.4804 10.8946 15.7348 11 16 11C16.2652 11 16.5196 10.8946 16.7071 10.7071C16.8946 10.5196 17 10.2652 17 10C17 8.14348 16.2625 6.36301 14.9497 5.05025C13.637 3.7375 11.8565 3 10 3Z" fill="currentColor" />
            </svg>
        </div>
    )
}
