import {SITE_TITLE} from "~/constants/client";
import {HeaderLink} from "~/components/HeaderLink";
import styles from "./NavBar.module.css";
import {SearchBar} from "~/components/Search";

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
                    <SearchBar />
                    <HeaderLink to="/docs/introduction%2Finstallation">
                        Doc
                    </HeaderLink>
                    <HeaderLink to="/blog">Blog</HeaderLink>
                    {/*<HeaderLink to="/playground">Playground</HeaderLink>*/}
                </div>
            </nav>
        </header>
    );
}
