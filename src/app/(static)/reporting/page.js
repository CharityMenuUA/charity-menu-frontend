import ReportingFunds from "./reporting-funds/ReportingFunds"
import {get} from "@/helpers/dataProvider"
import ReportingTotal from "@/app/(static)/reporting/reporting-total/ReportingTotal"
import style from './reporting.module.scss'

export const revalidate = 0

const getStatistics = async () => {
    return get('/statistics').catch((err) => console.error(err))
}

const meta = {
    title: 'Звітність про роботу нашої платформи',
    description: 'Перегляньте статистику донатів нашої платформи. Дізнайтеся, скільки грошей було зібрано та скільки людей внесли свій вклад у підтримку ЗСУ',
}
export const metadata = {
    ...meta,
    openGraph: {
        ...meta,
    }
}
const ReportingPage = async () => {
    const statistics = await getStatistics()
    const {reports} = statistics
    const {authorsQuantity, clientsQuantity, totalAmount} = statistics

    return (
        <div className={style.reportingPage}>
            <div className={style.reportingPage_inner}>
                <div className={style.reportingPage_head}>
                    <h1>
                        Звітність
                    </h1>
                </div>

                <ReportingTotal
                    authorsQuantity={authorsQuantity}
                    clientsQuantity={clientsQuantity}
                    totalAmount={totalAmount}
                />

                <ReportingFunds
                    reports={reports}
                />
            </div>
        </div>
    )
}
export default ReportingPage
