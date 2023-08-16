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

    const Span = ({children}) => {
        const ref = useRef()

        useEffect(() => {
            const minText = (FS = 21) => {
                if (FS < 5) return
                if (ref.current.clientWidth > ref.current.parentElement.clientWidth) {
                    ref.current.style.fontSize = `${FS - 1}px`
                    minText(FS - 1)
                }
            }
            minText()
        }, [])
        return (
            <span ref={ref}>
                {children}
            </span>
        )
    }

    const names = name.split(' ')

    return (
        <Link href={`${pages.authors.href}/${id}`} className={style.chefs}>
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
                />
            </div>
            <div className={style.content}>
                <div className={style.name}>
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