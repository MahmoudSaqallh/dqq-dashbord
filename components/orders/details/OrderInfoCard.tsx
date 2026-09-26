import { FileText } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { StatusTone } from "@/lib/utils/status-colors";
import { SectionCard } from "./SectionCard";

function Field({ label, value, dir }: { label: string; value: string; dir?: "ltr" | "rtl" }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">{label}</p>
      <p dir={dir} className="mt-1.5 truncate text-sm font-medium text-zinc-700">
        {value}
      </p>
    </div>
  );
}

const SOLID_BADGE_TONE: Record<StatusTone, string> = {
  info: "bg-info-bg text-info",
  success: "bg-primary-50 text-primary-700",
  warning: "bg-warning-bg text-warning",
  danger: "bg-danger-bg text-danger",
  maroon: "bg-maroon/10 text-maroon",
  neutral: "bg-zinc-100 text-zinc-600",
};

function SolidBadge({ label, tone }: { label: string; tone: StatusTone }) {
  return (
    <span className={cn("mt-1.5 inline-flex items-center rounded-lg px-3 py-1 text-xs font-semibold", SOLID_BADGE_TONE[tone])}>
      {label}
    </span>
  );
}

function DotStatus({ label, tone }: { label: string; tone: StatusTone }) {
  const DOT_COLOR: Record<StatusTone, string> = {
    info: "bg-info",
    success: "bg-primary",
    warning: "bg-warning",
    danger: "bg-danger",
    maroon: "bg-maroon",
    neutral: "bg-neutral",
  };
  return (
    <span className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-zinc-700">
      <span className={cn("h-2 w-2 shrink-0 rounded-full", DOT_COLOR[tone])} />
      {label}
    </span>
  );
}

export function OrderInfoCard({
  title,
  orderNumberLabel,
  orderNumber,
  storeNameLabel,
  storeName,
  dateLabel,
  dateDisplay,
  orderStatusLabel,
  orderStatus,
  dqqStatusLabel,
  dqqStatus,
  paymentStatusLabel,
  paymentStatus,
}: {
  title: string;
  orderNumberLabel: string;
  orderNumber: string;
  storeNameLabel: string;
  storeName: string;
  dateLabel: string;
  dateDisplay: string;
  orderStatusLabel: string;
  orderStatus: { label: string; tone: StatusTone };
  dqqStatusLabel: string;
  dqqStatus: { label: string; tone: StatusTone };
  paymentStatusLabel: string;
  paymentStatus: { label: string; tone: StatusTone };
}) {
  return (
    <SectionCard icon={FileText} title={title}>
      <div className="rounded-xl bg-zinc-50 p-4">
        <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-3">
          <Field label={orderNumberLabel} value={orderNumber} dir="ltr" />
          <Field label={storeNameLabel} value={storeName} />
          <Field label={dateLabel} value={dateDisplay} dir="ltr" />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">{orderStatusLabel}</p>
            <DotStatus label={orderStatus.label} tone={orderStatus.tone} />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">{dqqStatusLabel}</p>
            <DotStatus label={dqqStatus.label} tone={dqqStatus.tone} />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">{paymentStatusLabel}</p>
            <SolidBadge label={paymentStatus.label} tone={paymentStatus.tone} />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
