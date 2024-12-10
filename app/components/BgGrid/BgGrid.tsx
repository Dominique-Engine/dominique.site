import styles from "./BgGrid.module.css";

export function BgGrid({heavy}: {heavy?: boolean}) {
    const amount = 3;
    return (
        <div className={styles.BgGrid}>
            <div
                className={styles.grid}
                style={{
                    gridTemplateColumns: `repeat(${amount}, minmax(100px, 1fr))`,
                }}
            >
                {Array.from({length: amount}).map((_, i) => (
                    <div
                        key={i}
                        className={styles.row + " " + (heavy ? styles.heavy : "")}
                    >
                        {Array.from({length: amount}).map((_, j) => (
                            <div key={j} className={styles.cell} />
                        ))}
                    </div>
                ))}
                <div className={styles.lastRow} />
            </div>
            <div className={styles.bg} />
        </div>
    );
}
