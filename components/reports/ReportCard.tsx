import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export interface ReportCardItem {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  href?: string;
}

export function ReportCard({ item }: { item: ReportCardItem }) {
  const Icon = item.icon;

  const content = (
    <>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-200 text-zinc-700 shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <p className="text-[20px] font-semibold text-zinc-900">{item.title}</p>
      <p className="text-sm text-zinc-500">{item.subtitle}</p>
    </>
  );

  const className =
    "flex flex-col items-center gap-3 rounded-2xl bg-primary-50 px-6 py-8 text-center transition-colors hover:bg-primary-100";

  if (item.href) {
    return (
      <Link href={item.href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      {content}
    </button>
  );
}
