import style from "./policy.module.scss"
import Policy from "@/app/(static)/policy/Policy"
import Offer from "@/app/(static)/policy/Offer"

const PolicyPage = () => {
    return (
        <div className={style.policyPage}>
            <title>Політика Збору та Обробки Даних</title>

            <Offer/>
            <Policy/>
        </div>
    )
}
export default PolicyPage
