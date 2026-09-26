import { ImageIcon, Package } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { OrderDetailsProduct } from "@/lib/mock/types";
import { SectionCard } from "./SectionCard";

const HEADER_CLASSES =
  "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

export function OrderProductsCard({
  title,
  columns,
  products,
}: {
  title: string;
  columns: { products: string; type: string; price: string; quantity: string; total: string };
  products: OrderDetailsProduct[];
}) {
  return (
    <SectionCard icon={Package} title={title}>
      <div className="scrollbar-primary overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-300">
              <th className={HEADER_CLASSES}>
                {columns.products}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.type}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.price}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.quantity}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>{columns.total}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-zinc-100 bg-zinc-50 last:border-0">
                <td className={cn(CELL_CLASSES, "relative")}>
                  <span className="absolute inset-y-2 inset-s-0 w-1 rounded-e-full bg-primary" />
                  <div className="flex items-center gap-3 ps-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-300">
                      <ImageIcon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="max-w-xs truncate font-medium text-zinc-800">{product.name}</p>
                      <p dir="ltr" className="text-xs text-zinc-400">
                        {product.sku}
                      </p>
                    </div>
                  </div>
                </td>
                <td className={cn(CELL_CLASSES, "text-zinc-600")}>{product.type}</td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                  {product.price.toFixed(2)}
                </td>
                <td className={cn(CELL_CLASSES, "text-zinc-600")}>{product.quantity}</td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start font-semibold text-zinc-800")}>
                  {product.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
