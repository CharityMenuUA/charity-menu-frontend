import numberWithSpaces from "@/helpers/numberWithSpaces";
import style from './reportingTotal.module.scss';

const ReportingTotal = ({ authorsQuantity, clientsQuantity, totalAmount }) => {

    return (
        <div className={style.reportingTotal}>
            <div className={style.reportingTotal_item}>
                <span className={style.reportingTotal_item_count}>
                    ₴ {numberWithSpaces(totalAmount)}
                </span>
                <span className={style.reportingTotal_item_name}>
                    Зібрано
                </span>
            </div>

            <div className={style.reportingTotal_item}>
                <span className={style.reportingTotal_item_count}>
                    {numberWithSpaces(clientsQuantity)}
                </span>
                <span className={style.reportingTotal_item_name}>
                    Людей задонатило
                </span>
            </div>

            <div className={style.reportingTotal_item}>
                <span className={style.reportingTotal_item_count}>
                    {numberWithSpaces(authorsQuantity)}
                </span>
                <span className={style.reportingTotal_item_name}>
                    Знаменистостей
                </span>
            </div>
        </div>
    );
}

export default ReportingTotal;
