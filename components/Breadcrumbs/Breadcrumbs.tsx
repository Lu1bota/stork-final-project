"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import styles from "./Breadcrumbs.module.css";

export type BreadcrumbsProps = {
  className?: string;
  capitalize?: boolean;
  homeHref?: string;
  homeLabel?: ReactNode;
};

export default function Breadcrumbs({
  className,
  capitalize = true,
  homeHref = "/",
  homeLabel = "Мій день",
}: BreadcrumbsProps) {
  const pathname = usePathname();
  const segments = (pathname || "/").split("/").filter(Boolean);

  const normalize = (value: string) =>
    decodeURIComponent(value).replace(/-/g, " ");

  const toTitleCase = (value: string) =>
    value.length === 0
      ? value
      : value.charAt(0).toUpperCase() + value.slice(1);

  const translateSegment = (segment: string) => {
    const key = normalize(segment).trim().toLowerCase();
    const dict: Record<string, string> = {
      "profile": "Профіль",
      "diary": "Щоденник",
      "journey": "Подорож",
      "my day": "Мій день",
      "my-day": "Мій день",
      "": "Мій день",
    };
    return dict[key] ?? (capitalize ? toTitleCase(normalize(segment)) : normalize(segment));
  };

  let hrefAccumulator = "";

  return (
    <nav aria-label="breadcrumb" className={`${styles.container} ${className || ""}`.trim()}>
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link href={homeHref} className={`${styles.link} ${styles.home}`}>
            {homeLabel}
          </Link>
          <span className={styles.sep}>
            <span className={styles.sepBox} aria-hidden>
              <svg className={styles.sepGlyph} viewBox="0 0 24 24">
                <use className={styles.sepUse} href="/sprite.svg#chevron_right" />
              </svg>
            </span>
          </span>
        </li>
        <li className={styles.item}>
          {segments.length === 0 ? (
            <span className={`${styles.link} ${styles.active}`} aria-current="page">Мій день</span>
          ) : (
            <>
              <Link href="/" className={styles.link}>Мій день</Link>
              <span className={styles.sep}>
                <span className={styles.sepBox} aria-hidden>
                  <svg className={styles.sepGlyph} viewBox="0 0 24 24">
                    <use className={styles.sepUse} href="/sprite.svg#chevron_right" />
                  </svg>
                </span>
              </span>
            </>
          )}
        </li>
        {segments.map((seg, idx) => {
          hrefAccumulator += `/${seg}`;
          const isLast = idx === segments.length - 1;
          return (
            <li key={hrefAccumulator} className={styles.item}>
              {isLast ? (
                <span className={`${styles.link} ${styles.active}`} aria-current="page">{translateSegment(seg)}</span>
              ) : (
                <Link href={hrefAccumulator} className={styles.link}>
                  {translateSegment(seg)}
                </Link>
              )}
              {!isLast && (
                <span className={styles.sep}>
                  <span className={styles.sepBox} aria-hidden>
                    <svg className={styles.sepGlyph} viewBox="0 0 24 24">
                      <use className={styles.sepUse} href="/sprite.svg#chevron_right" />
                    </svg>
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}


