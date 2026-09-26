import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";

const Y_TICKS = [2, 2, 1, 1, 0];
const CHART_WIDTH = 560;
const CHART_HEIGHT = 140;
const POINT_COUNT = 7;

export function TransitionTrendCard({ title, dataPointsLabel }: { title: string; dataPointsLabel: string }) {
  const stepX = CHART_WIDTH / (POINT_COUNT - 1);
  const baselineY = CHART_HEIGHT - 4;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900">{title}</p>
          <p className="mt-1 text-xs text-zinc-400">{dataPointsLabel}</p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
          <TrendingUp className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <div className="flex flex-col justify-between py-1 text-xs text-zinc-400">
          {Y_TICKS.map((tick, index) => (
            <span key={index}>{tick}</span>
          ))}
        </div>

        <div className="scrollbar-none min-w-0 flex-1 overflow-x-auto">
          <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="h-36 w-full min-w-[400px]">
            {Y_TICKS.map((_, index) => (
              <line
                key={index}
                x1={0}
                x2={CHART_WIDTH}
                y1={(index / (Y_TICKS.length - 1)) * (CHART_HEIGHT - 10)}
                y2={(index / (Y_TICKS.length - 1)) * (CHART_HEIGHT - 10)}
                className="stroke-zinc-100"
                strokeWidth={1}
              />
            ))}

            <line x1={0} x2={CHART_WIDTH} y1={baselineY} y2={baselineY} className="stroke-primary" strokeWidth={2} />

            {Array.from({ length: POINT_COUNT }).map((_, index) => (
              <circle key={index} cx={index * stepX} cy={baselineY} r={4} className="fill-primary" />
            ))}
          </svg>
        </div>
      </div>
    </Card>
  );
}
