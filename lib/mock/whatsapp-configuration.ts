import type { WhatsAppConnectionInfo, WhatsAppTemplateRow } from "./types";

export const WHATSAPP_CONNECTION_INFO: WhatsAppConnectionInfo = {
  status: "connected",
  phoneNumberId: "1029033956963478",
  displayPhoneNumber: "+1 555-912-7260",
  businessAccountId: "2508566236261043",
  createdAtDisplay: "2026-03-18 14:18:19",
};

export const WHATSAPP_TEMPLATE_ROWS: WhatsAppTemplateRow[] = [
  {
    id: "1",
    rowNumber: 1,
    name: "orders_utility",
    category: "UTILITY",
    language: "en",
    createdAtDisplay: "2026-03-28 19:24:57",
    status: "approved",
  },
  {
    id: "2",
    rowNumber: 2,
    name: "tesst1",
    category: "MARKETING",
    language: "en",
    createdAtDisplay: "2026-03-18 23:42:15",
    status: "approved",
  },
  {
    id: "3",
    rowNumber: 3,
    name: "test",
    category: "MARKETING",
    language: "en",
    createdAtDisplay: "2026-03-18 22:32:08",
    status: "approved",
  },
];
