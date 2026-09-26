"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full gap-6 overflow-hidden bg-page">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />
      <div className="flex min-w-0 min-h-0 flex-1 flex-col gap-4 px-4 pt-4 pb-4 sm:gap-6 sm:px-6 sm:pt-6 sm:pb-6">
        <Header onOpenMenu={() => setMobileMenuOpen(true)} />
        <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
