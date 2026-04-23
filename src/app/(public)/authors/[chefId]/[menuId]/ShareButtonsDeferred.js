'use client'

import dynamic from "next/dynamic"
import PropTypes from "prop-types"
import LazyMount from "@/app/components/helpers/LazyMount"

// ShareButtons imports next-share which pulls in Facebook / Twitter / Telegram
// share SDKs (~40 KB gzipped). Users don't click share before reading the
// offer, so deferring the chunk + mount until near-scroll is safe.
const ShareButtons = dynamic(
    () => import('@/app/(public)/authors/[chefId]/[menuId]/ShareButtons'),
    {ssr: false},
)

const ShareButtonsDeferred = ({title, url}) => (
    <LazyMount placeholder={<div style={{minHeight: 56}}/>}>
        <ShareButtons title={title} url={url}/>
    </LazyMount>
)

ShareButtonsDeferred.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
}

export default ShareButtonsDeferred
