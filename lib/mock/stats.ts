import { Package, CheckCircle2, Headset, AlertCircle } from "lucide-react";
import type { StatCardData } from "./types";

export const STAT_CARDS: StatCardData[] = [
  { id: "ready", labelKey: "stats.readyOrders", value: 669, icon: Package, tone: "success" },
  { id: "processed", labelKey: "stats.processedOrders", value: 0, icon: CheckCircle2, tone: "success" },
  { id: "remaining", labelKey: "stats.remainingOrders", value: 0, icon: Headset, tone: "warning" },
  { id: "late", labelKey: "stats.lateOrders", value: 0, icon: AlertCircle, tone: "danger" },
];
