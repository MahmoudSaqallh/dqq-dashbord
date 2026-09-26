"use client";

import { useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { cn } from "@/lib/utils/cn";

function StatusChip({
  label,
  value,
  dotClassName,
  onRemove,
}: {
  label: string;
  value: string;
  dotClassName: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-primary-100 bg-primary-50 px-3 py-2 text-sm">
      <span className="text-zinc-500">{label} :</span>
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotClassName)} />
      <span className="font-medium text-zinc-700">{value}</span>
      <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
      <button type="button" onClick={onRemove} aria-label="Remove filter" className="text-zinc-300 hover:text-zinc-500">
        <X className="h-3.5 w-3.5" />
      </button>
    </span>
  );
}

export function WarehouseFilterRow({
  fromStatusLabel,
  fromStatusValue,
  toStatusLabel,
  toStatusValue,
  warehousePlaceholder,
  deliveryCompaniesPlaceholder,
  paymentStatusPlaceholder,
  paymentMethodsPlaceholder,
  countriesPlaceholder,
  citiesPlaceholder,
  applyLabel,
}: {
  fromStatusLabel: string;
  fromStatusValue: string;
  toStatusLabel: string;
  toStatusValue: string;
  warehousePlaceholder: string;
  deliveryCompaniesPlaceholder: string;
  paymentStatusPlaceholder: string;
  paymentMethodsPlaceholder: string;
  countriesPlaceholder: string;
  citiesPlaceholder: string;
  applyLabel: string;
}) {
  const [showFromStatus, setShowFromStatus] = useState(true);
  const [showToStatus, setShowToStatus] = useState(true);
  const [warehouse, setWarehouse] = useState("");
  const [deliveryCompany, setDeliveryCompany] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {showFromStatus && (
        <StatusChip
          label={fromStatusLabel}
          value={fromStatusValue}
          dotClassName="bg-primary"
          onRemove={() => setShowFromStatus(false)}
        />
      )}
      {showToStatus && (
        <StatusChip
          label={toStatusLabel}
          value={toStatusValue}
          dotClassName="bg-info"
          onRemove={() => setShowToStatus(false)}
        />
      )}

      <div className="w-36 shrink-0">
        <SelectDropdown value={warehouse} onChange={setWarehouse} options={[]} placeholder={warehousePlaceholder} />
      </div>
      <div className="w-48 shrink-0">
        <SelectDropdown
          value={deliveryCompany}
          onChange={setDeliveryCompany}
          options={[]}
          placeholder={deliveryCompaniesPlaceholder}
          triggerClassName="border-zinc-200 bg-white text-zinc-400"
        />
      </div>
      <div className="w-36 shrink-0">
        <SelectDropdown value={paymentStatus} onChange={setPaymentStatus} options={[]} placeholder={paymentStatusPlaceholder} />
      </div>
      <div className="w-44 shrink-0">
        <SelectDropdown
          value={paymentMethod}
          onChange={setPaymentMethod}
          options={[]}
          placeholder={paymentMethodsPlaceholder}
          triggerClassName="border-zinc-200 bg-white text-zinc-400"
        />
      </div>
      <div className="w-32 shrink-0">
        <SelectDropdown value={country} onChange={setCountry} options={[]} placeholder={countriesPlaceholder} />
      </div>
      <div className="w-32 shrink-0">
        <SelectDropdown
          value={city}
          onChange={setCity}
          options={[]}
          placeholder={citiesPlaceholder}
          triggerClassName="border-zinc-200 bg-white text-zinc-300"
        />
      </div>

      <button
        type="button"
        aria-label={applyLabel}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-600"
      >
        <Filter className="h-4 w-4" />
      </button>
    </div>
  );
}
