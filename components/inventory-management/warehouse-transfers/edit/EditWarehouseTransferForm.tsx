"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, ChevronUp, Package, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { cn } from "@/lib/utils/cn";
import type { EditTransferProduct, EditWarehouseTransferData } from "@/lib/mock/types";

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

function QuantityStepper({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="relative w-20">
      <input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-9 w-full rounded-lg border border-zinc-200 bg-white pe-6 ps-2 text-sm text-zinc-700 focus:ring-2 focus:ring-primary-100 focus:outline-none"
      />
      <div className="absolute inset-e-1.5 top-1/2 flex -translate-y-1/2 flex-col">
        <button type="button" onClick={() => onChange(value + 1)} aria-label="Increase" className="text-zinc-400 hover:text-zinc-600">
          <ChevronUp className="h-3 w-3" />
        </button>
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          aria-label="Decrease"
          className="text-zinc-400 hover:text-zinc-600"
        >
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function ProductRow({ product, onRemove }: { product: EditTransferProduct; onRemove: () => void }) {
  const [transferQty, setTransferQty] = useState(product.transferQty);

  return (
    <tr className="border-t border-zinc-100 bg-zinc-50">
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-300">
            <Package className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="max-w-xs truncate text-sm font-medium text-zinc-800">{product.name}</p>
            <p dir="ltr" className="text-xs text-zinc-400">
              Sku: {product.sku}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <div className="flex h-9 w-16 items-center gap-1 rounded-lg border border-zinc-200 px-2">
          <Package className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
          <span className="text-sm text-zinc-700">{product.stockQty}</span>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <QuantityStepper value={transferQty} onChange={setTransferQty} />
      </td>
      <td className="px-4 py-3.5">
        <button type="button" onClick={onRemove} aria-label="Remove" className="text-danger hover:text-danger">
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}

export function EditWarehouseTransferForm({
  breadcrumbRoot,
  breadcrumbCurrent,
  formTitle,
  warehouseSectionTitle,
  warehouseSectionSubtitle,
  warehouseFromLabel,
  warehouseToLabel,
  shippingCompanyLabel,
  shippingCompanyPlaceholder,
  optionsSectionTitle,
  optionsSectionSubtitle,
  priorityLabel,
  priorityOptions,
  senderEmployeeLabel,
  receiverEmployeeLabel,
  employeePlaceholder,
  notesLabel,
  notesPlaceholder,
  selectProductsTitle,
  selectProductsSubtitle,
  selectProductsButton,
  productColumns,
  cancelLabel,
  submitLabel,
  data,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  formTitle: string;
  warehouseSectionTitle: string;
  warehouseSectionSubtitle: string;
  warehouseFromLabel: string;
  warehouseToLabel: string;
  shippingCompanyLabel: string;
  shippingCompanyPlaceholder: string;
  optionsSectionTitle: string;
  optionsSectionSubtitle: string;
  priorityLabel: string;
  priorityOptions: { value: string; label: string }[];
  senderEmployeeLabel: string;
  receiverEmployeeLabel: string;
  employeePlaceholder: string;
  notesLabel: string;
  notesPlaceholder: string;
  selectProductsTitle: string;
  selectProductsSubtitle: string;
  selectProductsButton: string;
  productColumns: {
    product: string;
    stockQty: string;
    transferQty: string;
  };
  cancelLabel: string;
  submitLabel: string;
  data: EditWarehouseTransferData;
}) {
  const [shippingCompany, setShippingCompany] = useState("");
  const [priority, setPriority] = useState(data.priority);
  const [senderEmployee, setSenderEmployee] = useState("");
  const [receiverEmployee, setReceiverEmployee] = useState("");
  const [notes, setNotes] = useState("");
  const [products, setProducts] = useState(data.products);

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
                <FormField label={warehouseFromLabel}>
                  <SelectDropdown
                    value="from"
                    onChange={() => {}}
                    options={[{ value: "from", label: data.warehouseFrom }]}
                  />
                </FormField>
                <FormField label={warehouseToLabel}>
                  <SelectDropdown value="to" onChange={() => {}} options={[{ value: "to", label: data.warehouseTo }]} />
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
                  <SelectDropdown value={priority} onChange={(value) => setPriority(value as typeof priority)} options={priorityOptions} />
                </FormField>
                <FormField label={senderEmployeeLabel}>
                  <SelectDropdown
                    value={senderEmployee}
                    onChange={setSenderEmployee}
                    options={[]}
                    placeholder={employeePlaceholder}
                  />
                </FormField>
                <FormField label={receiverEmployeeLabel}>
                  <SelectDropdown
                    value={receiverEmployee}
                    onChange={setReceiverEmployee}
                    options={[]}
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
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{selectProductsTitle}</p>
                  <p className="text-xs text-zinc-400">{selectProductsSubtitle}</p>
                </div>
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  <Plus className="h-4 w-4" />
                  {selectProductsButton}
                </button>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-zinc-100">
                <div className="scrollbar-primary overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse">
                    <thead>
                      <tr className="bg-primary-50">
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.product}
                        </th>
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.stockQty}
                        </th>
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.transferQty}
                        </th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <ProductRow
                          key={product.id}
                          product={product}
                          onRemove={() => setProducts((prev) => prev.filter((p) => p.id !== product.id))}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
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
