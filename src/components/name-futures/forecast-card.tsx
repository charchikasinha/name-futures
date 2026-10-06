import { LockKeyhole } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { FEATURE_TIER, PLAN_CONFIG, UPGRADE_COPY, canAccess, type ForecastFeature } from "@/config/plans";
import { useNameFutures } from "@/context/name-futures-context";
import { cn } from "@/lib/utils";

export function ForecastCard({
  feature,
  eyebrow,
  title,
  source,
  className,
  children,
}: {
  feature: ForecastFeature;
  eyebrow: string;
  title: string;
  source: string;
  className?: string;
  children: ReactNode;
}) {
  const { plan, setPlan } = useNameFutures();
  const unlocked = canAccess(plan, feature);
  const required = FEATURE_TIER[feature];
  return (
    <article className={cn("forecast-card relative flex min-h-72 flex-col overflow-hidden", className)}>
      <div className={cn("flex h-full flex-1 flex-col p-5 sm:p-6", !unlocked && "select-none blur-locked")} aria-hidden={!unlocked}>
        <p className="data-label">{eyebrow}</p>
        <h2 className="mt-1 font-display text-2xl font-black text-primary sm:text-3xl">{title}</h2>
        <div className="mt-5 flex flex-1 flex-col">{children}</div>
        <p className="mt-6 border-t border-primary/15 pt-3 text-[10px] font-semibold text-muted-foreground">Source: {source}</p>
      </div>
      {!unlocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface/55 p-5 backdrop-blur-[2px]">
          <div className="max-w-xs text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full border-2 border-primary bg-secondary text-primary shadow-pop">
              <LockKeyhole className="size-5" />
            </span>
            <p className="mt-4 font-display text-xl font-black leading-tight text-primary">{UPGRADE_COPY[feature]}</p>
            <Button className="mt-4 rounded-full" onClick={() => setPlan(required)}>
              Switch to {PLAN_CONFIG[required].nickname}
            </Button>
          </div>
        </div>
      )}
    </article>
  );
}