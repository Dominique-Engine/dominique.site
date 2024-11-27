import styles from "./Tag.module.css";

export function Tag({text}: {text: string}) {
    return <div className={styles.tag}>{text}</div>;
}
