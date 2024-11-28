import {Link, LinkProps, useLocation} from "@remix-run/react";
import styles from "./HeaderLink.module.css";

interface HeaderLinkProps extends LinkProps {}

export function HeaderLink({
    children,
    to: href,
    className,
    ...rest
}: HeaderLinkProps) {
    const {pathname} = useLocation();
    const isActive = pathname === href;
    return (
        <Link
            viewTransition
            to={href}
            className={`${className} ${styles.link} ${isActive ? styles.active : ""}`}
            {...rest}
        >
            {children}
        </Link>
    );
}
