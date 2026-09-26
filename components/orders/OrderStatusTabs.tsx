"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils/cn";

export interface ResolvedOrderStatusTab {
  id: string;
  label: string;
  count: number;
}

const SCROLL_AMOUNT = 240;

export function OrderStatusTabs({ tabs }: { tabs: ResolvedOrderStatusTab[] }) {
  const { dir } = useLanguage();
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    function measure() {
      const button = buttonRefs.current[activeId];
      if (button) {
        setIndicator({ left: button.offsetLeft, width: button.offsetWidth });
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeId, tabs]);

  // Only show the scroll arrows when the tabs actually overflow their
  // container — on large screens where everything already fits on one line,
  // arrows that scroll nowhere are just visual noise.
  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    function checkOverflow() {
      if (!container) return;
      setCanScroll(container.scrollWidth > container.clientWidth + 1);
    }

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(container);
    return () => observer.disconnect();
  }, [tabs]);

  // "Back"/"forward" are logical (start/end), not literal left/right, so this
  // still points the right way when the page flips to RTL. Chromium/Firefox
  // both use negative scrollLeft values for RTL overflow, so the sign flips
  // relative to LTR.
  function scrollByDirection(directionSign: 1 | -1) {
    const container = scrollRef.current;
    if (!container) return;
    const effectiveSign = dir === "rtl" ? -directionSign : directionSign;
    container.scrollBy({ left: effectiveSign * SCROLL_AMOUNT, behavior: "smooth" });
  }

  return (
    <div className={cn("flex items-center gap-1 border-b border-zinc-100 pe-5", canScroll ? "ps-2" : "ps-5")}>
      {canScroll && (
        <button
          type="button"
          onClick={() => scrollByDirection(-1)}
          aria-label="Scroll tabs backward"
          className="flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="scrollbar-none relative flex flex-1 flex-nowrap items-center gap-5 overflow-x-auto scroll-smooth pb-3"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                buttonRefs.current[tab.id] = el;
              }}
              type="button"
              onClick={(event) => {
                setActiveId(tab.id);
                event.currentTarget.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }}
              className={cn(
                "flex shrink-0 items-center gap-1.5 whitespace-nowrap pb-2 text-sm font-medium transition-colors",
                isActive ? "text-primary" : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              {tab.label}
              <span
                dir="ltr"
                className="inline-flex h-5 min-w-5 items-center justify-center rounded-pill bg-primary-50 px-1.5 text-xs font-semibold text-primary-600"
              >
                {tab.count.toLocaleString("en-US")}
              </span>
            </button>
          );
        })}

        {indicator && (
          <span
            className="absolute bottom-0 h-0.5 rounded-full bg-primary transition-all duration-300 ease-in-out"
            style={{ left: indicator.left, width: indicator.width }}
          />
        )}
      </div>

      {canScroll && (
        <button
          type="button"
          onClick={() => scrollByDirection(1)}
          aria-label="Scroll tabs forward"
          className="flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
        >
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
        </button>
      )}
    </div>
  );
}
