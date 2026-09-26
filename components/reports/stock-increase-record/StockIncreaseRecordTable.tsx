import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";

const HEADER_CLASSES =
  "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;

export function StockIncreaseRecordTable({
  columns,
  emptyLabel,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  columns: {
    rowNumber: string;
    image: string;
    productName: string;
    sku: string;
    barcode: string;
    clientName: string;
    warehouseName: string;
    quantity: string;
    employeeName: string;
    createdAt: string;
  };
  emptyLabel: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  return (
    <div>
      <div className="scrollbar-primary overflow-x-auto">
        <table className="w-full min-w-[1200px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-300">
              <th className={HEADER_CLASSES}>
                {columns.rowNumber}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.image}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.productName}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.sku}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.barcode}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.clientName}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.warehouseName}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.quantity}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.employeeName}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>{columns.createdAt}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={10} className="bg-primary-50 py-6 text-center text-sm font-medium text-primary-700">
                {emptyLabel}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <p className="text-sm text-zinc-500">
          0 {showingLabel} {ofLabel} 0 {entriesLabel}
        </p>
        <div className="flex items-center gap-1">
          <IconButton aria-label="First page" shape="square" className="h-8 w-8" disabled>
            <ChevronsLeft className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton aria-label="Previous page" shape="square" className="h-8 w-8" disabled>
            <ChevronLeft className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton aria-label="Next page" shape="square" className="h-8 w-8" disabled>
            <ChevronRight className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton aria-label="Last page" shape="square" className="h-8 w-8" disabled>
            <ChevronsRight className="h-3.5 w-3.5" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
