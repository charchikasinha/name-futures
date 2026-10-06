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
  industry: "Unlock their future corner office — upgrade to Plus",
  happiness: "Unlock the vibes desk — upgrade to Plus",
  power: "Unlock their campaign strategy — upgrade to Plus",
  lifespan: "Unlock the actuarial gossip — upgrade to Premium",
  love: "Unlock your baby's love life — upgrade to Premium",
  compare: "Put the shortlist on the scales — upgrade to Premium",
};

export function canAccess(plan: PlanId, feature: ForecastFeature) {
  return PLAN_CONFIG[plan].level >= PLAN_CONFIG[FEATURE_TIER[feature]].level;
}