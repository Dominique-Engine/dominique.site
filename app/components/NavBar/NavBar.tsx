import {SITE_TITLE} from "~/constants/client";
import {HeaderLink} from "~/components/HeaderLink";
import styles from "./NavBar.module.css";
import {SearchBar} from "~/components/Search";
import {Logo} from "~/components/Logo";

export function NavBar() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.siteLogo}>
                    <Logo small animated />
                    <HeaderLink to="/">
                        <p className={styles.siteTitle}>{SITE_TITLE}</p>
                    </HeaderLink>
                </div>
                <div className={styles.links}>
                    <HeaderLink to="/docs">Doc</HeaderLink>
                    <HeaderLink to="/learn">Learn</HeaderLink>
                    <HeaderLink to="/download">Download</HeaderLink>
                    <HeaderLink to="/about">About</HeaderLink>
                    {/*<HeaderLink to="/playground">Playground</HeaderLink>*/}
                    <SearchBar />
                </div>
            </nav>
        </header>
    );
}
