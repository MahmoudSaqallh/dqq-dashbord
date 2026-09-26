import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { AutomationView } from "@/components/settings/automation/AutomationView";
import { AUTOMATION_ROWS } from "@/lib/mock/automation";

export default async function SettingsAutomationPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <AutomationView
      breadcrumbRoot={t("nav.settings")}
      breadcrumbCurrent={t("nav.settingsChildren.automation")}
      searchPlaceholder={t("settingsAutomationPage.searchPlaceholder")}
      refreshLabel={t("settingsAutomationPage.refresh")}
      addNewLabel={t("settingsAutomationPage.addNew")}
      columns={{
        rowNumber: t("settingsAutomationPage.columns.rowNumber"),
        automation: t("settingsAutomationPage.columns.automation"),
        status: t("settingsAutomationPage.columns.status"),
        restrictions: t("settingsAutomationPage.columns.restrictions"),
        events: t("settingsAutomationPage.columns.events"),
        createdAt: t("settingsAutomationPage.columns.createdAt"),
        automationStatus: t("settingsAutomationPage.columns.automationStatus"),
        action: t("settingsAutomationPage.columns.action"),
      }}
      storeStatusPillLabel={t("settingsAutomationPage.storeStatusPillLabel")}
      rows={AUTOMATION_ROWS}
      showingLabel={t("settingsAutomationPage.showing")}
      ofLabel={t("settingsAutomationPage.of")}
      entriesLabel={t("settingsAutomationPage.entries")}
    />
  );
}
