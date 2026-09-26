import { cn } from "@/lib/utils/cn";

export function ToggleSwitch({
  checked,
  onChange,
  size = "md",
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-pill transition-colors",
        size === "md" ? "h-6 w-11" : "h-5 w-9",
        checked ? "bg-primary" : "bg-zinc-200"
      )}
    >
      <span
        className={cn(
          "inline-block rounded-full bg-white shadow transition-transform",
          size === "md" ? "h-4 w-4" : "h-3.5 w-3.5",
          checked
            ? size === "md"
              ? "translate-x-5 rtl:-translate-x-5"
              : "translate-x-4 rtl:-translate-x-4"
            : "translate-x-1 rtl:-translate-x-1"
        )}
      />
    </button>
  );
}
