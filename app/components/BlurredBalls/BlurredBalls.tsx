import styles from "./BlurredBalls.module.css";

export function BlurredBalls() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 450"
            opacity="0.3"
            className={styles.svg}
        >
            <defs>
                <filter
                    id="bbblurry-filter"
                    x="-100%"
                    y="-100%"
                    width="400%"
                    height="400%"
                    filterUnits="objectBoundingBox"
                    primitiveUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feGaussianBlur
                        stdDeviation="65"
                        x="0%"
                        y="0%"
                        width="100%"
                        height="100%"
                        in="SourceGraphic"
                        edgeMode="none"
                        result="blur"
                    ></feGaussianBlur>
                </filter>
            </defs>
            <g filter="url(#bbblurry-filter)">
                <ellipse
                    rx="189.5"
                    ry="188.5"
                    cx="229.804276899858"
                    cy="198.0785869251598"
                    fill="#03989e"
                ></ellipse>
                <ellipse
                    rx="189.5"
                    ry="188.5"
                    cx="459.94187094948506"
                    cy="405.0171758478338"
                    fill="#ff5757"
                ></ellipse>
                <ellipse
                    rx="189.5"
                    ry="188.5"
                    cx="650.2294034090909"
                    cy="153.64940296519887"
                    fill="#7ed957"
                ></ellipse>
            </g>
        </svg>
    );
}
