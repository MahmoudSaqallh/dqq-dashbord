import { UserRound } from "lucide-react";
import type { OrderDetailsCustomer } from "@/lib/mock/types";
import { SectionCard } from "./SectionCard";

function initialsOf(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function InfoRow({ label, value, dir }: { label: string; value: string; dir?: "ltr" | "rtl" }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-sm">
      <span className="text-zinc-400">{label}</span>
      <span dir={dir} className="font-medium text-zinc-700">
        {value}
      </span>
    </div>
  );
}

export function OrderCustomerCard({
  title,
  customer,
  mobileNumberLabel,
  countryLabel,
  cityLabel,
}: {
  title: string;
  customer: OrderDetailsCustomer;
  mobileNumberLabel: string;
  countryLabel: string;
  cityLabel: string;
}) {
  return (
    <SectionCard icon={UserRound} title={title}>
      <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
          {initialsOf(customer.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-900">{customer.name}</p>
          <p dir="ltr" className="truncate text-xs text-zinc-400">
            {customer.email}
          </p>
        </div>
      </div>

      <div className="divide-y divide-zinc-100 pt-1">
        <InfoRow label={mobileNumberLabel} value={customer.phone} dir="ltr" />
        <InfoRow label={countryLabel} value={customer.country} />
        <InfoRow label={cityLabel} value={customer.city} />
      </div>
    </SectionCard>
  );
}
