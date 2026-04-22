"use client"

import style from './chefItem.module.scss'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'
import {pluralize} from "@/app/components/helpers/pluralLots"
import {Fragment, useEffect, useRef} from "react"
import pages from "@/app/components/breadcrumbs/routing"

const ChefItem = (props) => {
    const {id, photo, menuItemsNumber, name} = props

    // Fits long words into the card by shrinking font-size. Previous version
    // iterated with up to 16 layout reads/writes per word — with ~10 chefs on
    // the homepage that was hundreds of forced layouts during hydration and
    // drove mobile INP into the "Poor" bucket. Now: single read, proportional
    // math, and deferred to after first paint via rAF so input response isn't
    // blocked.
    const Span = ({children}) => {
        const ref = useRef()

        useEffect(() => {
            const raf = requestAnimationFrame(() => {
                const el = ref.current
                const parent = el?.parentElement
                if (!el || !parent) return
                const needed = el.clientWidth
                const available = parent.clientWidth
                if (needed > available) {
                    const ratio = available / needed
                    const newSize = Math.max(5, Math.floor(21 * ratio))
                    el.style.fontSize = `${newSize}px`
                }
            })
            return () => cancelAnimationFrame(raf)
        }, [])
        return (
            <span ref={ref}>
                {children}
            </span>
        )
    }

    const names = name.split(' ')

    return (
        <Link href={`${pages.authors.href}/${id}`} className={style.chefs} itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem  https://schema.org/Person" >
            <div className={style.photo}>
                <Image
                    alt={name}
                    src={photo}
                    fill
                    sizes="170px"
                    quality={100}
                    style={{
                        objectFit: 'cover',
                    }}
                    itemProp="image"
                />
            </div>
            <div className={style.content}>
                <div className={style.name} itemProp="name">
                    {names.map((name, key) => (
                        <Fragment key={key}>
                            {!!key && (<>&nbsp;</>)}
                            <Span>
                                {name}
                            </Span>
                        </Fragment>
                    ))}
                </div>
                <div className={style.count}>
                    {pluralize(menuItemsNumber, ['пропозиція', 'пропозиції', 'пропозицій'])}
                </div>
            </div>
            <div className={style.button}>
                профайл
            </div>
        </Link>
    )
}

ChefItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    menuItemsNumber: PropTypes.number.isRequired,
}
export default ChefItem
