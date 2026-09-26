import { Folder, Wallet as WalletIcon, PauseCircle, ArrowLeftRight } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { Card } from "@/components/ui/Card";
import { RefreshButton } from "@/components/dashboard/RefreshButton";
import { WalletStatCard } from "@/components/wallet/WalletStatCard";
import { WalletFiltersSection } from "@/components/wallet/WalletFiltersSection";
import { WalletTable } from "@/components/wallet/WalletTable";
import { WALLET_SUMMARY, WALLET_LIST } from "@/lib/mock/wallet";
import { AUTO_TOPUP_TONE, WALLET_STATUS_TONE } from "@/lib/utils/status-colors";

function formatCurrency(amount: number) {
  return `${amount.toFixed(2)} SAR`;
}

export default async function WalletPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const filterOptions = dict.walletPage.filterOptions;
  const filters = [
    { label: t("walletPage.filterCustomer"), options: filterOptions.customer },
    { label: t("walletPage.filterLastTransaction"), options: filterOptions.lastTransaction },
  ];

  const rows = WALLET_LIST.map((row) => ({
    id: row.id,
    rowNumber: row.rowNumber,
    customerName: row.customerName,
    customerSubtitle: row.customerSubtitle,
    availableBalanceDisplay: formatCurrency(row.availableBalance),
    onHoldBalanceDisplay: formatCurrency(row.onHoldBalance),
    totalBalanceDisplay: formatCurrency(row.totalBalance),
    autoTopUp: { label: t(`status.autoTopUp.${row.autoTopUp}`), tone: AUTO_TOPUP_TONE[row.autoTopUp] },
    lastTransactionLabel: row.lastTransactionLabel,
    lastTransactionDisplay: row.lastTransactionDisplay,
    status: { label: t(`status.wallet.${row.status}`), tone: WALLET_STATUS_TONE[row.status] },
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-zinc-900">{t("walletPage.title")}</h1>
        <div className="flex items-center gap-2.5">
          <RefreshButton label={t("walletPage.refresh")} />
          <button
            type="button"
            className="inline-flex h-9 items-center whitespace-nowrap rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            {t("walletPage.auditLogs")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <WalletStatCard
          icon={Folder}
          label={t("walletPage.stats.totalWallets")}
          value={WALLET_SUMMARY.totalWallets}
          tone="info"
        />
        <WalletStatCard
          icon={WalletIcon}
          label={t("walletPage.stats.totalBalance")}
          value={formatCurrency(WALLET_SUMMARY.totalBalance)}
          tone="success"
        />
        <WalletStatCard
          icon={PauseCircle}
          label={t("walletPage.stats.totalOnHold")}
          value={formatCurrency(WALLET_SUMMARY.totalOnHold)}
          tone="warning"
        />
        <WalletStatCard
          icon={ArrowLeftRight}
          label={t("walletPage.stats.transactionsThisMonth")}
          value={WALLET_SUMMARY.transactionsThisMonth}
          tone="purple"
        />
      </div>

      <Card>
        <WalletFiltersSection
          searchPlaceholder={t("walletPage.searchPlaceholder")}
          dateRangePresetLabels={dict.common.dateRangePicker.presets}
          dateRangeCancelLabel={t("common.dateRangePicker.cancel")}
          dateRangeApplyLabel={t("common.dateRangePicker.apply")}
          filtersLabel={t("walletPage.filters")}
          exportLabel={t("walletPage.export")}
          filters={filters}
        />
        <WalletTable
          columns={{
            rowNumber: t("walletPage.columns.rowNumber"),
            customer: t("walletPage.columns.customer"),
            availableBalance: t("walletPage.columns.availableBalance"),
            onHold: t("walletPage.columns.onHold"),
            totalBalance: t("walletPage.columns.totalBalance"),
            autoTopUp: t("walletPage.columns.autoTopUp"),
            lastTransaction: t("walletPage.columns.lastTransaction"),
            status: t("walletPage.columns.status"),
            action: t("walletPage.columns.action"),
          }}
          rows={rows}
          showingLabel={t("walletPage.showing")}
          ofLabel={t("walletPage.of")}
          entriesLabel={t("walletPage.entries")}
        />
      </Card>
    </div>
  );
}
