/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        prependData: `@import "@/app/styles/mixins";`
    },
    experimental: {
        serverActions: true,
    },
    output: 'standalone',
    env: {
        BACKEND_API: process.env.BACKEND_API,
        FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
        FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
        FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
        FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
        FIREBASE_MESSAGINGSENDERID: process.env.FIREBASE_MESSAGINGSENDERID,
        FIREBASE_APPID: process.env.FIREBASE_APPID,
        FIREBASE_MEASUREMENTID: process.env.FIREBASE_MEASUREMENTID,
    },
    swcMinify: true,
    images: {
        unoptimized: true,
        formats: ['image/webp'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
}

module.exports = nextConfig