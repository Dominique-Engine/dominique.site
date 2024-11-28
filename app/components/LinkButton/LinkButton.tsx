import {Link} from "@remix-run/react";
import {CSSProperties, ReactElement, ReactNode} from "react";
import styles from "./LinkButton.module.css";

interface LinkButtonProps {
    to: string;
    children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
    className?: string;
    style?: CSSProperties;
}

export function LinkButton({to, children, className, style}: LinkButtonProps) {
    return (
        <Link
            style={style}
            viewTransition
            className={`${styles.button} ${className}`}
            to={to}
        >
            {children}
        </Link>
    );
}
