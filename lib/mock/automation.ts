import type { AutomationRow } from "./types";

export const AUTOMATION_ROWS: AutomationRow[] = [
  {
    id: "1",
    rowNumber: 1,
    name: "dad",
    storeStatusLabel: "New",
    restrictions: ["Delivery Companies"],
    events: ["Hide in App"],
    createdAtDisplay: "2025-10-26 18:17:07",
    enabled: false,
  },
  {
    id: "2",
    rowNumber: 2,
    name: "ccc",
    storeStatusLabel: "New",
    restrictions: ["Cities", "Countries"],
    events: ["Hide in App"],
    createdAtDisplay: "2025-10-26 18:11:57",
    enabled: false,
  },
  {
    id: "3",
    rowNumber: 3,
    name: "تحويل الطلبات الي جاري تجهيز",
    storeStatusLabel: "New",
    restrictions: ["Countries", "is paid"],
    events: ["Change Status"],
    createdAtDisplay: "2025-05-20 13:11:11",
    enabled: false,
  },
];
