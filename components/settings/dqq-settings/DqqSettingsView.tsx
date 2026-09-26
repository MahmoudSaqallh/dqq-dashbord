"use client";

import { useState } from "react";
import { Menu, RefreshCw, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { cn } from "@/lib/utils/cn";

type TabId =
  | "notification"
  | "orders"
  | "app"
  | "statusMapping"
  | "warehousePriority";

export interface OrdersSettingRow {
  id: string;
  title: string;
  description: string;
  defaultChecked: boolean;
}

function RadioOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex shrink-0 items-center gap-2"
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-primary" : "border-zinc-300"
        )}
      >
        {selected && (
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        )}
      </span>

      <span
        className={cn(
          "text-xs font-semibold tracking-wide uppercase",
          selected ? "text-zinc-900" : "text-zinc-500"
        )}
      >
        {label}
      </span>
    </button>
  );
}

function AppSettingsRadioRow({
  title,
  description,
  options,
  value,
  onChange,
}: {
  title: string;
  description: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative flex flex-col gap-3 border-b border-zinc-100 py-5 last:border-b-0 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-md">
        <p className="text-sm font-semibold text-zinc-700">{title}</p>
        <p className="mt-1 text-xs text-zinc-400">{description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:contents">
        {options.map((option, index) => (
          <span
            key={option.value}
            className={cn(
              index === 0 &&
                "lg:absolute lg:left-1/2 lg:-translate-x-1/2",
              index === 1 &&
                "lg:absolute lg:left-[70%] lg:-translate-x-1/2",
              index === 2 &&
                "lg:absolute lg:left-[87%] lg:-translate-x-1/2"
            )}
          >
            <RadioOption
              label={option.label}
              selected={value === option.value}
              onSelect={() => onChange(option.value)}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function AppSettingsToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="relative flex items-start justify-between gap-3 border-b border-zinc-100 py-5 last:border-b-0 lg:items-center">
      <div className="max-w-md">
        <p className="text-sm font-semibold text-zinc-700">{title}</p>
        <p className="mt-1 text-xs text-zinc-400">{description}</p>
      </div>

      <span className="shrink-0 lg:absolute lg:left-[49.5%] lg:-translate-x-1/2">
        <ToggleSwitch checked={checked} onChange={onChange} />
      </span>
    </div>
  );
}

function OrdersSettingsToggleRow({
  row,
}: {
  row: OrdersSettingRow;
}) {
  const [checked, setChecked] = useState(row.defaultChecked);

  return (
    <div className="relative flex items-start justify-between gap-3 border-b border-zinc-100 py-5 lg:items-center">
      <div className="max-w-xl">
        <p className="text-[16px] font-semibold text-zinc-500">
          {row.title}
        </p>

        <p className="mt-1 text-xs text-zinc-500">
          {row.description}
        </p>
      </div>

      <span className="shrink-0 lg:absolute lg:left-1/2 lg:translate-x-2.5">
        <ToggleSwitch checked={checked} onChange={setChecked} />
      </span>
    </div>
  );
}

export interface AppSettingsLabels {
  sectionTitle: string;
  sectionSubtitle: string;

  storeStatus: {
    title: string;
    description: string;
    options: {
      value: string;
      label: string;
    }[];
  };

  employeeAssignment: {
    title: string;
    description: string;
  };

  checkProduct: {
    title: string;
    description: string;
    options: {
      value: string;
      label: string;
    }[];
  };

  deliveryOfRepresentatives: {
    title: string;
    description: string;
  };
}

export interface StatusMappingLabels {
  title: string;
  subtitle: string;
  defaultButton: string;
  syncStatusButton: string;

  columns: {
    zidStatus: string;
    storeStatus: string;
    status: string;
  };

  empty: string;
  save: string;
}

export interface WarehousePriorityRow {
  id: string;
  warehouseName: string;
  active: boolean;
}

export interface WarehousePriorityLabels {
  title: string;
  subtitle: string;

  columns: {
    priority: string;
    warehouse: string;
    active: string;
  };

  layerUnit: string;
}

/* =========================================================
   WAREHOUSE PRIORITY ROW
========================================================= */

function WarehousePriorityRowItem({
  row,
  index,
  layerUnit,
  isDragging,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: {
  row: WarehousePriorityRow;
  index: number;
  layerUnit: string;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
}) {
  const [active, setActive] = useState(row.active);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      dir="ltr"
      className={cn(
        "grid min-h-[52px] cursor-grab grid-cols-[42px_88px_minmax(0,1fr)_52px] items-center rounded-[7px] bg-[#FAFAFC] px-2 text-[9px] transition-opacity active:cursor-grabbing",

        "@[400px]:grid-cols-[46px_96px_minmax(0,1fr)_56px] @[400px]:text-[10px]",

        "@[500px]:grid-cols-[50px_110px_minmax(0,1fr)_60px] @[500px]:px-3 @[500px]:text-xs",

        "@[650px]:grid-cols-[60px_145px_minmax(0,1fr)_64px] @[650px]:px-4 @[650px]:text-sm",

        "@[900px]:grid-cols-[80px_180px_minmax(0,1fr)_70px] @[900px]:px-5",

        isDragging && "opacity-40"
      )}
    >
      {/* Priority Icon */}
      <div
        className="
          flex
          min-w-0
          items-center
          justify-center

          @[900px]:justify-start
          @[900px]:pl-4
        "
      >
        <Menu className="h-4 w-4 shrink-0 text-zinc-700" />
      </div>

      {/* Layer */}
      <div
        className="
          min-w-0

          translate-x-5

          overflow-hidden
          text-ellipsis
          whitespace-nowrap

          font-medium
          text-zinc-700

          @[400px]:translate-x-6

          @[500px]:translate-x-6

          @[650px]:translate-x-8

          @[900px]:translate-x-0
        "
      >
        {index + 1} {layerUnit}
      </div>

      {/* Warehouse Name */}
      <div
        dir="rtl"
        title={row.warehouseName}
        className="
          min-w-0
          overflow-hidden
          text-ellipsis
          whitespace-nowrap

          px-1
          text-center
          font-medium
          text-zinc-700

          @[900px]:-translate-x-60
          @[900px]:px-0
        "
      >
        {row.warehouseName}
      </div>

      {/* Toggle */}
      <div
        onMouseDown={(event) => event.stopPropagation()}
        className="
          flex
          min-w-0
          items-center
          justify-center

          @[900px]:w-[70px]
          @[900px]:-translate-x-120
          @[900px]:justify-start
        "
      >
        <ToggleSwitch
          checked={active}
          onChange={setActive}
        />
      </div>
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export function DqqSettingsView({
  title,
  tabs,
  labels,
  ordersRows,
  ordersWorkflow,
  appSettingsLabels,
  statusMappingLabels,
  storeNameEn,
  storeNameAr,
  warehousePriorityLabels,
  warehousePriorityRows,
}: {
  title: string;

  tabs: {
    id: TabId;
    label: string;
  }[];

  labels: {
    newNotify: string;
    reparingNotify: string;
    readyNotify: string;
    daysNotify: string;
    submit: string;
    comingSoon: string;
  };

  ordersRows: OrdersSettingRow[];

  ordersWorkflow: {
    title: string;
    description: string;
  };

  appSettingsLabels: AppSettingsLabels;

  statusMappingLabels: StatusMappingLabels;

  storeNameEn: string;
  storeNameAr: string;

  warehousePriorityLabels: WarehousePriorityLabels;

  warehousePriorityRows: WarehousePriorityRow[];
}) {
  const [activeTab, setActiveTab] =
    useState<TabId>("notification");

  const [newNotify, setNewNotify] = useState(true);

  const [reparingNotify, setReparingNotify] = useState(true);

  const [readyNotify, setReadyNotify] = useState(true);

  const [days, setDays] = useState("1");

  const [storeStatus, setStoreStatus] = useState(
    appSettingsLabels.storeStatus.options[0]?.value ?? ""
  );

  const [employeeAssignment, setEmployeeAssignment] =
    useState(false);

  const [checkProduct, setCheckProduct] = useState(
    appSettingsLabels.checkProduct.options[0]?.value ?? ""
  );

  const [
    deliveryOfRepresentatives,
    setDeliveryOfRepresentatives,
  ] = useState(true);

  const [storeNameLocale, setStoreNameLocale] =
    useState<"en" | "ar">("en");

  const [priorityRows, setPriorityRows] = useState(warehousePriorityRows);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  function moveDraggedRowTo(targetIndex: number) {
    setPriorityRows((prev) => {
      if (draggedIndex === null || draggedIndex === targetIndex) return prev;
      const next = [...prev];
      const [moved] = next.splice(draggedIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    setDraggedIndex(targetIndex);
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 sm:gap-5 lg:gap-6">

      {/* Page Title */}
      <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">
        {title}
      </h1>

      <Card className="min-w-0 p-2 sm:p-3 md:p-4 lg:p-5">

        {/* =====================================================
            TABS
        ===================================================== */}

        <div className="scrollbar-none flex max-w-full items-center gap-1 overflow-x-auto scroll-smooth rounded-pill bg-zinc-100 p-1 sm:p-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={(event) => {
                setActiveTab(tab.id);

                event.currentTarget.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }}
              className={cn(
                "shrink-0 rounded-pill px-2.5 py-2 text-xs font-medium whitespace-nowrap transition-colors sm:px-3 sm:py-2.5 sm:text-sm lg:flex-1",

                activeTab === tab.id
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* =====================================================
            NOTIFICATION
        ===================================================== */}

        {activeTab === "notification" ? (
          <div className="mt-2">

            <div className="relative flex items-start justify-between gap-3 border-b border-zinc-100 py-5 sm:py-6 lg:items-center lg:py-8">
              <span className="text-sm font-medium text-zinc-500 sm:text-[16px]">
                {labels.newNotify}
              </span>

              <span className="shrink-0 lg:absolute lg:left-1/2 lg:translate-x-2.5">
                <ToggleSwitch
                  checked={newNotify}
                  onChange={setNewNotify}
                />
              </span>
            </div>

            <div className="relative flex items-start justify-between gap-3 border-b border-zinc-100 py-5 sm:py-6 lg:items-center lg:py-8">
              <span className="text-sm font-medium text-zinc-500 sm:text-[16px]">
                {labels.reparingNotify}
              </span>

              <span className="shrink-0 lg:absolute lg:left-1/2 lg:translate-x-2.5">
                <ToggleSwitch
                  checked={reparingNotify}
                  onChange={setReparingNotify}
                />
              </span>
            </div>

            <div className="relative flex items-start justify-between gap-3 border-b border-zinc-100 py-5 sm:py-6 lg:items-center lg:py-8">
              <span className="text-sm font-medium text-zinc-500 sm:text-[16px]">
                {labels.readyNotify}
              </span>

              <span className="shrink-0 lg:absolute lg:left-1/2 lg:translate-x-2.5">
                <ToggleSwitch
                  checked={readyNotify}
                  onChange={setReadyNotify}
                />
              </span>
            </div>

            <div className="relative flex flex-col items-stretch gap-3 py-5 sm:flex-row sm:items-center sm:py-6 lg:py-8">
              <span className="shrink-0 text-sm font-medium text-zinc-500 sm:text-[16px]">
                {labels.daysNotify}
              </span>

              <input
                type="number"
                min={1}
                value={days}
                onChange={(event) =>
                  setDays(event.target.value)
                }
                className="
                  h-11
                  w-full
                  rounded-lg
                  border
                  border-zinc-200
                  px-3
                  text-sm
                  text-zinc-700

                  focus:ring-2
                  focus:ring-primary-100
                  focus:outline-none

                  sm:ml-auto
                  sm:w-40

                  lg:absolute
                  lg:left-[50%]
                  lg:right-0
                  lg:ml-0
                  lg:w-auto
                "
              />
            </div>

            <div className="flex justify-end pt-5 sm:pt-7 lg:pt-9">
              <button
                type="button"
                className="w-full rounded-lg bg-primary px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-600 sm:w-auto sm:px-12"
              >
                {labels.submit}
              </button>
            </div>

          </div>

        ) : activeTab === "orders" ? (

          /* =====================================================
              ORDERS
          ===================================================== */

          <div className="mt-2">

            {ordersRows.map((row) => (
              <OrdersSettingsToggleRow
                key={row.id}
                row={row}
              />
            ))}

            <div className="py-5">
              <p className="text-sm font-semibold text-zinc-900">
                {ordersWorkflow.title}
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                {ordersWorkflow.description}
              </p>
            </div>

          </div>

        ) : activeTab === "app" ? (

          /* =====================================================
              APP SETTINGS
          ===================================================== */

          <div className="mt-4">

            <div className="rounded-2xl border border-zinc-100">

              <div className="border-b border-zinc-100 px-3 py-4 sm:px-5">
                <p className="text-sm font-semibold text-zinc-900">
                  {appSettingsLabels.sectionTitle}
                </p>

                <p className="mt-1 text-xs text-zinc-400">
                  {appSettingsLabels.sectionSubtitle}
                </p>
              </div>

              <div className="px-3 sm:px-5">

                <AppSettingsRadioRow
                  title={
                    appSettingsLabels.storeStatus.title
                  }
                  description={
                    appSettingsLabels.storeStatus.description
                  }
                  options={
                    appSettingsLabels.storeStatus.options
                  }
                  value={storeStatus}
                  onChange={setStoreStatus}
                />

                <AppSettingsToggleRow
                  title={
                    appSettingsLabels.employeeAssignment.title
                  }
                  description={
                    appSettingsLabels.employeeAssignment.description
                  }
                  checked={employeeAssignment}
                  onChange={setEmployeeAssignment}
                />

              </div>
            </div>

            <AppSettingsRadioRow
              title={appSettingsLabels.checkProduct.title}
              description={
                appSettingsLabels.checkProduct.description
              }
              options={appSettingsLabels.checkProduct.options}
              value={checkProduct}
              onChange={setCheckProduct}
            />

            <AppSettingsToggleRow
              title={
                appSettingsLabels.deliveryOfRepresentatives.title
              }
              description={
                appSettingsLabels.deliveryOfRepresentatives.description
              }
              checked={deliveryOfRepresentatives}
              onChange={setDeliveryOfRepresentatives}
            />

          </div>

        ) : activeTab === "statusMapping" ? (

          /* =====================================================
              STATUS MAPPING
          ===================================================== */

          <div className="mt-4">

            <div className="mx-0 overflow-hidden rounded-2xl border border-zinc-100 lg:mx-2">

              <div className="flex flex-col gap-3 px-3 py-4 sm:px-4 md:flex-row md:flex-wrap md:items-center md:justify-between lg:px-5">

                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {statusMappingLabels.title}
                  </p>

                  <p className="mt-1 text-xs text-zinc-400">
                    {statusMappingLabels.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">

                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-[10%] bg-zinc-100 px-2.5 py-2 text-[11px] font-medium text-zinc-600 transition-colors hover:bg-zinc-200 sm:px-3 sm:text-xs"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />

                    {statusMappingLabels.defaultButton}
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-[10%] border border-warning/40 bg-white px-2.5 py-1.5 text-[11px] font-medium text-warning text-shadow-sm ring-1 ring-orange-400/15 transition-colors hover:bg-warning-bg sm:px-3 sm:text-xs"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />

                    {statusMappingLabels.syncStatusButton}
                  </button>

                  <div className="flex max-w-full items-center gap-1 rounded-lg bg-stone-100 px-1.5 py-1.5 sm:px-2 sm:py-2">

                    <button
                      type="button"
                      onClick={() =>
                        setStoreNameLocale("en")
                      }
                      className={cn(
                        "min-w-0 flex-1 rounded-lg px-2 py-2 text-center text-[11px] font-medium transition-colors sm:w-24 sm:flex-none sm:px-3 sm:py-2.5 sm:text-xs lg:w-28 lg:px-4",

                        storeNameLocale === "en"
                          ? "bg-white text-zinc-700 shadow-sm"
                          : "text-zinc-500 hover:text-zinc-700"
                      )}
                    >
                      {storeNameEn}
                    </button>

                    <button
                      type="button"
                      dir="rtl"
                      onClick={() =>
                        setStoreNameLocale("ar")
                      }
                      className={cn(
                        "min-w-0 flex-1 rounded-lg px-2 py-2 text-center text-[11px] font-medium transition-colors sm:w-24 sm:flex-none sm:px-3 sm:py-2.5 sm:text-xs lg:w-28 lg:px-4",

                        storeNameLocale === "ar"
                          ? "bg-white text-zinc-700 shadow-sm"
                          : "text-zinc-500 hover:text-zinc-700"
                      )}
                    >
                      {storeNameAr}
                    </button>

                  </div>

                </div>

              </div>

              <div className="mx-3 border-b border-zinc-100" />

              <div className="mx-2 mt-3 grid grid-cols-3 gap-2 rounded-lg bg-primary-50 px-3 py-3 text-[10px] font-semibold text-zinc-700 sm:mx-3 sm:gap-3 sm:px-5 sm:text-xs">

                <span>
                  {statusMappingLabels.columns.zidStatus}
                </span>

                <span>
                  {statusMappingLabels.columns.storeStatus}
                </span>

                <span>
                  {statusMappingLabels.columns.status}
                </span>

              </div>

              <p className="mx-3 px-3 py-8 text-center text-xs text-zinc-400 sm:px-5 sm:py-10 sm:text-sm">
                {statusMappingLabels.empty}
              </p>

            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-lg bg-primary/40 px-10 py-2.5 text-sm font-medium text-white sm:w-auto"
              >
                {statusMappingLabels.save}
              </button>
            </div>

          </div>

        ) : activeTab === "warehousePriority" ? (

          /* =====================================================
              WAREHOUSE PRIORITY
          ===================================================== */

          <div className="@container mt-4 min-w-0">

            <div
              className="
                min-w-0
                overflow-hidden
                rounded-[10px]
                border
                border-[#E2E5E8]
                bg-white
                px-2
                pb-3

                @[500px]:px-3
              "
            >

              {/* Title */}
              <div className="px-1 py-4 @[500px]:px-2 @[500px]:pb-5">

                <p className="text-sm font-medium text-[#5E6268] @[500px]:text-[16px]">
                  {warehousePriorityLabels.title}
                </p>

                <p className="mt-1 text-[11px] leading-5 text-[#8A8F96] @[500px]:text-[13px]">
                  {warehousePriorityLabels.subtitle}
                </p>

              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[#ECEDEF]" />

              {/* =================================================
                  TABLE HEADER
              ================================================= */}

              <div
                dir="ltr"
                className="
                  mt-3
                  grid
                  min-h-[34px]

                  grid-cols-[42px_88px_minmax(0,1fr)_52px]

                  @[400px]:grid-cols-[46px_96px_minmax(0,1fr)_56px]

                  @[500px]:grid-cols-[50px_110px_minmax(0,1fr)_60px]

                  @[650px]:grid-cols-[60px_145px_minmax(0,1fr)_64px]

                  @[900px]:grid-cols-[80px_180px_minmax(0,1fr)_70px]

                  items-center
                  rounded-[7px]
                  bg-[#EAF8F0]

                  px-2

                  text-[8px]
                  font-medium
                  text-[#646A70]

                  @[400px]:text-[9px]

                  @[500px]:px-3
                  @[500px]:text-[10px]

                  @[650px]:px-4
                  @[650px]:text-xs

                  @[900px]:px-5
                  @[900px]:text-[13px]
                "
              >

                {/* Priority */}
                <span
                  className="
                    min-w-0
                    translate-x-0!
                    lg:-translate-x-5!
                    overflow-hidden
                    text-center
                    whitespace-nowrap

                    @[500px]:translate-x-0

                    @[900px]:pl-4
                    @[900px]:text-left
                  "
                >
                  {warehousePriorityLabels.columns.priority}
                </span>

                {/* Warehouse */}
                <span
                  className="
                    min-w-0

                    translate-x-5

                    overflow-hidden
                    text-ellipsis
                    whitespace-nowrap

                    @[400px]:translate-x-6

                    @[500px]:translate-x-6

                    @[650px]:translate-x-8

                    @[900px]:translate-x-0
                  "
                >
                  {warehousePriorityLabels.columns.warehouse}
                </span>

                {/* Active */}
                <span
                  className="
                    min-w-0
                    overflow-hidden
                    text-center
                    whitespace-nowrap

                    @[900px]:-translate-x-60
                  "
                >
                  {warehousePriorityLabels.columns.active}
                </span>

                {/* Toggle column */}
                <span />

              </div>

              {/* =================================================
                  ROWS
              ================================================= */}

              <div className="mt-3 flex min-w-0 flex-col gap-[9px]">

                {priorityRows.map(
                  (row, index) => (
                    <WarehousePriorityRowItem
                      key={row.id}
                      row={row}
                      index={index}
                      layerUnit={
                        warehousePriorityLabels.layerUnit
                      }
                      isDragging={draggedIndex === index}
                      onDragStart={() => setDraggedIndex(index)}
                      onDragEnter={() => {
                        if (draggedIndex !== null && draggedIndex !== index) {
                          moveDraggedRowTo(index);
                        }
                      }}
                      onDragEnd={() => setDraggedIndex(null)}
                    />
                  )
                )}

              </div>

            </div>

          </div>

        ) : (

          <p className="py-10 text-center text-sm text-zinc-400">
            {labels.comingSoon}
          </p>

        )}

      </Card>
    </div>
  );
}