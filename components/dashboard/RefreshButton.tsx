import { RotateCw } from "lucide-react";

export function RefreshButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-blue-100 bg-info-bg text-info transition-colors hover:brightness-95"
    >
      <RotateCw className="h-4 w-4" />
    </button>
  );
}
