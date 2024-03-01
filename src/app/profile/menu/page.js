'use client'

import style from '../profile.module.scss'
import {getMenu} from "@/app/profile/actions"
import {useCallback, useEffect, useState} from "react"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import Empty from "@/app/profile/empty"
import Loader from "@/app/components/loader/Loader"
import Link from "next/link"
import pages from "@/app/components/breadcrumbs/routing"
import MenuProfileItem from "@/app/components/order-item/MenuProfileItem"

const ProfileMenuPage = () => {
    const {user, profile, loading} = useUserContext()
    const [isLoading, setLoading] = useState(true)
    const [menu, setMenu] = useState({})
    const loadData = useCallback(() => {
        if (profile?.chefId) {
            if (user?.accessToken) {
                getMenu(user.accessToken).then((data) => {
                    if (data?.menu) setMenu(data.menu)
                    setLoading(false)
                }).catch(() => {
                    setLoading(false)
                })
                return null
            }
        }
        setLoading(false)
    }, [profile.chefId, user.accessToken])

    useEffect(() => {
        loadData()
    }, [loadData])

    if (isLoading || loading) return <Loader/>

    return (
        <div>
            <Link href={pages.profile_menu_create.href} className={`${style.createBtn}`}>
                Створити нову пропозицію
            </Link>
            {!menu.length ? (
                <Empty text={"Поки що ви нічого не створили"}/>
            ) : (
                <>
                    <div className={style.orders}>
                        {menu.map((item) => (
                            <MenuProfileItem key={item.id} menuItem={item} update={() => loadData()}/>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default ProfileMenuPage
