import { CheckCircle2, CreditCard, Eye, FlaskConical, Pencil, Send } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import type { WhatsAppConnectionInfo } from "@/lib/mock/types";
import { WHATSAPP_CONNECTION_TONE } from "@/lib/utils/status-colors";

function InfoField({
  label,
  value,
  dir,
  withDivider,
}: {
  label: string;
  value: string;
  dir?: "ltr" | "rtl";
  withDivider?: boolean;
}) {
  return (
    <div className="relative min-w-0">
      <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">{label}</p>
      <p dir={dir} className="mt-1.5 truncate text-sm font-medium text-zinc-700">
        {value}
      </p>
      {withDivider && <span className="absolute inset-e-5 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-zinc-300 sm:block" />}
    </div>
  );
}

export function WhatsappConnectionCard({
  info,
  statusLabel,
  labels,
}: {
  info: WhatsAppConnectionInfo;
  statusLabel: string;
  labels: {
    title: string;
    testApi: string;
    paymentMethod: string;
    view: string;
    edit: string;
    sendMessage: string;
    phoneNumberId: string;
    displayPhoneNumber: string;
    businessAccountId: string;
    createdDate: string;
  };
}) {
  const tone = WHATSAPP_CONNECTION_TONE[info.status];

  return (
    <Card className="px-4 py-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-300 pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[30%] bg-primary-100 text-primary-700">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <p className="text-lg font-semibold text-zinc-900">{labels.title}</p>
          <StatusBadge label={statusLabel} tone={tone} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            <FlaskConical className="h-3.5 w-3.5" />
            {labels.testApi}
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            <CreditCard className="h-3.5 w-3.5" />
            {labels.paymentMethod}
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            <Eye className="h-3.5 w-3.5" />
            {labels.view}
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            <Pencil className="h-3.5 w-3.5" />
            {labels.edit}
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-[10px] bg-white px-3 py-3 text-sm font-medium text-primary border border-primary hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Send className="h-3.5 w-3.5" />
            {labels.sendMessage}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5 pt-5 sm:grid-cols-4">
        <InfoField label={labels.phoneNumberId} value={info.phoneNumberId} dir="ltr" withDivider />
        <InfoField label={labels.displayPhoneNumber} value={info.displayPhoneNumber} dir="ltr" withDivider />
        <InfoField label={labels.businessAccountId} value={info.businessAccountId} dir="ltr" withDivider />
        <InfoField label={labels.createdDate} value={info.createdAtDisplay} dir="ltr" />
      </div>
    </Card>
  );
}
