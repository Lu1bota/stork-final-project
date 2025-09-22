// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import styles from "./Sidebar.module.css";
// import { useState } from "react";
// import { usePathname } from "next/navigation";

// // type User = {
// //   name: string;
// //   email: string;
// //   avatar?: string;
// // } | null;

// type SidebarProps = {
//   initialAuthStatus: boolean;
// };

// const navItems = [
//   { href: "/today", label: "Мій день", icon: "today" },
//   { href: "/journey", label: "Подорож", icon: "conversion_path" },
//   { href: "/diary", label: "Щоденник", icon: "book" },
//   { href: "/profile", label: "Профіль", icon: "account_circle" },
// ];

// const user = {
//   name: "Ганна",
//   email: "hanna@gmail.com",
//   avatar: "/user-avatar.png",
// };

// const Sidebar = ({ initialAuthStatus }: SidebarProps) => {
//   const pathname = usePathname();
//   const [isAuthenticated, setIsAuthenticated] = useState(initialAuthStatus);

//   const handleLogout = () => {
//     console.log("Відкрити ConfirmationModal та вийти з системи");
//     setIsAuthenticated(false);
//   };

//   return (
//     <aside className={styles.sidebar}>
//       <div className={styles.logoSection}>
//         <Image
//           src="/stork-logo.svg"
//           alt="Лелека"
//           width={48}
//           height={48}
//           priority
//         />
//         <p className={styles.logoText}>Лелека</p>
//       </div>

//       <nav className={styles.navMenu}>
//         <ul>
//           {navItems.map((item) => (
//             <li key={item.href}>
//               <Link
//                 href={item.href}
//                 // Застосовуємо navItem та activeLink за допомогою ``
//                 className={`${styles.navItem} ${pathname === item.href ? styles.activeLink : ""}`}
//               >
//                 <svg width={24} height={24} aria-hidden="true">
//                   <use href={`/icons.svg#${item.icon}`} />
//                 </svg>
//                 <span>{item.label}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <div className={styles.bottomSection}>
//         {isAuthenticated ? (
//           <div className={styles.userProfile}>
//             {user.avatar && (
//               <Image
//                 src={user.avatar}
//                 alt={user.name}
//                 width={40}
//                 height={40}
//                 className={styles.avatar}
//               />
//             )}
//             <div className={styles.userInfo}>
//               <span className={styles.userName}>{user.name}</span>
//               <span className={styles.userEmail}>{user.email}</span>
//             </div>
//             <button onClick={handleLogout} className={styles.logoutButton}>
//               <svg width={24} height={24} aria-hidden="true">
//                 <use href="/icons.svg#logout" />
//               </svg>
//             </button>
//           </div>
//         ) : (
//           <div className={styles.authLinks}>
//             <Link href="/auth/login" className={styles.authLinkItem}>
//               Увійти
//             </Link>
//             <Link href="/auth/register" className={styles.authLinkItem}>
//               Зареєструватися
//             </Link>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

//---------------------------------//

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import { usePathname } from "next/navigation";
// import styles from "./Sidebar.module.css";

// // Тип для даних користувача
// type User = {
//   name: string;
//   email: string;
//   avatar?: string;
// } | null;

// // Пропси для компонента Sidebar
// type SidebarProps = {
//   initialAuthStatus: boolean;
//   isSidebarOpen: boolean;
//   onClose: () => void;
// };

// const navItems = [
//   { href: "/today", label: "Мій день", icon: "today" },
//   { href: "/journey", label: "Подорож", icon: "conversion_path" },
//   { href: "/diary", label: "Щоденник", icon: "book" },
//   { href: "/profile", label: "Профіль", icon: "account_circle" },
// ];

// const user: User = {
//   name: "Ганна",
//   email: "hanna@gmail.com",
//   avatar: "/user-avatar.png",
// };

// // Функція для отримання ініціалів
// const getInitials = (name: string) => {
//   const parts = name.split(" ");
//   return parts.map((part) => part[0]).join("");
// };

