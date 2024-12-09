import styles from "./Commends.module.css";
import {ExperienceCard} from "~/components/ExperienceCard";
import {useRef} from "react";
import {useScrollPosition} from "~/hooks/useScrollPosition";

interface CommendsProps {
    commends: {
        id: string;
        content?: string | null;
        name?: string | null;
    }[];
}

const clamp = (v: number, min: number, max: number) => {
    return Math.min(Math.max(v, min), max);
}

export function Commends({commends}: CommendsProps) {
    const ref = useRef<HTMLDivElement>(null);

    const scrollToPosition = (ratio: number) => {
        const div = ref.current;
        if (!div) return;
        const maxScrollLeft = div.scrollWidth - div.clientWidth;
        div.scrollLeft = ratio * maxScrollLeft; // Horizontal scroll
        div.scrollTo({
            left:  clamp(ratio, 0, 1) * maxScrollLeft,
            behavior: "smooth",
        });
    };

    useScrollPosition((_, v) => {
        if (!ref.current) return;
        const div = ref.current;
        const prev = div.scrollLeft / (div.scrollWidth - div.clientWidth);
        const newV = prev + v * 1.3;
        scrollToPosition(newV);
    });

    return (
        <div className={styles.commends}>
            <div className={styles.sliderWrapper} ref={ref}>
                <div
                    className={styles.slider}
                    style={
                        {
                            // width: commends.length * 100 + "vw",
                        }
                    }
                >
                    {commends.map(commend => (
                        <div key={commend.id} className={styles.commend}>
                            <ExperienceCard
                                key={commend.id}
                                content={commend.content}
                                name={commend.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
