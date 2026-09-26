import Link from "next/link";
import { Info } from "lucide-react";

export function RepairInfoBanner({ message, linkLabel }: { message: string; linkLabel: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-info-bg px-4 py-3 text-sm text-zinc-700">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" />
      <p>
        {message}{" "}
        <Link href="/return-requests" className="font-semibold text-primary-700 hover:underline">
          {linkLabel}
        </Link>
      </p>
    </div>
  );
}
