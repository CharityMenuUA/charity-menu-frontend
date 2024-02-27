"use client"

import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import style from './stepsSlider.module.scss'
import {stepsList} from "@/app/components/steps-slider/stepsSliderList"

const StepsSliderMin = () => {

    return (
        <div className={style.stepsSlider}>
            <div className={`${style.stepsSlider_inner} ${style.single}`}>

                <div className={style.stepsSlider_head}>
                    <h2 className="h1">Як це працює</h2>
                </div>

                <Swiper
                    slidesPerView={1}
                    modules={[Pagination]}
                    autoHeight={true}
                    pagination={{
                        el: `.${style.stepsSlider_pagination}`,
                        bulletClass: style.stepsSlider_pagination_bullet,
                        bulletActiveClass: style.stepsSlider_pagination_bullet_active,
                        clickable: true,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: stepsList.length,
                            pagination: false,
                        }
                    }}
                >
                    {stepsList.map((step, stepIndex) => {
                        return (
                            <SwiperSlide key={stepIndex}>
                                <div className={[
                                    style.stepsSlider_item,
                                    stepIndex === stepsList.length - 1 ? style.stepsSlider_item_last : ''
                                ].join(' ')}
                                >
                                    <div className={style.stepsSlider_item_icon}>
                                        {step.icon}
                                        <div className={style.stepsSlider_item_num}>
                                            <span>{stepIndex + 1}</span>
                                        </div>
                                    </div>

                                    <div className={style.stepsSlider_item_title}>
                                        {step.title}
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>

                <div className={style.stepsSlider_pagination}></div>

            </div>
        </div>
    )
}

export default StepsSliderMin
