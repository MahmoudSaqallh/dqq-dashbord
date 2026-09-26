import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

export function SectionCard({
  icon: Icon,
  title,
  headerAction,
  children,
}: {
  icon: LucideIcon;
  title: string;
  headerAction?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className={cn("flex items-center justify-between gap-3", children && "border-b border-zinc-100 pb-4")}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
            <Icon className="h-4 w-4" />
          </span>
          <h2 className="text-[15px] font-semibold text-zinc-900">{title}</h2>
        </div>
        {headerAction}
      </div>

      {children && <div className="pt-4">{children}</div>}
    </Card>
  );
}
