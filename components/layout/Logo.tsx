import Image from "next/image";
import Link from "next/link";

const LOGO_WIDTH = 153;
const LOGO_HEIGHT = 54;
const DISPLAY_HEIGHT = 36;
const DISPLAY_WIDTH = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * DISPLAY_HEIGHT);

export function Logo({ collapsed }: { collapsed?: boolean }) {
  return (
    <Link
      href="/"
      className="relative block shrink-0 overflow-hidden rounded-lg transition-[width] duration-300 ease-in-out"
      style={{ height: DISPLAY_HEIGHT, width: collapsed ? DISPLAY_HEIGHT : DISPLAY_WIDTH }}
    >
      <Image
        src="/nav-logo.webp"
        alt="DQQ AI"
        fill
        sizes={`${DISPLAY_WIDTH}px`}
        className="object-cover object-left"
        priority
      />
      <span
        aria-hidden="true"
        className="animate-logo-shine pointer-events-none absolute inset-y-0 inset-s-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />
    </Link>
  );
}
