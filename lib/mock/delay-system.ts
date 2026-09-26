import type { DelaySystemSummary } from "./types";

export const DELAY_SYSTEM_SUMMARY: DelaySystemSummary = {
  totalOrders: 4,
  totalOrdersDeltaCount: 0,
  totalOrdersDeltaPercent: 0,
  stats: [
    {
      id: "averageDelayTime",
      icon: "clock",
      value: 0,
      unit: "Min",
      deltaValue: 0,
      deltaUp: false,
      percent: 0,
      label: "Average Delay Time",
    },
    {
      id: "delayedOrders",
      icon: "package",
      value: 0,
      unit: "Orders",
      deltaValue: 0,
      deltaUp: false,
      percent: 0,
      label: "Delayed Orders",
    },
    {
      id: "onTimeShipmentRate",
      icon: "packageCheck",
      value: 4,
      unit: "Orders",
      deltaValue: -20,
      deltaUp: true,
      percent: 100,
      label: "On-Time Shipment Rate (OTS)",
    },
  ],
};
