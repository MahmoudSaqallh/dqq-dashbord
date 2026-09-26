import { UserCog } from "lucide-react";
import { SectionCard } from "./SectionCard";

export function AssignedEmployeeCard({
  title,
  assignedEmployee,
  unassignedLabel,
}: {
  title: string;
  assignedEmployee: string | null;
  unassignedLabel: string;
}) {
  return (
    <SectionCard
      icon={UserCog}
      title={title}
      headerAction={<span className="text-sm text-zinc-400">{assignedEmployee ?? unassignedLabel}</span>}
    />
  );
}
