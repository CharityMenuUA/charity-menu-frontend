import style from './style.module.scss'
import {getList, getOne} from '@/helpers/dataProvider';
import MenuItem from "@/app/components/menu-item/MenuItem";
import OtherChefs from "@/app/components/other-chefs/OtherChefs";
import {notFound} from "next/navigation";
import Image from "next/image";
import Accumulated from "@/app/components/accumulated/Accumulated";

const getChef = async (params) => {
    const {chefId} = params;
    try {
        return await getOne(`chefs`, chefId).then(data => data.json())
    } catch {
        return notFound()
    }
}
const getMenu = async (params) => {
    const {chefId} = params;
    try {
        return await getList(`/chefs/${chefId}/menu`).then(data => data.json())
    } catch {
        return notFound()
    }
}
const getAccumulated = async (params) => {
    const {chefId} = params;
    try {
        return await getList(`/chefs/${chefId}/accumulated`).then(data => data.json())
    } catch {
        return {
            amount: 0
        }
    }
}


const Page = async (props) => {
    const {params: {chefId}} = props
    const chef = await getChef({chefId});
    if (!chef.id) return notFound();
    const menu = await getMenu({chefId});
    const accumulated = await getAccumulated({chefId});
    const {instagram, facebook, twitter, tiktok, linkedin, telegram, name, description, photo} = chef;

    return (
        <div>
            <section className={style.head}>
                <h1 className={style.h1}>{name}</h1>
                <div className={style.tdb}>
                    <Accumulated amount={accumulated.amount}/>
                </div>
                <div className={style.content}>
                    {description && (
                        <div className={style.left}>
                            <svg viewBox="0 0 44 31">
                                <path
                                    d="M0.866211 18.1146H9.92353L3.88527 30.191H12.9426L18.9808 18.1146V0H0.866211V18.1146Z"/>
                                <path
                                    d="M25.0192 0V18.1146H34.0765L28.0382 30.191H37.0955L43.1338 18.1146V0H25.0192Z"/>
                            </svg>
                            {description}
                        </div>
                    )}
                    <div className={style.center}>
                        <div className={style.photo}>
                            <Image
                                alt={name}
                                src={photo}
                                fill
                                sizes="500px"
                                quality={100}
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                        <div className={`${style.count} ${style.tdb}`}>
                            {chef.menuItemsNumber} лотів
                        </div>
                    </div>
                    <div className={style.right}>
                        <div>
                            Мої соціалки
                        </div>
                        <div className={style.links}>
                            {instagram && (
                                <a href={instagram} className={style.link}>
                                    <svg viewBox="0 0 24 24">
                                        <path
                                            d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
                                    </svg>
                                </a>
                            )}
                            {tiktok && (
                                <a href={tiktok} className={style.link}>
                                    <svg viewBox="0 0 40 40">
                                        <path
                                            d="M20 0C8.97204 0 0 8.97204 0 20C0 31.0271 8.97204 40 20 40C31.0271 40 40 31.0271 40 20C40 8.97204 31.0288 0 20 0ZM28.9221 15.4225C28.931 15.6207 28.9358 15.8205 28.9358 16.0203C28.9358 22.1034 24.3068 29.1154 15.8374 29.1154C13.2377 29.1154 10.8177 28.3558 8.78112 27.0491C9.14122 27.0918 9.50777 27.1135 9.87916 27.1135C12.0366 27.1135 14.0208 26.3772 15.5966 25.143C13.5825 25.1059 11.8819 23.7751 11.2962 21.9455C11.5766 21.9987 11.8658 22.0285 12.1614 22.0285C12.5812 22.0285 12.9888 21.9737 13.3747 21.8682C11.2688 21.4461 9.68259 19.5859 9.68259 17.3544C9.68259 17.3351 9.68259 17.3149 9.6834 17.2964C10.3037 17.6404 11.0135 17.8482 11.7675 17.8716C10.5333 17.0474 9.72045 15.6376 9.72045 14.0409C9.72045 13.1966 9.94683 12.4055 10.3432 11.7256C12.6126 14.5114 16.0058 16.3433 19.8308 16.5367C19.7519 16.1991 19.7124 15.8487 19.7124 15.487C19.7124 12.9453 21.7731 10.8838 24.3148 10.8838C25.6392 10.8838 26.834 11.4428 27.675 12.3371C28.7247 12.1308 29.7076 11.749 30.5994 11.2197C30.253 12.2952 29.5255 13.1966 28.5725 13.767C29.5045 13.6558 30.3939 13.4093 31.2165 13.0428C30.6026 13.9644 29.822 14.7756 28.9221 15.4225Z"
                                        />
                                    </svg>
                                </a>
                            )}
                            {twitter && (
                                <a href={twitter} className={style.link}>
                                    <svg viewBox="0 0 40 40">
                                        <path
                                            d="M20 0C8.97204 0 0 8.97204 0 20C0 31.0271 8.97204 40 20 40C31.0271 40 40 31.0271 40 20C40 8.97204 31.0288 0 20 0ZM28.9221 15.4225C28.931 15.6207 28.9358 15.8205 28.9358 16.0203C28.9358 22.1034 24.3068 29.1154 15.8374 29.1154C13.2377 29.1154 10.8177 28.3558 8.78112 27.0491C9.14122 27.0918 9.50777 27.1135 9.87916 27.1135C12.0366 27.1135 14.0208 26.3772 15.5966 25.143C13.5825 25.1059 11.8819 23.7751 11.2962 21.9455C11.5766 21.9987 11.8658 22.0285 12.1614 22.0285C12.5812 22.0285 12.9888 21.9737 13.3747 21.8682C11.2688 21.4461 9.68259 19.5859 9.68259 17.3544C9.68259 17.3351 9.68259 17.3149 9.6834 17.2964C10.3037 17.6404 11.0135 17.8482 11.7675 17.8716C10.5333 17.0474 9.72045 15.6376 9.72045 14.0409C9.72045 13.1966 9.94683 12.4055 10.3432 11.7256C12.6126 14.5114 16.0058 16.3433 19.8308 16.5367C19.7519 16.1991 19.7124 15.8487 19.7124 15.487C19.7124 12.9453 21.7731 10.8838 24.3148 10.8838C25.6392 10.8838 26.834 11.4428 27.675 12.3371C28.7247 12.1308 29.7076 11.749 30.5994 11.2197C30.253 12.2952 29.5255 13.1966 28.5725 13.767C29.5045 13.6558 30.3939 13.4093 31.2165 13.0428C30.6026 13.9644 29.822 14.7756 28.9221 15.4225Z"
                                        />
                                    </svg>
                                </a>
                            )}
                            {facebook && (
                                <a href={facebook} className={style.link}>
                                    <svg viewBox="0 0 40 40">
                                        <path
                                            d="M20 0C8.97204 0 0 8.97204 0 20C0 31.0271 8.97204 40 20 40C31.0271 40 40 31.0271 40 20C40 8.97204 31.0288 0 20 0ZM24.9738 20.7041H21.72V32.3016H16.8984C16.8984 32.3016 16.8984 25.9647 16.8984 20.7041H14.6065V16.6052H16.8984V13.9539C16.8984 12.0551 17.8007 9.08805 21.7643 9.08805L25.3371 9.10175V13.0806C25.3371 13.0806 23.166 13.0806 22.7439 13.0806C22.3218 13.0806 21.7216 13.2917 21.7216 14.1972V16.606H25.3951L24.9738 20.7041Z"/>
                                    </svg>
                                </a>
                            )}
                            {linkedin && (
                                <a href={linkedin} className={style.link}>
                                    <svg viewBox="0 0 40 40">
                                        <path
                                            d="M23.6444 17.1582C21.9325 17.1582 21.1679 18.0992 20.7402 18.7597V17.387H17.5161C17.558 18.2957 17.5161 27.0873 17.5161 27.0873H20.7402V21.668C20.7402 21.3788 20.7587 21.088 20.8457 20.8809C21.0793 20.3009 21.6094 19.7007 22.5004 19.7007C23.6669 19.7007 24.1334 20.5901 24.1334 21.8952V27.0849H27.3574L27.3582 21.5222C27.3566 18.5447 25.7655 17.1582 23.6444 17.1582ZM20.7377 18.7936H20.7176C20.724 18.7823 20.7337 18.7718 20.7377 18.7606V18.7936Z"/>
                                        <path d="M12.5054 17.3867H15.7294V27.087H12.5054V17.3867Z"/>
                                        <path
                                            d="M20 0C8.97204 0 0 8.97204 0 20C0 31.0271 8.97204 40 20 40C31.0271 40 40 31.0271 40 20C40 8.97204 31.0288 0 20 0ZM30.6058 29.0462C30.6058 29.8969 29.9001 30.5849 29.0276 30.5849H10.8362C9.96616 30.5849 9.25965 29.8969 9.25965 29.0462V10.6429C9.25965 9.79296 9.96616 9.10416 10.8362 9.10416H29.0276C29.8993 9.10416 30.6058 9.79376 30.6058 10.6429V29.0462Z"
                                            fill="#C2C2C2"/>
                                        <path
                                            d="M14.1393 12.71C13.0373 12.71 12.3154 13.4334 12.3154 14.3856C12.3154 15.3161 13.0155 16.0613 14.0966 16.0613H14.1176C15.2422 16.0613 15.9423 15.3161 15.9423 14.3856C15.9205 13.4342 15.243 12.71 14.1393 12.71Z"
                                            fill="#C2C2C2"/>
                                    </svg>
                                </a>
                            )}
                            {telegram && (
                                <a href={telegram} className={style.link}>
                                    <svg viewBox="0 0 40 40">
                                        <path
                                            d="M20 40C31.0483 40 40 31.0483 40 20C40 8.95167 31.0483 0 20 0C8.95167 0 0 8.95167 0 20C0 31.0483 8.95167 40 20 40ZM9.15167 19.5667L28.435 12.1317C29.33 11.8083 30.1117 12.35 29.8217 13.7033L29.8233 13.7017L26.54 29.17C26.2967 30.2667 25.645 30.5333 24.7333 30.0167L19.7333 26.3317L17.3217 28.655C17.055 28.9217 16.83 29.1467 16.3133 29.1467L16.6683 24.0583L25.935 15.6867C26.3383 15.3317 25.845 15.1317 25.3133 15.485L13.8617 22.695L8.925 21.155C7.85333 20.815 7.83 20.0833 9.15167 19.5667Z"/>
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`${style.count} ${style.tdn}`}>
                    {chef.menuItemsNumber} лотів
                </div>
            </section>
            <section className={style.orders}>
                <div className={style.tdn}>
                    <Accumulated amount={accumulated.amount}/>
                </div>
                <h2 className="h2">Що може зробити {chef.name}</h2>
                <div className={style.orders_list}>
                    {menu.map((item) => (
                        <MenuItem key={item.id} {...item} chefName={chef.name} chefPhoto={chef.photo}/>))}
                </div>
            </section>
            <OtherChefs excludeId={chefId}/>
        </div>
    )
}
export default Page;