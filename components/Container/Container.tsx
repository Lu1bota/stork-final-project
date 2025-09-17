import React from "react";
import css from "./Container.module.css";
import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return <div className={clsx(css.container, className)}>{children}</div>;
}
