import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { SendNotificationView } from "@/components/settings/send-notification/SendNotificationView";
import { SEND_NOTIFICATION_EMPLOYEE_COUNT } from "@/lib/mock/send-notification";

export default async function SendNotificationPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <SendNotificationView
      breadcrumbRoot={t("nav.settings")}
      breadcrumbCurrent={t("sendNotificationPage.breadcrumbCurrent")}
      employeeCount={SEND_NOTIFICATION_EMPLOYEE_COUNT}
      labels={{
        recipientsTitle: t("sendNotificationPage.recipientsTitle"),
        recipientsSubtitle: t("sendNotificationPage.recipientsSubtitle"),
        employeesUnit: t("sendNotificationPage.employeesUnit"),
        formTitle: t("sendNotificationPage.formTitle"),
        formSubtitle: t("sendNotificationPage.formSubtitle"),
        userLabel: t("sendNotificationPage.userLabel"),
        userSelectAll: t("sendNotificationPage.userSelectAll"),
        titleLabel: t("sendNotificationPage.titleLabel"),
        titlePlaceholder: t("sendNotificationPage.titlePlaceholder"),
        messageLabel: t("sendNotificationPage.messageLabel"),
        messagePlaceholder: t("sendNotificationPage.messagePlaceholder"),
        submit: t("sendNotificationPage.submit"),
      }}
    />
  );
}
