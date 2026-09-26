import { MapPin, Truck } from "lucide-react";
import type { OrderDetailsShippingAddress } from "@/lib/mock/types";
import { SectionCard } from "./SectionCard";

export function OrderShippingAddressCard({
  title,
  address,
  shippingCompanyLabel,
  trackingLabel,
}: {
  title: string;
  address: OrderDetailsShippingAddress;
  shippingCompanyLabel: string;
  trackingLabel: string;
}) {
  return (
    <SectionCard icon={MapPin} title={title}>
      <p className="text-sm font-semibold text-zinc-900">{address.name}</p>
      <div className="mt-1.5 text-sm text-zinc-500">
        {address.addressLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div className="relative mt-4 h-40 overflow-hidden rounded-xl bg-zinc-100">
        <iframe
          title="Shipping address map"
          className="h-full w-full border-0"
          loading="lazy"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${address.longitude - 0.015}%2C${address.latitude - 0.01}%2C${address.longitude + 0.015}%2C${address.latitude + 0.01}&layer=mapnik&marker=${address.latitude}%2C${address.longitude}`}
        />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-sm">
        <span className="text-zinc-400">{shippingCompanyLabel}</span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-primary-700">
          <Truck className="h-4 w-4" />
          {address.shippingCompany}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-zinc-400">{trackingLabel}</span>
        <span dir="ltr" className="font-medium text-primary-600">
          {address.trackingNumber}
        </span>
      </div>
    </SectionCard>
  );
}
