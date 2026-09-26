"use client";

import { useState, type ReactNode } from "react";
import {
  ArrowRightLeft,
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
  Send,
  X,
} from "lucide-react";
import { SlideOverPanel } from "@/components/ui/SlideOverPanel";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { TRANSFER_PRIORITY_TONE, TRANSFER_RECEIVER_STATUS_TONE, TRANSFER_SENDER_STATUS_TONE } from "@/lib/utils/status-colors";
import { cn } from "@/lib/utils/cn";
import type { TransferDetails, TransferDetailsProduct, TransferPriority, TransferReceiverStatus, TransferSenderStatus } from "@/lib/mock/types";

const PRIORITY_TEXT_TONE: Record<string, string> = {
  info: "text-info",
  success: "text-primary-600",
  warning: "text-warning",
  danger: "text-danger",
  maroon: "text-maroon",
  neutral: "text-zinc-500",
};

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

function TransferProductCard({
  product,
  labels,
}: {
  product: TransferDetailsProduct;
  labels: { transferQty: string; sendQty: string; receivedQty: string };
}) {
  return (
    <div className="rounded-xl border border-zinc-200 p-4">
      <div className="flex items-center gap-3">
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

      <div className="mt-3 grid grid-cols-3 gap-4">
        <Field label={labels.transferQty} value={String(product.transferQty)} />
        <Field label={labels.sendQty} value={String(product.sendQty)} />
        <Field label={labels.receivedQty} value={String(product.receivedQty)} />
      </div>
    </div>
  );
}

export function TransferDetailsDrawer({
  open,
  onClose,
  details,
  labels,
}: {
  open: boolean;
  onClose: () => void;
  details: TransferDetails | null;
  labels: {
    title: string;
    transferInfo: string;
    export: string;
    log: string;
    transferId: string;
    date: string;
    warehouseFrom: string;
    warehouseTo: string;
    city: string;
    shippingCompany: string;
    priority: string;
    client: string;
    senderEmployee: string;
    receiverEmployee: string;
    totalQuantity: string;
    numberOfProducts: string;
    senderStatus: string;
    receiverStatus: string;
    note: string;
    sendingProducts: string;
    receivingProducts: string;
    transferProducts: string;
    searchPlaceholder: string;
    transferQty: string;
    sendQty: string;
    receivedQty: string;
    priorityLabels: Record<TransferPriority, string>;
    senderStatusLabels: Record<TransferSenderStatus, string>;
    receiverStatusLabels: Record<TransferReceiverStatus, string>;
  };
}) {
  const [sendingOpen, setSendingOpen] = useState(false);
  const [receivingOpen, setReceivingOpen] = useState(false);

  return (
    <SlideOverPanel open={open && details !== null} onClose={onClose}>
      {details && (
        <>
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-200 px-6 py-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <ArrowRightLeft className="h-4 w-4" />
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
                  {labels.transferInfo}
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
                <Field label={labels.transferId} dir="ltr">
                  <span className="font-semibold text-primary-600">{details.transferId}</span>
                </Field>
                <Field label={labels.date} value={details.dateDisplay} dir="ltr" />
                <Field label={labels.warehouseFrom} value={details.fromWarehouse} />
                <Field label={labels.warehouseTo} value={details.toWarehouse} />
                <Field label={labels.city} value={details.city} />
                <Field label={labels.shippingCompany} value={details.shippingCompany} />
                <Field label={labels.priority}>
                  <span className={cn("font-semibold", PRIORITY_TEXT_TONE[TRANSFER_PRIORITY_TONE[details.priority]])}>
                    {labels.priorityLabels[details.priority]}
                  </span>
                </Field>
                <Field label={labels.client} value={details.client} />
                <Field label={labels.senderEmployee} value={details.senderEmployee} />
                <Field label={labels.receiverEmployee} value={details.receiverEmployee} />
                <Field label={labels.totalQuantity} value={String(details.totalQuantity)} />
                <Field label={labels.numberOfProducts} value={String(details.productsCount)} />
                <Field label={labels.senderStatus}>
                  <StatusBadge label={labels.senderStatusLabels[details.senderStatus]} tone={TRANSFER_SENDER_STATUS_TONE[details.senderStatus]} />
                </Field>
                <Field label={labels.receiverStatus}>
                  <StatusBadge
                    label={labels.receiverStatusLabels[details.receiverStatus]}
                    tone={TRANSFER_RECEIVER_STATUS_TONE[details.receiverStatus]}
                  />
                </Field>
                <Field label={labels.note} value={details.note} className="col-span-2" />
              </div>
            </div>

            <CollapsibleBar
              icon={Send}
              label={labels.sendingProducts}
              count={details.sendingProductsCount}
              open={sendingOpen}
              onToggle={() => setSendingOpen((v) => !v)}
            />

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
                  {labels.transferProducts}
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
                  <TransferProductCard
                    key={product.id}
                    product={product}
                    labels={{ transferQty: labels.transferQty, sendQty: labels.sendQty, receivedQty: labels.receivedQty }}
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
