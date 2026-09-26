import Link from "next/link";
import { ChevronLeft, ChevronRight, Download, Package, Clock, Timer, Boxes } from "lucide-react";
import { ReportsFiltersBar, type ReportsQuickPreset } from "@/components/reports/ReportsFiltersBar";
import type { DateRangePresetKey } from "@/components/shared/DateRangeDropdown";
import { WarehouseFilterRow } from "./WarehouseFilterRow";
import { WarehouseStatCard } from "./WarehouseStatCard";
import { TransitionDistributionCard, type TransitionDistributionItem } from "./TransitionDistributionCard";
import { TransitionTrendCard } from "./TransitionTrendCard";
import { CarrierDonutCard } from "./CarrierDonutCard";

export function WarehousePerformanceView({
  breadcrumbRoot,
  breadcrumbCurrent,
  filtersLabel,
  downloadPdfLabel,
  quickPresets,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  fromStatusLabel,
  fromStatusValue,
  toStatusLabel,
  toStatusValue,
  warehousePlaceholder,
  deliveryCompaniesPlaceholder,
  paymentStatusPlaceholder,
  paymentMethodsPlaceholder,
  countriesPlaceholder,
  citiesPlaceholder,
  applyFiltersLabel,
  ordersInRangeTitle,
  ordersInRangeValue,
  ordersInRangeSubtitle,
  avgTransitionTimeTitle,
  fastestOrderTitle,
  slowestOrderTitle,
  distributionTitle,
  distributionSubtitle,
  distributionItems,
  trendTitle,
  trendDataPointsLabel,
  carrierTitle,
  carrierSubtitle,
  carrierValueLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  filtersLabel: string;
  downloadPdfLabel: string;
  quickPresets: ReportsQuickPreset[];
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  fromStatusLabel: string;
  fromStatusValue: string;
  toStatusLabel: string;
  toStatusValue: string;
  warehousePlaceholder: string;
  deliveryCompaniesPlaceholder: string;
  paymentStatusPlaceholder: string;
  paymentMethodsPlaceholder: string;
  countriesPlaceholder: string;
  citiesPlaceholder: string;
  applyFiltersLabel: string;
  ordersInRangeTitle: string;
  ordersInRangeValue: string;
  ordersInRangeSubtitle: string;
  avgTransitionTimeTitle: string;
  fastestOrderTitle: string;
  slowestOrderTitle: string;
  distributionTitle: string;
  distributionSubtitle: string;
  distributionItems: TransitionDistributionItem[];
  trendTitle: string;
  trendDataPointsLabel: string;
  carrierTitle: string;
  carrierSubtitle: string;
  carrierValueLabel: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-sm text-zinc-500">
        <Link
          href="/reports"
          aria-label={breadcrumbRoot}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
        </Link>
        <Link href="/reports" className="text-zinc-400 hover:text-zinc-600">
          {breadcrumbRoot}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
        <span className="font-semibold text-zinc-900">{breadcrumbCurrent}</span>
      </nav>

      <ReportsFiltersBar
        filtersLabel={filtersLabel}
        headerAction={
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            <Download className="h-4 w-4" />
            {downloadPdfLabel}
          </button>
        }
        quickPresets={quickPresets}
        dateRangePresetLabels={dateRangePresetLabels}
        dateRangeCancelLabel={dateRangeCancelLabel}
        dateRangeApplyLabel={dateRangeApplyLabel}
        extraFilters={
          <WarehouseFilterRow
            fromStatusLabel={fromStatusLabel}
            fromStatusValue={fromStatusValue}
            toStatusLabel={toStatusLabel}
            toStatusValue={toStatusValue}
            warehousePlaceholder={warehousePlaceholder}
            deliveryCompaniesPlaceholder={deliveryCompaniesPlaceholder}
            paymentStatusPlaceholder={paymentStatusPlaceholder}
            paymentMethodsPlaceholder={paymentMethodsPlaceholder}
            countriesPlaceholder={countriesPlaceholder}
            citiesPlaceholder={citiesPlaceholder}
            applyLabel={applyFiltersLabel}
          />
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <WarehouseStatCard
          icon={Package}
          title={ordersInRangeTitle}
          value={ordersInRangeValue}
          subtitle={ordersInRangeSubtitle}
        />
        <WarehouseStatCard icon={Clock} title={avgTransitionTimeTitle} value="-" />
        <WarehouseStatCard icon={Timer} title={fastestOrderTitle} value="-" />
        <WarehouseStatCard icon={Boxes} title={slowestOrderTitle} value="-" />
      </div>

      <TransitionDistributionCard title={distributionTitle} subtitle={distributionSubtitle} items={distributionItems} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_440px]">
        <TransitionTrendCard title={trendTitle} dataPointsLabel={trendDataPointsLabel} />
        <CarrierDonutCard title={carrierTitle} subtitle={carrierSubtitle} value={0} valueLabel={carrierValueLabel} />
      </div>
    </div>
  );
}
