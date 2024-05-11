'use client'

import style from "@/app/(auth)/auth.module.scss"
import {auth} from "@/app/providers/firebase/app"
import firebase from "firebase/app"
import {useEffect} from "react"

const OtherSignInMethods = ({callback, setError}) => {
    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        await auth.signInWithRedirect(provider)
    }

    useEffect(() => {
        auth.getRedirectResult().then(async (userCred) => {
            console.log(userCred)
            // if (typeof callback === "function") callback(result.credential)
        })
    }, [])

    // const signInWithGoogle = () => {
    //     const provider = new firebase.auth.GoogleAuthProvider()
    //     auth.signInWithPopup(provider)
    //         .then((result) => {
    //             if (typeof callback === "function") callback(result.credential)
    //         }).catch((err) => {
    //         console.error({...err})
    //         setError(err)
    //     })
    // }
    // const signInWithFacebook = () => {
    //     const provider = new firebase.auth.FacebookAuthProvider()
    //     auth.signInWithPopup(provider)
    //         .then((result) => {
    //             if (typeof callback === "function") callback(result.credential)
    //         }).catch((err) => {
    //         console.error({...err})
    //         setError(err)
    //     })
    // }

    const signInWithTwitter = () => {
        const provider = new firebase.auth.TwitterAuthProvider()
        auth.signInWithPopup(provider)
            .then((result) => {
                if (typeof callback === "function") callback(result.credential)
            }).catch((err) => {
            console.error({...err})
            setError(err)
        })
    }

    return (
        <div className={style.buttons}>
            <button type={'button'} className={style.button} onClick={signInWithTwitter}>
                <svg viewBox="0 0 128 128" height="30">
                    <path
                        d="M128,23.294    c-4.703,2.142-9.767,3.59-15.079,4.237c5.424-3.328,9.587-8.606,11.548-14.892c-5.079,3.082-10.691,5.324-16.687,6.526    c-4.778-5.231-11.608-8.498-19.166-8.498c-14.493,0-26.251,12.057-26.251,26.927c0,2.111,0.225,4.16,0.676,6.133    C41.217,42.601,21.871,31.892,8.91,15.582c-2.261,3.991-3.554,8.621-3.554,13.552c0,9.338,4.636,17.581,11.683,22.412    c-4.297-0.131-8.355-1.356-11.901-3.359v0.331c0,13.051,9.053,23.937,21.074,26.403c-2.201,0.632-4.523,0.948-6.92,0.948    c-1.69,0-3.343-0.162-4.944-0.478c3.343,10.694,13.035,18.483,24.53,18.691c-8.986,7.227-20.315,11.533-32.614,11.533    c-2.119,0-4.215-0.123-6.266-0.37c11.623,7.627,25.432,12.088,40.255,12.088c48.309,0,74.717-41.026,74.717-76.612    c0-1.171-0.023-2.342-0.068-3.49C120.036,33.433,124.491,28.695,128,23.294"
                        fill="#00AAEC" id="Twitter_1_"/>
                </svg>
            </button>

            {/*<button type={'button'} className={style.button} onClick={signInWithFacebook}>*/}
            {/*    <svg width="15" height="30" viewBox="0 0 15 30" fill="none"*/}
            {/*    >*/}
            {/*        <path*/}
            {/*            d="M14.396 14.9711H9.94681V30H3.20597V14.9711H0V9.68936H3.20597V6.27146C3.20597 3.8273 4.46515 0 10.0068 0L15 0.0192611V5.1461H11.3771C10.7829 5.1461 9.94726 5.41986 9.94726 6.58579V9.69427H14.9849L14.396 14.9711Z"*/}
            {/*            fill="#3B5998"/>*/}
            {/*    </svg>*/}
            {/*</button>*/}

            <button type={'button'} className={style.button} onClick={signInWithGoogle}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                >
                    <path
                        d="M7 18.0228L5.90056 21.9193L1.88211 22C0.681185 19.8854 0 17.466 0 14.895C0 12.4088 0.636891 10.0644 1.76582 8H1.76669L5.34423 8.62266L6.91141 11.9986C6.58341 12.9064 6.40463 13.8809 6.40463 14.895C6.40475 15.9955 6.61474 17.05 7 18.0228Z"
                        fill="#FBBB00"/>
                    <path
                        d="M29.7499 12C29.9143 12.9387 30 13.9081 30 14.8989C30 16.0098 29.8922 17.0935 29.687 18.1388C28.9901 21.6959 27.1693 24.802 24.647 27L24.6462 26.9992L20.5618 26.7732L19.9837 22.8614C21.6574 21.7974 22.9654 20.1322 23.6545 18.1388H16V12H23.7661H29.7499Z"
                        fill="#518EF8"/>
                    <path
                        d="M24.9992 26.6607L25 26.6615C22.3843 28.7503 19.0615 30 15.4444 30C9.63173 30 4.57803 26.7724 2 22.0225L6.94637 18C8.23536 21.4176 11.5539 23.8505 15.4444 23.8505C17.1167 23.8505 18.6833 23.4014 20.0276 22.6174L24.9992 26.6607Z"
                        fill="#28B446"/>
                    <path
                        d="M25 3.42412L20.1188 7.36881C18.7454 6.52138 17.1219 6.03184 15.3826 6.03184C11.4551 6.03184 8.11797 8.5276 6.90929 12L2.00082 8.03323H2C4.50765 3.26069 9.55931 0 15.3826 0C19.0385 0 22.3905 1.2855 25 3.42412Z"
                        fill="#F14336"/>
                </svg>
            </button>
        </div>
    )
}

export default OtherSignInMethods
