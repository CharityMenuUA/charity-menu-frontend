'use client'

import {useEffect, useRef, useState} from "react"

// Renders `placeholder` (a sized div) until the user scrolls near, then swaps
// in `children`. Combined with next/dynamic this defers both JS download and
// React mount work until it's actually needed — big INP win for below-fold
// heavy components (Swiper, sliders, etc).
const LazyMount = ({children, placeholder = null, rootMargin = '300px'}) => {
    const [visible, setVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        if (visible) return
        const node = ref.current
        if (!node) return
        if (typeof IntersectionObserver === 'undefined') {
            setVisible(true)
            return
        }
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            {rootMargin},
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [visible, rootMargin])

    return <div ref={ref}>{visible ? children : placeholder}</div>
}

export default LazyMount
