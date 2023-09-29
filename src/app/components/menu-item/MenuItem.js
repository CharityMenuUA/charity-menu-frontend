'use client'
import style from './menuItem.module.scss'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'
import ByLink from '@/app/(public)/authors/[chefId]/[menuId]/ByLink'
import pages from "@/app/components/breadcrumbs/routing"

const MenuItem = (props) => {
    const {id, chefId, image, chefNameAlt, chefName, chefPhoto, title, price, min, available} = props
    return (
        <div className={`${style.item} ${min ? style.min : ''} ${available ? '' : style.available}`}
             itemProp="itemListElement" itemScope itemType="https://schema.org/Product">
            <span itemProp="image" content={`url("${image || '/menu-def-image.png'}")`}/>
            <Link href={`${pages.authors.href}/${chefId}/${id}`} className={style.link}>
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
                    <div className={style.name} itemProp="brand" itemType="https://schema.org/Person" itemScope>
                        <span itemProp="name">{chefName}</span>
                    </div>
                )}
                {chefNameAlt && (
                    <div className={`${style.name} ${style.mob}`}
                         itemProp="brand" itemType="https://schema.org/Person" itemScope>
                        <span itemProp="name">{chefNameAlt}</span>
                    </div>
                )}
                <div className={style.title} itemProp="name">
                    {title}
                </div>
                <div className={style.price} itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <span itemProp="priceCurrency" content="UAH">₴</span><span itemProp="price">{price}</span>
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
