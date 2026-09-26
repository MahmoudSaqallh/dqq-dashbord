import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { RefreshButton } from "@/components/dashboard/RefreshButton";
import { ConnectServiceCard } from "@/components/connect-services/ConnectServiceCard";
import { STORE_SERVICES, REPRESENTATIVE_SERVICES } from "@/lib/mock/connect-services";

export default async function ConnectServicesPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const addLabel = t("connectServicesPage.add");
  const deleteLabel = t("connectServicesPage.delete");
  const editLabel = t("connectServicesPage.edit");

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-zinc-900">{t("connectServicesPage.storesTitle")}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {STORE_SERVICES.map((item) => (
            <ConnectServiceCard key={item.id} item={item} addLabel={addLabel} deleteLabel={deleteLabel} editLabel={editLabel} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-zinc-900">{t("connectServicesPage.representativesTitle")}</h2>
          <div className="flex items-center gap-2.5">
            <RefreshButton label={t("connectServicesPage.refresh")} />
            <button
              type="button"
              className="inline-flex h-9 items-center whitespace-nowrap rounded-xl bg-primary px-4 text-sm font-medium text-white hover:bg-primary-600"
            >
              {t("connectServicesPage.addCustom")}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {REPRESENTATIVE_SERVICES.map((item) => (
            <ConnectServiceCard key={item.id} item={item} addLabel={addLabel} deleteLabel={deleteLabel} editLabel={editLabel} />
          ))}
        </div>
      </section>
    </div>
  );
}
