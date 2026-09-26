"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { SelectDropdown, type SelectDropdownOption } from "@/components/ui/SelectDropdown";
import { SaudiFlagIcon } from "@/components/ui/SaudiFlagIcon";

const INPUT_CLASSES =
  "h-10 w-full rounded-xl border border-zinc-200 px-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none";

function FormField({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        {label}
        {required && " *"}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}

export function AddWarehouseModal({
  open,
  onClose,
  labels,
}: {
  open: boolean;
  onClose: () => void;
  labels: {
    title: string;
    informationsSection: string;
    clientIntegrate: string;
    selectPlaceholder: string;
    required: string;
    warehouseName: string;
    warehouseNamePlaceholder: string;
    referenceId: string;
    referenceIdPlaceholder: string;
    mobileNumber: string;
    mobileNumberPlaceholder: string;
    addressSection: string;
    country: string;
    city: string;
    cityPlaceholder: string;
    address1: string;
    address1Placeholder: string;
    address2: string;
    address2Optional: string;
    address2Placeholder: string;
    shortAddress: string;
    shortAddressPlaceholder: string;
    cancel: string;
    submit: string;
  };
}) {
  const [clientIntegrate, setClientIntegrate] = useState("");
  const [city, setCity] = useState("");
  const [showClientError, setShowClientError] = useState(false);

  const clientOptions: SelectDropdownOption[] = [];
  const cityOptions: SelectDropdownOption[] = [];

  function handleSubmit() {
    if (!clientIntegrate) {
      setShowClientError(true);
      return;
    }
    onClose();
  }

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
            onClick={handleSubmit}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-white hover:bg-primary-600"
          >
            {labels.submit}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">{labels.informationsSection}</p>

        <FormField label={labels.clientIntegrate} required error={showClientError ? labels.required : undefined}>
          <SelectDropdown
            value={clientIntegrate}
            onChange={(value) => {
              setClientIntegrate(value);
              setShowClientError(false);
            }}
            options={clientOptions}
            placeholder={labels.selectPlaceholder}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label={labels.warehouseName} required>
            <input type="text" placeholder={labels.warehouseNamePlaceholder} className={INPUT_CLASSES} />
          </FormField>
          <FormField label={labels.referenceId} required>
            <input type="text" placeholder={labels.referenceIdPlaceholder} className={INPUT_CLASSES} />
          </FormField>
        </div>

        <FormField label={labels.mobileNumber}>
          <div className="flex h-10 w-full items-center overflow-hidden rounded-xl border border-zinc-200 focus-within:ring-2 focus-within:ring-primary-100">
            <span dir="ltr" className="flex h-full shrink-0 items-center gap-1.5 border-e border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-600">
              <SaudiFlagIcon className="h-3.5 w-5 rounded-[2px]" />
              +966
            </span>
            <input
              type="tel"
              dir="ltr"
              placeholder={labels.mobileNumberPlaceholder}
              className="h-full w-full px-3 text-start text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
        </FormField>

        <p className="mt-1 text-xs font-semibold tracking-wide text-zinc-400 uppercase">{labels.addressSection}</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label={labels.country} required>
            <button
              type="button"
              className="flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-zinc-200 px-3 text-sm text-zinc-700 focus:ring-2 focus:ring-primary-100 focus:outline-none"
            >
              <span className="flex items-center gap-2">
                <SaudiFlagIcon className="h-3.5 w-5 rounded-[2px]" />
                السعودية
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
            </button>
          </FormField>
          <FormField label={labels.city} required>
            <SelectDropdown value={city} onChange={setCity} options={cityOptions} placeholder={labels.cityPlaceholder} />
          </FormField>
        </div>

        <FormField label={labels.address1} required>
          <input type="text" placeholder={labels.address1Placeholder} className={INPUT_CLASSES} />
        </FormField>

        <FormField label={`${labels.address2} (${labels.address2Optional})`}>
          <input type="text" placeholder={labels.address2Placeholder} className={INPUT_CLASSES} />
        </FormField>

        <FormField label={labels.shortAddress} required>
          <input type="text" placeholder={labels.shortAddressPlaceholder} className={INPUT_CLASSES} />
        </FormField>
      </div>
    </Modal>
  );
}
