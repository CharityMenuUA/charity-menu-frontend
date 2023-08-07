"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css'
import 'swiper/css/pagination';

import style from './stepsSlider.module.scss';
import Image from "next/image";
import {useConfigContext} from "@/app/providers/config/ConfigProvider";

const StepsSlider = () => {
    const stepsList = [
        {
            title: 'Вибираєш та купуєш ло із меню зірки',
            icon: <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="80" cy="80" r="79.5" fill="white" stroke="url(#paint0_linear_347_3258)"/>
                <path d="M45.745 41.4698L54.0002 48.6667L62.2555 41.4698C65.851 38.3352 71.2083 38.3352 74.8038 41.4698C79.1686 45.275 79.1686 52.0583 74.8038 55.8635L54.0002 74L33.1966 55.8635C28.8318 52.0583 28.8318 45.275 33.1966 41.4698C36.7922 38.3352 42.1495 38.3352 45.745 41.4698Z" fill="white" stroke="url(#paint3_linear_347_3258)" strokeWidth="1.11765"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M65.7742 57.6769C62.6102 56.5685 59.5683 59.6105 60.6767 62.7744L79.4727 116.428C80.4471 119.209 83.9924 120.017 86.0762 117.934L98.4778 105.532L118.904 125.958C121.68 128.735 126.182 128.735 128.958 125.958C131.734 123.182 131.734 118.681 128.958 115.904L108.532 95.478L120.933 83.0764C123.017 80.9926 122.209 77.4473 119.427 76.473L65.7742 57.6769Z" fill="url(#paint4_linear_347_3258)"/>
                <path d="M87.1163 97.3151V74.1645H88.5993V97.3151H87.1163ZM91.05 81.806C90.9777 81.0765 90.6672 80.5098 90.1186 80.1059C89.57 79.702 88.8254 79.5 87.8849 79.5C87.2459 79.5 86.7063 79.5904 86.2662 79.7713C85.8261 79.9461 85.4885 80.1903 85.2534 80.5038C85.0243 80.8173 84.9097 81.173 84.9097 81.5709C84.8977 81.9025 84.967 82.1918 85.1177 82.439C85.2745 82.6862 85.4885 82.9002 85.7598 83.0811C86.0311 83.2559 86.3446 83.4097 86.7003 83.5423C87.056 83.6689 87.4358 83.7774 87.8397 83.8678L89.5037 84.2657C90.3115 84.4466 91.0531 84.6878 91.7283 84.9892C92.4035 85.2906 92.9883 85.6614 93.4827 86.1015C93.977 86.5416 94.3598 87.0601 94.6311 87.6569C94.9085 88.2538 95.0501 88.9381 95.0562 89.7097C95.0501 90.8432 94.7608 91.8258 94.188 92.6578C93.6213 93.4838 92.8014 94.1258 91.7283 94.584C90.6612 95.0362 89.374 95.2623 87.8668 95.2623C86.3717 95.2623 85.0695 95.0332 83.9602 94.575C82.8569 94.1168 81.9948 93.4385 81.3738 92.5403C80.7589 91.6359 80.4364 90.5176 80.4062 89.1852H84.1953C84.2375 89.8062 84.4154 90.3247 84.7289 90.7407C85.0484 91.1506 85.4734 91.4611 86.0039 91.6721C86.5405 91.8771 87.1464 91.9796 87.8216 91.9796C88.4848 91.9796 89.0605 91.8831 89.5489 91.6902C90.0432 91.4973 90.4261 91.229 90.6974 90.8854C90.9686 90.5417 91.1043 90.1468 91.1043 89.7007C91.1043 89.2847 90.9807 88.935 90.7335 88.6517C90.4924 88.3683 90.1367 88.1272 89.6664 87.9282C89.2022 87.7293 88.6325 87.5484 87.9573 87.3856L85.9406 86.8792C84.3792 86.4994 83.1463 85.9056 82.242 85.0977C81.3377 84.2899 80.8885 83.2017 80.8945 81.8331C80.8885 80.7118 81.1869 79.7321 81.7898 78.8941C82.3987 78.0561 83.2337 77.402 84.2948 76.9317C85.3558 76.4615 86.5616 76.2264 87.9121 76.2264C89.2866 76.2264 90.4863 76.4615 91.5112 76.9317C92.5422 77.402 93.344 78.0561 93.9167 78.8941C94.4895 79.7321 94.7849 80.7027 94.803 81.806H91.05Z" fill="white"/>
                <defs>
                    <linearGradient id="paint0_linear_347_3258" x1="-13.5593" y1="160" x2="160" y2="9.96276e-06" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_347_3258" x1="116.61" y1="40" x2="160" y2="2.49069e-06" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_347_3258" x1="135.322" y1="33" x2="150.18" y2="28.7856" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                    <linearGradient id="paint3_linear_347_3258" x1="20.0162" y1="74" x2="59.0471" y2="18.9693" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                    <linearGradient id="paint4_linear_347_3258" x1="105.264" y1="149.653" x2="132.946" y2="52.9853" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                </defs>
            </svg>,
        },
        {
            title: 'Автор виконує цей лот для тебе',
            icon: <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="80" cy="80" r="79.5" fill="white" stroke="url(#paint0_linear_347_3259)"/>
                <path d="M35 95.5V85.1486C35 71.329 42.1596 58.4959 53.9194 51.2372L67.2642 43L94 26V95.5C94 111.792 80.7924 125 64.5 125C48.2076 125 35 111.792 35 95.5Z" fill="url(#paint3_linear_347_3259)"/>
                <path d="M62.3069 77.447L66 80.6667L69.6931 77.447C71.3017 76.0447 73.6983 76.0447 75.3069 77.447C77.2595 79.1493 77.2595 82.184 75.3069 83.8863L66 92L56.6931 83.8863C54.7405 82.184 54.7405 79.1493 56.6931 77.447C58.3017 76.0447 60.6983 76.0447 62.3069 77.447Z" fill="white"/>
                <path d="M110.307 77.447L114 80.6667L117.693 77.447C119.302 76.0447 121.698 76.0447 123.307 77.447C125.26 79.1493 125.26 82.184 123.307 83.8863L114 92L104.693 83.8863C102.74 82.184 102.74 79.1493 104.693 77.447C106.302 76.0447 108.698 76.0447 110.307 77.447Z" fill="url(#paint4_linear_347_3259)"/>
                <defs>
                    <linearGradient id="paint0_linear_347_3259" x1="-13.5593" y1="160" x2="160" y2="9.96276e-06" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_347_3259" x1="116.61" y1="40" x2="160" y2="2.49069e-06" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_347_3259" x1="134.068" y1="33" x2="153.226" y2="25.5277" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                    <linearGradient id="paint3_linear_347_3259" x1="30" y1="125" x2="120.941" y2="75.037" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                    <linearGradient id="paint4_linear_347_3259" x1="98.7966" y1="92" x2="116.258" y2="67.381" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                </defs>
            </svg>
        },
        {
            title: 'Гроші від продажу йдуть на потреби України',
            icon: <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="80" cy="80" r="79.5" fill="white" stroke="url(#paint0_linear_347_3260)"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M59.1331 114.918C59.1331 114.918 59.1331 116.704 62.0603 116.704C64.9875 116.704 67.4429 116.234 68.9537 115.105C70.4649 113.977 72.1645 111.909 74.6198 110.028C77.0748 108.148 77.4531 106.831 78.7747 105.233C80.0968 103.634 85.3846 102.788 87.2733 104.857C89.162 106.925 91.0507 108.335 92.6559 108.335C94.2615 108.335 98.4168 107.771 96.8117 109.651C95.2069 111.532 91.9957 111.343 90.2962 113.694C88.5967 116.045 90.1075 117.173 90.9577 117.173C91.8074 117.173 94.6403 117.173 95.0178 118.49C95.3957 119.806 96.8121 120.276 96.8121 122.157C96.8121 124.037 96.9065 126.482 99.551 125.917C102.195 125.354 103.045 121.31 105.028 121.028C107.011 120.746 108.805 121.122 109.561 119.806C110.317 118.489 111.638 118.583 113.716 118.583C115.793 118.583 117.776 117.455 117.871 115.951C117.966 114.446 120.137 109.275 117.399 111.249C114.66 113.224 114.188 115.011 112.205 115.199C110.222 115.386 107.578 115.48 106.728 113.224C105.878 110.967 103.706 109.181 105.784 107.959C107.861 106.736 112.016 103.916 113.055 103.069C114.094 102.222 120.138 100.623 122.405 100.06C124.671 99.4954 127.882 99.0251 129.015 98.179C130.148 97.3329 128.732 95.076 129.487 93.3838C130.243 91.6916 133.643 89.4348 134.587 89.5287C135.531 89.6227 139.686 89.4348 139.686 88.0245C139.686 86.6137 140.724 85.0159 139.025 82.947C137.325 80.8785 135.059 80.8785 136.664 79.2802C138.27 77.6815 139.309 75.9884 139.309 74.0139C139.309 72.0394 140.537 70.6291 137.467 70.6291C134.398 70.6291 130.007 68.6545 130.007 68.6545C130.007 68.6545 124.248 69.5472 122.548 67.0554C120.848 64.5636 121.934 62.73 118.865 63.5292C115.796 64.3287 115.229 65.6451 113.01 65.2218C110.791 64.7985 109.469 65.7856 108.525 64.2813C107.58 62.777 107.769 60.4732 107.722 59.3922C107.675 58.3112 104.936 57.8879 101.678 56.9948C98.4204 56.1013 100.451 52.9983 100.451 52.9983C100.451 52.9983 101.065 49.4721 99.3178 48.532C97.5706 47.5919 95.3988 45.1002 94.8798 45.0062C94.3598 44.9123 90.4409 45.8997 89.3552 46.8398C88.2695 47.7799 87.4197 48.0152 86.7587 48.9083C86.0977 49.8014 79.8689 47.4373 78.9247 50.2579C77.9806 53.0781 78.3572 56.2759 78.1693 58.3435C77.8947 61.3663 75.7126 63.0576 73.7607 58.9538C72.9114 57.1681 71.998 56.4306 71.5257 56.1483C71.0534 55.8664 70.4867 55.2547 68.7872 54.8319C67.0877 54.4091 65.1344 52.4328 62.7734 52.4328C60.4124 52.4328 55.9272 51.6336 53.4246 49.9884C50.9221 48.3428 43.0138 48.1305 41.5026 48.0835C39.9913 48.0365 38.5753 50.6697 36.9225 50.5283C35.2698 50.3869 33.9949 49.5878 33.9005 51.6567C33.8061 53.7252 35.3641 55.136 35.3641 56.7812C35.3641 58.4268 35.1282 60.4009 34.7979 61.1065C34.4672 61.8117 25.7332 68.6754 25.6383 70.1796C25.5435 71.6839 27.6214 74.9753 25.3548 75.7269C23.0886 76.4791 20.5384 78.5476 20.0666 80.0523C19.5947 81.5566 21.7665 82.2143 22.3328 82.5911C22.8999 82.9669 28.8487 85.4117 33.2871 87.9504C37.7256 90.4892 37.3481 91.2413 39.4256 91.2413C41.503 91.2413 38.2927 88.5151 43.203 88.7965C48.1133 89.0784 50.2851 86.4457 51.8907 85.5057C53.4959 84.5656 57.2729 84.3772 59.3503 86.1638C61.4282 87.9504 62.7503 89.6431 65.0164 90.9594C67.2826 92.2758 67.0939 94.7206 67.5662 95.6607C68.0385 96.6007 71.9103 101.771 71.3436 103.84C70.7765 105.908 65.9606 100.643 64.5442 103.276C63.1277 105.908 65.7718 109.575 62.5611 111.456C59.3494 113.337 59.1331 114.918 59.1331 114.918Z" fill="url(#paint3_linear_347_3260)"/>
                <path d="M92.3069 76.447L96 79.6667L99.6931 76.447C101.302 75.0447 103.698 75.0447 105.307 76.447C107.26 78.1493 107.26 81.184 105.307 82.8863L96 91L86.6931 82.8863C84.7405 81.184 84.7405 78.1493 86.6931 76.447C88.3017 75.0447 90.6983 75.0447 92.3069 76.447Z" fill="white"/>
                <defs>
                    <linearGradient id="paint0_linear_347_3260" x1="-13.5593" y1="160" x2="160" y2="9.96276e-06" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_347_3260" x1="116.61" y1="40" x2="160" y2="2.49069e-06" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_347_3260" x1="134.068" y1="33" x2="153.226" y2="25.5277" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                    <linearGradient id="paint3_linear_347_3260" x1="9.83051" y1="126" x2="93.8702" y2="11.2236" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F12711"/>
                        <stop offset="1" stopColor="#F5AF19"/>
                    </linearGradient>
                </defs>
            </svg>
        },
    ]


    const configContext = useConfigContext()
    const { config: { fund } } = configContext;

    return (
        <>
            <div className={style.stepsSlider}>
                <div className={style.stepsSlider_inner}>

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

            <div className={style.fund}>
                <div className={style.fund_inner}>

                    <div className={style.fund_logo}>
                        <Image
                            alt="fund-logo"
                            src={fund?.logo}
                            width={150}
                            height={150}
                            quality={100}
                            style={{
                                objectFit: 'contain',
                            }}
                        />
                    </div>

                    <div className={style.fund_info}>
                        <p>Зараз триває збір на фонд</p>
                        <p>
                             <strong>«{fund?.name}»</strong>
                        </p>
                    </div>

                </div>
            </div>

        </>

    )
}

export default StepsSlider;
