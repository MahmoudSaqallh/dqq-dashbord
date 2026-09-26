import { redirect } from "next/navigation";

export default function SettingsPage() {
  redirect("/settings/send-notification");
}
