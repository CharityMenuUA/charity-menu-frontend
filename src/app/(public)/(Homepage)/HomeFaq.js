"use client"

import style from './homepage.module.scss'
import DropdownList from "@/app/components/dropdown-list/DropdownList"
import faqList from './data.json'

const HomeFaq = () => {
    return (
        <div className={style.faq}>
            <div className={style.faq_inner}>
                <div className={style.faq_head}>
                    <h2 className="h1">Часті запитання</h2>
                </div>

                <DropdownList list={faqList}/>
            </div>
        </div>
    )
}
export default HomeFaq
