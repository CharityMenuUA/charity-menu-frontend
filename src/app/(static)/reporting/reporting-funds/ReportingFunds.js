"use client"

import Image from "next/image"
import style from './reportingFunds.module.scss'
import numberWithSpaces from "@/helpers/numberWithSpaces"
import {Swiper, SwiperSlide} from "swiper/react"
import {Pagination} from "swiper/modules"

import './swiper.scss'
import 'swiper/css'
import 'swiper/css/pagination'

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
                            <Swiper
                                spaceBetween={30}
                                modules={[Pagination]}
                                pagination={{
                                    clickable: true,
                                }}
                            >
                                {attachments?.length && attachments.map((src, key) => (
                                    <SwiperSlide key={key}>
                                        <a href={src} target="_blank" className={style.slide}>
                                            <Image
                                                src={src}
                                                alt="fund-logo"
                                                width={150}
                                                height={150}
                                            />
                                        </a>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
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
