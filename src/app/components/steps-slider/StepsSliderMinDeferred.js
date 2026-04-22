'use client'

import dynamic from "next/dynamic"
import LazyMount from "@/app/components/helpers/LazyMount"

// Below-fold variant shown on chef / menu detail pages. Same rationale as
// StepsSliderDeferred — defer Swiper's download and mount.
const StepsSliderMin = dynamic(
    () => import('@/app/components/steps-slider/StepsSliderMin'),
    {ssr: false},
)

const StepsSliderMinDeferred = () => (
    <LazyMount placeholder={<div style={{minHeight: 300}}/>}>
        <StepsSliderMin/>
    </LazyMount>
)

export default StepsSliderMinDeferred
