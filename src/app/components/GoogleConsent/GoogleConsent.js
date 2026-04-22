'use client'

import {useEffect, useState} from "react"
import {GoogleAnalytics} from "@next/third-parties/google"

// Gates Google Analytics behind client-side hydration so the GA scripts
// aren't part of the initial SSR HTML (smaller initial document, and GA
// requests kick off after first paint rather than blocking it).
// NOTE: there's no real opt-in here — consent is auto-granted. If we later
// add a proper consent banner, swap `hydrated` for a user-choice state.
export default function GoogleConsent() {
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        setHydrated(true)
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted',
                'functionality_storage': 'granted',
                'personalization_storage': 'granted',
                'security_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
            })
        }
    }, [])

    if (!hydrated) return null

    return (
        <>
            <GoogleAnalytics gaId="G-5V9YXQJLCN"/>
            <GoogleAnalytics gaId="AW-16834446632"/>
        </>
    )
}
