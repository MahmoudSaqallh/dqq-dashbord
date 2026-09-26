import { Printer } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { PrinterAccountInfo } from "@/lib/mock/types";

function AccountField({ label, value, dir }: { label: string; value: string; dir?: "ltr" | "rtl" }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">{label}</p>
      <p dir={dir} className="mt-1.5 truncate text-sm font-medium text-zinc-700">
        {value}
      </p>
    </div>
  );
}

export function PrinterAccountCard({
  title,
  info,
  labels,
}: {
  title: string;
  info: PrinterAccountInfo;
  labels: {
    accountId: string;
    firstName: string;
    lastName: string;
    email: string;
    createdDate: string;
  };
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 border-b border-zinc-100 pb-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
          <Printer className="h-5 w-5" />
        </span>
        <p className="text-xl font-semibold text-zinc-900">{title}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5 pt-5 sm:grid-cols-3 lg:grid-cols-5">
        <AccountField label={labels.accountId} value={info.accountId} dir="ltr" />
        <AccountField label={labels.firstName} value={info.firstName} />
        <AccountField label={labels.lastName} value={info.lastName} />
        <AccountField label={labels.email} value={info.email} dir="ltr" />
        <AccountField label={labels.createdDate} value={info.createdAtDisplay} dir="ltr" />
      </div>
    </Card>
  );
}
