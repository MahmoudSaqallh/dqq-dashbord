import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type WalletStatTone = "info" | "success" | "warning" | "purple";

const TONE_STYLES: Record<WalletStatTone, { chip: string; cardBg: string }> = {
  info: { chip: "bg-info-bg text-info", cardBg: "bg-blue-50" },
  success: { chip: "bg-primary-50 text-primary-600", cardBg: "bg-primary-50" },
  warning: { chip: "bg-warning-bg text-warning", cardBg: "bg-orange-50" },
  purple: { chip: "bg-violet-100 text-violet-600", cardBg: "bg-violet-50" },
};

export function WalletStatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone: WalletStatTone;
}) {
  const styles = TONE_STYLES[tone];

  return (
    <div className={cn("relative overflow-hidden rounded-card px-4 py-2.5", styles.cardBg)}>
      <span
        aria-hidden
        className="animate-stat-pulse absolute -top-8 -inset-e-8 h-24 w-24 rounded-full bg-white"
      />

      <div className="relative flex items-center gap-3">
        <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", styles.chip)}>
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs text-zinc-500">{label}</p>
          <p dir="ltr" className="mt-1 text-xl font-bold text-zinc-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
