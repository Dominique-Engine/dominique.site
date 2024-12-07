import {useEffect, useState} from "react";

export function useMousePosition() {
    const [position, setPosition] = useState({x: 0, y: 0, xNormalized: 0, yNormalized: 0});

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setPosition({
                x: event.clientX,
                y: event.clientY,
                xNormalized: event.clientX / window.innerWidth,
                yNormalized: event.clientY / window.innerHeight,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return position;
}
