'use client';
import style from './homepage.module.scss'
import Link from "next/link";

const HomeChefsAndOffers = () => {
    return (
        <div>

            <Link href={'/chefs'} className={style.button_more}>
                Усі артисти &nbsp; <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                    <path
                        d="M0.0361874 4.216H7.06019L9.89219 4.6V6.552L7.06019 6.952H0.0361874V4.216ZM7.26819 0.0719995L12.4842 5.576L7.26819 11.096L5.58819 9.496L10.2122 4.76V6.408L5.58819 1.656L7.26819 0.0719995Z"
                        fill="white"/>
                </svg>

            </Link>
        </div>
    )
}

export default HomeChefsAndOffers