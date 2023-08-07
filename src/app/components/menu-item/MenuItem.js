'use client'
import style from './menuItem.module.scss'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'
import ByLink from '@/app/(public)/chefs/[chefId]/[menuId]/ByLink'

const MenuItem = (props) => {
    const {id, chefId, chefNameAlt, chefName, chefPhoto, title, price, min, available} = props
    return (
        <div className={`${style.item} ${min ? style.min : ''} ${available ? '' : style.available}`}>
            <Link href={`/chefs/${chefId}/${id}`} className={style.link}>
                <div className={style.photo}>
                    <Image
                        alt={chefName || chefNameAlt}
                        src={chefPhoto}
                        fill
                        sizes="100px"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>
                {chefName && (
                    <div className={style.name}>
                        {chefName}
                    </div>
                )}
                {chefNameAlt && (
                    <div className={`${style.name} ${style.mob}`}>
                        {chefNameAlt}
                    </div>
                )}
                <div className={style.title}>
                    {title}
                </div>
                <div className={style.price}>
                    ₴{price}
                </div>
            </Link>
            {!min && available && (
                <ByLink chefId={chefId} menuId={id} className={style.button}/>
            )}
        </div>
    )
}

MenuItem.propTypes = {
    id: PropTypes.number.isRequired,
    chefId: PropTypes.number.isRequired,
    chefName: PropTypes.string,
    chefNameAlt: PropTypes.string,
    chefPhoto: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    available: PropTypes.bool.isRequired,
    min: PropTypes.bool,
}

export default MenuItem