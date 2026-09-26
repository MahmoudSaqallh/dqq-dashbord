import { cn } from "@/lib/utils/cn";

export function CountBadge({ count, variant = "pill" }: { count: number; variant?: "pill" | "chip" }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-5 items-center justify-center bg-primary-50 text-xs font-semibold text-primary-600",
        variant === "pill" ? "h-5 rounded-pill px-1.5" : "rounded-md px-2.5 py-1"
      )}
    >
      {count}
    </span>
  );
}
