"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { SelectDropdown, type SelectDropdownOption } from "@/components/ui/SelectDropdown";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";

export function MergeWarehousesModal({
  open,
  onClose,
  labels,
}: {
  open: boolean;
  onClose: () => void;
  labels: {
    title: string;
    cityLabel: string;
    cityPlaceholder: string;
    showOrderLabel: string;
    cancel: string;
    submit: string;
  };
}) {
  const [city, setCity] = useState("");
  const [showOrderForEmployees, setShowOrderForEmployees] = useState(false);

  const cityOptions: SelectDropdownOption[] = [];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={labels.title}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
          >
            {labels.cancel}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-white hover:bg-primary-600"
          >
            {labels.submit}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-primary-700 uppercase">
            <Building2 className="h-3.5 w-3.5" />
            {labels.cityLabel}
          </div>
          <SelectDropdown value={city} onChange={setCity} options={cityOptions} placeholder={labels.cityPlaceholder} />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 px-4 py-3">
          <span className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">{labels.showOrderLabel}</span>
          <ToggleSwitch checked={showOrderForEmployees} onChange={setShowOrderForEmployees} />
        </div>
      </div>
    </Modal>
  );
}
