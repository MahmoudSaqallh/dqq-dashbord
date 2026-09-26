import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { CustomersView } from "@/components/users/customers/CustomersView";
import { CUSTOMERS_TOTAL, CUSTOMER_ROWS } from "@/lib/mock/customers";

export default async function UsersCustomersPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <CustomersView
      breadcrumbRoot={t("nav.users")}
      breadcrumbCurrent={t("customersPage.breadcrumbCurrent")}
      searchPlaceholder={t("customersPage.searchPlaceholder")}
      refreshLabel={t("customersPage.refresh")}
      columns={{
        rowNumber: t("customersPage.columns.rowNumber"),
        name: t("customersPage.columns.name"),
        email: t("customersPage.columns.email"),
        mobilePhone: t("customersPage.columns.mobilePhone"),
        verified: t("customersPage.columns.verified"),
        active: t("customersPage.columns.active"),
      }}
      rows={CUSTOMER_ROWS}
      total={CUSTOMERS_TOTAL}
      verifiedLabel={t("customersPage.verified")}
      activeLabel={t("customersPage.active")}
      showingLabel={t("customersPage.showing")}
      ofLabel={t("customersPage.of")}
      entriesLabel={t("customersPage.entries")}
    />
  );
}
