export function PurchaseOrdersHeader({ totalLabel, total }: { totalLabel: string; total: number }) {
  return (
    <div className="rounded-t-card bg-primary-50/60 px-5 py-4">
      <p className="text-sm text-zinc-700">
        {totalLabel} : <span className="font-semibold text-zinc-900">{total}</span>
      </p>
    </div>
  );
}
