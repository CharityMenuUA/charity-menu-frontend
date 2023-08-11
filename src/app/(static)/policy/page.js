import style from "./policy.module.scss"
import Oferta from "@/app/(static)/policy/Oferta"
import Policy from "@/app/(static)/policy/Policy"

const PolicyPage = () => {
    return (
        <div className={style.policyPage}>
            <Oferta/>
            <Policy/>
        </div>
    )
}
export default PolicyPage
