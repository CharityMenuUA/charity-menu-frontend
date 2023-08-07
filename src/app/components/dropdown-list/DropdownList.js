"use client"

import style from './dropdownList.module.scss';
import {useState} from "react";

const DropdownList = ({list}) => {
    const [dropdownListState, setDropdownListState] = useState(Array(list.length).fill(false));

    const toggleQuestion = (index) => {
        setDropdownListState((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        })
    }

    return (
        <div className={style.dropdownList}>
            <ul className={style.dropdownList_list}>
                {list.map((item, itemIndex) => {
                    const {itemHead, itemBody} = item;
                    return (
                        <li className={[
                            style.dropdownList_item,
                            dropdownListState[itemIndex] ? style.open : ''
                        ].join(' ')} key={itemIndex}>
                            <button
                                type="button"
                                className={style.dropdownList_item_question}
                                onClick={() => toggleQuestion(itemIndex)}
                            >
                                <span>
                                    {itemHead}
                                </span>
                            </button>

                            <div className={style.dropdownList_item_answer}>
                                <div>
                                    {itemBody}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default DropdownList
