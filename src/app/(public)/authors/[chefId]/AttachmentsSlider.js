"use client"

import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation, Pagination} from "swiper/modules"
import style from "./style.module.scss"

import '@/app/(static)/reporting/reporting-funds//swiper.scss'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from "next/image"


const AttachmentsSlider = ({attachments}) => {
    return (
        <Swiper
            spaceBetween={30}
            modules={[Pagination, Navigation]}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            effect={'flip'}
            className={style.slider}
            onSlideChange={() => {
                document.querySelectorAll('video').forEach((e) => {
                    if (e?.pause) e.pause()
                })
            }}
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
