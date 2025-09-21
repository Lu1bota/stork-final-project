import css from "./StatusBlock.module.css";
import React from "react";

export default function StatusBlock() {
  return (
    <div className={css.statusContainer}>
      <div className={css.statusCard}>
        <p className={css.statusTitle}>Тиждень</p>
        <p className={css.statusValue}>14</p>
      </div>
      <div className={css.statusCard}>
        <p className={css.statusTitle}>Днів до зустрічі</p>
        <p className={css.statusValue}>~165</p>
      </div>
    </div>
  );
}
