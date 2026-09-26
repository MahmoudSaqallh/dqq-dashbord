import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { CreatePlanForm } from "@/components/subscription-plans/create/CreatePlanForm";

export default async function CreatePlanPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return <CreatePlanForm breadcrumbRoot={t("subscriptionPlansPage.title")} breadcrumbCurrent="Create New Plans" />;
}
