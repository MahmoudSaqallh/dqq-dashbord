"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, CircleCheck, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { PLAN_FEATURE_GROUPS } from "@/lib/mock/plan-feature-groups";
import { PlanFeatureGroupRow } from "./PlanFeatureGroupRow";
import { PlanSummaryCard } from "./PlanSummaryCard";

const INPUT_CLASSES =
  "h-10 w-full rounded-xl border border-zinc-200 px-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none";

const BILLING_CYCLE_OPTIONS = [
  { value: "free", label: "Free" },
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual" },
];

const DEFAULT_SELECTED: Record<string, boolean> = {
  "ecommerce-stores": true,
  "shipping-carriers": true,
  "additional-employee": true,
};

const EXPANDED_BY_DEFAULT = new Set(["integrations-connections", "team-permissions"]);

function FormField({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block min-h-8 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        {label}
        {required && " *"}
        {hint && <span className="ms-1 font-normal normal-case text-zinc-400">({hint})</span>}
      </label>
      <div className="">{children}</div>
    </div>
  );
}

function ToggleCard({
  icon: Icon,
  title,
  subtitle,
  checked,
  onChange,
}: {
  icon: typeof CircleCheck;
  title: string;
  subtitle: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className={cn("flex h-9 w-9 items-center justify-center rounded-full", checked ? "bg-primary-100 text-primary-600" : "bg-zinc-200 text-zinc-400")}>
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-zinc-800">{title}</p>
          <p className="text-xs text-zinc-400">{subtitle}</p>
        </div>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  );
}

