"use client"

import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {notFound} from "next/navigation"

const ProfileMenuLayout = (props) => {
    const {children} = props

    const {profile, loading} = useUserContext()

    if (!loading && !profile?.chefId) return notFound()

    return children
}

export default ProfileMenuLayout
