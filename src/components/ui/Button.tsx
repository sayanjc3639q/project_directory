/**
 * @file src/components/ui/Button.tsx
 * @purpose Solid flat-colored accessible button component.
 * @tags ui, button, component, flat-design
 */
import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    secondary:
      "bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark hover:bg-border-light dark:hover:bg-border-dark",
    danger: "bg-red-700 text-white hover:bg-red-800",
    outline:
      "border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark",
  };

  const sizes = {
    sm: "px-2.5 py-1 text-xs min-h-[32px]",
    md: "px-4 py-2 text-sm min-h-[44px]",
    lg: "px-5 py-2.5 text-base min-h-[48px]",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
