"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, FileText, Package, RotateCw } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils/cn";
import { PURCHASE_ORDER_STATUS_TONE, type StatusTone } from "@/lib/utils/status-colors";
import type { ChangeStatusProduct, PurchaseOrderChangeStatus, PurchaseOrderStatus } from "@/lib/mock/types";

const DOT_COLOR: Record<StatusTone, string> = {
  info: "bg-info",
  success: "bg-primary",
  warning: "bg-warning",
  danger: "bg-danger",
  maroon: "bg-maroon",
  neutral: "bg-neutral",
};

const STATUS_ORDER: PurchaseOrderStatus[] = [
  "suggested",
  "draft",
  "submitted",
  "approved",
  "ordered",
  "partially_received",
  "received",
  "closed",
  "cancelled",
];

function StatusSelect({
  value,
  onChange,
  statusLabels,
}: {
  value: PurchaseOrderStatus;
  onChange: (value: PurchaseOrderStatus) => void;
  statusLabels: Record<PurchaseOrderStatus, string>;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-zinc-200 px-3 text-sm text-zinc-700 focus:ring-2 focus:ring-primary-100 focus:outline-none"
      >
        <span className="flex items-center gap-2">
          <span className={cn("h-2 w-2 shrink-0 rounded-full", DOT_COLOR[PURCHASE_ORDER_STATUS_TONE[value]])} />
          {statusLabels[value]}
        </span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-zinc-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="animate-dropdown-in absolute inset-s-0 top-full z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
          {STATUS_ORDER.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => {
                onChange(status);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-start text-sm hover:bg-zinc-50",
                status === value ? "font-medium text-primary" : "text-zinc-600"
              )}
            >
              <span className={cn("h-2 w-2 shrink-0 rounded-full", DOT_COLOR[PURCHASE_ORDER_STATUS_TONE[status]])} />
              {statusLabels[status]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductRow({ product }: { product: ChangeStatusProduct }) {
  const [stockQty, setStockQty] = useState(product.stockQty);

  return (
    <tr className="border-t border-zinc-100">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
            <Package className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-800">{product.name}</p>
            <p dir="ltr" className="text-xs text-zinc-400">
              SKU: {product.sku}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex h-8 w-16 items-center gap-1 rounded-lg border border-zinc-200 px-2">
          <Package className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
          <input
            type="number"
            min={0}
            value={stockQty}
            onChange={(event) => setStockQty(Number(event.target.value))}
            className="w-full bg-transparent text-sm text-zinc-700 focus:outline-none"
          />
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-zinc-700">{product.orderedQty}</td>
      <td className="px-4 py-3">
        {product.locationAssigned ? (
          <span className="text-xs text-zinc-400">
            {product.totalReceived}/{product.orderedQty} Received
          </span>
        ) : (
          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700"
          >
            Select Location
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        )}
      </td>
      <td className="px-4 py-3 text-sm font-semibold text-zinc-800">
        {product.totalReceived}
        <span className="font-normal text-zinc-400">/{product.orderedQty}</span>
      </td>
    </tr>
  );
}

export function ChangeStatusModal({
  open,
  onClose,
  data,
  statusLabels,
  labels,
}: {
  open: boolean;
  onClose: () => void;
  data: PurchaseOrderChangeStatus | null;
  statusLabels: Record<PurchaseOrderStatus, string>;
  labels: {
    title: string;
    statusLabel: string;
    product: string;
    stockQty: string;
    ordered: string;
    location: string;
    totalReceived: string;
    noteLabel: string;
    notePlaceholder: string;
    cancel: string;
    save: string;
  };
}) {
  const [status, setStatus] = useState<PurchaseOrderStatus>(data?.status ?? "suggested");

  useEffect(() => {
    if (data) setStatus(data.status);
  }, [data]);

  return (
    <Modal
      open={open && data !== null}
      onClose={onClose}
      title={labels.title}
      icon={RotateCw}
      widthClassName="max-w-2xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
          >
            {labels.cancel}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-5 text-sm font-medium text-white hover:bg-primary-600"
          >
            {labels.save}
          </button>
        </>
      }
    >
      {data && (
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-wide text-zinc-500 uppercase">
              {labels.statusLabel} *
            </label>
            <StatusSelect value={status} onChange={setStatus} statusLabels={statusLabels} />
          </div>

          <div className="overflow-hidden rounded-xl border border-zinc-100">
            <div className="scrollbar-primary overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2.5 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                      {labels.product}
                    </th>
                    <th className="px-4 py-2.5 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                      {labels.stockQty}
                    </th>
                    <th className="px-4 py-2.5 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                      {labels.ordered}
                    </th>
                    <th className="px-4 py-2.5 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                      {labels.location}
                    </th>
                    <th className="px-4 py-2.5 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                      {labels.totalReceived}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((product) => (
                    <ProductRow key={product.id} product={product} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
              <FileText className="h-3.5 w-3.5" />
              {labels.noteLabel}
            </label>
            <textarea
              rows={3}
              placeholder={labels.notePlaceholder}
              className="w-full resize-y rounded-xl border border-zinc-200 px-3 py-2.5 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
            />
          </div>
        </div>
      )}
    </Modal>
  );
}
