'use client'

import dynamic from "next/dynamic"
import LazyMount from "@/app/components/helpers/LazyMount"

// AttachmentsSlider pulls in Swiper + swiper-navigation + extra CSS. Below
// the fold on the homepage, so defer both the chunk and the mount.
const HomeAttachments = dynamic(
    () => import('@/app/(public)/(Homepage)/HomeAttachments'),
    {ssr: false},
)

const HomeAttachmentsDeferred = () => (
    <LazyMount placeholder={<div style={{minHeight: 300}}/>}>
        <HomeAttachments/>
    </LazyMount>
)

export default HomeAttachmentsDeferred
