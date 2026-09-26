import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { CreateAutomationForm } from "@/components/settings/automation/create/CreateAutomationForm";

export default async function AddAutomationPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <CreateAutomationForm
      breadcrumbRoot={t("nav.settingsChildren.automation")}
      breadcrumbCurrent={t("createAutomationPage.breadcrumbCurrent")}
      detailsTitle={t("createAutomationPage.detailsTitle")}
      informationsTitle={t("createAutomationPage.informationsTitle")}
      informationsSubtitle={t("createAutomationPage.informationsSubtitle")}
      automationNameLabel={t("createAutomationPage.automationNameLabel")}
      automationNamePlaceholder={t("createAutomationPage.automationNamePlaceholder")}
      statusLabel={t("createAutomationPage.statusLabel")}
      dqqStatusPrefix={t("createAutomationPage.dqqStatusPrefix")}
      dqqStatusPlaceholder={t("createAutomationPage.dqqStatusPlaceholder")}
      storeStatusPrefix={t("createAutomationPage.storeStatusPrefix")}
      storeStatusPlaceholder={t("createAutomationPage.storeStatusPlaceholder")}
      restrictionsTitle={t("createAutomationPage.restrictionsTitle")}
      restrictionsSubtitle={t("createAutomationPage.restrictionsSubtitle")}
      restrictionLabel={t("createAutomationPage.restrictionLabel")}
      restrictionPlaceholder={t("createAutomationPage.restrictionPlaceholder")}
      restrictionGroups={[
        {
          id: "locationShipping",
          label: t("createAutomationPage.restrictionGroups.locationShipping.label"),
          options: [
            { value: "region", label: t("createAutomationPage.restrictionGroups.locationShipping.region") },
            { value: "warehouse", label: t("createAutomationPage.restrictionGroups.locationShipping.warehouse") },
            {
              value: "deliveryCompany",
              label: t("createAutomationPage.restrictionGroups.locationShipping.deliveryCompany"),
            },
          ],
        },
        {
          id: "product",
          label: t("createAutomationPage.restrictionGroups.product.label"),
          options: [
            { value: "product", label: t("createAutomationPage.restrictionGroups.product.product") },
            { value: "category", label: t("createAutomationPage.restrictionGroups.product.category") },
          ],
        },
        {
          id: "orderType",
          label: t("createAutomationPage.restrictionGroups.orderType.label"),
          options: [
            { value: "orderType", label: t("createAutomationPage.restrictionGroups.orderType.orderType") },
            { value: "orderSource", label: t("createAutomationPage.restrictionGroups.orderType.orderSource") },
          ],
        },
        {
          id: "financialPayment",
          label: t("createAutomationPage.restrictionGroups.financialPayment.label"),
          options: [
            {
              value: "paymentMethod",
              label: t("createAutomationPage.restrictionGroups.financialPayment.paymentMethod"),
            },
            { value: "isPaid", label: t("createAutomationPage.restrictionGroups.financialPayment.isPaid") },
          ],
        },
      ]}
      operatorOptions={[
        { value: "eq", label: t("createAutomationPage.operatorOptions.eq") },
        { value: "neq", label: t("createAutomationPage.operatorOptions.neq") },
      ]}
      valueLabel={t("createAutomationPage.valueLabel")}
      valuePlaceholder={t("createAutomationPage.valuePlaceholder")}
      addRestrictionLabel={t("createAutomationPage.addRestriction")}
      eventsTitle={t("createAutomationPage.eventsTitle")}
      eventsSubtitle={t("createAutomationPage.eventsSubtitle")}
      eventsCountLabel={t("createAutomationPage.eventsCount")}
      automationTypeLabel={t("createAutomationPage.automationTypeLabel")}
      automationTypePlaceholder={t("createAutomationPage.automationTypePlaceholder")}
      addEventLabel={t("createAutomationPage.addEvent")}
      cancelLabel={t("createAutomationPage.cancel")}
      createLabel={t("createAutomationPage.create")}
    />
  );
}
