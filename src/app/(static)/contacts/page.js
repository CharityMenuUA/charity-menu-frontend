"use client"

import style from './style.module.scss'
import {useConfigContext} from "@/app/providers/config/ConfigProvider"


const ContactsPage = () => {
    const {config: {contacts: {phone, telegram, email, instagram, twitter, facebook, tiktok}}} = useConfigContext()

    return (
        <div className={style.contacts}>
            <title>Контакти</title>
            <h1>Контакти</h1>
            <div className={style.items_wrap}>
                {phone && (
                    <div className={style.item}>
                        <div className={style.label}>Телефон</div>
                        <div className={style.text}>
                            <a href={`tel:${phone}`} target="_blank">{phone}</a>
                        </div>
                    </div>
                )}
                {email && (
                    <div className={style.item}>
                        <div className={style.label}>Email</div>
                        <div className={style.text}>
                            <a href={`mailto:${email}`} target="_blank">{email}</a>
                        </div>
                    </div>
                )}
                {telegram && (
                    <div className={style.item}>
                        <div className={style.label}>Telegram</div>
                        <div className={style.text}>
                            <a href={telegram} target="_blank">{new URL(telegram).host}</a>
                        </div>
                    </div>
                )}
                {instagram && (
                    <div className={style.item}>
                        <div className={style.label}>Instagram</div>
                        <div className={style.text}>
                            <a href={instagram} target="_blank">{new URL(instagram).host}</a>
                        </div>
                    </div>
                )}
                {twitter && (
                    <div className={style.item}>
                        <div className={style.label}>Twitter</div>
                        <div className={style.text}>
                            <a href={twitter} target="_blank">{new URL(twitter).host}</a>
                        </div>
                    </div>
                )}
                {facebook && (
                    <div className={style.item}>
                        <div className={style.label}>Facebook</div>
                        <div className={style.text}>
                            <a href={facebook} target="_blank">{new URL(facebook).host}</a>
                        </div>
                    </div>
                )}
                {tiktok && (
                    <div className={style.item}>
                        <div className={style.label}>TikTok</div>
                        <div className={style.text}>
                            <a href={tiktok} target="_blank">{new URL(tiktok).host}</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ContactsPage
