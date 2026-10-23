/**
 * @file src/components/ui/Container.tsx
 * @purpose Responsive centered layout container with max-width boundaries.
 * @tags ui, container, layout, responsive
 */
import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "reading" | "wide";
}

export function Container({
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  const maxSizes = {
    reading: "max-w-reading",
    default: "max-w-7xl",
    wide: "max-w-[1440px]",
  };

  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", maxSizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
