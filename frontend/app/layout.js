"use client"

import { Navigation } from "@/app/components/(navbar)/navbar";
import { Inter } from 'next/font/google'
import RootStyleRegistry from "@/app/emotion";
import "./globals.css"
import { Provider } from "react-redux";
import store from "@/features/store";
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
    // Check local storage for refresh token
  // if refresh token has 201 response route to /todo page
  // else route to home page.
    return (
        <>
        <Provider store={store}>
            <html lang="en">
                <body suppressHydrationWarning={true}>
                      <RootStyleRegistry>
                          <Navigation/>
                          {children}
                      </RootStyleRegistry>
                </body>
            </html>
        </Provider>
        </>
    )
}