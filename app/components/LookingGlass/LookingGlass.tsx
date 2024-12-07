import {useShakingMouse} from "~/hooks/useShakingMouse";
import styles from "./LookingGlass.module.css";
import {useMousePosition} from "~/hooks/useMousePosition";

export const LookingGlass = () => {
    const useShakingMouseValue = useShakingMouse(5000, 7000);
    const pos = useMousePosition();
    return (
        <div
            className={`${styles.glass} ${!useShakingMouseValue && styles.hidden}`}
            style={{
                left: pos.x - 50,
                top: pos.y - 50,
            }}
        ></div>
    );
};
