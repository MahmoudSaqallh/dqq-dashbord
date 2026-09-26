import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { RepackagingView } from "@/components/return-requests/repackaging/RepackagingView";
import {
  REPACKAGING_TICKETS_TOTAL,
  REPACKAGING_TICKET_STATUS_COUNTS,
  REPACKAGING_TICKET_ROWS,
} from "@/lib/mock/repackaging";
import { REPACKAGING_TICKET_STATUS_TONE } from "@/lib/utils/status-colors";
import type { RepackagingTicketStatus } from "@/lib/mock/types";

const STATUS_ORDER: RepackagingTicketStatus[] = ["queued", "in_repackaging", "done"];

export default async function ReturnRequestsRepackagingPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const summaryItems = STATUS_ORDER.map((status) => ({
    id: status,
    label: t(`status.repackagingTicket.${status}`),
    count: REPACKAGING_TICKET_STATUS_COUNTS[status],
    tone: REPACKAGING_TICKET_STATUS_TONE[status],
  }));

  const statusOptions = STATUS_ORDER.map((status) => ({
    value: status,
    label: t(`status.repackagingTicket.${status}`),
  }));

  const rows = REPACKAGING_TICKET_ROWS.map((row) => ({
    id: row.id,
    ticketNo: row.ticketNo,
    productName: row.productName,
    productSku: row.productSku,
    orderNo: row.orderNo,
    returnRequestId: row.returnRequestId,
    warehouse: row.warehouse,
    assignee: row.assignee,
    startedAtDisplay: row.startedAtDisplay,
    finishedAtDisplay: row.finishedAtDisplay,
    status: { label: t(`status.repackagingTicket.${row.status}`), tone: REPACKAGING_TICKET_STATUS_TONE[row.status] },
  }));

  return (
    <RepackagingView
      title={t("returnRequestsRepackagingPage.title")}
      allTicketsLabel={t("returnRequestsRepackagingPage.allTickets")}
      total={REPACKAGING_TICKETS_TOTAL}
      summaryItems={summaryItems}
      searchPlaceholder={t("returnRequestsRepackagingPage.searchPlaceholder")}
      statusPlaceholder={t("returnRequestsRepackagingPage.statusPlaceholder")}
      statusOptions={statusOptions}
      refreshLabel={t("returnRequestsRepackagingPage.refresh")}
      exportLabel={t("returnRequestsRepackagingPage.export")}
      columns={{
        ticketNo: t("returnRequestsRepackagingPage.columns.ticketNo"),
        product: t("returnRequestsRepackagingPage.columns.product"),
        order: t("returnRequestsRepackagingPage.columns.order"),
        returnRequest: t("returnRequestsRepackagingPage.columns.returnRequest"),
        warehouse: t("returnRequestsRepackagingPage.columns.warehouse"),
        assignee: t("returnRequestsRepackagingPage.columns.assignee"),
        startedAt: t("returnRequestsRepackagingPage.columns.startedAt"),
        finishedAt: t("returnRequestsRepackagingPage.columns.finishedAt"),
        status: t("returnRequestsRepackagingPage.columns.status"),
        action: t("returnRequestsRepackagingPage.columns.action"),
      }}
      rows={rows}
      emptyValueLabel={t("returnRequestsRepackagingPage.emptyValue")}
      showingLabel={t("returnRequestsRepackagingPage.showing")}
      ofLabel={t("returnRequestsRepackagingPage.of")}
      entriesLabel={t("returnRequestsRepackagingPage.entries")}
    />
  );
}
