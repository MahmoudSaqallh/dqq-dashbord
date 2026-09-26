import type { OrderStatusTab } from "./types";

export const ORDER_STATUS_TABS: OrderStatusTab[] = [
  { id: "all", labelKey: "ordersPage.tabs.all", count: 738995 },
  { id: "new", labelKey: "ordersPage.tabs.new", count: 20341 },
  { id: "hold", labelKey: "ordersPage.tabs.hold", count: 2 },
  { id: "to_process", labelKey: "ordersPage.tabs.toProcess", count: 920 },
  { id: "shipping", labelKey: "ordersPage.tabs.shipping", count: 18047 },
  { id: "completed", labelKey: "ordersPage.tabs.completed", count: 669808 },
  { id: "cancelled", labelKey: "ordersPage.tabs.cancelled", count: 26118 },
  { id: "return_in_progress", labelKey: "ordersPage.tabs.returnInProgress", count: 2149 },
  { id: "returned", labelKey: "ordersPage.tabs.returned", count: 1498 },
];
