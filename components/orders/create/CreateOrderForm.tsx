"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Building2, ChevronRight, ImageIcon, MapPin, Package, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import type { CreateOrderLocation, CreateOrderProductRow } from "@/lib/mock/types";

const INPUT_CLASSES =
  "h-10 w-full rounded-xl border border-zinc-200 px-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none";

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
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

export function CreateOrderForm({
  breadcrumbRoot,
  breadcrumbCurrent,
  formTitle,
  orderDetailsTitle,
  orderDetailsSubtitle,
  clientIntegrateLabel,
  clientIntegrateOptions,
  warehouseLabel,
  warehouseOptions,
  tagsLabel,
  tagsPlaceholder,
  noteLabel,
  notePlaceholder,
  selectProductsTitle,
  selectProductsSubtitle,
  selectProductsButton,
  productColumns,
  productRows,
  customerDetailsTitle,
  customerDetailsSubtitle,
  selectCustomerLabel,
  customerOptions,
  addNewCustomerLabel,
  currencyLabel,
  currencyPlaceholder,
  locationsLabel,
  newLocationLabel,
  location,
  deliveryCompanyTitle,
  deliveryCompanySubtitle,
  deliveryCompanyLabel,
  deliveryCompanyPlaceholder,
  paymentMethodLabel,
  paymentMethodPlaceholder,
  cancelLabel,
  submitLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  formTitle: string;
  orderDetailsTitle: string;
  orderDetailsSubtitle: string;
  clientIntegrateLabel: string;
  clientIntegrateOptions: { value: string; label: string }[];
  warehouseLabel: string;
  warehouseOptions: { value: string; label: string }[];
  tagsLabel: string;
  tagsPlaceholder: string;
  noteLabel: string;
  notePlaceholder: string;
  selectProductsTitle: string;
  selectProductsSubtitle: string;
  selectProductsButton: string;
  productColumns: {
    product: string;
    availableStock: string;
    quantity: string;
    unitPrice: string;
    totalPrice: string;
  };
  productRows: CreateOrderProductRow[];
  customerDetailsTitle: string;
  customerDetailsSubtitle: string;
  selectCustomerLabel: string;
  customerOptions: { value: string; label: string }[];
  addNewCustomerLabel: string;
  currencyLabel: string;
  currencyPlaceholder: string;
  locationsLabel: string;
  newLocationLabel: string;
  location: CreateOrderLocation;
  deliveryCompanyTitle: string;
  deliveryCompanySubtitle: string;
  deliveryCompanyLabel: string;
  deliveryCompanyPlaceholder: string;
  paymentMethodLabel: string;
  paymentMethodPlaceholder: string;
  cancelLabel: string;
  submitLabel: string;
}) {
  const [clientIntegrate, setClientIntegrate] = useState(clientIntegrateOptions[0]?.value ?? "");
  const [warehouse, setWarehouse] = useState(warehouseOptions[0]?.value ?? "");
  const [tags, setTags] = useState("");
  const [note, setNote] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(productRows.map((row) => [row.id, row.quantity]))
  );
  const [customer, setCustomer] = useState(customerOptions[0]?.value ?? "");
  const [currency, setCurrency] = useState("");
  const [deliveryCompany, setDeliveryCompany] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
        <Link href="/orders" className="hover:text-zinc-700">
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
          {/* Order Details */}
          <section>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-semibold text-zinc-900">{orderDetailsTitle}</p>
              <p className="mb-3 text-xs text-zinc-400">{orderDetailsSubtitle}</p>
              <div className="mb-4 border-b border-zinc-100" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label={clientIntegrateLabel} required>
                  <SelectDropdown value={clientIntegrate} onChange={setClientIntegrate} options={clientIntegrateOptions} />
                </FormField>
                <FormField label={warehouseLabel}>
                  <SelectDropdown value={warehouse} onChange={setWarehouse} options={warehouseOptions} />
                </FormField>
                <FormField label={tagsLabel}>
                  <SelectDropdown value={tags} onChange={setTags} options={[]} placeholder={tagsPlaceholder} />
                </FormField>
              </div>

              <div className="mt-4">
                <FormField label={noteLabel}>
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder={notePlaceholder}
                    rows={3}
                    className="w-full resize-y rounded-xl border border-zinc-200 px-3 py-2.5 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
                  />
                </FormField>
              </div>
            </div>
          </section>

          <div className="border-t border-zinc-100" />

          {/* Select Products */}
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
                  <table className="w-full min-w-[800px] border-collapse">
                    <thead>
                      <tr className="bg-primary-50">
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.product}
                        </th>
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.availableStock}
                        </th>
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.quantity}
                        </th>
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.unitPrice}
                        </th>
                        <th className="px-4 py-3 text-start text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                          {productColumns.totalPrice}
                        </th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {productRows.map((row) => {
                        const quantity = quantities[row.id] ?? row.quantity;
                        return (
                          <tr key={row.id} className="border-t border-zinc-100 bg-zinc-50">
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-300">
                                  <ImageIcon className="h-4 w-4" />
                                </span>
                                <div className="min-w-0">
                                  <p className="max-w-xs truncate text-sm font-medium text-zinc-800">{row.name}</p>
                                  <p dir="ltr" className="text-xs text-zinc-400">
                                    SKU: {row.sku}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-sm text-zinc-600 ring-1 ring-zinc-200">
                                <Package className="h-3.5 w-3.5 text-zinc-400" />
                                {row.availableStock}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(event) =>
                                  setQuantities((prev) => ({ ...prev, [row.id]: Number(event.target.value) }))
                                }
                                className="h-9 w-20 rounded-lg border border-zinc-200 bg-white px-2 text-center text-sm text-zinc-700 focus:ring-2 focus:ring-primary-100 focus:outline-none"
                              />
                            </td>
                            <td dir="ltr" className="px-4 py-3.5 text-sm text-zinc-600">
                              {row.unitPrice.toFixed(2)}
                            </td>
                            <td dir="ltr" className="px-4 py-3.5 text-sm font-semibold text-zinc-800">
                              {(row.unitPrice * quantity).toFixed(2)}
                            </td>
                            <td className="px-4 py-3.5">
                              <button type="button" aria-label="Remove" className="text-danger hover:text-danger">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-zinc-100" />

          {/* Customer Details */}
          <section>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-semibold text-zinc-900">{customerDetailsTitle}</p>
              <p className="mb-3 text-xs text-zinc-400">{customerDetailsSubtitle}</p>
              <div className="mb-4 border-b border-zinc-100" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label={selectCustomerLabel} required>
                  <div className="flex items-center gap-2.5">
                    <div className="min-w-0 flex-1">
                      <SelectDropdown value={customer} onChange={setCustomer} options={customerOptions} />
                    </div>
                    <button
                      type="button"
                      className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-primary-100 bg-primary-50 px-3 text-sm font-medium text-primary-700 hover:bg-primary-100"
                    >
                      <Plus className="h-4 w-4" />
                      {addNewCustomerLabel}
                    </button>
                  </div>
                </FormField>

                <FormField label={currencyLabel} required>
                  <SelectDropdown value={currency} onChange={setCurrency} options={[]} placeholder={currencyPlaceholder} />
                </FormField>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">{locationsLabel}</p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    <Plus className="h-4 w-4" />
                    {newLocationLabel}
                  </button>
                </div>

                <div className="mt-3 flex items-start justify-between gap-3 rounded-xl border border-zinc-200 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-zinc-900">{location.city}</p>
                      <p className="text-xs text-zinc-400">{location.country}</p>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
                        <Building2 className="h-3.5 w-3.5" />
                        {location.buildingLabel}
                      </p>
                      {!location.hasShortAddress && (
                        <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-warning">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          NO SHORT ADDRESS
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="h-4 w-4 shrink-0 rounded-full border-2 border-zinc-300" />
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-zinc-100" />

          {/* Delivery Company */}
          <section>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-semibold text-zinc-900">{deliveryCompanyTitle}</p>
              <p className="mb-3 text-xs text-zinc-400">{deliveryCompanySubtitle}</p>
              <div className="mb-4 border-b border-zinc-100" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label={deliveryCompanyLabel} required>
                  <SelectDropdown
                    value={deliveryCompany}
                    onChange={setDeliveryCompany}
                    options={[]}
                    placeholder={deliveryCompanyPlaceholder}
                  />
                </FormField>
                <FormField label={paymentMethodLabel} required>
                  <SelectDropdown
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                    options={[]}
                    placeholder={paymentMethodPlaceholder}
                  />
                </FormField>
              </div>
            </div>
          </section>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <Link
          href="/orders"
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
