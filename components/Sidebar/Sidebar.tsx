"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import css from "./Sidebar.module.css";
import { useAuthStore } from "@/lib/store/authStore";
// import ConfirmationModal from "@/components/Modal/ConfirmationModal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isAuthenticated: isAuth, user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nav = [
    { label: "Мій день", href: "/", icon: "today" },
    { label: "Подорож", href: "/journey", icon: "conversion_path" },
    { label: "Щоденник", href: "/diary", icon: "book" },
    { label: "Профіль", href: "/profile", icon: "account_circle" },
  ];

  const navHref = (href: string) => (isAuth ? href : "/auth/register");

  return (
    <>
      {isOpen && <div className={css.overlay} onClick={onClose} />}
      <div className={`${css.sidebar} ${isOpen ? css.open : ""}`}>
        <div className={css.content}>
          <div className={css.top}>
            <div className={css.headerRow}>
              <Image
                className={css.logoImg}
                src="/logo/Frame_269.png"
                alt="Лелека"
                width={105}
                height={45}
                priority
              />

              <button
                className={css.closeButton}
                onClick={onClose}
                aria-label="Закрити меню"
              >
                <svg className={css.closeIcon} width="32" height="32">
                  <use xlinkHref="/sprite.svg#close" />
                </svg>
              </button>
            </div>
          </div>

          <nav className={css.nav} aria-label="Sidebar">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={navHref(item.href)}
                  className={`${css.link} ${active ? css.active : ""}`}
                  onClick={onClose}
                >
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
                  {user?.photoUrl ? (
                    <Image
                      src={user.photoUrl}
                      alt={user.name || "Аватар користувача"}
                      width={40}
                      height={40}
                      className={css.avatarImg}
                    />
                  ) : (
                    <span className={css.avatarPlaceholder} />
                  )}
                  <div className={css.userText}>
                    <span className={css.userName}>
                      {user?.name || "Користувач"}
                    </span>
                    {user?.email && (
                      <span className={css.userEmail}>{user.email}</span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Вийти"
                  className={css.exitButton}
                  onClick={() => setIsModalOpen(true)}
                >
                  <svg className={css.icon} aria-hidden="true">
                    <use href="/sprite.svg#action" />
                  </svg>
                </button>

                {/* Нужна модалка
                {isModalOpen && (
                  <ConfirmationModal
                    title="Вийти з системи?"
                    onCancel={() => setIsModalOpen(false)}
                  />
                )} */}
              </div>
            ) : (
              <div className={css.authLinks}>
                <Link
                  className={css.authLink}
                  href="/auth/login"
                  onClick={onClose}
                >
                  Увійти
                </Link>
                <Link
                  className={css.authLink}
                  href="/auth/register"
                  onClick={onClose}
                >
                  Зареєструватися
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
