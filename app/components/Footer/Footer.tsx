import styles from "./Footer.module.css";
import {FaDiscord, FaGithub, FaTwitter, FaYoutube} from "react-icons/fa";
import {ScrollToTop} from "~/components/ScrollToTop";

interface FooterProps {
    github?: string;
    x?: string;
    youtube?: string;
    discord?: string;
    scrollTop?: boolean;
}

export function Footer({
    github,
    x,
    discord,
    youtube,
    scrollTop = true,
}: FooterProps) {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.social}>
                    {github && (
                        <a
                            aria-label="Github"
                            className={styles.socialLink}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            href={github}
                        >
                            <FaGithub />
                        </a>
                    )}
                    {x && (
                        <a
                            aria-label="Twitter"
                            className={styles.socialLink}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            href={x}
                        >
                            <FaTwitter />
                        </a>
                    )}
                    {youtube && (
                        <a
                            aria-label="Youtube"
                            className={styles.socialLink}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            href={youtube}
                        >
                            <FaYoutube />
                        </a>
                    )}
                    {discord && (
                        <a
                            aria-label="Discord"
                            className={styles.socialLink}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            href={discord}
                        >
                            <FaDiscord />
                        </a>
                    )}
                    {scrollTop && <ScrollToTop />}
                </div>
            </div>
        </footer>
    );
}
