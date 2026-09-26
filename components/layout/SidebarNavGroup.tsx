import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/lib/mock/types";

export function SidebarNavGroup({
  item,
  label,
  childLabels,
  isChildActive,
  isExpanded,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  label: string;
  childLabels: Record<string, string>;
  isChildActive: (href: string) => boolean;
  isExpanded: boolean;
  collapsed: boolean;
  onNavigate: () => void;
}) {
  const Icon = item.icon;

  return (
    <div>
      <Link
        href={item.href}
        onClick={onNavigate}
        title={collapsed ? label : undefined}
        className={cn(
          "group flex w-full items-center gap-3 overflow-hidden rounded-lg px-4 py-3 text-sm font-medium transition-colors",
          isExpanded
            ? "bg-primary text-primary-foreground"
            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
          collapsed && "justify-center px-2"
        )}
      >
        <Icon
          className={cn(
            "h-4.5 w-4.5 shrink-0",
            isExpanded ? "text-primary-foreground" : "text-zinc-400 group-hover:text-zinc-600"
          )}
        />
        <span
          className={cn(
            "truncate text-start transition-all duration-200 ease-in-out",
            collapsed ? "max-w-0 opacity-0" : "max-w-40 flex-1 opacity-100"
          )}
        >
          {label}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-all duration-200 ease-in-out",
            collapsed ? "max-w-0 opacity-0" : "max-w-4 opacity-100",
            isExpanded && "rotate-180",
            isExpanded ? "text-primary-foreground" : "text-zinc-300"
          )}
        />
      </Link>

      {!collapsed && isExpanded && item.children && (
        <div className="mt-1 flex flex-col gap-2 ps-8.5">
          {item.children.map((child) => {
            const active = isChildActive(child.href);
            return (
              <Link
                key={child.id}
                href={child.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-2 truncate rounded-lg px-3 py-2 text-start text-sm transition-colors",
                  active ? "font-semibold text-primary" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                )}
              >
                <span
                  className={cn("h-1.5 w-1.5 shrink-0 rounded-full", active ? "bg-primary" : "bg-transparent")}
                />
                <span className="truncate">{childLabels[child.id]}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
