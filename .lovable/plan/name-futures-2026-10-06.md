# Name Futures

## Experience
- Replace the starter screen with a polished two-page baby-name forecasting app.
- Build the home form with required first name and area fields, optional middle/last name fields, removable shortlist chips, name selection, and a playful staged loading sequence before navigation.
- Build `/forecast/:name?area=` as a responsive prospectus with a large identity header, NameScore, grade, analyst rating, all seven requested forecast cards, and a return action.
- Keep the demo-plan control visible on both pages and persist it during navigation. Locked sections remain recognizable beneath humorous upgrade prompts that activate the required tier.

## Forecast model
- Create one provider module for deterministic career, school, lifespan, happiness, love, officeholder, and comparison results.
- Derive values only from stable lowercase name/area hashes, neutral length/popularity-style signals, and exact first-name matches against an included US presidents list.
- Keep tier entitlements and upgrade copy in one configuration module so the demo plans are easy to adjust.

## Visual direction
- Establish a warm blush, cobalt, coral, candy-pink, and cream token system with rounded geometric headings and brush-script accents.
- Add an original reusable SVG doodle scene featuring tropical foliage, hearts, and playful jungle animals without borrowing any brand assets.
- Use bold outlined surfaces, compact market-style charts, gauges, restrained motion, and mobile layouts designed for a live hackathon demo.

## Technical details
- Use the existing TanStack Router setup for `/` and add `forecast.$name.tsx` for `/forecast/:name`; preserve query parameters with route validation.
- Add a React context for the in-memory demo plan and shortlist, mounted in the shared root layout.
- Add focused tests for deterministic scoring and tier access, plus route coverage for the forecast URL.
- Add unique metadata for both pages and replace template metadata.
- Validate the final flow in the browser at desktop and phone sizes, including form submission, loading copy, locked upgrades, and shortlist comparison.

## Assumptions
- “React Router” means the project’s existing React routing system, TanStack Router, rather than adding a second routing library.
- Local school and officeholder details are clearly labeled simulated; US president first-name matches use a real embedded president list.
- The plan toggle persists while the app is open, not across a browser refresh, because the requested storage is React state/context only.