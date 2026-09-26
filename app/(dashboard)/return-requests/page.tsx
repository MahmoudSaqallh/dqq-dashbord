import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { ReturnRequestsView } from "@/components/return-requests/ReturnRequestsView";
import {
  RETURN_REQUESTS_TOTAL,
  RETURN_REQUEST_STATUS_COUNTS,
  RETURN_REQUEST_ROWS,
} from "@/lib/mock/return-requests";
import { RETURN_REQUEST_STATUS_TONE } from "@/lib/utils/status-colors";
import type { ReturnRequestStatus } from "@/lib/mock/types";

const STATUS_ORDER: ReturnRequestStatus[] = [
  "draft",
  "awaiting_inspection",
  "pending_decision",
  "in_repair",
  "in_repackaging",
  "returning_to_customer",
  "closed",
  "cancelled",
];

export default async function ReturnRequestsPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const summaryItems = STATUS_ORDER.map((status) => ({
    id: status,
    label: t(`status.returnRequest.${status}`),
    count: RETURN_REQUEST_STATUS_COUNTS[status],
    tone: RETURN_REQUEST_STATUS_TONE[status],
  }));

  const rows = RETURN_REQUEST_ROWS.map((row) => ({
    id: row.id,
    returnId: row.returnId,
    orderNo: row.orderNo,
    customerName: row.customerName,
    customerPhone: row.customerPhone,
    productsCount: row.productsCount,
    returnDateDisplay: row.returnDateDisplay,
    totalReturnDisplay: row.totalReturn.amount.toFixed(2),
    status: { label: t(`status.returnRequest.${row.status}`), tone: RETURN_REQUEST_STATUS_TONE[row.status] },
  }));

  return (
    <ReturnRequestsView
      title={t("returnRequestsPage.title")}
      allReturnsLabel={t("returnRequestsPage.allReturns")}
      total={RETURN_REQUESTS_TOTAL}
      summaryItems={summaryItems}
      searchPlaceholder={t("returnRequestsPage.searchPlaceholder")}
      filtersLabel={t("returnRequestsPage.filters")}
      statusFilterLabel={t("returnRequestsPage.columns.status")}
      statusFilterOptions={STATUS_ORDER.map((status) => t(`status.returnRequest.${status}`))}
      refreshLabel={t("returnRequestsPage.refresh")}
      exportLabel={t("returnRequestsPage.export")}
      columns={{
        returnId: t("returnRequestsPage.columns.returnId"),
        orderNo: t("returnRequestsPage.columns.orderNo"),
        customer: t("returnRequestsPage.columns.customer"),
        products: t("returnRequestsPage.columns.products"),
        returnDate: t("returnRequestsPage.columns.returnDate"),
        totalReturn: t("returnRequestsPage.columns.totalReturn"),
        status: t("returnRequestsPage.columns.status"),
        action: t("returnRequestsPage.columns.action"),
      }}
      rows={rows}
      emptyDateLabel={t("returnRequestsPage.emptyDate")}
      showingLabel={t("returnRequestsPage.showing")}
      ofLabel={t("returnRequestsPage.of")}
      entriesLabel={t("returnRequestsPage.entries")}
    />
  );
}