// const Sidebar = ({
//   initialAuthStatus,
//   isSidebarOpen,
//   onClose,
// }: SidebarProps) => {
//   const pathname = usePathname();
//   const [isAuthenticated] = useState(initialAuthStatus);

//   const handleLogout = () => {
//     console.log("Відкрити ConfirmationModal та вийти з системи");
//   };

//   const getNavLinkHref = (itemHref: string) => {
//     return isAuthenticated ? itemHref : "/auth/register";
//   };

//   return (
//     <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
//       <div className={styles.logoSection}>
//         <Image
//           src="/stork-logo.svg"
//           alt="Лелека"
//           width={48}
//           height={48}
//           priority
//         />
//         <p className={styles.logoText}>Лелека</p>
//       </div>

//       <nav className={styles.navMenu}>
//         <ul>
//           {navItems.map((item) => (
//             <li key={item.href}>
//               <Link
//                 href={getNavLinkHref(item.href)}
//                 className={`${styles.navItem} ${pathname === item.href && isAuthenticated ? styles.activeLink : ""}`}
//                 onClick={onClose}
//               >
//                 <svg width={24} height={24} aria-hidden="true">
//                   <use href={`/icons.svg#${item.icon}`} />
//                 </svg>
//                 <span>{item.label}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <div className={styles.bottomSection}>
//         {isAuthenticated ? (
//           <div className={styles.userProfile}>
//             {user.avatar ? (
//               <Image
//                 src={user.avatar}
//                 alt={user.name}
//                 width={40}
//                 height={40}
//                 className={styles.avatar}
//               />
//             ) : (
//               <div className={styles.initialsAvatar}>
//                 <span>{getInitials(user.name)}</span>
//               </div>
//             )}
//             <div className={styles.userInfo}>
//               <span className={styles.userName}>{user.name}</span>
//               <span className={styles.userEmail}>{user.email}</span>
//             </div>
//             <button onClick={handleLogout} className={styles.logoutButton}>
//               <svg width={24} height={24} aria-hidden="true">
//                 <use href="/icons.svg#logout" />
//               </svg>
//             </button>
//           </div>
//         ) : (
//           <div className={styles.authLinks}>
//             <Link
//               href="/auth/login"
//               className={styles.authLinkItem}
//               onClick={onClose}
//             >
//               Увійти
//             </Link>
//             <Link
//               href="/auth/register"
//               className={styles.authLinkItem}
//               onClick={onClose}
//             >
//               Зареєструватися
//             </Link>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

//////////////////////////////

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

type User = {
  name: string;
  email: string;
  avatar?: string;
} | null;

type SidebarProps = {
  initialAuthStatus: boolean;
  isSidebarOpen: boolean;
  onClose: () => void;
};

const navItems = [
  { href: "/today", label: "Мій день", icon: "today" },
  { href: "/journey", label: "Подорож", icon: "conversion_path" },
  { href: "/diary", label: "Щоденник", icon: "book" },
  { href: "/profile", label: "Профіль", icon: "account_circle" },
];

const user: User = {
  name: "Ганна",
  email: "hanna@gmail.com",
  avatar: "/user-avatar.png",
};

const getInitials = (name: string) => {
  const parts = name.split(" ");
  return parts.map((part) => part[0]).join("");
};

const Sidebar = ({
  initialAuthStatus,
  isSidebarOpen,
  onClose,
}: SidebarProps) => {
  const pathname = usePathname();
  const [isAuthenticated] = useState(initialAuthStatus);

  const handleLogout = () => {
    console.log("Відкрити ConfirmationModal та вийти з системи");
  };

  const getNavLinkHref = (itemHref: string) => {
    return isAuthenticated ? itemHref : "/auth/register";
  };

  return (
    <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
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
                href={getNavLinkHref(item.href)}
                className={`${styles.navItem} ${pathname === item.href ? styles.activeLink : ""}`}
                onClick={onClose}
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
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={40}
                height={40}
                className={styles.avatar}
              />
            ) : (
              <div className={styles.initialsAvatar}>
                <span>{getInitials(user.name)}</span>
              </div>
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
              onClick={onClose}
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className={styles.authLinkItem}
              onClick={onClose}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
