import type { LucideIcon } from "lucide-react";

export interface NavChildItem {
  id: string;
  labelKey: string;
  href: string;
}

export interface NavItem {
  id: string;
  labelKey: string;
  href: string;
  icon: LucideIcon;
  hasChildren?: boolean;
  children?: NavChildItem[];
}

export type StatTone = "success" | "warning" | "danger";

export interface StatCardData {
  id: string;
  labelKey: string;
  value: number;
  icon: LucideIcon;
  tone: StatTone;
}

export type DqqStatusCode =
  | "ready_to_shipping"
  | "returned"
  | "delivered"
  | "pending"
  | "cancelled";

export type StoreStatusCode =
  | "processing_reverse"
  | "reversed"
  | "delivered"
  | "pending";

export interface OrderRow {
  id: string;
  orderNumber: string;
  clientName: string;
  shippingCompany: string;
  dateOrderDisplay: string;
  total: { amount: number; currency: string };
  dqqStatus: DqqStatusCode;
  storeStatus: StoreStatusCode;
}

export type PaymentStatus = "unpaid" | "paid";

export interface OrderStatusTab {
  id: string;
  labelKey: string;
  count: number;
}

export interface OrdersListRow {
  id: string;
  rowNumber: number;
  orderNumber: string;
  clientName: string;
  shippingCompany: string;
  dqqStatus: DqqStatusCode;
  storeStatus: StoreStatusCode;
  paymentStatus: PaymentStatus;
  hasIntegrationBadge?: boolean;
  total: { amount: number; currency: string };
}

export type PickingStatusCode = "in_progress" | "picked" | "assigned";

export interface PickingListRow {
  id: string;
  rowNumber: number;
  pickedId: string;
  employee: string | null;
  createDateDisplay: string;
  pickedDateDisplay: string | null;
  warehouse: string;
  ordersCount: number;
  productsCount: number;
  qtyOfProducts: number;
  status: PickingStatusCode;
}

export type ConnectServiceLogo =
  | { kind: "wordmark"; colorClass: string }
  | { kind: "image" }
  | { kind: "social"; colorClass: string };

export interface ConnectServiceItem {
  id: string;
  name: string;
  logo: ConnectServiceLogo;
  badge?: string;
  hasInfo?: boolean;
  isCustom?: boolean;
}

export type PlanCycle = "free" | "monthly" | "annual";

export interface PlanItem {
  id: string;
  name: string;
  cycle: PlanCycle;
  price: number;
  originalPrice?: number;
  discountLabel?: string;
  durationLabel: string;
  features: string[];
  moreCount?: number;
  subscribedCount: number;
}

export type SubscriptionStatus = "active" | "cancelled";

export interface SubscriptionRow {
  id: string;
  rowNumber: number;
  clientName: string;
  contactEmail: string;
  contactPhone: string;
  planName: string;
  startDate: string;
  endDate: string;
  paidAmount: number;
  status: SubscriptionStatus;
}

export type WaybillType = "send" | "return";

export interface WaybillRow {
  id: string;
  rowNumber: number;
  trackingNumber: string;
  clientName: string;
  connectService: string;
  orderNumber: string;
  createdBy: string;
  type: WaybillType;
  createdAtDisplay: string;
}

export type AutoTopUpStatus = "enabled" | "disabled";
export type WalletStatus = "active" | "inactive";

export interface WalletRow {
  id: string;
  rowNumber: number;
  customerName: string;
  customerSubtitle: string;
  availableBalance: number;
  onHoldBalance: number;
  totalBalance: number;
  autoTopUp: AutoTopUpStatus;
  lastTransactionLabel: string;
  lastTransactionDisplay: string;
  status: WalletStatus;
}

export interface ShippingCompaniesSummary {
  companiesCount: number;
  shippedOrdersCount: number;
}

export interface PrinterAccountInfo {
  accountId: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAtDisplay: string;
}

export type PrinterDeviceStatus = "connected" | "disconnected";

export interface PrinterDeviceRow {
  id: string;
  rowNumber: number;
  computerId: string;
  name: string;
  hostName: string;
  status: PrinterDeviceStatus;
  version: string;
  printersCount: number;
}

export type TagStatus = "active" | "inactive";

export interface TagRow {
  id: string;
  rowNumber: number;
  nameEn: string;
  nameAr: string;
  colorHex: string;
  status: TagStatus;
}

export type WhatsAppConnectionStatus = "connected" | "disconnected";

