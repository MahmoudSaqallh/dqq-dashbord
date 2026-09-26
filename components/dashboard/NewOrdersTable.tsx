import { Eye } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { StatusBadge } from "./StatusBadge";
import { ViewAllButton } from "./ViewAllButton";
import type { StatusTone } from "@/lib/utils/status-colors";

export interface ResolvedOrderRow {
  id: string;
  orderNumber: string;
  clientName: string;
  shippingCompany: string;
  dateOrderDisplay: string;
  totalDisplay: string;
  dqqStatus: { label: string; tone: StatusTone };
  storeStatus: { label: string; tone: StatusTone };
}

export function NewOrdersTable({
  title,
  viewAllLabel,
  viewAllHref,
  columns,
  actionLabel,
  orders,
}: {
  title: string;
  viewAllLabel: string;
  viewAllHref: string;
  columns: {
    orderNumber: string;
    clients: string;
    shippingCompany: string;
    dateOrder: string;
    total: string;
    dqqStatus: string;
    storeStatus: string;
    action: string;
  };
  actionLabel: string;
  orders: ResolvedOrderRow[];
}) {
  const headers = [
    columns.orderNumber,
    columns.clients,
    columns.shippingCompany,
    columns.dateOrder,
    columns.total,
    columns.dqqStatus,
    columns.storeStatus,
    columns.action,
  ];

  return (
    <Card className="">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-300 py-4 px-5">
        <h2 className="text-[15px] font-semibold text-black ">{title}</h2>
        <ViewAllButton label={viewAllLabel} href={viewAllHref} />
      </div>

      <div className="scrollbar-primary overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-300">
              {headers.map((label, index) => (
                <th
                  key={label}
                  className="relative h-14 whitespace-nowrap px-5 text-start text-xs font-semibold uppercase tracking-wide text-zinc-400"
                >
                  <span className="inline-flex h-full items-center">{label}</span>
                  {index < headers.length - 1 && (
                    <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="h-14 border-b border-zinc-300 transition-colors last:border-0 hover:bg-primary-50">
                <td dir="ltr" className="whitespace-nowrap px-5 text-start text-sm font-medium text-primary-600">
                  <span className="inline-flex h-full items-center">{order.orderNumber}</span>
                </td>
                <td className="whitespace-nowrap px-5 text-sm text-zinc-600">
                  <span className="inline-flex h-full items-center">{order.clientName}</span>
                </td>
                <td className="whitespace-nowrap px-5 text-sm text-zinc-600">
                  <span className="inline-flex h-full items-center">{order.shippingCompany}</span>
                </td>
                <td dir="ltr" className="whitespace-nowrap px-5 text-start text-sm text-zinc-500">
                  <span className="inline-flex h-full items-center">{order.dateOrderDisplay}</span>
                </td>
                <td dir="ltr" className="whitespace-nowrap px-5 text-start text-sm font-semibold text-primary-600">
                  <span className="inline-flex h-full items-center">{order.totalDisplay}</span>
                </td>
                <td className="whitespace-nowrap px-5">
                  <span className="inline-flex h-full items-center">
                    <StatusBadge label={order.dqqStatus.label} tone={order.dqqStatus.tone} />
                  </span>
                </td>
                <td className="whitespace-nowrap px-5">
                  <span className="inline-flex h-full items-center">
                    <StatusBadge label={order.storeStatus.label} tone={order.storeStatus.tone} />
                  </span>
                </td>
                <td className="whitespace-nowrap px-5">
                  <span className="inline-flex h-full items-center">
                    <IconButton aria-label={actionLabel} className="border-stone-400/30!">
                      <Eye className="h-4 w-4" />
                    </IconButton>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
