import style from './style.module.scss'
import OtherChefs from '@/app/components/other-chefs/OtherChefs'
import ShareButtons from '@/app/(public)/chefs/[chefId]/[menuId]/ShareButtons'
import ByLink from '@/app/(public)/chefs/[chefId]/[menuId]/ByLink'
import Link from 'next/link'
import Image from 'next/image'
import PopularMenuItems from "@/app/components/popular-menu-items/PopularMenuItems"
import RandomMenuItem from "@/app/components/random-menu-item/RandomMenuItem"
import {pluralize} from "@/app/components/helpers/pluralLots"
import {getChef, getMenuItem, getPopularMenuItem} from "@/app/components/actions"


export const generateMetadata = async (props) => {
    const {params: {menuId, chefId}} = props
    const menu = await getMenuItem({menuId})
    const chef = await getChef({chefId})

    return {
        title: `${chef.name} пропонує "${menu.title}" за ₴${menu.price} для ЗСУ`,
        description: menu.description
    }
}

const MenuIdPage = async (props) => {
    const {params: {chefId, menuId}} = props
    const menu = await getMenuItem({menuId})
    const chef = await getChef({chefId})
    const {menuItems} = await getPopularMenuItem()
    const {title} = menu

    return (
        <>
            <h1 className={style.h1}>{title}</h1>
            <div className={style.menu_info}>
                <div className={style.price}>
                    <span>₴{menu.price}</span>
                    {menu.available ? (
                        <ByLink menuId={menuId} chefId={chefId} className={style.button}/>
                    ) : (
                        <button className={style.button} disabled={true}>
                            Недоступно
                        </button>
                    )}
                </div>
                <div className={style.description}
                     style={{backgroundImage: `url("${menu.image || '/menu-def-image.png'}")`}}>
                    <div>
                        {menu.description || '?'}
                    </div>
                </div>
                <div className={style.share}>
                    <div>
                        поділитись
                    </div>
                    <ShareButtons/>
                </div>
                <Link href={`/chefs/${chef.id}`} className={style.chef}>
                    <div className={style.label}>
                        <span>Автор лоту</span>
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
                        />
                    </div>
                    <div className={style.content}>
                        <div className={style.name}>
                            {chef.name}
                        </div>
                        <div className={style.count}>
                            {pluralize(chef.menuItemsNumber, ['пропозиція', 'пропозиції', 'пропозицій'])}
                        </div>
                    </div>
                </Link>
            </div>
            <Link href={`/chefs/${chef.id}`} className={style.other_button}>
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