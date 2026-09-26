export function SaudiFlagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 20" className={className} aria-hidden="true">
      <rect width="28" height="20" rx="2" fill="#006C35" />
      <text x="14" y="10.5" textAnchor="middle" fontSize="3.6" fill="white">
        لا إله إلا الله محمد رسول الله
      </text>
      <path d="M6 14.5 H20 L18 16 H8 Z" fill="white" />
      <path d="M20 14.5 L23 13.7 L20 16 Z" fill="white" />
    </svg>
  );
}
