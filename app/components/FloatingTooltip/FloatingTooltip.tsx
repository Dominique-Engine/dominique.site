import {useFloatingTooltip} from "~/contexts/FloatingTooltip";
import {useEffect, useState} from "react";

export function FloatingTooltip() {
    const {content, visible} = useFloatingTooltip();
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            setMousePosition({x: ev.clientX, y: ev.clientY});
        };
        window.addEventListener("mousemove", updateMousePosition);
        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: (mousePosition.y || 0) + 20,
                left: (mousePosition.x || 0) + 20,
                transform: `scale(${visible ? 1 : 0})`,
                opacity: visible ? 1 : 0,
                transition:
                    "transform 0.4s var(--ease-wiggle), opacity 0.45s var(--cool-easing)",
                pointerEvents: "none",
            }}
        >
            {content}
        </div>
    );
}
