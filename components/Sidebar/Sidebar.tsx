"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Sidebar.module.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";

type SidebarProps = {
  initialAuthStatus: boolean;
};

const navItems = [
  { href: "/today", label: "Мій день", icon: "today" },
  { href: "/journey", label: "Подорож", icon: "conversion_path" },
  { href: "/diary", label: "Щоденник", icon: "book" },
  { href: "/profile", label: "Профіль", icon: "account_circle" },
];

const user = {
  name: "Ганна",
  email: "hanna@gmail.com",
  avatar: "/user-avatar.png",
};

const Sidebar = ({ initialAuthStatus }: SidebarProps) => {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthStatus);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobileOrTablet = useMediaQuery({ maxWidth: 1439 });

  const handleLogout = () => {
    console.log("Відкрити ConfirmationModal та вийти з системи");
    setIsAuthenticated(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMobileOrTablet) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <aside
        className={`${styles.sidebar} ${isMobileOrTablet && isMenuOpen ? styles.show : ""}`}
      >
        <div className={styles.logoSection}>
          <Image
            src="/stork-logo.svg"
            alt="Лелека"
            width={48}
            height={48}
            priority
          />
          <p className={styles.logoText}>Лелека</p>
        </div>

        <nav className={styles.navMenu}>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={isAuthenticated ? item.href : "/auth/register"}
                  className={`${styles.navItem} ${pathname === item.href ? styles.activeLink : ""}`}
                  onClick={handleLinkClick}
                >
                  <svg width={24} height={24} aria-hidden="true">
                    <use href={`/icons.svg#${item.icon}`} />
                  </svg>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.bottomSection}>
          {isAuthenticated ? (
            <div className={styles.userProfile}>
              {user.avatar && (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
              )}
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
              <button onClick={handleLogout} className={styles.logoutButton}>
                <svg width={24} height={24} aria-hidden="true">
                  <use href="/icons.svg#logout" />
                </svg>
              </button>
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link
                href="/auth/login"
                className={styles.authLinkItem}
                onClick={handleLinkClick}
              >
                Увійти
              </Link>
              <Link
                href="/auth/register"
                className={styles.authLinkItem}
                onClick={handleLinkClick}
              >
                Зареєструватися
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
