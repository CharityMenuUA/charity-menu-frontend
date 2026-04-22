'use client'

import dynamic from "next/dynamic"
import LazyMount from "@/app/components/helpers/LazyMount"

// Below-fold on mobile; Swiper (~40 KB gzipped) plus its CSS is heavy enough
// that loading it during hydration inflates INP. Defer both the JS chunk
// (next/dynamic, ssr: false) and the mount itself (LazyMount) until the user
// scrolls near it.
const StepsSlider = dynamic(
    () => import('@/app/components/steps-slider/StepsSlider'),
    {ssr: false},
)

const StepsSliderDeferred = () => (
    <LazyMount placeholder={<div style={{minHeight: 400}}/>}>
        <StepsSlider/>
    </LazyMount>
)

export default StepsSliderDeferred