export interface WhatsAppConnectionInfo {
  status: WhatsAppConnectionStatus;
  phoneNumberId: string;
  displayPhoneNumber: string;
  businessAccountId: string;
  createdAtDisplay: string;
}

export type WhatsAppTemplateStatus = "approved" | "pending" | "rejected";

export interface WhatsAppTemplateRow {
  id: string;
  rowNumber: number;
  name: string;
  category: string;
  language: string;
  createdAtDisplay: string;
  status: WhatsAppTemplateStatus;
}

export interface AutomationRow {
  id: string;
  rowNumber: number;
  name: string;
  storeStatusLabel: string;
  restrictions: string[];
  events: string[];
  createdAtDisplay: string;
  enabled: boolean;
}

export type ReturnRequestStatus =
  | "draft"
  | "awaiting_inspection"
  | "pending_decision"
  | "in_repair"
  | "in_repackaging"
  | "returning_to_customer"
  | "closed"
  | "cancelled";

export interface ReturnRequestRow {
  id: string;
  returnId: string;
  orderNo: string;
  customerName: string;
  customerPhone: string;
  productsCount: number;
  returnDateDisplay: string | null;
  totalReturn: { amount: number; currency: string };
  status: ReturnRequestStatus;
}

export type RepairTicketStatus = "queued" | "in_repair" | "done" | "failed";

export interface RepairTicketRow {
  id: string;
  ticketNo: string;
  productName: string;
  productSku: string;
  orderNo: string;
  returnRequestId: string;
  warehouse: string;
  assignee: string;
  startedAtDisplay: string | null;
  finishedAtDisplay: string | null;
  cost: { amount: number; currency: string } | null;
  status: RepairTicketStatus;
  statusSuffix?: string;
}

export type RepackagingTicketStatus = "queued" | "in_repackaging" | "done";

export interface RepackagingTicketRow {
  id: string;
  ticketNo: string;
  productName: string;
  productSku: string;
  orderNo: string;
  returnRequestId: string;
  warehouse: string;
  assignee: string;
  startedAtDisplay: string | null;
  finishedAtDisplay: string | null;
  status: RepackagingTicketStatus;
}

export type DelaySystemStatIcon = "clock" | "package" | "packageCheck";

export interface DelaySystemStat {
  id: string;
  icon: DelaySystemStatIcon;
  value: number;
  unit: string;
  deltaValue: number;
  deltaUp: boolean;
  percent: number;
  label: string;
}

export interface DelaySystemSummary {
  totalOrders: number;
  totalOrdersDeltaCount: number;
  totalOrdersDeltaPercent: number;
  stats: DelaySystemStat[];
}

export interface OrderDetailsProduct {
  id: string;
  name: string;
  sku: string;
  type: string;
  price: number;
  quantity: number;
  total: number;
}

export interface OrderDetailsCustomer {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
}

export interface OrderDetailsShippingAddress {
  name: string;
  addressLines: string[];
  shippingCompany: string;
  trackingNumber: string;
  latitude: number;
  longitude: number;
}

export interface OrderDetailsBill {
  subtotal: number;
  deliveryCost: number;
  coupon: number;
  total: number;
  currency: string;
}

export interface OrderDetails {
  id: string;
  orderNumber: string;
  storeName: string;
  dateDisplay: string;
  orderStatus: StoreStatusCode;
  dqqStatus: DqqStatusCode;
  paymentStatus: PaymentStatus;
  assignedEmployee: string | null;
  customer: OrderDetailsCustomer;
  shippingAddress: OrderDetailsShippingAddress;
  products: OrderDetailsProduct[];
  bill: OrderDetailsBill;
}

