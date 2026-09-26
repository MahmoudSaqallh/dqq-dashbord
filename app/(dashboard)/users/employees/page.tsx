import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { EmployeesView } from "@/components/users/employees/EmployeesView";
import { EMPLOYEE_ROWS } from "@/lib/mock/employees";

export default async function UsersEmployeesPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <EmployeesView
      breadcrumbRoot={t("nav.users")}
      breadcrumbCurrent={t("employeesPage.breadcrumbCurrent")}
      searchPlaceholder={t("employeesPage.searchPlaceholder")}
      refreshLabel={t("employeesPage.refresh")}
      activeLabel={t("employeesPage.activeEmployees")}
      activeCount={EMPLOYEE_ROWS.length}
      deletedLabel={t("employeesPage.deletedEmployees")}
      columns={{
        rowNumber: t("employeesPage.columns.rowNumber"),
        name: t("employeesPage.columns.name"),
        email: t("employeesPage.columns.email"),
        username: t("employeesPage.columns.username"),
        status: t("employeesPage.columns.status"),
        createdAt: t("employeesPage.columns.createdAt"),
        updatedAt: t("employeesPage.columns.updatedAt"),
        action: t("employeesPage.columns.action"),
      }}
      rows={EMPLOYEE_ROWS}
      statusLabels={{
        approved: t("employeesPage.status.approved"),
        pending: t("employeesPage.status.pending"),
        rejected: t("employeesPage.status.rejected"),
      }}
      showingLabel={t("employeesPage.showing")}
      ofLabel={t("employeesPage.of")}
      entriesLabel={t("employeesPage.entries")}
    />
  );
}
