"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./Header.module.css";

type HeaderProps = {
  initialAuthStatus: boolean;
};

const Header = ({ initialAuthStatus }: HeaderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/today" className={styles.logoLink}>
          <Image
            src="/stork-logo.svg"
            alt="Лелека"
            width={48}
            height={48}
            priority
          />
        </Link>
        <button className={styles.burgerMenu} onClick={toggleSidebar}>
          <svg width={24} height={24} aria-hidden="true">
            <use href="/public/sprite.svg#close"></use>
          </svg>
        </button>
      </header>

      <Sidebar
        initialAuthStatus={initialAuthStatus}
        isSidebarOpen={isSidebarOpen}
        onClose={closeSidebar}
      />
    </>
  );
};

export default Header;
