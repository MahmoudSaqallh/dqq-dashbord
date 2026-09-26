import { cn } from "@/lib/utils/cn";
import type { StatusTone } from "@/lib/utils/status-colors";

const DOT_COLOR: Record<StatusTone, string> = {
  info: "bg-info",
  success: "bg-primary",
  warning: "bg-warning",
  danger: "bg-danger",
  maroon: "bg-maroon",
  neutral: "bg-neutral",
};

export function StatusBadge({ label, tone }: { label: string; tone: StatusTone }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-[10px] border border-zinc-200 bg-white px-3 py-3 text-xs font-medium text-zinc-700">
      <span className={cn("h-2 w-2 shrink-0 rounded-full", DOT_COLOR[tone])} />
      {label}
    </span>
  );
}
