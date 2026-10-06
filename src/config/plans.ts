export type PlanId = "free" | "plus" | "premium";

export const PLAN_ORDER: PlanId[] = ["free", "plus", "premium"];

export const PLAN_CONFIG = {
  free: { label: "Free", nickname: "Peek", level: 0 },
  plus: { label: "Paid 1", nickname: "Plus", level: 1 },
  premium: { label: "Paid 2", nickname: "Premium", level: 2 },
} satisfies Record<PlanId, { label: string; nickname: string; level: number }>;

export type ForecastFeature =
  | "school"
  | "industry"
  | "happiness"
  | "power"
  | "lifespan"
  | "love"
  | "compare";

export const FEATURE_TIER: Record<ForecastFeature, PlanId> = {
  school: "free",
  industry: "plus",
  happiness: "plus",
  power: "plus",
  lifespan: "premium",
  love: "premium",
  compare: "premium",
};

export const UPGRADE_COPY: Record<ForecastFeature, string> = {
  school: "Unlock the report card — start peeking",
  industry: "Unlock their future cubicle — upgrade to Plus",
  happiness: "Unlock the disappointing vibes desk — upgrade to Plus",
  power: "Unlock their doomed campaign strategy — upgrade to Plus",
  lifespan: "Unlock the actuarial bad news — upgrade to Premium",
  love: "Unlock your baby's romantic long shots — upgrade to Premium",
  compare: "Find the least bad option — upgrade to Premium",
};

export function canAccess(plan: PlanId, feature: ForecastFeature) {
  return PLAN_CONFIG[plan].level >= PLAN_CONFIG[FEATURE_TIER[feature]].level;
}