"use client"
import style from './randomMenuItem.module.scss'
import {useEffect, useState} from "react"
import {getRandom} from "@/app/components/random-menu-item/actions"
import Image from "next/image"
import {SwitchTransition, CSSTransition} from "react-transition-group"
import Link from "next/link"
import Loader from "@/app/components/loader/Loader"
import pages from "@/app/components/breadcrumbs/routing"


const RandomMenuItem = () => {
    const [item, setItem] = useState({
        menuItem: undefined,
        chef: undefined
    })

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const onClickGetRandom = async () => {
        setItem({
            animate: true,
        })
        const time = Date.now()
        await getRandom().then(data => {
            if (data?.menuItem && data?.chef) {
                const timeout = 1000 - (Date.now() - time)
                if (timeout > 0) {
                    setTimeout(() => setItem(data), timeout)
                } else {
                    setItem(data)
                }
            }
        })
    }

    return (
        <div className={style.random}>
            <h2>Любиш рандом?</h2>
            <div className={style.contentWrap}>
                <div className={style.content}>
                    {isClient && (
                        <SwitchTransition mode="out-in">
                            <CSSTransition timeout={100} key={item?.menuItem?.id || item.animate} classNames={{
                                enter: style.enter,
                                exit: style.exit,
                            }}>
                                {item?.menuItem ? (
                                    <Link
                                        href={`${pages.authors.href}/${item?.chef?.id}/${item?.menuItem?.id}`}
                                        className={style.menuItem}
                                    >
                                        <div className={style.photo}>
                                            <Image
                                                alt={item?.chef?.name}
                                                src={item?.chef?.photo}
                                                fill
                                                sizes="170px"
                                                quality={100}
                                                style={{
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </div>
                                        <div className={style.name}>
                                            {item?.chef?.name}
                                        </div>
                                        <div className={style.title}>
                                            {item?.menuItem?.title}
                                        </div>
                                        <div className={style.price}>
                                            ₴{item?.menuItem?.price}
                                        </div>
                                    </Link>
                                ) : item.animate ? (
                                    <div className={style.firstScreen}>
                                        <Loader/>
                                    </div>
                                ) : (
                                    <div className={style.firstScreen}>
                                        ?
                                    </div>
                                )}
                            </CSSTransition>
                        </SwitchTransition>
                    )}
                </div>
                <button className={style.button} disabled={item.animate} onClick={onClickGetRandom}>
                    {item.animate ? (
                        <span>перемішуємо</span>
                    ) : (
                        <span>зарандомити</span>
                    )}
                </button>
            </div>
        </div>
    )
}

export default RandomMenuItem
