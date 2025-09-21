import css from "./Breadcrumbs.module.css";
import Link from "next/link";
import React from "react";

export default function Breadcrumbs() {
  return (
    <div className={css.breadcrumbsContainer}>
      <Link href="/" className={css.link}>
        <span>Лелека</span>
      </Link>
      <svg className={css.icon} width="16" height="16" aria-hidden="true">
        <use href="/icons.svg#chevron_right" />
      </svg>
      <Link href="/today" className={css.link}>
        <span>Мій день</span>
      </Link>
    </div>
  );
}
