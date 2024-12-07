import {useEffect, useState} from "react";

export function useShakingMouse(cooldown = 800, strength = 3000) {
    const [isShaking, setIsShaking] = useState(false);
    const [moveAmount, setMoveAmount] = useState(0);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const amount =
                Math.abs(event.movementX) + Math.abs(event.movementY);
            setMoveAmount(prev => prev + amount);
        };

        const decreasing = setInterval(() => {
            setMoveAmount(prev => prev * 0.9);
        }, 100);

        const handleShake = () => {
            if (moveAmount > strength) {
                setIsShaking(true);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        handleShake();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(decreasing);
        };
    }, [moveAmount]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsShaking(false);
            setMoveAmount(0);
        }, cooldown);

        return () => {
            clearTimeout(timeout);
        };
    }, [isShaking, cooldown]);

    return isShaking;
}
