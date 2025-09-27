"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={styles.header}>
        <Link href="/" aria-label="Go to Мій день" className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="Мій день Logo"
            width={84}
            height={36}
            priority
          />
        </Link>

        <button
          aria-label="Open menu"
          className={styles.burgerButton}
          onClick={() => setSidebarOpen(true)}
          type="button"
        >
          <svg
            width="32"
            height="32"
            aria-hidden="true"
            focusable="false"
            className={styles.burgerSvg}
          >
            <use href="/sprite.svg#burger" />
          </svg>
        </button>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
