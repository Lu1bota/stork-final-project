"use client";

import { useEffect, useState } from "react";
import Container from "../Container/Container";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import css from "./AppLayout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import GreetingBlock from "../dashboard/GreetingBlock/GreetingBlock";
import { usePathname } from "next/navigation.js";

interface AppLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbsHomeLabel?: React.ReactNode;
}

export default function AppLayout({ children, showBreadcrumbs = true, breadcrumbsHomeLabel = "Лелека" }: AppLayoutProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1440);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hideGreeting = pathname === '/profile';

  return (
    <Container className={css.support}>
      {isMobile && <Header />}

      {!isMobile && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={css.content}>
        <div className={css.crumb}>
          {showBreadcrumbs && <Breadcrumbs homeLabel={breadcrumbsHomeLabel} />}
          {!hideGreeting && <GreetingBlock />}
        </div>

        <div className={css.children}>{children}</div>
      </div>

      {isMobile && isSidebarOpen && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
    </Container>
  );
}
