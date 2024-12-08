import styles from "./ScrollToTop.module.css";
import {FaChevronCircleUp} from "react-icons/fa";

export function ScrollToTop() {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            className={styles.ScrollToTop}
            title="Go to top"
            onClick={handleClick}
        >
            <FaChevronCircleUp />
        </button>
    );
}
