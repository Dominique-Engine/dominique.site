import {SITE_TITLE} from "~/constants/client";
import {HeaderLink} from "~/components/HeaderLink";
import styles from "./NavBar.module.css";

export function NavBar() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div>
                    <HeaderLink to="/">
                        <span className={styles.siteTitle}>{SITE_TITLE}</span>
                    </HeaderLink>
                </div>
                <div className={styles.links}>
                    <HeaderLink to="/docs">Doc</HeaderLink>
                    <HeaderLink to="/blog">Blog</HeaderLink>
                    <HeaderLink to="/playground">Playground</HeaderLink>
                </div>
            </nav>
        </header>
    );
}
