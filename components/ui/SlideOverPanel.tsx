"use client";

import type { ReactNode } from "react";

export function SlideOverPanel({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 -z-10 cursor-default" />
      <div className="scrollbar-primary flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-white shadow-xl">
        {children}
      </div>
    </div>
  );
}
