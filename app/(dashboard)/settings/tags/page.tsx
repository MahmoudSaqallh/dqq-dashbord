import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { TagsView } from "@/components/settings/tags/TagsView";
import { TAGS_LIST } from "@/lib/mock/tags";
import { TAG_STATUS_TONE } from "@/lib/utils/status-colors";

export default async function SettingsTagsPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const rows = TAGS_LIST.map((row) => ({
    id: row.id,
    rowNumber: row.rowNumber,
    nameEn: row.nameEn,
    nameAr: row.nameAr,
    colorHex: row.colorHex,
    status: { label: t(`status.tag.${row.status}`), tone: TAG_STATUS_TONE[row.status] },
  }));

  return (
    <TagsView
      breadcrumbRoot={t("nav.settings")}
      breadcrumbCurrent={t("settingsTagsPage.breadcrumbCurrent")}
      searchPlaceholder={t("settingsTagsPage.searchPlaceholder")}
      refreshLabel={t("settingsTagsPage.refresh")}
      addNewLabel={t("settingsTagsPage.addNew")}
      columns={{
        rowNumber: t("settingsTagsPage.columns.rowNumber"),
        nameEn: t("settingsTagsPage.columns.nameEn"),
        nameAr: t("settingsTagsPage.columns.nameAr"),
        color: t("settingsTagsPage.columns.color"),
        status: t("settingsTagsPage.columns.status"),
        action: t("settingsTagsPage.columns.action"),
      }}
      rows={rows}
      emptyTitle={t("settingsTagsPage.emptyTitle")}
      emptySubtitle={t("settingsTagsPage.emptySubtitle")}
      showingLabel={t("settingsTagsPage.showing")}
      ofLabel={t("settingsTagsPage.of")}
      entriesLabel={t("settingsTagsPage.entries")}
    />
  );
}
