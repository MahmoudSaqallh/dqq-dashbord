import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { RolesView } from "@/components/users/roles/RolesView";
import { ROLE_ROWS } from "@/lib/mock/roles";

export default async function UsersRolesPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <RolesView
      breadcrumbRoot={t("nav.settings")}
      breadcrumbCurrent={t("rolesPage.breadcrumbCurrent")}
      searchPlaceholder={t("rolesPage.searchPlaceholder")}
      refreshLabel={t("rolesPage.refresh")}
      addNewLabel={t("rolesPage.addNew")}
      columns={{
        rowNumber: t("rolesPage.columns.rowNumber"),
        name: t("rolesPage.columns.name"),
        createdAt: t("rolesPage.columns.createdAt"),
        updatedAt: t("rolesPage.columns.updatedAt"),
        action: t("rolesPage.columns.action"),
      }}
      rows={ROLE_ROWS}
      showingLabel={t("rolesPage.showing")}
      ofLabel={t("rolesPage.of")}
      entriesLabel={t("rolesPage.entries")}
    />
  );
}
