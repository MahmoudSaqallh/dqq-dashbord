"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Modal({
  open,
  onClose,
  title,
  icon: Icon,
  widthClassName,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: LucideIcon;
  widthClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 -z-10 cursor-default" />

      <div className={cn("flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl", widthClassName ?? "max-w-lg")}>
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 px-6 py-4">
          <div className="flex items-center gap-2.5">
            {Icon && <Icon className="h-4.5 w-4.5 text-zinc-500" />}
            <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="scrollbar-primary flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {footer && <div className="flex shrink-0 items-center justify-end gap-3 border-t border-zinc-200 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}
