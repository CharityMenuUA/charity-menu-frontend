import Image from "next/image";
import style from './reportingFunds.module.scss';
import numberWithSpaces from "@/helpers/numberWithSpaces";

const ReportingFunds = ({ reports }) => {

    return (
        <div className={style.reportingFunds}>
            {reports.map((report, reportKey) => {
                const { recipient: { logo }, amount } = report;
                return (
                    <div className={style.reportingFunds_item} key={reportKey}>
                        <Image
                            src={logo}
                            alt="fund-logo"
                            width={150}
                            height={150}
                        />

                        <strong className={style.reportingFunds_item_count}>₴ {numberWithSpaces(amount)}</strong>
                    </div>
                )
            })}
        </div>
    )
}

export default ReportingFunds;
