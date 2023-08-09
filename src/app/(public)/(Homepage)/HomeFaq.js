"use client"

import style from './homepage.module.scss'
import DropdownList from "@/app/components/dropdown-list/DropdownList"
import {useConfigContext} from "@/app/providers/config/ConfigProvider"

const HomeFaq = () => {
    const {config} = useConfigContext()
    const {faq} = config || {faq: []}
    return (
        <div className={style.faq}>
            <div className={style.faq_inner}>
                <div className={style.faq_head}>
                    <h2 className="h1">Часті запитання</h2>
                </div>

                <DropdownList list={faq.slice(0, 5)}/>
            </div>
        </div>
    )
}
export default HomeFaq
