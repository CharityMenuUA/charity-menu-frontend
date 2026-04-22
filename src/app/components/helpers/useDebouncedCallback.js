import {useCallback, useEffect, useRef} from "react"

// Returns a stable function that, when called, schedules `callback` to run
// after `delay` ms. Each new call resets the timer. Always uses the latest
// callback reference, so closures over stale state don't fire.
const useDebouncedCallback = (callback, delay = 300) => {
    const callbackRef = useRef(callback)
    const timerRef = useRef(null)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => () => {
        if (timerRef.current) clearTimeout(timerRef.current)
    }, [])

    return useCallback((...args) => {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            callbackRef.current(...args)
        }, delay)
    }, [delay])
}

export default useDebouncedCallback
