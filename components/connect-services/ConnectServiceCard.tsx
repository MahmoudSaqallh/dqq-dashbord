import { ImageIcon, Info, Pencil, Plus, Share2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ConnectServiceItem } from "@/lib/mock/types";

export function ConnectServiceCard({
  item,
  addLabel,
  deleteLabel,
  editLabel,
}: {
  item: ConnectServiceItem;
  addLabel: string;
  deleteLabel: string;
  editLabel: string;
}) {
  return (
    <div className="relative flex flex-col items-center rounded-2xl border border-zinc-100 bg-white px-4 py-6 text-center">
      {item.badge && (
        <span
          dir="ltr"
          className="absolute -top-2 inset-e-3 rounded-md bg-warning px-2 py-1 text-[10px] font-semibold whitespace-nowrap text-white"
        >
          {item.badge}
        </span>
      )}

      <div className="mb-3 flex h-12 items-center justify-center">
        {item.logo.kind === "wordmark" && (
          <span className={cn("text-xl font-extrabold", item.logo.colorClass)}>{item.name}</span>
        )}
        {item.logo.kind === "social" && (
          <span className={cn("flex h-11 w-11 items-center justify-center rounded-full", item.logo.colorClass)}>
            <Share2 className="h-5 w-5 text-white" />
          </span>
        )}
        {item.logo.kind === "image" && (
          <span className="flex h-11 w-16 items-center justify-center rounded-lg bg-zinc-100 text-zinc-300">
            <ImageIcon className="h-5 w-5" />
          </span>
        )}
      </div>

      <p className="mb-3 truncate text-sm text-zinc-500">{item.name}</p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg bg-primary-50 px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100"
        >
          {addLabel}
          <Plus className="h-3 w-3" />
        </button>
        {item.hasInfo && (
          <button
            type="button"
            aria-label="Info"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-blue-100 bg-info-bg text-info"
          >
            <Info className="h-3.5 w-3.5" />
          </button>
        )}
        {item.isCustom && (
          <>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-lg bg-danger-bg px-2.5 py-1.5 text-xs font-medium text-danger hover:brightness-95"
            >
              <Trash2 className="h-3 w-3" />
              {deleteLabel}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-lg bg-zinc-100 px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-200"
            >
              <Pencil className="h-3 w-3" />
              {editLabel}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
