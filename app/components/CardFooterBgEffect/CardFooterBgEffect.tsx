import styles from "./CardFooterBgEffect.module.css";
import {useMousePosition} from "~/hooks/useMousePosition";
import {useRef} from "react";

export function CardFooterBgEffect() {
    const mPos = useMousePosition();
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);
    // const lastX = useRef(0);
    // const lastY = useRef(0);

    const genTransform = (tiltAmount: number, moveAmount: number) => {
        // const x = smooth(lastX.current, mPos.xNormalized - 0.5, 0.1);
        // const y = smooth(lastY.current, mPos.yNormalized - 0.5, 0.1);
        const x = mPos.xNormalized - 0.5;
        const y = mPos.yNormalized - 0.5;
        // lastX.current = x;
        // lastY.current = y;
        return `translate(${x * moveAmount}px, ${y * moveAmount}px)
                    rotate(${x * tiltAmount - 10}deg)`;
    };

    return (
        <>
            <div
                ref={ref1}
                className={styles.obj1}
                style={{
                    transform: genTransform(5, 50),
                }}
            ></div>
            <div
                ref={ref2}
                className={styles.obj2}
                style={{
                    transform: genTransform(5, 100),
                }}
            ></div>
            <div
                ref={ref3}
                className={styles.obj3}
                style={{
                    transform: genTransform(-5, 10),
                }}
            ></div>
        </>
    );
}
