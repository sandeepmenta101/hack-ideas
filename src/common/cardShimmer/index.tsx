import styles from "../../styles/card.module.scss";

export default function CardShimmer() {
  return (
    <div className={`${styles.card} ${styles.br}`}>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.profilePic} ${styles.animate}`}></div>
        <div className={`${styles.comment} ${styles.br} ${styles.animate} ${styles.w80}`}></div>
        <div className={`${styles.comment} ${styles.br} ${styles.animate}`}></div>
        <div className={`${styles.comment} ${styles.br} ${styles.animate}`}></div>
      </div>
    </div>
  );
}
