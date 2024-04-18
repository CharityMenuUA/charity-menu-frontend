import style from "../stepsSlider.module.scss"
import Image from "next/image"

const Fund = ({fund}) => {
    return (
        <a href={fund.link} className={style.fund} target={"_blank"}>
            <div className={style.fund_inner}>
                <div className={style.fund_logo}>
                    <Image
                        alt={fund?.name}
                        src={fund?.logo}
                        width={250}
                        height={250}
                        quality={100}
                        style={{
                            objectFit: 'contain',
                        }}
                    />
                </div>
                <div className={style.fund_info} dangerouslySetInnerHTML={{__html: fund?.title}}/>
            </div>
        </a>
    )
}

export default Fund
