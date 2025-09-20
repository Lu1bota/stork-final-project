"use client";

import { usePathname } from "next/navigation";
import Breadcrumbs, { type BreadcrumbsProps } from "./Breadcrumbs";

export default function BreadcrumbsGuard(props: BreadcrumbsProps) {
  const pathname = usePathname() || "/";
  const hide = pathname.startsWith("/auth");
  if (hide) return null;
  return <Breadcrumbs {...props} />;
}


