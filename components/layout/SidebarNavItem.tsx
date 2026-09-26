import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/lib/mock/types";

export function SidebarNavItem({
  item,
  label,
  isActive,
  collapsed,
}: {
  item: NavItem;
  label: string;
  isActive: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      title={collapsed ? label : undefined}
      className={cn(
        "group flex items-center gap-3 overflow-hidden rounded-lg px-4 py-5 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon
        className={cn(
          "h-[18px] w-[18px] shrink-0",
          isActive ? "text-primary-foreground" : "text-zinc-400 group-hover:text-zinc-600"
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
      {item.hasChildren && (
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 transition-all duration-200 ease-in-out rtl:rotate-180",
            collapsed ? "max-w-0 opacity-0" : "max-w-4 opacity-100",
            isActive ? "text-primary-foreground" : "text-zinc-300"
          )}
        />
      )}
    </Link>
  );
}
