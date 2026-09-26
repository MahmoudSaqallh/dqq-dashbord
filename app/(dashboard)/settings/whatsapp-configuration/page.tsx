import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { WhatsappConfigurationView } from "@/components/settings/whatsapp-configuration/WhatsappConfigurationView";
import { WHATSAPP_CONNECTION_INFO, WHATSAPP_TEMPLATE_ROWS } from "@/lib/mock/whatsapp-configuration";
import { WHATSAPP_TEMPLATE_STATUS_TONE } from "@/lib/utils/status-colors";

export default async function SettingsWhatsappConfigurationPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const rows = WHATSAPP_TEMPLATE_ROWS.map((row) => ({
    id: row.id,
    rowNumber: row.rowNumber,
    name: row.name,
    category: row.category,
    language: row.language,
    createdAtDisplay: row.createdAtDisplay,
    status: { label: t(`status.whatsappTemplate.${row.status}`), tone: WHATSAPP_TEMPLATE_STATUS_TONE[row.status] },
  }));

  return (
    <WhatsappConfigurationView
      breadcrumbRoot={t("nav.settings")}
      breadcrumbCurrent={t("settingsWhatsappPage.breadcrumbCurrent")}
      connectionInfo={WHATSAPP_CONNECTION_INFO}
      connectionStatusLabel={t(`status.whatsappConnection.${WHATSAPP_CONNECTION_INFO.status}`)}
      connectionLabels={{
        title: t("settingsWhatsappPage.connectionTitle"),
        testApi: t("settingsWhatsappPage.testApi"),
        paymentMethod: t("settingsWhatsappPage.paymentMethod"),
        view: t("settingsWhatsappPage.view"),
        edit: t("settingsWhatsappPage.edit"),
        sendMessage: t("settingsWhatsappPage.sendMessage"),
        phoneNumberId: t("settingsWhatsappPage.phoneNumberId"),
        displayPhoneNumber: t("settingsWhatsappPage.displayPhoneNumber"),
        businessAccountId: t("settingsWhatsappPage.businessAccountId"),
        createdDate: t("settingsWhatsappPage.createdDate"),
      }}
      tabs={[
        { id: "templates", label: t("settingsWhatsappPage.tabs.templates"), count: rows.length },
        { id: "messagesLog", label: t("settingsWhatsappPage.tabs.messagesLog") },
        { id: "analytics", label: t("settingsWhatsappPage.tabs.analytics") },
      ]}
      searchPlaceholder={t("settingsWhatsappPage.searchPlaceholder")}
      filtersLabel={t("settingsWhatsappPage.filters")}
      statusFilterLabel={t("settingsWhatsappPage.columns.status")}
      statusFilterOptions={[
        t("status.whatsappTemplate.approved"),
        t("status.whatsappTemplate.pending"),
        t("status.whatsappTemplate.rejected"),
      ]}
      syncLabel={t("settingsWhatsappPage.syncTemplates")}
      createNewLabel={t("settingsWhatsappPage.createNewTemplate")}
      columns={{
        rowNumber: t("settingsWhatsappPage.columns.rowNumber"),
        name: t("settingsWhatsappPage.columns.name"),
        category: t("settingsWhatsappPage.columns.category"),
        language: t("settingsWhatsappPage.columns.language"),
        createdAt: t("settingsWhatsappPage.columns.createdAt"),
        status: t("settingsWhatsappPage.columns.status"),
        action: t("settingsWhatsappPage.columns.action"),
      }}
      rows={rows}
      emptyLabel={t("settingsWhatsappPage.comingSoon")}
      showingLabel={t("settingsWhatsappPage.showing")}
      ofLabel={t("settingsWhatsappPage.of")}
      entriesLabel={t("settingsWhatsappPage.entries")}
    />
  );
}
