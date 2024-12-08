import {Link} from "@remix-run/react";
import {CSSProperties, ReactElement, ReactNode} from "react";
import styles from "./LinkButton.module.css";

interface LinkButtonProps {
    to: string;
    children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
    className?: string;
    style?: CSSProperties;
    target?: string;
}

export function LinkButton({
    to,
    children,
    className,
    style,
    target,
}: LinkButtonProps) {
    return (
        <Link
            style={style}
            viewTransition
            className={`${styles.button} ${className}`}
            to={to}
            target={target}
            rel={target ? "noopener noreferrer" : undefined}
        >
            {children}
        </Link>
    );
}
