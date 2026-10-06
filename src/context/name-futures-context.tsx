import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import type { PlanId } from "@/config/plans";

type NameFuturesContextValue = {
  plan: PlanId;
  setPlan: (plan: PlanId) => void;
  shortlist: string[];
  addName: (name: string) => void;
  removeName: (name: string) => void;
};

const NameFuturesContext = createContext<NameFuturesContextValue | undefined>(undefined);

export function NameFuturesProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanId>("free");
  const [shortlist, setShortlist] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      plan,
      setPlan,
      shortlist,
      addName: (rawName: string) => {
        const name = rawName.trim();
        if (!name) return;
        setShortlist((current) =>
          current.some((item) => item.toLocaleLowerCase() === name.toLocaleLowerCase())
            ? current
            : [...current, name].slice(-3),
        );
      },
      removeName: (name: string) =>
        setShortlist((current) => current.filter((item) => item !== name)),
    }),
    [plan, shortlist],
  );

  return <NameFuturesContext.Provider value={value}>{children}</NameFuturesContext.Provider>;
}

export function useNameFutures() {
  const value = useContext(NameFuturesContext);
  if (!value) throw new Error("useNameFutures must be used within NameFuturesProvider");
  return value;
}