import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: "circle" | "square";
}

export function IconButton({
  shape = "circle",
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center border border-zinc-200 bg-white text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-700",
        shape === "circle" ? "rounded-[30%]" : "rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
