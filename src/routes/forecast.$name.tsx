import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, BriefcaseBusiness, Building2, Crown, Heart, HeartHandshake, MapPin, Scale, Sparkles } from "lucide-react";

import { Gauge, ScoreBars } from "@/components/name-futures/charts";
import { DoodleGarden } from "@/components/name-futures/doodles";
import { ForecastCard } from "@/components/name-futures/forecast-card";
import { Button } from "@/components/ui/button";
import { useNameFutures } from "@/context/name-futures-context";
import { getForecast, getNameScore } from "@/data/providers";

export const Route = createFileRoute("/forecast/$name")({
  validateSearch: (search) => ({
    area: typeof search["area"] === "string" && search["area"].trim() ? search["area"] : "Somewhere promising",
  }),
  head: ({ params }) => {
    const label = decodeURIComponent(params.name);
    return {
      meta: [
        { title: `${label} Name Prospectus — Name Futures` },
        { name: "description", content: `Career, classroom, happiness and power projections for ${label}. Satire, not science.` },
        { property: "og:title", content: `${label}: the official-ish Name Prospectus` },
        { property: "og:description", content: "A wildly confident forecast of one baby's future name performance." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ForecastPage,
});

function ForecastPage() {
  const { name: rawName } = Route.useParams();
  const { area } = Route.useSearch();
  const name = decodeURIComponent(rawName);
  const data = getForecast(name, area);
  const { shortlist, addName } = useNameFutures();
  const compareNames = Array.from(new Set([name, ...shortlist])).slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-4 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border-2 border-primary bg-primary p-6 text-primary-foreground shadow-pop-lg sm:p-9 lg:p-12">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_.6fr]">
          <div>
            <p className="font-script text-2xl text-secondary sm:text-3xl">Official-ish name prospectus</p>
            <h1 className="mt-2 break-words font-display text-5xl font-black leading-none sm:text-7xl lg:text-8xl">{name}</h1>
            <p className="mt-5 flex items-center gap-2 text-sm font-extrabold uppercase text-primary-foreground/75"><MapPin className="size-4 text-accent" /> Forecast market: {area}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-2xl bg-surface px-5 py-4 text-primary shadow-pop"><span className="data-label block">NameScore</span><strong className="font-display text-5xl font-black">{data.score}</strong><span className="font-black">/100</span></div>
              <div className="rounded-2xl bg-secondary px-5 py-4 text-primary shadow-pop"><span className="data-label block">letter grade</span><strong className="font-display text-5xl font-black">{data.grade}</strong></div>
              <div className="rounded-2xl bg-accent px-5 py-4 text-accent-foreground shadow-pop"><span className="block text-[10px] font-black uppercase tracking-widest">analyst rating</span><strong className="font-display text-2xl font-black sm:text-3xl">{data.rating}</strong></div>
            </div>
          </div>
          <div className="hidden text-secondary lg:block"><DoodleGarden compact /></div>
        </div>
        <Sparkles className="absolute right-8 top-8 size-9 rotate-12 text-accent" />
      </section>

      <div className="mt-9 grid gap-6 lg:grid-cols-2">
        <ForecastCard feature="industry" eyebrow="professional upside" title="Industry outlook" source="LinkedIn-style professional dataset (simulated)" className="lg:row-span-2">
          <ScoreBars values={data.career.industries} />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Stat icon={<BriefcaseBusiness />} label="Most likely LinkedIn headline" value={data.career.headline} />
            <Stat icon={<Building2 />} label="Namesakes in the C-suite" value={data.career.cSuiteCount.toLocaleString("en-US")} />
          </div>
        </ForecastCard>

        <ForecastCard feature="school" eyebrow="early indicators" title="School" source="local school data (simulated)">
          <div className="grid grid-cols-[auto_1fr] items-center gap-5">
            <div className="grid size-24 place-items-center rounded-full border-[10px] border-secondary bg-primary font-display text-3xl font-black text-primary-foreground">{data.school.academicScore}</div>
            <div><p className="text-xs font-black uppercase text-muted-foreground">Academic outlook</p><p className="mt-1 font-display text-xl font-black text-primary">Top-of-the-fridge potential</p></div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <MiniStat label="Reading" value={`${data.school.reading}%`} />
            <MiniStat label="Math" value={`${data.school.math}%`} />
            <MiniStat label="Gifted access" value={`${data.school.giftedProgram}%`} />
          </div>
          <p className="mt-4 rounded-xl bg-secondary p-3 text-sm font-extrabold text-primary">Name collisions per classroom: <span className="text-xl">{data.school.collisions}</span></p>
        </ForecastCard>

        <ForecastCard feature="happiness" eyebrow="emotional dividends" title="Happiness" source="vibes index and playground sentiment (simulated)">
          <Gauge value={data.happiness.score} />
          <p className="mt-3 text-center font-script text-2xl text-primary">{data.happiness.mood}</p>
        </ForecastCard>

        <ForecastCard feature="lifespan" eyebrow="long position" title="Lifespan" source="actuarial tea leaves (simulated)">
          <Gauge value={data.lifespan.years} suffix=" yrs" />
          <p className="mt-4 text-center text-sm font-bold text-muted-foreground">{data.lifespan.quip}</p>
        </ForecastCard>

        <ForecastCard feature="love" eyebrow="romantic liquidity" title="Will they find love?" source="meet-cute probability engine (simulated)">
          <div className="flex items-center gap-4"><HeartHandshake className="size-14 text-accent" /><div><strong className="font-display text-5xl font-black text-primary">{data.love.probability}%</strong><p className="text-xs font-bold text-muted-foreground">probability of an excellent plus-one</p></div></div>
          <p className="mt-5 text-xs font-black uppercase text-muted-foreground">Most compatible names</p>
          <div className="mt-2 flex flex-wrap gap-2">{data.love.matches.map((match) => <span key={match} className="rounded-full bg-secondary px-3 py-2 text-sm font-extrabold text-primary"><Heart className="mr-1 inline size-3 fill-current" />{match}</span>)}</div>
        </ForecastCard>

        <ForecastCard feature="power" eyebrow="executive branch energy" title="Power namesakes" source="US presidents list + local news (simulated)">
          <div className="flex items-start gap-4"><Crown className="mt-1 size-10 text-accent" /><div><p className="text-xs font-black uppercase text-muted-foreground">Presidential matches</p><p className="font-display text-xl font-black text-primary">{data.power.presidents.length ? data.power.presidents.join(", ") : "No precedent. Pioneer pricing applies."}</p></div></div>
          <div className="mt-4 space-y-2">{data.power.locals.map((person) => <div key={`${person.name}-${person.role}`} className="flex justify-between rounded-lg bg-secondary/60 px-3 py-2 text-sm"><strong>{person.name}</strong><span>{person.role} · {area}</span></div>)}</div>
          <p className="mt-4 text-sm font-black text-primary">Odds of becoming president: <span className="text-accent">{data.power.odds}</span></p>
        </ForecastCard>

        <ForecastCard feature="compare" eyebrow="premium weighing room" title="Compare names" source="Name Futures proprietary scales (deeply simulated)" className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-3">{compareNames.map((candidate, index) => { const score = getNameScore(candidate, area); return <div key={candidate} className={`rounded-2xl border-2 border-primary p-4 text-center ${index === 1 ? "sm:translate-y-5" : ""}`}><Scale className="mx-auto size-7 text-accent" /><p className="mt-2 truncate font-display text-xl font-black text-primary">{candidate}</p><p className="font-display text-4xl font-black text-primary">{score}</p><div className="mx-auto mt-3 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-accent" style={{ width: `${score}%` }} /></div></div>; })}</div>
          {compareNames.length < 2 && <p className="mt-6 text-center text-sm font-bold text-muted-foreground">Add more names to your shortlist to create unnecessary tension.</p>}
        </ForecastCard>
      </div>

      <div className="mt-10 flex justify-center"><Button variant="outline" size="lg" className="rounded-full" asChild><Link to="/" onClick={() => addName(name)}><ArrowLeft /> Try another name</Link></Button></div>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-xl bg-secondary/60 p-3 text-primary"><div className="mb-2">{icon}</div><p className="text-[10px] font-black uppercase text-muted-foreground">{label}</p><p className="mt-1 text-sm font-extrabold leading-snug">{value}</p></div>;
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-primary/20 p-2"><strong className="block text-lg text-primary">{value}</strong><span className="text-[9px] font-black uppercase text-muted-foreground">{label}</span></div>;
}