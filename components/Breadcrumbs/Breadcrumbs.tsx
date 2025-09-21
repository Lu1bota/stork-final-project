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

  const makeLabel = (segment: string) =>
    capitalize ? segment.charAt(0).toUpperCase() + segment.slice(1) : segment;

  let hrefAccumulator = "";

  return (
    <nav aria-label="breadcrumb" className={`${styles.container} ${className || ""}`.trim()}>
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link href={homeHref} className={`${styles.link} ${styles.home}`}>
            {homeLabel}
          </Link>
        </li>
        {segments.length > 0 && (
          <li className={styles.sepItem}>
            <span className={styles.sep}>
              <svg className={styles.sepIcon} viewBox="0 0 24 24" aria-hidden>
                <path d="M9 6l6 6-6 6" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </li>
        )}
        {segments.map((seg, idx) => {
          hrefAccumulator += `/${seg}`;
          const isLast = idx === segments.length - 1;
          return (
            <li key={hrefAccumulator} className={styles.item}>
              {isLast ? (
                <span className={`${styles.link} ${styles.active}`}>{makeLabel(seg)}</span>
              ) : (
                <Link href={hrefAccumulator} className={styles.link}>
                  {makeLabel(seg)}
                </Link>
              )}
              {!isLast && (
                <span className={styles.sepItem}>
                  <span className={styles.sep}>
                    <svg className={styles.sepIcon} viewBox="0 0 24 24" aria-hidden>
                      <path d="M9 6l6 6-6 6" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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


