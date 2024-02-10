import Image from "next/image"
import style from './reportingFunds.module.scss'
import numberWithSpaces from "@/helpers/numberWithSpaces"

const ReportingFunds = ({reports}) => {

    return (
        <div className={style.reportingFunds}>
            {reports.map((report, reportKey) => {
                const {recipient: {logo, link}, transferDate, amount, attachments} = report
                return (
                    <div className={style.reportingFunds_item} key={reportKey}>
                        <a href={link} target="_blank" className={style.reportingFunds_item_link}>
                            <Image
                                src={logo}
                                alt="fund-logo"
                                width={150}
                                height={150}
                            />
                        </a>
                        <div className={style.attachments}>
                            {attachments?.length && attachments.map((src, key) => (
                                <a key={key} href={src} target="_blank">
                                    <Image
                                        src={src}
                                        alt="fund-logo"
                                        width={150}
                                        height={150}
                                    />
                                </a>
                            ))}
                        </div>
                        <div>
                            <p className={style.reportingFunds_item_count}>₴ {numberWithSpaces(amount)}</p>
                            <p className={style.reportingFunds_item_date}>{transferDate}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ReportingFunds
