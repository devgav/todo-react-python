"use client"

import { Navigation } from "@/app/components/(navbar)/navbar";
import { Inter } from 'next/font/google'
import RootStyleRegistry from "@/app/emotion";
import "./globals.css"
export const metadata = {
    title: 'Todo Home',
    description: 'Todo template built with NextJs and Django',
}

export const inter = Inter({
    subsets: ['cyrillic'],
    display: 'swap',
})


export default function RootLayout({ children, fontWeight }) {
    inter.weight = fontWeight
    
    return (
        <>
            <html lang="en">
                <body suppressHydrationWarning={true}>
                    <RootStyleRegistry>
                        <Navigation/>
                        {children}
                    </RootStyleRegistry>
                </body>
            </html>
        </>
    )
}