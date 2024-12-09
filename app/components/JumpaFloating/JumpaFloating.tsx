import styles from "./JumpaFloating.module.css";

interface JumpaFloatingProps {
// Add props here
}

export function JumpaFloating({}: JumpaFloatingProps) {
  return (
      <div className={styles.JumpaFloating}>
          <img src={"/jumpa.png"} />
      </div>
  );
}
