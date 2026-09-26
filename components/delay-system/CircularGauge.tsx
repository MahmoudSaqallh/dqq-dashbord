"use client";

import { useEffect, useState } from "react";

export function CircularGauge({ percent, size = 60 }: { percent: number; size?: number }) {
  const target = Math.min(100, Math.max(0, percent));
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimatedPercent(target));
    return () => cancelAnimationFrame(frame);
  }, [target]);

  const strokeWidth = size >= 80 ? 7 : 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercent / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} className="fill-none stroke-zinc-100" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="fill-none stroke-primary transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-semibold text-primary-700"
        style={{ fontSize: size >= 80 ? 18 : 11 }}
      >
        {percent}%
      </span>
    </div>
  );
}
