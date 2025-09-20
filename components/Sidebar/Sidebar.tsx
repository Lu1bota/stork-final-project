// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import styles from "./Sidebar.module.css";
// import { useState } from "react";

// // Імітація даних користувача. У реальному проєкті ці дані надходитимуть з глобального стану
// const user = {
//   name: "Ганна",
//   email: "hanna@gmail.com",
//   avatar: "/user-avatar.png",
// };

// const Sidebar = () => {
//   // Фейковий стан авторизації для демонстрації
//   const [isAuthenticated, setIsAuthenticated] = useState(true);

//   const handleLogout = () => {
//     // В реальному проєкті тут буде виклик модального вікна та логіка виходу
//     console.log("Відкрити ConfirmationModal та вийти з системи");
//     setIsAuthenticated(false);
//   };

//   return (
//     <aside className={styles.sidebar}>
//       {/* Логотип */}
//       <div className={styles.logoSection}>
//         <Image
//           src="/Company Logo (1).svg"
//           alt="Лелека"
//           width={112}
//           height={48}
//         />
//         {/* <span className={styles.logoText}>Лелека</span> */}
//       </div>

//       <nav className={styles.navMenu}>
//         <ul>
//           {/* Навігація для авторизованого користувача */}
//           {isAuthenticated ? (
//             <>
//               <li className={styles.navItem}>
//                 <Link href="/">
//                   <div className={styles.navItem}>
//                     <svg width={24} height={24} aria-hidden="true">
//                       <use href="/sprite.svg#today" />
//                     </svg>
//                     <span>Мій день</span>
//                   </div>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/journey">
//                   <div className={styles.navItem}>
//                     <svg width={24} height={24} aria-hidden="true">
//                       <use href="/sprite.svg#conversion_path" />
//                     </svg>
//                     <span>Подорож</span>
//                   </div>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/diary">
//                   <div className={styles.navItem}>
//                     <svg width={24} height={24} aria-hidden="true">
//                       <use href="/sprite.svg#book" />
//                     </svg>
//                     <span>Щоденник</span>
//                   </div>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/profile">
//                   <div className={styles.navItem}>
//                     <svg width={24} height={24} aria-hidden="true">
//                       <use href="/sprite.svg#account_circle" />
//                     </svg>
//                     <span>Профіль</span>
//                   </div>
//                 </Link>
//               </li>
//             </>
//           ) : (
//             // Навігація для НЕавторизованого користувача
//             <>
//               <li>
//                 <Link href="/auth/register">
//                   <div className={styles.navItem}>
//                     <svg width={24} height={24} aria-hidden="true">
//                       <use href="/sprite.svg#today" />
//                     </svg>
//                     <span>Мій день</span>
//                   </div>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/auth/register">
//                   <div className={styles.navItem}>
//                     <svg width={24} height={24} aria-hidden="true">
//                       <use href="/sprite.svg#conversion_path" />
//                     </svg>
//                     <span>Подорож</span>
//                   </div>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/auth/register">
//                   <div className={styles.navItem}>
//                     <svg width={24} height={24} aria-hidden="true">
//                       <use href="/sprite.svg#book" />
//                     </svg>
//                     <span>Щоденник</span>
//                   </div>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/auth/register">
//                   <div className={styles.navItem}>
//                     <svg width={24} height={24} aria-hidden="true">
//                       <use href="/sprite.svg#account_circle" />
//                     </svg>
//                     <span>Профіль</span>
//                   </div>
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>

//       {/* Динамічний нижній блок */}
//       <div className={styles.bottomSection}>
//         {isAuthenticated ? (
//           // Профіль авторизованого користувача та кнопка "Вихід"
//           <div className={styles.userProfile}>
//             <Image
//               src={user.avatar}
//               alt="Ганна"
//               width={40}
//               height={40}
//               className={styles.avatar}
//             />
//             <div className={styles.userInfo}>
//               <span className={styles.userName}>{user.name}</span>
//               <span className={styles.userEmail}>{user.email}</span>
//             </div>
//             <button onClick={handleLogout} className={styles.logoutButton}>
//               <svg width={24} height={24} aria-hidden="true">
//                 <use href="/icons.svg#icon-logout" />
//               </svg>
//             </button>
//           </div>
//         ) : (
//           // Посилання для неавторизованого користувача
//           <div className={styles.authLinks}>
//             <Link href="/auth/login">
//               <div className={styles.authLinkItem}>Увійти</div>
//             </Link>
//             <Link href="/auth/register">
//               <div className={styles.authLinkItem}>Зареєструватися</div>
//             </Link>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

////////////////////////////////

"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Sidebar.module.css";

type User = {
  name: string;
  email: string;
  avatar?: string;
} | null;

type SidebarProps = {
  user: User; // дані користувача
  isAuthenticated: boolean; // стан авторизації
  onLogout: () => void; // обробник виходу
};

const navItems = [
  { href: "/", label: "Мій день", icon: "today" },
  { href: "/journey", label: "Подорож", icon: "conversion_path" },
  { href: "/diary", label: "Щоденник", icon: "book" },
  { href: "/profile", label: "Профіль", icon: "account_circle" },
];

const Sidebar = ({ user, isAuthenticated, onLogout }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      {/* Логотип */}
      <div className={styles.logoSection}>
        <Image
          src="/Company Logo (1).svg"
          alt="Лелека"
          width={112}
          height={48}
        />
      </div>

      {/* Навігація */}
      <nav className={styles.navMenu}>
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className={styles.navItem}>
              <Link href={isAuthenticated ? item.href : "/auth/register"}>
                <div className={styles.navItem}>
                  <svg width={24} height={24} aria-hidden="true">
                    <use href={`/sprite.svg#${item.icon}`} />
                  </svg>
                  <span>{item.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Нижній блок */}
      <div className={styles.bottomSection}>
        {isAuthenticated && user ? (
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
            <button onClick={onLogout} className={styles.logoutButton}>
              <svg width={24} height={24} aria-hidden="true">
                <use href="/icons.svg#icon-logout" />
              </svg>
            </button>
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Link href="/auth/login">
              <div className={styles.authLinkItem}>Увійти</div>
            </Link>
            <Link href="/auth/register">
              <div className={styles.authLinkItem}>Зареєструватися</div>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
