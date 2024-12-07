import styles from "./ScrollToTop.module.css";
import {Link} from "@remix-run/react";
import {FaChevronCircleUp} from "react-icons/fa";

export function ScrollToTop() {
  return (
      <Link to="#" className={styles.ScrollToTop} title="Go to top">
          <FaChevronCircleUp />
      </Link>
  );
}
