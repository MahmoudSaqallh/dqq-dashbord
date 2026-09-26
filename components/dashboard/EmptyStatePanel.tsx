import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function EmptyStatePanel({
  icon: Icon,
  message,
  className,
  grow = true,
}: {
  icon: LucideIcon;
  message: string;
  className?: string;
  grow?: boolean;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2 py-10", grow && "flex-1", className)}>
      <span className="flex h-16 w-16 items-center justify-center rounded-[30%] bg-zinc-100 text-zinc-300">
        <Icon className="h-7 w-7" />
      </span>
      <p className="py-3 text-sm text-zinc-400">{message}</p>
    </div>
  );
}
