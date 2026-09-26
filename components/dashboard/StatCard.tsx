import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";
import type { StatTone } from "@/lib/mock/types";

const TONE_CLASSES: Record<StatTone, { chip: string; label: string }> = {
  success: { chip: "bg-primary-50 text-primary-600", label: "text-primary-600" },
  warning: { chip: "bg-warning-bg text-warning", label: "text-warning" },
  danger: { chip: "bg-danger-bg text-danger", label: "text-danger" },
};

export function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  tone: StatTone;
}) {
  const styles = TONE_CLASSES[tone];

  return (
    <Card className="flex items-center gap-4 ps-7 pe-9 py-4">
      <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", styles.chip)}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className={cn("text-sm font-medium", styles.label)}>{label}</p>
        <p className="mt-1 text-2xl font-bold text-zinc-900">{value}</p>
      </div>
    </Card>
  );
}
