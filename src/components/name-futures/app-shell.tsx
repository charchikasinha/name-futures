import { Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { PLAN_CONFIG, PLAN_ORDER, type PlanId } from "@/config/plans";
import { useNameFutures } from "@/context/name-futures-context";
import { cn } from "@/lib/utils";

export function PlanToggle() {
  const { plan, setPlan } = useNameFutures();
  return (
    <div className="flex items-center gap-2" aria-label="Demo plan">
      <span className="hidden text-xs font-extrabold uppercase tracking-widest text-primary sm:block">Demo plan</span>
      <div className="flex rounded-full border-2 border-primary bg-surface p-1 shadow-pop" role="group">
        {PLAN_ORDER.map((id) => (
          <Button
            key={id}
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setPlan(id)}
            aria-pressed={plan === id}
            className={cn(
              "h-auto rounded-full border-0 px-2.5 py-1.5 text-xs shadow-none sm:px-3.5",
              plan === id ? "bg-primary text-primary-foreground" : "text-primary hover:bg-secondary",
            )}
          >
            {PLAN_CONFIG[id].label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-primary" aria-label="Name Futures home">
          <span className="flex size-10 rotate-3 items-center justify-center rounded-xl border-2 border-primary bg-accent text-accent-foreground shadow-pop">
            <Scale className="size-5" strokeWidth={3} />
          </span>
          <span className="font-display text-lg font-black sm:text-xl">Name Futures</span>
        </Link>
        <PlanToggle />
      </header>
      {children}
      <footer className="relative z-10 mx-auto max-w-7xl border-t-2 border-primary/20 px-5 py-7 text-center text-sm font-semibold text-primary/80 lg:px-8">
        For entertainment only. Not science. Please name your baby whatever you love.
      </footer>
    </div>
  );
}