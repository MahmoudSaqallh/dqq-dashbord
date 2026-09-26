"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Boxes,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Download,
  History,
  ImageIcon,
  ListChecks,
  Package,
  PackageCheck,
  Search,
  Truck,
  X,
} from "lucide-react";
import { SlideOverPanel } from "@/components/ui/SlideOverPanel";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { PURCHASE_ORDER_STATUS_TONE } from "@/lib/utils/status-colors";
import { cn } from "@/lib/utils/cn";
import type { PurchaseOrderDetails, PurchaseOrderDetailsProduct, PurchaseOrderStatus } from "@/lib/mock/types";

function Field({
  label,
  value,
  children,
  dir,
  className,
}: {
  label: string;
  value?: string;
  children?: ReactNode;
  dir?: "ltr" | "rtl";
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="text-xs text-zinc-400">{label}</p>
      <div dir={dir} className="mt-1 truncate text-sm font-medium text-zinc-800">
        {children ?? value}
      </div>
    </div>
  );
}

function CollapsibleBar({
  icon: Icon,
  label,
  count,
  open,
  onToggle,
}: {
  icon: typeof PackageCheck;
  label: string;
  count: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-start"
    >
      <span className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
        <Icon className="h-4 w-4 text-zinc-500" />
        {label}
      </span>
      <span className="flex items-center gap-2">
        <span className="rounded-md bg-white px-2 py-0.5 text-xs font-medium text-zinc-500">{count}</span>
        {open ? <ChevronUp className="h-4 w-4 text-zinc-400" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
      </span>
    </button>
  );
}

function ProductCard({
  product,
  labels,
}: {
  product: PurchaseOrderDetailsProduct;
  labels: {
    orderedQty: string;
    receivedQty: string;
    expectedDeliveryDate: string;
    actualDate: string;
    receiveTo: string;
  };
}) {
  const [receiveToOpen, setReceiveToOpen] = useState(false);

  return (
    <div className="rounded-xl border border-zinc-200 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
            <ImageIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-800">{product.name}</p>
            <p dir="ltr" className="text-xs text-zinc-400">
              {product.sku}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span dir="ltr" className="text-sm font-medium text-zinc-700">
            {product.amountDisplay}
          </span>
          {product.received && <CheckCircle2 className="h-5 w-5 text-primary" />}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
        <Field label={labels.orderedQty} value={String(product.orderedQty)} />
        <Field label={labels.receivedQty} value={String(product.receivedQty)} />
        <Field label={labels.expectedDeliveryDate} value={product.expectedDeliveryDateDisplay} dir="ltr" />
        <Field label={labels.actualDate} value={product.actualDateDisplay ?? "-"} dir="ltr" />
      </div>

      <div className="mt-3">
        <CollapsibleBar
          icon={Truck}
          label={labels.receiveTo}
          count={product.receiveToCount}
          open={receiveToOpen}
          onToggle={() => setReceiveToOpen((v) => !v)}
        />
      </div>
    </div>
  );
}

export function PurchaseOrderDetailsDrawer({
  open,
  onClose,
  details,
  labels,
}: {
  open: boolean;
  onClose: () => void;
  details: PurchaseOrderDetails | null;
  labels: {
    title: string;
    orderInfo: string;
    export: string;
    log: string;
    orderId: string;
    expectedDeliveryDate: string;
    supplier: string;
    warehouse: string;
    totalQuantity: string;
    assignedTo: string;
    numberOfProducts: string;
    totalAmount: string;
    status: string;
    notes: string;
    receivingProducts: string;
    orderProducts: string;
    searchPlaceholder: string;
    orderedQty: string;
    receivedQty: string;
    actualDate: string;
    receiveTo: string;
    statusLabels: Record<PurchaseOrderStatus, string>;
  };
}) {
  const [receivingOpen, setReceivingOpen] = useState(false);

  return (
    <SlideOverPanel open={open && details !== null} onClose={onClose}>
      {details && (
        <>
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-200 px-6 py-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <Boxes className="h-4 w-4" />
              </span>
              <h2 className="text-base font-semibold text-zinc-900">{labels.title}</h2>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-5 px-6 py-5">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                  <ListChecks className="h-4 w-4 text-zinc-400" />
                  {labels.orderInfo}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {labels.export}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
                  >
                    <History className="h-3.5 w-3.5" />
                    {labels.log}
                    <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-zinc-200 p-4">
                <Field label={labels.orderId} dir="ltr">
                  <span className="font-semibold text-primary-600">{details.orderId}</span>
                </Field>
                <Field label={labels.expectedDeliveryDate} value={details.expectedDeliveryDateDisplay} dir="ltr" />
                <Field label={labels.supplier}>
                  <Link href="#" className="inline-flex items-center gap-1 font-semibold text-primary-600 hover:underline">
                    {details.supplierName}
                    <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </Link>
                </Field>
                <Field label={labels.warehouse} value={details.warehouseName} />
                <Field label={labels.totalQuantity} value={String(details.totalQuantity)} />
                <Field label={labels.assignedTo} value={details.assignedTo} />
                <Field label={labels.numberOfProducts} value={String(details.productsCount)} />
                <Field label={labels.totalAmount} value={details.totalAmountDisplay} dir="ltr" />
                <Field label={labels.status}>
                  <StatusBadge label={labels.statusLabels[details.status] ?? details.status} tone={PURCHASE_ORDER_STATUS_TONE[details.status]} />
                </Field>
                <Field label={labels.notes} value={details.notes} className="col-span-2" />
              </div>
            </div>

            <CollapsibleBar
              icon={PackageCheck}
              label={labels.receivingProducts}
              count={details.receivingProductsCount}
              open={receivingOpen}
              onToggle={() => setReceivingOpen((v) => !v)}
            />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                  <Package className="h-4 w-4 text-zinc-400" />
                  {labels.orderProducts}
                </span>
                <div className="relative w-48">
                  <Search className="pointer-events-none absolute top-1/2 inset-s-2.5 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder={labels.searchPlaceholder}
                    className="h-9 w-full rounded-lg border border-zinc-200 ps-8 pe-3 text-xs text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-3">
                {details.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    labels={{
                      orderedQty: labels.orderedQty,
                      receivedQty: labels.receivedQty,
                      expectedDeliveryDate: labels.expectedDeliveryDate,
                      actualDate: labels.actualDate,
                      receiveTo: labels.receiveTo,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </SlideOverPanel>
  );
}
