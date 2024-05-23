import styles from "./Loading.module.css";

export function Loading() {
  return (
    <div className={styles.loading}>
      <img src="/logo.png" alt="Loading" />
    </div>
  );
}
