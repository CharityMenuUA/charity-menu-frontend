'use client'
import Link from 'next/link'
import {useUserContext} from '@/app/providers/firebase/UserProvider'
import {linkToCreateOrder} from '@/app/components/helpers/links'
import PropTypes from 'prop-types'
import ReactPortal from "@/app/components/portal/ReactPortal"
import {useState} from "react"
import ByPopup from "@/app/components/by-popup/ByPopup"

const ByLink = (props) => {
    const {chefId, menuId, className} = props
    const {profile, user, loading} = useUserContext()
    const [open, setOpen] = useState(false)
    if (loading) {
        return (
            <button type={"button"} className={className} disabled={loading}>
                купити
            </button>
        )
    }
    return (
        <>
            {profile && user?.emailVerified ? (
                <button type={"button"} onClick={() => setOpen(true)} className={className}>
                    купити
                </button>
            ) : (
                <Link href={`/login?next=${linkToCreateOrder({chefId, menuId})}`} className={className}>
                    купити
                </Link>
            )}

            <ReactPortal wrapperId={'by-popup'}>
                {open && (<ByPopup menuId={menuId} onClose={() => setOpen(false)}/>)}
            </ReactPortal>

        </>
    )
}

ByLink.propTypes = {
    chefId: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    menuId: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    className: PropTypes.string
}
export default ByLink