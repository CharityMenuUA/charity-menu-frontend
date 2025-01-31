'use client';

import {useEffect} from "react";

export default function GoogleConsent() {
    useEffect(() => {
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted',
                'functionality_storage': 'granted',
                'personalization_storage': 'granted',
                'security_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
            });
        }
    })
    return null
}