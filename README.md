# Baby Perfect

*No name is ever good enough.*

A satirical baby-name "prospectus" built in one evening at the **Shark Tank: Most Unethical Hackathon & Pitch Competition** (SF Tech Week, October 2026), where it took **2nd place**.

- **Live demo:** https://name-futures.lovable.app
- **Case study:** https://charchika-sinha.vercel.app/projects/baby-perfect

## What it does

Parents enter a baby name and where the child will grow up. Baby Perfect answers with a fintech-style prospectus: a NameScore, a letter grade (D+ at best) and an analyst rating from "Sell" to "Junk Bond", plus cards for industry outlook, school, happiness, lifespan, love, power namesakes and a side-by-side comparison of the shortlist. Every name fails; the best you can hope for is "least bad".

A demo plan switch (Free / Paid 1 / Paid 2) shows the business model: locked cards blur behind upsells, and the love forecast sits behind the most expensive tier.

## Ground rules

- **Satire, not science.** All data is simulated except the list of US presidents.
- **No one is judged by who they are.** Scores come from a hash of the name (and area), never from a name's perceived ethnicity, gender, religion or origin. The same name always gets the same result.

## Built with

Lovable · Claude · React · TanStack Start · Tailwind CSS

## Run it locally

```bash
npm install
npm run dev
```

Forecast data lives in `src/data/providers.ts`; plan tiers and upsell copy live in `src/config/plans.ts`.

## Team

Charchika Sinha and team.
