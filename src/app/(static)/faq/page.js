"use client"

import style from './faq.module.scss';
import {useState} from "react";

const FaqPage = () => {

    const faqList = [
        {
            question: 'Скільки відсотків іде на ЗСУ?',
            answer: 'Вже давно відомо, що читабельний зміст буде заважати зосередитись людині, яка оцінює композицію сторінки. Сенс використання Lorem Ipsum полягає в тому, що цей текст має більш-менш нормальне розподілення літер на відміну від, наприклад, "Тут іде текст. Тут іде текст." Це робить текст схожим на оповідний. Багато програм верстування та веб-дизайну використовують Lorem Ipsum як зразок і пошук за терміном "lorem ipsum" відкриє багато веб-сайтів, які знаходяться ще в зародковому стані. Різні версії Lorem Ipsum з\'явились за минулі роки, деякі випадково, деякі було створено зумисно (зокрема, жартівливі).'
        },
        {
            question: 'Скільки послуг можна купити?',
            answer: 'Існує багато варіацій уривків з Lorem Ipsum, але більшість з них зазнала певних змін на кшталт жартівливих вставок або змішування слів, які навіть не виглядають правдоподібно. Якщо ви збираєтесь використовувати Lorem Ipsum, ви маєте упевнитись в тому, що всередині тексту не приховано нічого, що могло б викликати у читача конфуз. Більшість відомих генераторів Lorem Ipsum в Мережі генерують текст шляхом повторення наперед заданих послідовностей Lorem Ipsum. Принципова відмінність цього генератора робить його першим справжнім генератором Lorem Ipsum. Він використовує словник з більш як 200 слів латини та цілий набір моделей речень - це дозволяє генерувати Lorem Ipsum, який виглядає осмислено. Таким чином, згенерований Lorem Ipsum не міститиме повторів, жартів, нехарактерних для латини слів і т.ін.'
        },
        {
            question: 'Як часто я можу купувати послуги?',
            answer: 'На відміну від поширеної думки Lorem Ipsum не є випадковим набором літер. Він походить з уривку класичної латинської літератури 45 року до н.е., тобто має більш як 2000-річну історію. Річард Макклінток, професор латини з коледжу Хемпдін-Сидні, що у Вірджінії, вивчав одне з найменш зрозумілих латинських слів - consectetur - з уривку Lorem Ipsum, і у пошуку цього слова в класичній літературі знайшов безсумнівне джерело. Lorem Ipsum походить з розділів 1.10.32 та 1.10.33 цицеронівського "de Finibus Bonorum et Malorum" ("Про межі добра і зла"), написаного у 45 році до н.е. Цей трактат з теорії етики був дуже популярним в епоху Відродження. Перший рядок Lorem Ipsum, "Lorem ipsum dolor sit amet..." походить з одного з рядків розділу 1.10.32.\n' +
                '\n' +
                'Класичний текст, використовуваний з XVI сторіччя, наведено нижче для всіх зацікавлених. Також точно за оригіналом наведено розділи 1.10.32 та 1.10.33 цицеронівського "de Finibus Bonorum et Malorum" разом із перекладом англійською, виконаним 1914 року Х.Рекемом.'
        },
    ];

    const [faqListState, setFaqListState] = useState(Array(faqList.length).fill(false));

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
                        {faqList.map((faqItem, faqItemIndex) => {
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
