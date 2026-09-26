import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-card border border-zinc-200 bg-white shadow-md", className)}>
      {children}
    </div>
  );
}
