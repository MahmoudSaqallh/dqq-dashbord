"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Lock, Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { cn } from "@/lib/utils/cn";

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

export function AddWarehouseTransferForm({
  breadcrumbRoot,
  breadcrumbCurrent,
  formTitle,
  warehouseSectionTitle,
  warehouseSectionSubtitle,
  warehouseFromLabel,
  warehouseFromPlaceholder,
  warehouseOptions,
  warehouseToLabel,
  shippingCompanyLabel,
  shippingCompanyPlaceholder,
  optionsSectionTitle,
  optionsSectionSubtitle,
  priorityLabel,
  priorityPlaceholder,
  priorityOptions,
  senderEmployeeLabel,
  receiverEmployeeLabel,
  employeeOptions,
  employeePlaceholder,
  notesLabel,
  notesPlaceholder,
  selectProductsTitle,
  selectProductsSubtitle,
  selectProductsButton,
  warehouseFromLockLabel,
  noProductsSelectedTitle,
  noProductsSelectedSubtitle,
  cancelLabel,
  submitLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  formTitle: string;
  warehouseSectionTitle: string;
  warehouseSectionSubtitle: string;
  warehouseFromLabel: string;
  warehouseFromPlaceholder: string;
  warehouseOptions: { value: string; label: string }[];
  warehouseToLabel: string;
  shippingCompanyLabel: string;
  shippingCompanyPlaceholder: string;
  optionsSectionTitle: string;
  optionsSectionSubtitle: string;
  priorityLabel: string;
  priorityPlaceholder: string;
  priorityOptions: { value: string; label: string }[];
  senderEmployeeLabel: string;
  receiverEmployeeLabel: string;
  employeeOptions: { value: string; label: string }[];
  employeePlaceholder: string;
  notesLabel: string;
  notesPlaceholder: string;
  selectProductsTitle: string;
  selectProductsSubtitle: string;
  selectProductsButton: string;
  warehouseFromLockLabel: string;
  noProductsSelectedTitle: string;
  noProductsSelectedSubtitle: string;
  cancelLabel: string;
  submitLabel: string;
}) {
  const [warehouseFrom, setWarehouseFrom] = useState("");
  const [warehouseTo, setWarehouseTo] = useState("");
  const [shippingCompany, setShippingCompany] = useState("");
  const [priority, setPriority] = useState("");
  const [senderEmployee, setSenderEmployee] = useState("");
  const [receiverEmployee, setReceiverEmployee] = useState("");
  const [notes, setNotes] = useState("");

  const hasWarehouseFrom = Boolean(warehouseFrom);

  return (
    <div className="flex flex-col gap-4">
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
        <Link href="/inventory-management/warehouse-transfers" className="hover:text-zinc-700">
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label={warehouseFromLabel} required>
                  <SelectDropdown
                    value={warehouseFrom}
                    onChange={setWarehouseFrom}
                    options={warehouseOptions}
                    placeholder={warehouseFromPlaceholder}
                  />
                </FormField>
                <FormField label={warehouseToLabel} required>
                  <SelectDropdown
                    value={warehouseTo}
                    onChange={setWarehouseTo}
                    options={warehouseOptions}
                    placeholder={warehouseFromPlaceholder}
                  />
                </FormField>
                <FormField label={shippingCompanyLabel}>
                  <SelectDropdown
                    value={shippingCompany}
                    onChange={setShippingCompany}
                    options={[]}
                    placeholder={shippingCompanyPlaceholder}
                  />
                </FormField>
              </div>
            </div>
          </section>

          <div className="border-t border-zinc-100" />

          <section>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-semibold text-zinc-900">{optionsSectionTitle}</p>
              <p className="mb-3 text-xs text-zinc-400">{optionsSectionSubtitle}</p>
              <div className="mb-4 border-b border-zinc-100" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label={priorityLabel}>
                  <SelectDropdown value={priority} onChange={setPriority} options={priorityOptions} placeholder={priorityPlaceholder} />
                </FormField>
                <FormField label={senderEmployeeLabel}>
                  <SelectDropdown
                    value={senderEmployee}
                    onChange={setSenderEmployee}
                    options={employeeOptions}
                    placeholder={employeePlaceholder}
                  />
                </FormField>
                <FormField label={receiverEmployeeLabel}>
                  <SelectDropdown
                    value={receiverEmployee}
                    onChange={setReceiverEmployee}
                    options={employeeOptions}
                    placeholder={employeePlaceholder}
                  />
                </FormField>
              </div>

              <div className="mt-4">
                <FormField label={notesLabel}>
                  <div className="relative">
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder={notesPlaceholder}
                      maxLength={500}
                      rows={3}
                      className="w-full resize-y rounded-xl border border-zinc-200 px-3 py-2.5 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
                    />
                    <span className="absolute bottom-2 inset-e-3 text-xs text-zinc-300">
                      {String(notes.length).padStart(2, "0")}/500
                    </span>
                  </div>
                </FormField>
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
                  disabled={!hasWarehouseFrom}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 text-sm font-medium",
                    hasWarehouseFrom ? "text-primary-600 hover:text-primary-700" : "cursor-not-allowed text-zinc-300"
                  )}
                >
                  <Plus className="h-4 w-4" />
                  {selectProductsButton}
                </button>
              </div>

              <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50 py-10 text-center">
                {!hasWarehouseFrom && <LockedPill label={warehouseFromLockLabel} />}
                <p className="mt-1 text-sm font-semibold text-zinc-700">{noProductsSelectedTitle}</p>
                <p className="text-xs text-zinc-400">{noProductsSelectedSubtitle}</p>
              </div>
            </div>
          </section>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <Link
          href="/inventory-management/warehouse-transfers"
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
