import {useShakingMouse} from "~/hooks/useShakingMouse";
import styles from "./LookingGlass.module.css";
import {useMousePosition} from "~/hooks/useMousePosition";
import {useEffect} from "react";

export const LookingGlass = () => {
    const {isShaking, setIsShaking} = useShakingMouse(5000, 7000);
    const pos = useMousePosition();

    useEffect(() => {
        const handleClick = () => {
            setIsShaking(false);
        };
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [setIsShaking]);

    return (
        <div
            className={`${styles.glass} ${!isShaking && styles.hidden}`}
            style={{
                left: pos.x - 50,
                top: pos.y - 50,
            }}
        ></div>
    );
};
