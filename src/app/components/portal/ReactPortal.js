'use client'
import {createPortal} from 'react-dom'
import PropTypes from "prop-types"
import {useEffect, useRef} from "react"

function createWrapperAndAppendToBody(wrapperId) {
    const wrapperElement = document.createElement('div')
    wrapperElement.setAttribute('id', wrapperId)
    document.body.appendChild(wrapperElement)
    return wrapperElement
}

const ReactPortal = ({children, wrapperId}) => {
    let element = useRef()

    useEffect(() => {
        element.current = document.getElementById(wrapperId)

        if (!element.current) {
            element.current = createWrapperAndAppendToBody(wrapperId)
        }
    }, [wrapperId])

    if (!element.current) return

    return createPortal(children, element.current)
}

ReactPortal.propTypes = {
    wrapperId: PropTypes.string.isRequired
}

export default ReactPortal