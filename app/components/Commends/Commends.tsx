import styles from "./Commends.module.css";
import {ExperienceCard} from "~/components/ExperienceCard";
import {Swiper, SwiperSlide, SwiperRef} from "swiper/react";
import {FreeMode} from "swiper/modules";

import "swiper/css";
import {useEffect, useRef} from "react";
import {useScrollPosition} from "~/hooks/useScrollPosition";

interface CommendsProps {
    commends: {
        id: string;
        content?: string | null;
        name?: string | null;
    }[];
}

export function Commends({commends}: CommendsProps) {
    const swiperRef = useRef<SwiperRef>(null);
    useScrollPosition(v => {
        if (swiperRef.current) {
            v = swiperRef.current.swiper.progress + (v - swiperRef.current.swiper.progress) * 0.1;
            swiperRef.current.swiper.setProgress(v,0);
        }
    });

    return (
        <div className={styles.commends}>
            <Swiper
                ref={swiperRef}
                spaceBetween={50}
                slidesPerView={"auto"}
                freeMode
                loop
                modules={[FreeMode]}
                draggable={true}
                allowTouchMove={true}
                onProgress={swiper => {
                    console.log("swiper-progress", swiper.progress);
                    // swiperProgress.set(swiper.progress);
                    // console.log("swiperProgress", swiperProgress.get());
                }}
            >
                {commends.map(commend => (
                    <SwiperSlide key={commend.id} className={styles.commend}>
                        <ExperienceCard
                            key={commend.id}
                            content={commend.content}
                            name={commend.name}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
