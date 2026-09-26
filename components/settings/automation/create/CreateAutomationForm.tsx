"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { RestrictionSelect, type RestrictionGroup } from "./RestrictionSelect";

const INPUT_CLASSES =
  "h-10 w-full rounded-xl border border-zinc-200 px-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none";

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
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

function LabeledSelectTrigger({ prefixLabel, placeholder }: { prefixLabel: string; placeholder: string }) {
  return (
    <button
      type="button"
      className="flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-zinc-200 px-3 text-sm text-zinc-500"
    >
      <span className="truncate">
        <span className="font-semibold text-primary-600">{prefixLabel} :</span> {placeholder}
      </span>
      <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
    </button>
  );
}

export function CreateAutomationForm({
  breadcrumbRoot,
  breadcrumbCurrent,
  detailsTitle,
  informationsTitle,
  informationsSubtitle,
  automationNameLabel,
  automationNamePlaceholder,
  statusLabel,
  dqqStatusPrefix,
  dqqStatusPlaceholder,
  storeStatusPrefix,
  storeStatusPlaceholder,
  restrictionsTitle,
  restrictionsSubtitle,
  restrictionLabel,
  restrictionPlaceholder,
  restrictionGroups,
  operatorOptions,
  valueLabel,
  valuePlaceholder,
  addRestrictionLabel,
  eventsTitle,
  eventsSubtitle,
  eventsCountLabel,
  automationTypeLabel,
  automationTypePlaceholder,
  addEventLabel,
  cancelLabel,
  createLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  detailsTitle: string;
  informationsTitle: string;
  informationsSubtitle: string;
  automationNameLabel: string;
  automationNamePlaceholder: string;
  statusLabel: string;
  dqqStatusPrefix: string;
  dqqStatusPlaceholder: string;
  storeStatusPrefix: string;
  storeStatusPlaceholder: string;
  restrictionsTitle: string;
  restrictionsSubtitle: string;
  restrictionLabel: string;
  restrictionPlaceholder: string;
  restrictionGroups: RestrictionGroup[];
  operatorOptions: { value: string; label: string }[];
  valueLabel: string;
  valuePlaceholder: string;
  addRestrictionLabel: string;
  eventsTitle: string;
  eventsSubtitle: string;
  eventsCountLabel: string;
  automationTypeLabel: string;
  automationTypePlaceholder: string;
  addEventLabel: string;
  cancelLabel: string;
  createLabel: string;
}) {
  const [automationName, setAutomationName] = useState("");
  const [restriction, setRestriction] = useState("");
  const [operator, setOperator] = useState("eq");
  const [automationType, setAutomationType] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
        <Link href="/settings/automation" className="hover:text-zinc-700">
          {breadcrumbRoot}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
        <span className="font-semibold text-zinc-900">{breadcrumbCurrent}</span>
      </nav>

      <Card className="overflow-hidden  bg-zinc-100!">
        <div className="border-b border-zinc-100 px-5 py-4 bg-white">
          <p className="text-sm font-semibold text-zinc-500">{detailsTitle}</p>
        </div>

        <div className="flex flex-col  p-3">
          {/* Informations */}
          <section>

            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-900">{informationsTitle}</p>
            <p className="mb-3 text-xs text-zinc-400">{informationsSubtitle}</p>
              <div className="mb-4 border-b border-zinc-100" />

              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label={automationNameLabel} required>
                  <input
                    value={automationName}
                    onChange={(event) => setAutomationName(event.target.value)}
                    placeholder={automationNamePlaceholder}
                    className={INPUT_CLASSES}
                  />
                </FormField>

                <div className="sm:col-span-2">
                  <FormField label={statusLabel} required>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <LabeledSelectTrigger prefixLabel={dqqStatusPrefix} placeholder={dqqStatusPlaceholder} />
                      <LabeledSelectTrigger prefixLabel={storeStatusPrefix} placeholder={storeStatusPlaceholder} />
                    </div>
                  </FormField>
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-zinc-100" />

          {/* Restrictions */}
          <section>

            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-900">{restrictionsTitle}</p>
            <p className="mb-3 text-xs text-zinc-400">{restrictionsSubtitle}</p>
              <div className="mb-5 border-b border-zinc-100" />

              <div className="rounded-xl bg-zinc-100 p-4">
                <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[auto_1fr_110px_auto_1fr_auto_auto]">
                  <span className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                    {restrictionLabel}
                  </span>
                  <RestrictionSelect
                    value={restriction}
                    onChange={setRestriction}
                    groups={restrictionGroups}
                    placeholder={restrictionPlaceholder}
                  />
                  <SelectDropdown
                    value={operator}
                    onChange={setOperator}
                    options={operatorOptions}
                    triggerClassName="border-zinc-200 bg-white text-zinc-700"
                  />
                  <span className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                    {valueLabel}
                  </span>
                  <input disabled placeholder={valuePlaceholder} className={`${INPUT_CLASSES} cursor-not-allowed bg-white text-zinc-400`} />
                  <span className="hidden h-6 w-px bg-zinc-300 sm:block mx-3" />
                  <button
                    type="button"
                    aria-label={addRestrictionLabel}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-danger hover:bg-danger-bg bg-gray-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                disabled
                className="mt-7 inline-flex cursor-not-allowed items-center gap-1.5 text-sm font-medium text-zinc-300"
              >
                <Plus className="h-4 w-4" />
                {addRestrictionLabel}
              </button>
            </div>
          </section>

          <div className="border-t border-zinc-100" />

          {/* Events */}
          <section>

            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-900">{eventsTitle}</p>
            <p className="mb-3 text-xs text-zinc-400">{eventsSubtitle}</p>
              <div className="mb-5 border-b border-zinc-100" />

              <div className="rounded-xl bg-zinc-100 p-4">
                <p className="mb-3 text-sm font-semibold text-zinc-700">{eventsCountLabel}</p>

                <FormField label={automationTypeLabel} required>
                  <SelectDropdown
                    value={automationType}
                    onChange={setAutomationType}
                    options={[]}
                    placeholder={automationTypePlaceholder}
                    triggerClassName="border-zinc-200 bg-white text-zinc-700"
                  />
                </FormField>
              </div>
            </div>

            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              <Plus className="h-4 w-4" />
              {addEventLabel}
            </button>
          </section>
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-100 px-5 py-4">
          <Link
            href="/settings/automation"
            className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            {cancelLabel}
          </Link>
          <button type="button" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-600">
            {createLabel}
          </button>
        </div>
      </Card>
    </div>
  );
}
