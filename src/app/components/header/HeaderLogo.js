import Link from "next/link";
import style from "./header.module.scss";

const HeaderLogo = (props) => {
    const {className} = props;
    return (
        <Link href={'/'} className={`${className} ${style.logo}`}>
            MEN<span className={style.rotate}>U</span><span className={style.gradient}>UA</span>
        </Link>
    )
}

export default HeaderLogo