'use client'

import dynamic from "next/dynamic"
import PropTypes from "prop-types"
import LazyMount from "@/app/components/helpers/LazyMount"

// AttachmentsSlider pulls in Swiper + swiper-navigation + CSS. Below the fold
// on chef and menu detail pages — defer the JS chunk download and the mount
// itself until the user scrolls near.
const AttachmentsSlider = dynamic(
    () => import('@/app/(public)/authors/[chefId]/AttachmentsSlider'),
    {ssr: false},
)

const AttachmentsSliderDeferred = ({attachments}) => (
    <LazyMount placeholder={<div style={{minHeight: 300}}/>}>
        <AttachmentsSlider attachments={attachments}/>
    </LazyMount>
)

AttachmentsSliderDeferred.propTypes = {
    attachments: PropTypes.array,
}

export default AttachmentsSliderDeferred
