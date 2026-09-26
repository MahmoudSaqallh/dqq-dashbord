import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ViewAllButton({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-[10px] bg-primary px-4 py-2 text-[12px] font-medium text-primary-foreground transition-colors hover:bg-primary-600 "
    >
      {label}
      <ArrowRight className="h-3 w-3 rtl:rotate-180" />
    </Link>
  );
}
