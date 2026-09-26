import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { RepairView } from "@/components/return-requests/repair/RepairView";
import { REPAIR_TICKETS_TOTAL, REPAIR_TICKET_STATUS_COUNTS, REPAIR_TICKET_ROWS } from "@/lib/mock/repair";
import { REPAIR_TICKET_STATUS_TONE } from "@/lib/utils/status-colors";
import type { RepairTicketStatus } from "@/lib/mock/types";

const STATUS_ORDER: RepairTicketStatus[] = ["queued", "in_repair", "done", "failed"];

export default async function ReturnRequestsRepairPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const summaryItems = STATUS_ORDER.map((status) => ({
    id: status,
    label: t(`status.repairTicket.${status}`),
    count: REPAIR_TICKET_STATUS_COUNTS[status],
    tone: REPAIR_TICKET_STATUS_TONE[status],
  }));

  const statusOptions = STATUS_ORDER.map((status) => ({
    value: status,
    label: t(`status.repairTicket.${status}`),
  }));

  const rows = REPAIR_TICKET_ROWS.map((row) => ({
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
    costDisplay: row.cost ? row.cost.amount.toFixed(2) : null,
    status: {
      label: t(`status.repairTicket.${row.status}`),
      tone: REPAIR_TICKET_STATUS_TONE[row.status],
      suffix: row.statusSuffix,
    },
  }));

  return (
    <RepairView
      title={t("returnRequestsRepairPage.title")}
      infoMessage={t("returnRequestsRepairPage.infoMessage")}
      infoLinkLabel={t("returnRequestsRepairPage.infoLinkLabel")}
      allTicketsLabel={t("returnRequestsRepairPage.allTickets")}
      total={REPAIR_TICKETS_TOTAL}
      summaryItems={summaryItems}
      searchPlaceholder={t("returnRequestsRepairPage.searchPlaceholder")}
      statusPlaceholder={t("returnRequestsRepairPage.statusPlaceholder")}
      statusOptions={statusOptions}
      refreshLabel={t("returnRequestsRepairPage.refresh")}
      exportLabel={t("returnRequestsRepairPage.export")}
      columns={{
        ticketNo: t("returnRequestsRepairPage.columns.ticketNo"),
        product: t("returnRequestsRepairPage.columns.product"),
        order: t("returnRequestsRepairPage.columns.order"),
        returnRequest: t("returnRequestsRepairPage.columns.returnRequest"),
        warehouse: t("returnRequestsRepairPage.columns.warehouse"),
        assignee: t("returnRequestsRepairPage.columns.assignee"),
        startedAt: t("returnRequestsRepairPage.columns.startedAt"),
        finishedAt: t("returnRequestsRepairPage.columns.finishedAt"),
        cost: t("returnRequestsRepairPage.columns.cost"),
        status: t("returnRequestsRepairPage.columns.status"),
        action: t("returnRequestsRepairPage.columns.action"),
      }}
      rows={rows}
      emptyValueLabel={t("returnRequestsRepairPage.emptyValue")}
      showingLabel={t("returnRequestsRepairPage.showing")}
      ofLabel={t("returnRequestsRepairPage.of")}
      entriesLabel={t("returnRequestsRepairPage.entries")}
    />
  );
}
