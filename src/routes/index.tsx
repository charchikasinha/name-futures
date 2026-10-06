import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Plus, Sparkles, X } from "lucide-react";
import { useState, type FormEvent } from "react";

import { DoodleGarden } from "@/components/name-futures/doodles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNameFutures } from "@/context/name-futures-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Name Futures — Weigh every name before it's forever" },
      { name: "description", content: "Run an absurdly confident life forecast for your baby's future name." },
      { property: "og:title", content: "Name Futures — Baby names, professionally overanalyzed" },
      { property: "og:description", content: "Career upside, classroom collisions, romance odds and more. Not science." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { shortlist, addName, removeName } = useNameFutures();
  const [first, setFirst] = useState("");
  const [middle, setMiddle] = useState("");
  const [last, setLast] = useState("");
  const [area, setArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState("");
  const loadingLines = ["Consulting LinkedIn…", "Polling the school board…", "Asking past mayors…"];

  const fullName = [first, middle, last].map((part) => part.trim()).filter(Boolean).join(" ");

  async function runForecast(name: string) {
    if (!name.trim() || !area.trim()) {
      setError("A first name and future hometown are required by our analysts.");
      return;
    }
    addName(name);
    setError("");
    setLoading(true);
    for (let step = 0; step < loadingLines.length; step += 1) {
      setLoadingStep(step);
      await new Promise((resolve) => window.setTimeout(resolve, 520));
    }
    await navigate({ to: "/forecast/$name", params: { name }, search: { area: area.trim() } });
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void runForecast(fullName);
  }

  return (
    <main className="relative mx-auto max-w-7xl px-5 pb-16 pt-6 lg:px-8 lg:pt-12">
      <div className="absolute left-1/2 top-0 -z-0 h-96 w-screen -translate-x-1/2 border-y-2 border-primary bg-primary" />
      <section className="relative z-10 grid min-h-[34rem] items-center gap-8 lg:grid-cols-[1.08fr_.92fr]">
        <div className="py-10 lg:py-16">
          <p className="font-script text-3xl text-secondary">A highly serious forecast</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-black leading-[.94] text-primary-foreground sm:text-7xl lg:text-8xl">
            Weigh every name before it's forever.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-bold leading-relaxed text-primary-foreground/80 sm:text-xl">
            Career trajectory. Classroom saturation. Romantic liquidity. Finally, due diligence for the biggest naming decision of your quarter.
          </p>
          <p className="data-label mt-8 text-accent">career · school · happiness · love</p>
        </div>
        <div className="relative hidden h-[31rem] text-secondary lg:block">
          <DoodleGarden />
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-2 grid max-w-6xl gap-6 lg:grid-cols-[1fr_.42fr]">
        <form onSubmit={submit} className="forecast-card p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="data-label">open a position</p>
              <h2 className="font-display text-3xl font-black text-primary sm:text-4xl">Try out a name</h2>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-primary">No commitment. Yet.</span>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <label className="field-label sm:col-span-2">Baby's first name <span>*</span><Input value={first} onChange={(e) => setFirst(e.target.value)} placeholder="e.g. Mabel" autoComplete="given-name" required /></label>
            <label className="field-label">Middle name <em>optional</em><Input value={middle} onChange={(e) => setMiddle(e.target.value)} placeholder="The plot twist" autoComplete="additional-name" /></label>
            <label className="field-label">Last name <em>optional</em><Input value={last} onChange={(e) => setLast(e.target.value)} placeholder="The family brand" autoComplete="family-name" /></label>
            <label className="field-label sm:col-span-2">Where will they grow up? <span>*</span><Input value={area} onChange={(e) => setArea(e.target.value)} placeholder="City or ZIP" required /></label>
          </div>
          {error && <p role="alert" className="mt-3 text-sm font-bold text-destructive">{error}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button" variant="outline" className="rounded-full" onClick={() => addName(fullName)} disabled={!first.trim()}><Plus /> Add to shortlist</Button>
            <Button type="submit" size="lg" className="rounded-full px-7">Run the forecast <ArrowRight /></Button>
          </div>
        </form>

        <aside className="forecast-card bg-secondary p-6">
          <p className="data-label">your watchlist</p>
          <h2 className="mt-1 font-display text-2xl font-black text-primary">Shortlist</h2>
          <p className="mt-2 text-sm font-semibold text-primary/70">Up to three promising name assets.</p>
          <div className="mt-5 flex flex-col gap-2">
            {shortlist.length === 0 ? <p className="rounded-xl border-2 border-dashed border-primary/30 p-5 text-sm font-bold text-primary/55">Your portfolio is suspiciously empty.</p> : shortlist.map((name) => (
              <div key={name} className="flex items-center gap-2 rounded-xl border-2 border-primary bg-surface p-2 shadow-pop">
                <button type="button" className="min-w-0 flex-1 truncate text-left font-extrabold text-primary" onClick={() => { setFirst(name); void runForecast(name); }}>{name}</button>
                <Button type="button" size="icon" variant="ghost" className="size-8 rounded-full" onClick={() => removeName(name)} aria-label={`Remove ${name}`}><X /></Button>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {loading && <div className="fixed inset-0 z-50 grid place-items-center bg-primary/95 p-5" role="status" aria-live="polite"><div className="text-center text-primary-foreground"><Sparkles className="mx-auto size-12 animate-pulse text-accent" /><p className="mt-6 font-script text-3xl text-secondary">Running the numbers</p><p className="mt-3 font-display text-2xl font-black sm:text-4xl">{loadingLines[loadingStep]}</p><div className="mx-auto mt-6 h-2 w-64 overflow-hidden rounded-full bg-primary-foreground/20"><div className="h-full bg-accent transition-all duration-500" style={{ width: `${((loadingStep + 1) / loadingLines.length) * 100}%` }} /></div></div></div>}
    </main>
  );
}
