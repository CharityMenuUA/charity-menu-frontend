const DEFAULT_NEXT = '/profile'

// Returns the `next` redirect target from the current URL, but only if it is a
// same-origin relative path. Rejects absolute URLs ("https://evil.com") and
// protocol-relative ones ("//evil.com", "/\\evil.com") to prevent open redirects
// after login/registration.
export const getSafeNext = (search = window.location.search) => {
    const next = new URLSearchParams(search).get('next')
    if (!next || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) {
        return DEFAULT_NEXT
    }
    return next
}

export const withNext = (path, next) => `${path}?next=${encodeURIComponent(next)}`
