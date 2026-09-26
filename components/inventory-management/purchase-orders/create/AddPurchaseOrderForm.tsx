"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Calendar, ChevronRight, Lock, Mail, Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { cn } from "@/lib/utils/cn";

const INPUT_CLASSES =
  "h-10 w-full rounded-xl border border-zinc-200 px-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none";

function FormField({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        {label}
        {required && " *"}
      </label>
      {children}
    </div>
  );
}

function LockedPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-400">
      <Lock className="h-3 w-3" />
      {label}
    </span>
  );
}

export function AddPurchaseOrderForm({
  breadcrumbRoot,
  breadcrumbCurrent,
  formTitle,
  warehouseSectionTitle,
  warehouseSectionSubtitle,
  supplierLabel,
  supplierOptions,
  addSupplierLabel,
  warehouseLabel,
  warehouseOptions,
  deliveryDateLabel,
  deliveryDatePlaceholder,
  receiverLabel,
  receiverOptions,
  emailToggleTitle,
  emailToggleDescription,
  selectProductsTitle,
  selectProductsSubtitle,
  selectProductsButton,
  warehouseLockLabel,
  noProductsSelectedTitle,
  noProductsSelectedSubtitle,
  notesTitle,
  notesSubtitle,
  notesLabel,
  selectProductsLockLabel,
  cancelLabel,
  submitLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  formTitle: string;
  warehouseSectionTitle: string;
  warehouseSectionSubtitle: string;
  supplierLabel: string;
  supplierOptions: { value: string; label: string }[];
  addSupplierLabel: string;
  warehouseLabel: string;
  warehouseOptions: { value: string; label: string }[];
  deliveryDateLabel: string;
  deliveryDatePlaceholder: string;
  receiverLabel: string;
  receiverOptions: { value: string; label: string }[];
  emailToggleTitle: string;
  emailToggleDescription: string;
  selectProductsTitle: string;
  selectProductsSubtitle: string;
  selectProductsButton: string;
  warehouseLockLabel: string;
  noProductsSelectedTitle: string;
  noProductsSelectedSubtitle: string;
  notesTitle: string;
  notesSubtitle: string;
  notesLabel: string;
  selectProductsLockLabel: string;
  cancelLabel: string;
  submitLabel: string;
}) {
  const [supplier, setSupplier] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [receiver, setReceiver] = useState("");
  const [sendEmail, setSendEmail] = useState(false);

  const hasWarehouse = Boolean(warehouse);
  const hasProducts = false;

  return (
    <div className="flex flex-col gap-4">
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
        <Link href="/inventory-management/purchase-orders" className="hover:text-zinc-700">
          {breadcrumbRoot}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
        <span className="font-semibold text-zinc-900">{breadcrumbCurrent}</span>
      </nav>

      <Card className="overflow-hidden bg-zinc-100!">
        <div className="border-b border-zinc-100 bg-white px-5 py-4">
          <p className="text-sm font-semibold text-zinc-900">{formTitle}</p>
        </div>

        <div className="flex flex-col p-3">
          <section>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-semibold text-zinc-900">{warehouseSectionTitle}</p>
              <p className="mb-3 text-xs text-zinc-400">{warehouseSectionSubtitle}</p>
              <div className="mb-4 border-b border-zinc-100" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label={supplierLabel}>
                  <div className="flex items-center gap-2.5">
                    <div className="min-w-0 flex-1">
                      <SelectDropdown value={supplier} onChange={setSupplier} options={supplierOptions} />
                    </div>
                    <button
                      type="button"
                      className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-primary-100 bg-primary-50 px-3 text-sm font-medium text-primary-700 hover:bg-primary-100"
                    >
                      <Plus className="h-4 w-4" />
                      {addSupplierLabel}
                    </button>
                  </div>
                </FormField>
                <FormField label={warehouseLabel} required>
                  <SelectDropdown value={warehouse} onChange={setWarehouse} options={warehouseOptions} />
                </FormField>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label={deliveryDateLabel}>
                  <div className="relative">
                    <input type="text" readOnly placeholder={deliveryDatePlaceholder} className={cn(INPUT_CLASSES, "pe-9")} />
                    <Calendar className="pointer-events-none absolute top-1/2 inset-e-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  </div>
                </FormField>
                <FormField label={receiverLabel}>
                  <SelectDropdown value={receiver} onChange={setReceiver} options={receiverOptions} />
                </FormField>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-zinc-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-zinc-500">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-zinc-800">{emailToggleTitle}</p>
                    <p className="text-xs text-zinc-400">{emailToggleDescription}</p>
                  </div>
                </div>
                <ToggleSwitch checked={sendEmail} onChange={setSendEmail} />
              </div>
            </div>
          </section>

          <div className="border-t border-zinc-100" />

          <section>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-3">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{selectProductsTitle}</p>
                  <p className="text-xs text-zinc-400">{selectProductsSubtitle}</p>
                </div>
                <button
                  type="button"
                  disabled={!hasWarehouse}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 text-sm font-medium",
                    hasWarehouse ? "text-primary-600 hover:text-primary-700" : "cursor-not-allowed text-zinc-300"
                  )}
                >
                  <Plus className="h-4 w-4" />
                  {selectProductsButton}
                </button>
              </div>

              <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50 py-10 text-center">
                {!hasWarehouse && <LockedPill label={warehouseLockLabel} />}
                <p className="mt-1 text-sm font-semibold text-zinc-700">{noProductsSelectedTitle}</p>
                <p className="text-xs text-zinc-400">{noProductsSelectedSubtitle}</p>
              </div>
            </div>
          </section>

          <div className="border-t border-zinc-100" />

          <section>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-semibold text-zinc-900">{notesTitle}</p>
              <p className="mb-3 text-xs text-zinc-400">{notesSubtitle}</p>
              <div className="mb-4 border-b border-zinc-100" />

              <label className="mb-1.5 block text-xs font-semibold tracking-wide text-zinc-300 uppercase">{notesLabel}</label>
              {hasProducts ? (
                <textarea
                  rows={3}
                  className="w-full resize-y rounded-xl border border-zinc-200 px-3 py-2.5 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
                />
              ) : (
                <div className="flex h-24 items-center justify-center rounded-xl border border-zinc-100 bg-zinc-50">
                  <LockedPill label={selectProductsLockLabel} />
                </div>
              )}
            </div>
          </section>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <Link
          href="/inventory-management/purchase-orders"
          className="rounded-xl border border-zinc-200 bg-white px-6 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          {cancelLabel}
        </Link>
        <button type="button" className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-600">
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
