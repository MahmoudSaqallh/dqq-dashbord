import type {
  AutoTopUpStatus,
  DqqStatusCode,
  EmployeeStatus,
  PaymentStatus,
  PickingStatusCode,
  PrinterDeviceStatus,
  PurchaseOrderStatus,
  RepackagingTicketStatus,
  RepairTicketStatus,
  ReturnRequestStatus,
  StoreStatusCode,
  SubscriptionStatus,
  TagStatus,
  TransferPriority,
  TransferReceiverStatus,
  TransferSenderStatus,
  WalletStatus,
  WaybillType,
  WhatsAppConnectionStatus,
  WhatsAppTemplateStatus,
} from "@/lib/mock/types";

export type StatusTone = "info" | "success" | "warning" | "danger" | "maroon" | "neutral";

export const DQQ_STATUS_TONE: Record<DqqStatusCode, StatusTone> = {
  ready_to_shipping: "info",
  returned: "maroon",
  delivered: "success",
  pending: "neutral",
  cancelled: "danger",
};

export const STORE_STATUS_TONE: Record<StoreStatusCode, StatusTone> = {
  processing_reverse: "warning",
  reversed: "maroon",
  delivered: "success",
  pending: "neutral",
};

export const PAYMENT_STATUS_TONE: Record<PaymentStatus, StatusTone> = {
  unpaid: "danger",
  paid: "success",
};

export const PICKING_STATUS_TONE: Record<PickingStatusCode, StatusTone> = {
  in_progress: "warning",
  picked: "success",
  assigned: "info",
};

export const AUTO_TOPUP_TONE: Record<AutoTopUpStatus, StatusTone> = {
  enabled: "success",
  disabled: "neutral",
};

export const WALLET_STATUS_TONE: Record<WalletStatus, StatusTone> = {
  active: "success",
  inactive: "neutral",
};

export const WAYBILL_TYPE_TONE: Record<WaybillType, StatusTone> = {
  send: "success",
  return: "warning",
};

export const SUBSCRIPTION_STATUS_TONE: Record<SubscriptionStatus, StatusTone> = {
  active: "success",
  cancelled: "danger",
};

export const PRINTER_DEVICE_STATUS_TONE: Record<PrinterDeviceStatus, StatusTone> = {
  connected: "success",
  disconnected: "danger",
};

export const TAG_STATUS_TONE: Record<TagStatus, StatusTone> = {
  active: "success",
  inactive: "neutral",
};

export const WHATSAPP_CONNECTION_TONE: Record<WhatsAppConnectionStatus, StatusTone> = {
  connected: "success",
  disconnected: "danger",
};

export const WHATSAPP_TEMPLATE_STATUS_TONE: Record<WhatsAppTemplateStatus, StatusTone> = {
  approved: "success",
  pending: "warning",
  rejected: "danger",
};

export const RETURN_REQUEST_STATUS_TONE: Record<ReturnRequestStatus, StatusTone> = {
  draft: "neutral",
  awaiting_inspection: "info",
  pending_decision: "warning",
  in_repair: "maroon",
  in_repackaging: "neutral",
  returning_to_customer: "info",
  closed: "success",
  cancelled: "danger",
};

export const REPAIR_TICKET_STATUS_TONE: Record<RepairTicketStatus, StatusTone> = {
  queued: "neutral",
  in_repair: "info",
  done: "success",
  failed: "danger",
};

export const REPACKAGING_TICKET_STATUS_TONE: Record<RepackagingTicketStatus, StatusTone> = {
  queued: "neutral",
  in_repackaging: "info",
  done: "success",
};

export const EMPLOYEE_STATUS_TONE: Record<EmployeeStatus, StatusTone> = {
  approved: "success",
  pending: "warning",
  rejected: "danger",
};

export const TRANSFER_SENDER_STATUS_TONE: Record<TransferSenderStatus, StatusTone> = {
  new: "neutral",
  packed: "info",
};

export const TRANSFER_RECEIVER_STATUS_TONE: Record<TransferReceiverStatus, StatusTone> = {
  pending: "warning",
  waiting_receive: "info",
  received: "success",
};

export const TRANSFER_PRIORITY_TONE: Record<TransferPriority, StatusTone> = {
  low: "info",
  medium: "warning",
  high: "danger",
};

export const PURCHASE_ORDER_STATUS_TONE: Record<PurchaseOrderStatus, StatusTone> = {
  suggested: "neutral",
  draft: "danger",
  submitted: "maroon",
  approved: "info",
  ordered: "neutral",
  partially_received: "warning",
  received: "success",
  closed: "neutral",
  cancelled: "danger",
};
