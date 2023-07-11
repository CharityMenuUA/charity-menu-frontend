'use client'
import Link from 'next/link'
import {useUserContext} from '@/app/firebase/firebase/UserProvider'
import {linkToCreateOrder} from '@/app/components/helpers/links'
import PropTypes from 'prop-types'

const ByLink = (props) => {
    const {chefId, menuId, className} = props
    const {user} = useUserContext()

    return user ? (
        <Link href={linkToCreateOrder({chefId, menuId})} className={className}>
            купити
        </Link>
    ) : (
        <Link href={`/login?next=${linkToCreateOrder({chefId, menuId})}`} className={className}>
            купити
        </Link>
    )
}

ByLink.propTypes = {
    chefId: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    menuId: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    className: PropTypes.string
}
export default ByLink