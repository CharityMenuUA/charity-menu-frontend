import style from './style.module.scss'
import OtherChefs from '@/app/components/other-chefs/OtherChefs'
import ShareButtons from '@/app/(public)/authors/[chefId]/[menuId]/ShareButtons'
import ByLink from '@/app/(public)/authors/[chefId]/[menuId]/ByLink'
import Link from 'next/link'
import Image from 'next/image'
import PopularMenuItems from "@/app/components/popular-menu-items/PopularMenuItems"
import RandomMenuItem from "@/app/components/random-menu-item/RandomMenuItem"
import {pluralize} from "@/app/components/helpers/pluralLots"
import {getChef, getMenuItem, getPopularMenuItem} from "@/app/components/actions"
import pages from "@/app/components/breadcrumbs/routing"
import {notFound} from "next/navigation"


export const generateMetadata = async (props) => {
    const {params: {menuId, chefId}} = props
    const menu = await getMenuItem({menuId})
    const chef = await getChef({chefId})
    const meta = {
        title: `${chef.name} пропонує "${menu.title}" за ₴${menu.price} для ЗСУ`,
        description: menu.description,
        images: menu.image || '/menu-def-image.png',
    }
    return {
        title: `${chef.name} пропонує "${menu.title}" за ₴${menu.price} для ЗСУ`,
        description: menu.description,
        openGraph: {
            ...meta,
            type: 'website',
        },
        twitter: {
            ...meta,
            card: "summary_large_image"
        }
    }
}

const MenuIdPage = async (props) => {
    const {params: {chefId, menuId}} = props
    const menu = await getMenuItem({menuId})
    console.log(menu)
    if (!menu?.id) return notFound()
    const chef = await getChef({chefId})
    if (!chef.id) return notFound()
    if (menu?.chefId !== chef.id) return notFound()
    const {menuItems} = await getPopularMenuItem()

    const {title, active, available, availablePerDay, availableTotal} = menu

    return (
        <>
            <div itemScope itemType="https://schema.org/Order https://schema.org/Product">
                <h1 className={style.h1} itemProp="name">{title}</h1>
                <div className={style.menu_info}>
                    <div className={style.price}>
                        <div className={style.priceInfo}>
                            <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                <span itemProp="priceCurrency" content="UAH">₴</span><span
                                itemProp="price">{menu.price}</span>
                            </span>
                            {available ? (
                                <ByLink menuId={menuId} chefId={chefId} className={style.button}/>
                            ) : (
                                <button className={style.button} disabled={true}>
                                    Недоступно
                                </button>
                            )}
                        </div>
                        {active && (
                            <div className={style.availableWrap}>
                                {available && !!availableTotal && (
                                    <div className={style.available}>
                                        Доступно всього: <b>{availableTotal}</b>
                                    </div>
                                )}
                                {available && !!availablePerDay && (
                                    <div className={style.available}>
                                        Доступно сьогодні: <b>{availablePerDay}</b>
                                    </div>
                                )}
                                {!available && (
                                    <div className={style.available}>
                                        На сьогодні ліміт вичерпано.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={style.description}
                         style={{backgroundImage: `url("${menu.image || '/menu-def-image.png'}")`}}
                    >
                        <span itemProp="image" content={`${menu.image || '/menu-def-image.png'}`}/>
                        <div itemProp="description">
                            {menu.description || '?'}
                        </div>
                    </div>
                    <div className={style.share}>
                        <div>
                            поділитись
                        </div>
                        <ShareButtons title={title}/>
                    </div>
                    <Link href={`${pages.authors.href}/${chef.id}`} className={style.chef} itemScope itemProp="broker"
                          itemType="https://schema.org/Person">
                        <div className={style.label}>
                            <span>Автор пропозиції</span>
                        </div>
                        <div className={style.photo}>
                            <Image
                                alt={chef.name}
                                src={chef.photo}
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
                                {chef.name}
                            </div>
                            <div className={style.count}>
                                {pluralize(chef.menuItemsNumber, ['пропозиція', 'пропозиції', 'пропозицій'])}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <Link href={`${pages.authors.href}/${chef.id}`} className={style.other_button}>
                Інші пропозиції автора
            </Link>
            <div className={style.popularRandom}>
                <PopularMenuItems menuItems={menuItems}/>
                <RandomMenuItem/>
            </div>
            <OtherChefs excludeId={chefId}/>
        </>
    )
}

export default MenuIdPage
