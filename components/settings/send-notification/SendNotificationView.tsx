"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SelectDropdown } from "@/components/ui/SelectDropdown";

const INPUT_CLASSES =
  "h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none";

export function SendNotificationView({
  breadcrumbRoot,
  breadcrumbCurrent,
  employeeCount,
  labels,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  employeeCount: number;
  labels: {
    recipientsTitle: string;
    recipientsSubtitle: string;
    employeesUnit: string;
    formTitle: string;
    formSubtitle: string;
    userLabel: string;
    userSelectAll: string;
    titleLabel: string;
    titlePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
  };
}) {
  const [user, setUser] = useState("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
        <Link href="/settings" className="text-info hover:text-info/80">
          {breadcrumbRoot}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
        <span className="font-semibold text-zinc-900">{breadcrumbCurrent}</span>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[500px_1fr] ">
        <Card className="flex justify-center flex-col items-center gap-4 p-6 text-center shadow-2xl border-none">
          <span className="flex  items-center justify-center rounded-full  text-primary-600 ">
            <Users className="h-15 w-15" />
          </span>
          <div className="pt-6">
            <p className="text-[17px] font-semibold text-zinc-900 ">{labels.recipientsTitle}</p>
            <p className="mt-2 text-sm text-zinc-400">{labels.recipientsSubtitle}</p>
          </div>
          <div className="w-full rounded-[10px] bg-zinc-100 py-2">
            <p className="text-2xl font-bold text-primary-600">{employeeCount}</p>
            <p className="mt-1 text-xs text-zinc-500">{labels.employeesUnit}</p>
          </div>
        </Card>

        <Card className="flex flex-col items-center p-7 shadow-lg border-none">
          <div className="flex w-full flex-col gap-4">
            <div>
              <h2 className="text-[15px] font-semibold text-zinc-900 mb-2">{labels.formTitle}</h2>
              <p className="text-xs text-zinc-400 mb-2">{labels.formSubtitle}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                {labels.userLabel}
              </label>
              <div className="mt-1.5">
                <SelectDropdown
                  value={user}
                  onChange={setUser}
                  options={[{ value: "all", label: labels.userSelectAll }]}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                {labels.titleLabel} <span className="text-warning">*</span>
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder={labels.titlePlaceholder}
                className={`mt-1.5 ${INPUT_CLASSES}`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                {labels.messageLabel} <span className="text-warning">*</span>
              </label>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={labels.messagePlaceholder}
                rows={5}
                className="mt-1.5 w-full resize-y rounded-[10px] border border-zinc-200 px-3 py-2.5 text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-[10px] bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-600"
              >
                {labels.submit}
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
