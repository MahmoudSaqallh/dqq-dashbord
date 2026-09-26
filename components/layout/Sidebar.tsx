"use client";

import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { NAV_ITEMS } from "@/lib/mock/nav";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils/cn";
import { Logo } from "./Logo";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarNavGroup } from "./SidebarNavGroup";

export function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = usePathname();
  const { t, dir } = useLanguage();

  const isChevronFlipped = dir === "rtl" ? !collapsed : collapsed;
  const mobileHiddenClass =
    dir === "rtl" ? "translate-x-full" : "-translate-x-full";

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 inset-s-0 z-50 flex h-full w-62 shrink-0 flex-col bg-white transition-transform duration-200 md:relative md:z-auto md:translate-x-0 md:transition-[width] md:duration-300 md:ease-in-out",
          mobileOpen ? "translate-x-0" : mobileHiddenClass,
          collapsed ? "md:w-19" : "md:w-62"
        )}
      >
        <div className="relative mt-4 flex h-16 items-center justify-center px-4 sm:mt-6">
          <Logo collapsed={collapsed} />

          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? t("header.expandSidebar") : t("header.collapseSidebar")}
            className="absolute top-1/2 -inset-e-3.5 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-8 ring-white transition-colors hover:bg-primary-600 md:flex"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", isChevronFlipped && "rotate-180")} />
          </button>
        </div>

        <nav
          className="scrollbar-none flex-1 space-y-0 overflow-y-auto px-3 py-4 lg:flex lg:flex-col lg:justify-between lg:space-y-4"
          onClick={onCloseMobile}
        >
          {NAV_ITEMS.map((item) => {
            if (item.children && item.children.length > 0) {
              const hasActiveChild = item.children.some((child) => pathname === child.href);
              const isOnOwnPage = pathname === item.href;
              return (
                <SidebarNavGroup
                  key={item.id}
                  item={item}
                  label={t(item.labelKey)}
                  childLabels={Object.fromEntries(item.children.map((child) => [child.id, t(child.labelKey)]))}
                  isChildActive={(href) => pathname === href}
                  isExpanded={hasActiveChild || isOnOwnPage}
                  collapsed={collapsed}
                  onNavigate={onCloseMobile}
                />
              );
            }

            return (
              <SidebarNavItem
                key={item.id}
                item={item}
                label={t(item.labelKey)}
                isActive={pathname === item.href}
                collapsed={collapsed}
              />
            );
          })}
        </nav>
      </aside>
    </>
  );
}
