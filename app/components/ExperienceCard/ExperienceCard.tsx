import styles from "./ExperienceCard.module.css";

interface ExperienceCardProps {
    content?: string | null;
    name?: string | null;
}

export function ExperienceCard({content, name}: ExperienceCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.text}>"{content}"</div>
            <div className={styles.name}>{name}</div>
        </div>
    );
}
