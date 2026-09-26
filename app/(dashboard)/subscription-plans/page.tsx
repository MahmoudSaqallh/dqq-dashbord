import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { SubscriptionPlansSection } from "@/components/subscription-plans/SubscriptionPlansSection";
import { PLANS, SUBSCRIPTIONS_LIST, SUBSCRIPTIONS_TOTAL_COUNT } from "@/lib/mock/subscription-plans";
import { SUBSCRIPTION_STATUS_TONE } from "@/lib/utils/status-colors";

function formatCurrency(amount: number) {
  return `${amount.toFixed(2)} SAR`;
}

export default async function SubscriptionPlansPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const subscriptionRows = SUBSCRIPTIONS_LIST.map((row) => ({
    id: row.id,
    rowNumber: row.rowNumber,
    clientName: row.clientName,
    contactEmail: row.contactEmail,
    contactPhone: row.contactPhone,
    planName: row.planName,
    startDate: row.startDate,
    endDate: row.endDate,
    paidDisplay: formatCurrency(row.paidAmount),
    status: { label: t(`status.subscription.${row.status}`), tone: SUBSCRIPTION_STATUS_TONE[row.status] },
  }));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-zinc-900">{t("subscriptionPlansPage.title")}</h1>

      <SubscriptionPlansSection
        subscriptionsCount={SUBSCRIPTIONS_TOTAL_COUNT}
        plansCount={PLANS.length}
        labels={{
          subscriptionsTab: t("subscriptionPlansPage.subscriptionsTab"),
          plansTab: t("subscriptionPlansPage.plansTab"),
          addNewSubscription: t("subscriptionPlansPage.addNewSubscription"),
          addNewPlan: t("subscriptionPlansPage.addNewPlan"),
          cycles: {
            free: t("subscriptionPlansPage.cycles.free"),
            monthly: t("subscriptionPlansPage.cycles.monthly"),
            annual: t("subscriptionPlansPage.cycles.annual"),
          },
          published: t("subscriptionPlansPage.published"),
          subscribed: t("subscriptionPlansPage.subscribed"),
          more: t("subscriptionPlansPage.more"),
          actionsView: t("subscriptionPlansPage.actionsView"),
          actionsEdit: t("subscriptionPlansPage.actionsEdit"),
          actionsUnpublish: t("subscriptionPlansPage.actionsUnpublish"),
          actionsDelete: t("subscriptionPlansPage.actionsDelete"),
          searchPlaceholder: t("subscriptionPlansPage.searchPlaceholder"),
          refresh: t("subscriptionPlansPage.refresh"),
        }}
        plans={PLANS}
        subscriptionRows={subscriptionRows}
        subscriptionColumns={{
          rowNumber: t("subscriptionPlansPage.columns.rowNumber"),
          client: t("subscriptionPlansPage.columns.client"),
          contact: t("subscriptionPlansPage.columns.contact"),
          plan: t("subscriptionPlansPage.columns.plan"),
          startDate: t("subscriptionPlansPage.columns.startDate"),
          endDate: t("subscriptionPlansPage.columns.endDate"),
          paid: t("subscriptionPlansPage.columns.paid"),
          status: t("subscriptionPlansPage.columns.status"),
          action: t("subscriptionPlansPage.columns.action"),
        }}
      />
    </div>
  );
}
