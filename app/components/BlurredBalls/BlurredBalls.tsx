import styles from "./BlurredBalls.module.css";

export function BlurredBalls() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
            opacity="1"
            className={styles.svg}
        >
            <defs>
                <linearGradient
                    x1="50%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                    id="cccoil-grad"
                >
                    <stop
                        stopColor="#03989e"
                        stopOpacity="1"
                        offset="0%"
                    ></stop>
                    <stop
                        stopColor="#797979"
                        stopOpacity="1"
                        offset="100%"
                    ></stop>
                </linearGradient>
            </defs>
            <g stroke="url(#cccoil-grad)" fill="none" strokeLinecap="round">
                <circle
                    r="420"
                    cx="400"
                    cy="400"
                    strokeWidth="7"
                    strokeDasharray="2639 2639"
                    transform="rotate(360, 0, 0)"
                    strokeDashoffset="230"
                    opacity="1.00"
                ></circle>
                <circle
                    r="367.5"
                    cx="400"
                    cy="400"
                    strokeWidth="7"
                    strokeDasharray="1979 2309"
                    transform="rotate(309, 400, 400)"
                    strokeDashoffset="230"
                    opacity="0.86"
                ></circle>
                <circle
                    r="315"
                    cx="400"
                    cy="400"
                    strokeWidth="7"
                    strokeDasharray="1414 1979"
                    transform="rotate(257, 400, 400)"
                    strokeDashoffset="230"
                    opacity="0.73"
                ></circle>
                <circle
                    r="262.5"
                    cx="400"
                    cy="400"
                    strokeWidth="7"
                    strokeDasharray="942 1649"
                    transform="rotate(206, 400, 400)"
                    strokeDashoffset="230"
                    opacity="0.59"
                ></circle>
                <circle
                    r="210"
                    cx="400"
                    cy="400"
                    strokeWidth="7"
                    strokeDasharray="565 1319"
                    transform="rotate(154, 400, 400)"
                    strokeDashoffset="230"
                    opacity="0.46"
                ></circle>
                <circle
                    r="157.5"
                    cx="400"
                    cy="400"
                    strokeWidth="7"
                    strokeDasharray="283 990"
                    transform="rotate(103, 400, 400)"
                    strokeDashoffset="230"
                    opacity="0.32"
                ></circle>
                <circle
                    r="105"
                    cx="400"
                    cy="400"
                    strokeWidth="7"
                    strokeDasharray="94 660"
                    transform="rotate(51, 400, 400)"
                    strokeDashoffset="230"
                    opacity="0.19"
                ></circle>
                <circle
                    r="52.5"
                    cx="400"
                    cy="400"
                    strokeWidth="7"
                    strokeDasharray="0 330"
                    strokeDashoffset="230"
                    opacity="0.05"
                ></circle>
            </g>
        </svg>
    );
}
