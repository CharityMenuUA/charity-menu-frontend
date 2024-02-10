"use client"

import {Swiper, SwiperSlide} from "swiper/react"
import {Pagination} from "swiper/modules"
import style from "./style.module.scss"

import '@/app/(static)/reporting/reporting-funds//swiper.scss'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from "next/image"


const AttachmentsSlider = ({attachments}) => {
    return (
        <Swiper
            spaceBetween={30}
            modules={[Pagination]}
            pagination={{
                clickable: true,
            }}
            effect={'flip'}
            className={style.slider}
        >
            {attachments?.length && attachments.map(({video, poster}, key) => (
                <SwiperSlide key={key}>
                    <div className={style.slide}>
                        {video ? (
                            <video src={video} poster={poster} controls/>
                        ) : (
                            <div className={style.poster}>
                                {poster && (
                                    <Image src={poster} alt="fund-logo" width={1000} height={1000}/>
                                )}
                            </div>
                        )}

                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )

}

export default AttachmentsSlider
