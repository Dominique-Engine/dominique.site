import styles from "./FullscreenScroll.module.css";
import {useScrollPosition} from "~/hooks/useScrollPosition";
import {useRef} from "react";

export function FullscreenScroll({heavy = false}: {heavy?: boolean}) {
    const ref = useRef<HTMLDivElement>(null);
    useScrollPosition(v => {
        if (ref.current) {
            // ref.current.style.width = `calc(${v * 100}vw - var(--scrollbar-width))`;
            ref.current.animate(
                {
                    width: `calc(${v * 100}vw - var(--scrollbar-width))`,
                },
                {
                    duration: 1000,
                    fill: "forwards",
                    easing: "cubic-bezier(0.37, 0, 0.63, 1)",
                }
            );
        }
    });

    return (
        <div
            ref={ref}
            className={styles.FullscreenScroll + " " + (heavy ? styles.heavy : "")}
        ></div>
    );
}
