"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { RefreshButton } from "@/components/dashboard/RefreshButton";
import { cn } from "@/lib/utils/cn";
import type { PlanCycle, PlanItem } from "@/lib/mock/types";
import { PlanCard } from "./PlanCard";
import { SubscriptionsTable, type ResolvedSubscriptionRow } from "./SubscriptionsTable";

const CYCLE_ORDER: PlanCycle[] = ["free", "monthly", "annual"];

export function SubscriptionPlansSection({
  subscriptionsCount,
  plansCount,
  labels,
  plans,
  subscriptionRows,
  subscriptionColumns,
}: {
  subscriptionsCount: number;
  plansCount: number;
  labels: {
    subscriptionsTab: string;
    plansTab: string;
    addNewSubscription: string;
    addNewPlan: string;
    cycles: Record<PlanCycle, string>;
    published: string;
    subscribed: string;
    more: string;
    actionsView: string;
    actionsEdit: string;
    actionsUnpublish: string;
    actionsDelete: string;
    searchPlaceholder: string;
    refresh: string;
  };
  plans: PlanItem[];
  subscriptionRows: ResolvedSubscriptionRow[];
  subscriptionColumns: {
    rowNumber: string;
    client: string;
    contact: string;
    plan: string;
    startDate: string;
    endDate: string;
    paid: string;
    status: string;
    action: string;
  };
}) {
  const [activeTab, setActiveTab] = useState<"subscriptions" | "plans">("plans");
  const [activeCycle, setActiveCycle] = useState<PlanCycle>("monthly");
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  const cycleCounts = useMemo(() => {
    const counts: Record<PlanCycle, number> = { free: 0, monthly: 0, annual: 0 };
    for (const plan of plans) counts[plan.cycle]++;
    return counts;
  }, [plans]);

  const visiblePlans = plans.filter((plan) => plan.cycle === activeCycle);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-zinc-200 bg-white p-4 shadow-md">
        <div className="inline-flex items-center gap-1 rounded-pill bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("subscriptions")}
            className={cn(
              "rounded-pill px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "subscriptions" ? "bg-primary text-white" : "text-zinc-600 hover:text-zinc-900"
            )}
          >
            {labels.subscriptionsTab} ({subscriptionsCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("plans")}
            className={cn(
              "rounded-pill px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "plans" ? "bg-primary text-white" : "text-zinc-600 hover:text-zinc-900"
            )}
          >
            {labels.plansTab} ({plansCount})
          </button>
        </div>

        {activeTab === "plans" ? (
          <Link
            href="/subscription-plans/create"
            className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-4 text-sm font-medium text-white hover:bg-primary-600"
          >
            <Plus className="h-4 w-4" />
            {labels.addNewPlan}
          </Link>
        ) : (
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-4 text-sm font-medium text-white hover:bg-primary-600"
          >
            <Plus className="h-4 w-4" />
            {labels.addNewSubscription}
          </button>
        )}
      </div>

      {activeTab === "plans" ? (
        <>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1 rounded-pill bg-zinc-100 p-1">
              {CYCLE_ORDER.map((cycle) => (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setActiveCycle(cycle)}
                  className={cn(
                    "rounded-pill px-4 py-2 text-sm font-medium transition-colors",
                    activeCycle === cycle ? "bg-primary text-white" : "text-zinc-600 hover:text-zinc-900"
                  )}
                >
                  {labels.cycles[cycle]} ({cycleCounts[cycle]})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visiblePlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                publishedLabel={labels.published}
                cycleLabel={labels.cycles[plan.cycle]}
                subscribedLabel={labels.subscribed}
                moreLabel={labels.more}
                viewLabel={labels.actionsView}
                editLabel={labels.actionsEdit}
                unpublishLabel={labels.actionsUnpublish}
                deleteLabel={labels.actionsDelete}
                isOpen={openCardId === plan.id}
                onOpenChange={(open) => setOpenCardId(open ? plan.id : null)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-card border border-zinc-200 bg-white shadow-md">
          <div className="flex items-center gap-3 px-5 py-4">
            <div className="relative min-w-[200px] max-w-sm flex-1">
              <Search className="pointer-events-none absolute top-1/2 inset-s-3 h-4 w-4 -translate-y-1/2 text-primary-700" />
              <input
                type="text"
                placeholder={labels.searchPlaceholder}
                className="h-10 w-full rounded-xl border border-primary-100 bg-primary-50 ps-9 pe-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
              />
            </div>
            <RefreshButton label={labels.refresh} />
          </div>
          <SubscriptionsTable columns={subscriptionColumns} rows={subscriptionRows} />
        </div>
      )}
    </div>
  );
}
