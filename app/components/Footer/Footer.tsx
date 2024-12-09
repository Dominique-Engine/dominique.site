import styles from "./Footer.module.css";
import {FaDiscord, FaGithub, FaTwitter, FaYoutube} from "react-icons/fa";
import {ScrollToTop} from "~/components/ScrollToTop";

interface FooterProps {
    github?: string;
    x?: string;
    youtube?: string;
    discord?: string;
}

export function Footer({
    github,
    x = "/#",
    discord = "/#",
    youtube,
}: FooterProps) {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.social}>
                    {github && (
                        <a
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
                            className={styles.socialLink}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            href={discord}
                        >
                            <FaDiscord />
                        </a>
                    )}
                    <ScrollToTop />
                </div>
            </div>
        </footer>
    );
}
