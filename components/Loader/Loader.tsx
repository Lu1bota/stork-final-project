"use client";

import css from "./Loader.module.css";

type LoaderProps = {
  message?: string; 
};

export default function Loader({ message = "Лелека летить…" }: LoaderProps) {
  return (
    <div className={css.screen} role="status" aria-live="polite" aria-busy="true">
      <div className={css.spinner} />
      {message ? <p className={css.message}>{message}</p> : null}
      <span className={css.srOnly}>Завантаження…</span>
    </div>
  );
}