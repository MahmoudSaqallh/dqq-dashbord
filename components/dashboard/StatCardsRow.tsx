import type { LucideIcon } from "lucide-react";
import { StatCard } from "./StatCard";
import type { StatTone } from "@/lib/mock/types";

export interface ResolvedStatCard {
  id: string;
  icon: LucideIcon;
  label: string;
  value: number | string;
  tone: StatTone;
}

export function StatCardsRow({ items }: { items: ResolvedStatCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <StatCard key={item.id} icon={item.icon} label={item.label} value={item.value} tone={item.tone} />
      ))}
    </div>
  );
}
