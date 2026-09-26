import { Card } from "@/components/ui/Card";
import { ReportCard, type ReportCardItem } from "./ReportCard";

export function SystemReportsGrid({ title, items }: { title: string; items: ReportCardItem[] }) {
  return (
    <Card className="p-5">
      <p className="mb-4 text-sm font-semibold text-zinc-700">{title}</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ReportCard key={item.id} item={item} />
        ))}
      </div>
    </Card>
  );
}
