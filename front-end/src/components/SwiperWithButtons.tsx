import React, {FC, JSX, useRef} from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import {Navigation} from 'swiper/modules';
import {IoMdArrowDropleft, IoMdArrowDropright} from "react-icons/io";

type SwiperWithButtonsProps = {
    slides: JSX.Element[]
}

const SwiperWithButtons: FC<SwiperWithButtonsProps> = ({slides}) => {
    const prevButton = useRef(null)
    const nextButton = useRef(null)

    return (
        <div className="relative w-full">
            <button ref={prevButton} className="absolute z-30 top-0 bottom-0 my-auto -left-7">
                <IoMdArrowDropleft
                    className="w-10 h-10 cursor-pointer dark:text-white hover:scale-[1.2] duration-150 transition-all ease-in-out"/>
            </button>
            <button ref={nextButton} className="absolute z-30 top-0 bottom-0 my-auto -right-7 ">
                <IoMdArrowDropright
                    className="w-10 h-10 cursor-pointer dark:text-white hover:scale-[1.2] duration-150 transition-all ease-in-out"/>
            </button>

            <Swiper
                slidesPerView={3}
                navigation={{
                    prevEl: prevButton.current,
                    nextEl: nextButton.current
                }}
                onBeforeInit={(swiper: any) => {
                    // اتصال دکمه‌ها قبل از init
                    if (typeof swiper.params.navigation !== 'boolean') {
                        swiper.params.navigation.prevEl = prevButton.current;
                        swiper.params.navigation.nextEl = nextButton.current;
                    }
                }}
                modules={[Navigation]} style={{padding: "5px 0"}} className="mySwiper">
                {
                    slides.map((slide, index) => (
                        <SwiperSlide style={{display: "flex"}}
                                     className="w-full flex items-center justify-center"
                                     key={index}>{slide}</SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

export default SwiperWithButtons