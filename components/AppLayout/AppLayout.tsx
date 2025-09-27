"use client";

import { useEffect, useState } from "react";
import Container from "../Container/Container";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import css from "./AppLayout.module.css";
import GreetingBlock from "../dashboard/GreetingBlock/GreetingBlock";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
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
        <Breadcrumbs />
        <GreetingBlock />

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
