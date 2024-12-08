import styles from "./CardFooterBgEffect.module.css";
import {useMousePosition} from "~/hooks/useMousePosition";
import {useEffect, useRef} from "react";
import {useDebounced} from "~/hooks";

export function CardFooterBgEffect() {
    const mPos = useMousePosition();
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);

    const x = mPos.xNormalized - 0.5;
    const y = mPos.yNormalized - 0.5;
    const genTransform = (tiltAmount: number, moveAmount: number) => {
        return `translate(${x * moveAmount}px, ${y * moveAmount}px)
                    rotate(${x * tiltAmount - 10}deg)`;
    };

    // const debouncedX = useDebounced(x, 50);
    // const debouncedY = useDebounced(y, 50);

    useEffect(() => {
        ref1.current?.animate(
            {
                transform: genTransform(5, 50),
            },
            {
                duration: 1000,
                fill: "forwards",
                easing: "cubic-bezier(0.37, 0, 0.63, 1)",
            }
        );
        ref2.current?.animate(
            {
                transform: genTransform(5, 100),
            },
            {
                duration: 1000,
                fill: "forwards",
                easing: "cubic-bezier(0.37, 0, 0.63, 1)",
            }
        );
        ref3.current?.animate(
            {
                transform: genTransform(-5, 10),
            },
            {
                duration: 1000,
                fill: "forwards",
                easing: "cubic-bezier(0.37, 0, 0.63, 1)",
            }
        );
    }, [x, y]);

    return (
        <>
            <div
                ref={ref1}
                className={styles.obj1}
                // style={{
                //     transform: genTransform(5, 50),
                // }}
            ></div>
            <div
                ref={ref2}
                className={styles.obj2}
                // style={{
                //     transform: genTransform(5, 100),
                // }}
            ></div>
            <div
                ref={ref3}
                className={styles.obj3}
                // style={{
                //     transform: genTransform(-5, 10),
                // }}
            ></div>
        </>
    );
}
