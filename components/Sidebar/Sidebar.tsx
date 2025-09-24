"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import css from "./Sidebar.module.css";
import { useAuthStore } from "@/lib/store/authStore";

type SidebarProps = {
  isAuthenticated?: boolean;
};

export default function Sidebar({ isAuthenticated = false }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  // confirm handled by separate route
  const { isAuthenticated: storeAuth, user } = useAuthStore();
  const isAuth = isAuthenticated || storeAuth;

  const nav = [
    { label: "Мій день", href: "/", icon: "today" },
    { label: "Подорож", href: "/journey", icon: "conversion_path" },
    { label: "Щоденник", href: "/diary", icon: "book" },
    { label: "Профіль", href: "/profile", icon: "account_circle" },
  ];

  const navHref = (href: string) => (isAuth ? href : "/auth/register");

  const menu = (
    <div className={css.root}>
      <div className={css.top}>
        <div className={css.logoRow}>
          <Link href="/" aria-label="На головну">
            <Image className={css.logoImg} src="/logo.svg" alt="Лелека" width={29.6213} height={29.6213} priority />
          </Link>
          <span className={css.brand}>Лелека</span>
        </div>
      </div>
      <nav className={css.nav} aria-label="Sidebar">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={navHref(item.href)} className={`${css.link} ${active ? css.active : ""}`}>
              <svg className={css.icon} aria-hidden>
                <use href={`/sprite.svg#${item.icon}`} />
              </svg>
              <span className={css.label}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className={css.bottom}>
        {isAuth ? (
          <div className={css.userCard}>
            <div className={css.userInfo}>
              <span className={css.avatar} />
              <div className={css.userText}>
                <span className={css.userName}>{user?.name || "Користувач"}</span>
                {user?.email && (<span className={css.userEmail}>{user.email}</span>)}
              </div>
            </div>
            <button type="button" aria-label="Вийти" onClick={() => {}}>
              <svg className={css.icon} aria-hidden>
                <use href="/sprite.svg#action" />
              </svg>
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 12 }}>
            <Link className={css.link} href="/auth/login">Увійти</Link>
            <Link className={css.link} href="/auth/register">Зареєструватися</Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className={css.desktop}>{menu}</div>

      {/* Mobile burger trigger */}
      <button
        className={css.burger}
        onClick={() => setMobileOpen(true)}
        aria-label="Відкрити меню"
      >
        <svg className={css.burgerIcon} aria-hidden>
          <use href="/sprite.svg#burger" />
        </svg>
      </button>

      {/* Mobile simple overlay */}
      <div className={`${css.open} ${css.mobile}`} style={{ display: mobileOpen ? "block" : "none" }}>
        <div className={css.overlay} onClick={() => setMobileOpen(false)} />
        <div className={css.panel}>
          <button
            className={css.close}
            onClick={() => setMobileOpen(false)}
            aria-label="Закрити меню"
          >
            <Image className={css.closeIcon} src="/icons-close.svg" alt="Закрити" width={17.53} height={17.53} />
          </button>
          {menu}
        </div>
      </div>

      

      {/* Заглушка: підтвердження реалізує інша секція (роут /auth/logout) */}
    </>
  );
}


