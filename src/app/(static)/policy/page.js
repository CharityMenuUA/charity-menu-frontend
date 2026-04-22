import style from "./policy.module.scss"
import Policy from "@/app/(static)/policy/Policy"
import Offer from "@/app/(static)/policy/Offer"

export const revalidate = 3600

const meta = {
    title: 'Політика Збору та Обробки Даних',
    description: 'Дізнайтеся, як ми виконуємо вимоги щодо конфіденційності та захисту даних при зборі та обробці особистої інформації.',
}
export const metadata = {
    ...meta,
    openGraph: {
        ...meta,
    }
}

const PolicyPage = () => {
    return (
        <div className={style.policyPage}>
            <Offer/>
            <Policy/>
        </div>
    )
}
export default PolicyPage
