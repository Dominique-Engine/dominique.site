import styles from "./Commends.module.css";
import {ExperienceCard} from "~/components/ExperienceCard";
import {useScroll, useTransform} from "framer-motion";
import {Swiper, SwiperSlide, SwiperRef} from "swiper/react";
import {FreeMode} from "swiper/modules";

import "swiper/css";
import {useEffect, useRef} from "react";

interface CommendsProps {
    commends: {
        id: string;
        content?: string | null;
        name?: string | null;
    }[];
}

export function Commends({commends}: CommendsProps) {
    const swiperRef = useRef<SwiperRef>(null);
    const {scrollYProgress} = useScroll();
    const swiperProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

    useEffect(() => {
        return swiperProgress.onChange(value => {
            if (swiperRef.current) {
                swiperRef.current.swiper.setProgress(value, 0);
            }
        });
    }, [swiperProgress]);

    return (
        <div className={styles.commends}>
            <Swiper
                ref={swiperRef}
                spaceBetween={50}
                slidesPerView={"auto"}
                freeMode
                loop
                modules={[FreeMode]}
                draggable={false}
                allowTouchMove={false}
            >
                {commends.map(commend => (
                    <SwiperSlide className={styles.commend}>
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
