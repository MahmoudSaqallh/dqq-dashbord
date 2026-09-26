import type { WalletRow } from "./types";

export const WALLET_SUMMARY = {
  totalWallets: 3,
  totalBalance: 1020.0,
  totalOnHold: 0.0,
  transactionsThisMonth: 11,
};

export const WALLET_LIST: WalletRow[] = [
  {
    id: "1",
    rowNumber: 1,
    customerName: "Abderhman store",
    customerSubtitle: "Abderhman store",
    availableBalance: 250.0,
    onHoldBalance: 0.0,
    totalBalance: 250.0,
    autoTopUp: "disabled",
    lastTransactionLabel: "Top Up",
    lastTransactionDisplay: "29/07/2026 - 12:09 pm",
    status: "active",
  },
  {
    id: "2",
    rowNumber: 2,
    customerName: "dqqapp",
    customerSubtitle: "dqqapp",
    availableBalance: 750.0,
    onHoldBalance: 0.0,
    totalBalance: 750.0,
    autoTopUp: "enabled",
    lastTransactionLabel: "Top Up",
    lastTransactionDisplay: "23/07/2026 - 03:38 pm",
    status: "active",
  },
];
