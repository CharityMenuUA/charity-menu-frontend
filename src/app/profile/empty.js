import style from "@/app/profile/profile.module.scss"

const Empty = () => (
    <div className={style.empty}>
               <span>
                    Поки що замовлень немає
               </span>
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="80" r="79.5" fill="white" stroke="url(#paint0_linear_199_4918)"/>
            <path
                d="M45.7448 41.4698L54 48.6667L62.2552 41.4698C65.8507 38.3352 71.2081 38.3352 74.8036 41.4698C79.1684 45.275 79.1684 52.0583 74.8036 55.8635L54 74L33.1964 55.8635C28.8316 52.0583 28.8316 45.275 33.1964 41.4698C36.7919 38.3352 42.1492 38.3352 45.7448 41.4698Z"
                fill="white" stroke="url(#paint1_linear_199_4918)" strokeWidth="1.11765"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M65.7744 57.6769C62.6105 56.5685 59.5685 59.6105 60.6769 62.7744L79.4729 116.428C80.4473 119.209 83.9926 120.017 86.0764 117.934L98.478 105.532L118.904 125.958C121.681 128.735 126.182 128.735 128.958 125.958C131.735 123.182 131.735 118.681 128.958 115.904L108.532 95.478L120.934 83.0764C123.017 80.9926 122.209 77.4473 119.428 76.473L65.7744 57.6769Z"
                  fill="url(#paint2_linear_199_4918)"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M93.2344 91.9534L95.9534 89.2344L90.1956 83.4767L95.9534 77.7189L93.2344 75L87.4767 80.7577L81.719 75L79 77.7189L84.7578 83.4767L79 89.2344L81.7189 91.9534L87.4767 86.1956L93.2344 91.9534Z"
                  fill="white"/>
            <defs>
                <linearGradient id="paint0_linear_199_4918" x1="-13.5593" y1="160" x2="160" y2="9.96276e-06"
                                gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F12711"/>
                    <stop offset="1" stopColor="#F5AF19"/>
                </linearGradient>
                <linearGradient id="paint1_linear_199_4918" x1="20.0159" y1="74" x2="59.0468" y2="18.9693"
                                gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F12711"/>
                    <stop offset="1" stopColor="#F5AF19"/>
                </linearGradient>
                <linearGradient id="paint2_linear_199_4918" x1="105.264" y1="149.653" x2="132.946" y2="52.9853"
                                gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F12711"/>
                    <stop offset="1" stopColor="#F5AF19"/>
                </linearGradient>
            </defs>
        </svg>
    </div>
)

export default Empty