export interface CreateOrderProductRow {
  id: string;
  name: string;
  sku: string;
  availableStock: number;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderLocation {
  id: string;
  city: string;
  country: string;
  buildingLabel: string;
  hasShortAddress: boolean;
}

export interface DateRangeValue {
  presetKey: string;
  startDisplay: string;
  endDisplay: string;
}

export interface RoleRow {
  id: string;
  rowNumber: number;
  name: string;
  createdAtDisplay: string;
  updatedAtDisplay: string;
}

export interface CustomerRow {
  id: string;
  rowNumber: number;
  name: string;
  email: string;
  mobilePhone: string;
  verified: boolean;
  active: boolean;
}

export type EmployeeStatus = "approved" | "pending" | "rejected";

export interface EmployeeRow {
  id: string;
  rowNumber: number;
  name: string;
  username: string;
  email: string;
  status: EmployeeStatus;
  createdAtDisplay: string;
  updatedAtDisplay: string;
}

export type WarehouseChannel = "zid" | "storefront";

export interface WarehouseRow {
  id: string;
  rowNumber: number;
  name: string;
  isMerged?: boolean;
  country: string;
  city: string;
  address1: string;
  shortAddress: string;
  createdAtDisplay: string;
  storeName: string;
  channel: WarehouseChannel;
  inventoryLocationEnabled: boolean;
}

export interface MergedWarehouseMember {
  id: string;
  rowNumber: number;
  warehouseName: string;
  storeName: string;
  country: string;
  city: string;
  address1: string;
  createdAtDisplay: string;
  channel: WarehouseChannel | "none";
}

export interface MergedWarehouseGroup {
  id: string;
  name: string;
  members: MergedWarehouseMember[];
}

export type PurchaseOrderStatus =
  | "suggested"
  | "draft"
  | "submitted"
  | "approved"
  | "ordered"
  | "partially_received"
  | "received"
  | "closed"
  | "cancelled";

export interface PurchaseOrderRow {
  id: string;
  rowNumber: number;
  serialNumber: string;
  supplierName: string;
  supplierEmail: string;
  warehouseName: string;
  productsCount: number;
  totalAmountDisplay: string | null;
  deliveryDateDisplay: string | null;
  status: PurchaseOrderStatus;
  approvedBy: string | null;
}

export interface PurchaseOrderStatsSummary {
  total: number;
  suggested: number;
  draft: number;
  submitted: number;
  approved: number;
  ordered: number;
  partiallyReceived: number;
  received: number;
  closed: number;
  cancelled: number;
}

export interface PurchaseOrderDetailsProduct {
  id: string;
  name: string;
  sku: string;
  amountDisplay: string;
  received: boolean;
  orderedQty: number;
  receivedQty: number;
  expectedDeliveryDateDisplay: string;
  actualDateDisplay: string | null;
  receiveToCount: number;
}

export interface PurchaseOrderDetails {
  id: string;
  orderId: string;
  expectedDeliveryDateDisplay: string;
  supplierName: string;
  warehouseName: string;
  totalQuantity: number;
  assignedTo: string;
  productsCount: number;
  totalAmountDisplay: string;
  status: PurchaseOrderStatus;
  notes: string;
  receivingProductsCount: number;
  products: PurchaseOrderDetailsProduct[];
}

export interface ChangeStatusProduct {
  id: string;
  name: string;
  sku: string;
  stockQty: number;
  orderedQty: number;
  totalReceived: number;
  locationAssigned: boolean;
}

export interface PurchaseOrderChangeStatus {
  id: string;
  status: PurchaseOrderStatus;
  products: ChangeStatusProduct[];
}

export interface EditPurchaseOrderProduct {
  id: string;
  name: string;
  sku: string;
  stockQty: number;
  orderQty: number;
  unitPrice: number;
  deliveryDateDisplay: string;
}

export interface EditPurchaseOrderData {
  id: string;
  supplierName: string;
  warehouseName: string;
  products: EditPurchaseOrderProduct[];
  notes: string;
}

export type TransferSenderStatus = "new" | "packed";
export type TransferReceiverStatus = "pending" | "waiting_receive" | "received";
export type TransferPriority = "low" | "medium" | "high";

export interface WarehouseTransferRow {
  id: string;
  rowNumber: number;
  number: string;
  fromWarehouse: string;
  toWarehouse: string;
  shippingCompany: string | null;
  quantity: number;
  priority: TransferPriority;
  senderStatus: TransferSenderStatus;
  receiverStatus: TransferReceiverStatus;
}

export interface TransferDetailsProduct {
  id: string;
  name: string;
  sku: string;
  transferQty: number;
  sendQty: number;
  receivedQty: number;
}

export interface TransferDetails {
  id: string;
  transferId: string;
  dateDisplay: string;
  fromWarehouse: string;
  toWarehouse: string;
  city: string;
  shippingCompany: string;
  priority: TransferPriority;
  client: string;
  senderEmployee: string;
  receiverEmployee: string;
  totalQuantity: number;
  productsCount: number;
  senderStatus: TransferSenderStatus;
  receiverStatus: TransferReceiverStatus;
  note: string;
  sendingProductsCount: number;
  receivingProductsCount: number;
  products: TransferDetailsProduct[];
}

export interface EditTransferProduct {
  id: string;
  name: string;
  sku: string;
  stockQty: number;
  transferQty: number;
}

export interface EditWarehouseTransferData {
  id: string;
  warehouseFrom: string;
  warehouseTo: string;
  priority: TransferPriority;
  products: EditTransferProduct[];
}
