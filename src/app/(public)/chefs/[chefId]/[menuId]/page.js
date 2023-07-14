import style from './style.module.scss'
import {getOne} from '@/helpers/dataProvider'
import {notFound} from 'next/navigation'
import OtherChefs from '@/app/components/other-chefs/OtherChefs'
import ShareButtons from '@/app/(public)/chefs/[chefId]/[menuId]/ShareButtons'
import ByLink from '@/app/(public)/chefs/[chefId]/[menuId]/ByLink'
import Link from 'next/link'
import Image from 'next/image'
import PopularMenuItems from "@/app/components/popular-menu-items/PopularMenuItems"
import RandomMenuItem from "@/app/components/random-menu-item/RandomMenuItem"
import {getPopularMenuItem} from "@/app/components/popular-menu-items/actions"

const getMenuItem = async (params) => {
    const {menuId} = params
    try {
        return await getOne(`/menu-items/`, menuId).then(data => data.json())
    } catch {
        return notFound()
    }
}

const getChef = async (params) => {
    const {chefId} = params
    try {
        return await getOne(`chefs`, chefId).then(data => data.json())
    } catch {
        return notFound()
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
                    <ByLink menuId={menuId} chefId={chefId} className={style.button}/>
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
                            {chef.menuItemsNumber} лотів
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