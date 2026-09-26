import { Receipt } from "lucide-react";
import type { OrderDetailsBill } from "@/lib/mock/types";
import { SectionCard } from "./SectionCard";

function BillRow({ label, value, currency, bold }: { label: string; value: number; currency: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className={bold ? "text-sm font-semibold text-zinc-900" : "text-sm text-zinc-500"}>{label}</span>
      <span dir="ltr" className={bold ? "text-sm font-bold text-zinc-900" : "text-sm font-medium text-zinc-700"}>
        {value.toFixed(2)} {currency}
      </span>
    </div>
  );
}

export function OrderBillCard({
  title,
  subtotalLabel,
  deliveryCostLabel,
  couponLabel,
  totalLabel,
  bill,
}: {
  title: string;
  subtotalLabel: string;
  deliveryCostLabel: string;
  couponLabel: string;
  totalLabel: string;
  bill: OrderDetailsBill;
}) {
  return (
    <SectionCard icon={Receipt} title={title}>
      <div className="divide-y divide-zinc-100">
        <BillRow label={subtotalLabel} value={bill.subtotal} currency={bill.currency} />
        <BillRow label={deliveryCostLabel} value={bill.deliveryCost} currency={bill.currency} />
        <BillRow label={couponLabel} value={bill.coupon} currency={bill.currency} />
        <BillRow label={totalLabel} value={bill.total} currency={bill.currency} bold />
      </div>
    </SectionCard>
  );
}
