"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Mail,
  Package,
  Plus,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { cn } from "@/lib/utils/cn";
import type { EditPurchaseOrderData, EditPurchaseOrderProduct } from "@/lib/mock/types";

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

function ProductRow({
  product,
  onRemove,
}: {
  product: EditPurchaseOrderProduct;
  onRemove: () => void;
}) {
  const [orderQty, setOrderQty] = useState(product.orderQty);
  const [unitPrice, setUnitPrice] = useState(product.unitPrice);

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
        <QuantityStepper value={orderQty} onChange={setOrderQty} />
      </td>
      <td className="px-4 py-3.5">
        <input
          type="number"
          min={0}
          value={unitPrice}
          onChange={(event) => setUnitPrice(Number(event.target.value))}
          className="h-9 w-20 rounded-lg border border-zinc-200 bg-white px-2 text-sm text-zinc-700 focus:ring-2 focus:ring-primary-100 focus:outline-none"
        />
      </td>
      <td className="px-4 py-3.5">
        <div className="relative">
          <input type="text" readOnly value={product.deliveryDateDisplay} dir="ltr" className="h-9 w-32 rounded-lg border border-zinc-200 bg-white ps-2 pe-7 text-start text-sm text-zinc-700" />
          <Calendar className="pointer-events-none absolute top-1/2 inset-e-2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
        </div>
      </td>
      <td dir="ltr" className="px-4 py-3.5 text-sm font-semibold text-zinc-800">
        {(unitPrice * orderQty).toFixed(2)}
      </td>
      <td className="px-4 py-3.5">
        <button type="button" onClick={onRemove} aria-label="Remove" className="text-danger hover:text-danger">
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}

export function EditPurchaseOrderForm({
  breadcrumbRoot,
  breadcrumbCurrent,
  formTitle,
  warehouseSectionTitle,
  warehouseSectionSubtitle,
  supplierLabel,
  addSupplierLabel,
  warehouseLabel,
  deliveryDateLabel,
  deliveryDatePlaceholder,
  receiverLabel,
  receiverPlaceholder,
  emailToggleTitle,
  emailToggleDescription,
  selectProductsTitle,
  selectProductsSubtitle,
  selectProductsButton,
  productColumns,
  notesTitle,
  notesSubtitle,
  notesLabel,
  notesPlaceholder,
  cancelLabel,
  submitLabel,
  data,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  formTitle: string;
  warehouseSectionTitle: string;
  warehouseSectionSubtitle: string;
  supplierLabel: string;
  addSupplierLabel: string;
  warehouseLabel: string;
  deliveryDateLabel: string;
  deliveryDatePlaceholder: string;
  receiverLabel: string;
  receiverPlaceholder: string;
  emailToggleTitle: string;
  emailToggleDescription: string;
  selectProductsTitle: string;
  selectProductsSubtitle: string;
  selectProductsButton: string;
  productColumns: {
    product: string;
    stockQty: string;
    orderQty: string;
    unitPrice: string;
    deliveryDate: string;
    totalPrice: string;
  };
  notesTitle: string;
  notesSubtitle: string;
  notesLabel: string;
  notesPlaceholder: string;
  cancelLabel: string;
  submitLabel: string;
  data: EditPurchaseOrderData;
}) {
  const [sendEmail, setSendEmail] = useState(false);
  const [products, setProducts] = useState(data.products);
  const [notes, setNotes] = useState(data.notes);

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
                      <SelectDropdown
                        value="supplier"
                        onChange={() => {}}
                        options={[{ value: "supplier", label: data.supplierName }]}
                      />
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
                  <SelectDropdown
                    value="warehouse"
                    onChange={() => {}}
                    options={[{ value: "warehouse", label: data.warehouseName }]}
                  />
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
                  <SelectDropdown value="" onChange={() => {}} options={[]} placeholder={receiverPlaceholder} />
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
                  <table className="w-full min-w-[900px] border-collapse">
                    <thead>
                      <tr className="bg-primary-50">
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.product}
                        </th>
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.stockQty}
                        </th>
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.orderQty}
                        </th>
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.unitPrice}
                        </th>
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.deliveryDate}
                        </th>
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.totalPrice}
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

          <div className="border-t border-zinc-100" />

          <section>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-semibold text-zinc-900">{notesTitle}</p>
              <p className="mb-3 text-xs text-zinc-400">{notesSubtitle}</p>
              <div className="mb-4 border-b border-zinc-100" />

              <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
                <div className="flex h-full flex-col">
                  <label className="mb-1.5 block text-xs font-semibold tracking-wide text-zinc-500 uppercase">{notesLabel}</label>
                  <div className="relative flex-1">
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder={notesPlaceholder}
                      maxLength={500}
                      className="h-full w-full resize-none rounded-xl border border-zinc-200 px-3 py-2.5 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
                    />
                    <span className="absolute bottom-2 inset-e-3 text-xs text-zinc-300">{notes.length}/500</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 text-zinc-400 hover:border-primary-200 hover:text-primary-600"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <UploadCloud className="h-4 w-4" />
                  </span>
                </button>
              </div>
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
