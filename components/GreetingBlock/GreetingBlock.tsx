import css from "./GreetingBlock.module.css";
import Link from "next/link";
import React from "react";

export default function GreetingBlock() {
  return (
    <div className={css.greetingContainer}>
      <div className={css.breadcrumbs}>
        <Link href="/" className={css.link}>
          <span>Лелека</span>
        </Link>
        <svg className={css.icon} width="18" height="16" aria-hidden="true">
          <use href="/sprite.svg#chevron_right" />
        </svg>
        <span className={css.pageLink}>Мій день</span>
      </div>
      <h1 className={css.greetingTitle}>Доброго ранку, Ганна!</h1>
    </div>
  );
}