export function CreatePlanForm({
  breadcrumbRoot,
  breadcrumbCurrent,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
}) {
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [planCode, setPlanCode] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [duration, setDuration] = useState("1");
  const [basePrice, setBasePrice] = useState("0");
  const [vatRate, setVatRate] = useState("0.15");
  const [active, setActive] = useState(true);
  const [customPlan, setCustomPlan] = useState(false);
  const [vatEnabled, setVatEnabled] = useState(true);

  const [selected, setSelected] = useState<Record<string, boolean>>(DEFAULT_SELECTED);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [enforcements, setEnforcements] = useState<Record<string, string>>({});
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});

  function toggleFeature(featureId: string, checked: boolean) {
    setSelected((prev) => ({ ...prev, [featureId]: checked }));
  }

  function toggleGroup(groupId: string, checked: boolean) {
    const group = PLAN_FEATURE_GROUPS.find((g) => g.id === groupId);
    if (!group) return;
    setSelected((prev) => {
      const next = { ...prev };
      for (const feature of group.features) next[feature.id] = checked;
      return next;
    });
  }

  const priceValue = Number(basePrice) || 0;
  const vatRateValue = Number(vatRate) || 0;
  const subtotal = priceValue;
  const vatAmount = vatEnabled ? subtotal * vatRateValue : 0;
  const total = subtotal + vatAmount;

  return (
    <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
            <Link href="/subscription-plans" className="hover:text-zinc-700">
              {breadcrumbRoot}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
            <span className="font-semibold text-zinc-900">{breadcrumbCurrent}</span>
          </nav>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-primary-600 hover:bg-zinc-50"
            >
              Save as Draft
            </button>
            <button type="button" className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-600">
              Save & Publish
            </button>
          </div>
        </div>

      <div className="rounded-card border border-zinc-200 bg-white p-5 shadow-md">
        <h2 className="text-sm font-semibold text-zinc-900">Informations</h2>
        <p className="text-xs text-zinc-400">Initial information for the new plan</p>
        <div className="mt-5  border-t border-zinc-200" />

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FormField label="Plan Name (English)" required>
            <input
              value={nameEn}
              onChange={(event) => setNameEn(event.target.value)}
              placeholder="Enter Plan English Name"
              className={INPUT_CLASSES}
            />
          </FormField>
          <FormField label="Plan Name (Arabic)" required>
            <input
              dir="rtl"
              value={nameAr}
              onChange={(event) => setNameAr(event.target.value)}
              placeholder="Enter Plan Arabic Name"
              className={INPUT_CLASSES}
            />
          </FormField>
          <FormField label="Plan Code" required hint="Stable identifier, never shown to merchants">
            <input
              dir="ltr"
              value={planCode}
              onChange={(event) => setPlanCode(event.target.value)}
              placeholder="e.g. pro_monthly"
              className={INPUT_CLASSES}
            />
          </FormField>
          <FormField label="Billing Cycle" required>
            <SelectDropdown value={billingCycle} onChange={setBillingCycle} options={BILLING_CYCLE_OPTIONS} />
          </FormField>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FormField label="Duration" required>
            <input
              dir="ltr"
              lang="en"
              type="number"
              min={1}
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className={INPUT_CLASSES}
            />
          </FormField>
          <FormField label="Duration Unit" required hint="Set automatically by the billing cycle">
            <div className="relative">
              <input
                dir="ltr"
                disabled
                value={billingCycle === "annual" ? "Years" : "Months"}
                className={cn(INPUT_CLASSES, "cursor-not-allowed bg-zinc-50 pe-9 text-zinc-400")}
              />
              <Lock className="pointer-events-none absolute top-1/2 inset-e-3 h-3.5 w-3.5 -translate-y-1/2 text-zinc-300" />
            </div>
          </FormField>
          <FormField label="Base Price (SAR)" required>
            <input
              dir="ltr"
              lang="en"
              type="number"
              min={0}
              step="0.01"
              value={basePrice}
              onChange={(event) => setBasePrice(event.target.value)}
              className={INPUT_CLASSES}
            />
          </FormField>
          <FormField label="VAT Rate" hint="Between 0 and 1, e.g. 0.15 = 15%">
            <input
              dir="ltr"
              lang="en"
              type="number"
              min={0}
              max={1}
              step="0.01"
              value={vatRate}
              onChange={(event) => setVatRate(event.target.value)}
              className={INPUT_CLASSES}
            />
          </FormField>
        </div>

        <div className="mt-4 grid grid-cols-[3fr_7fr] gap-3">
          <ToggleCard
            icon={CircleCheck}
            title="Active"
            subtitle="Off = hidden from customers"
            checked={active}
            onChange={setActive}
          />
          <ToggleCard
            icon={Sparkles}
            title="Custom Plan"
            subtitle="Available to all clients on the subscription page"
            checked={customPlan}
            onChange={setCustomPlan}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_580px]">
        <div className="rounded-card border border-zinc-200 bg-white p-5 shadow-md">
          {PLAN_FEATURE_GROUPS.map((group) => (
            <PlanFeatureGroupRow
              key={group.id}
              group={group}
              selected={selected}
              onToggleFeature={toggleFeature}
              onToggleGroup={toggleGroup}
              quantities={quantities}
              onQuantityChange={(featureId, value) => setQuantities((prev) => ({ ...prev, [featureId]: value }))}
              enforcements={enforcements}
              onEnforcementChange={(featureId, value) => setEnforcements((prev) => ({ ...prev, [featureId]: value }))}
              visibility={visibility}
              onVisibleToggle={(featureId, checked) => setVisibility((prev) => ({ ...prev, [featureId]: checked }))}
              defaultExpanded={EXPANDED_BY_DEFAULT.has(group.id)}
            />
          ))}
        </div>

        <PlanSummaryCard
          billingCycleLabel={billingCycle === "annual" ? "Annual" : billingCycle === "free" ? "Free" : "Monthly"}
          vatRatePercentLabel={`${Math.round(vatRateValue * 100)}%`}
          vatEnabled={vatEnabled}
          onVatToggle={setVatEnabled}
          subtotal={subtotal}
          vatAmount={vatAmount}
          total={total}
        />
      </div>
    </div>
  );
}
