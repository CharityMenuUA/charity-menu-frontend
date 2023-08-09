"use client"

import style from './faq.module.scss';
import {useState} from "react";
import {useConfigContext} from "@/app/providers/config/ConfigProvider"

const FaqPage = () => {
    const {config} = useConfigContext()
    const {faq} = config || {faq: []}
    const [faqListState, setFaqListState] = useState(new Array(faq.length).fill(false));

    const toggleQuestion = (index) => {
        setFaqListState((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        })
    }

    return (
        <div className={style.faqPage}>
            <div className={style.faqPage_inner}>
                <div className={style.faqPage_head}>
                    <h1>Часті запитання</h1>
                </div>

                <div className={style.faqPage_cont}>
                    <ul className={style.faqPage_list}>
                        {faq.map((faqItem, faqItemIndex) => {
                            const {question, answer} = faqItem;
                            return (
                                <li className={[
                                    style.faqPage_item,
                                    faqListState[faqItemIndex] ? style.open : ''
                                ].join(' ')} key={faqItemIndex}>
                                    <button
                                        type="button"
                                        className={style.faqPage_item_question}
                                        onClick={() => toggleQuestion(faqItemIndex)}
                                    >
                                        <span>
                                            {question}
                                        </span>
                                    </button>

                                    <div className={style.faqPage_item_answer}>
                                        <div>
                                            {answer}
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default FaqPage
