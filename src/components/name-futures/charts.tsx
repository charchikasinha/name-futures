export function ScoreBars({ values }: { values: { label: string; score: number }[] }) {
  return (
    <div className="space-y-3">
      {values.map((value) => (
        <div key={value.label} className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-2 text-xs font-extrabold">
          <span>{value.label}</span>
          <div className="h-3 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary" style={{ width: `${value.score}%` }} />
          </div>
          <span className="text-right text-primary">{value.score}</span>
        </div>
      ))}
    </div>
  );
}

export function Gauge({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const degrees = Math.max(0, Math.min(100, value)) * 1.8;
  return (
    <div className="relative mx-auto h-32 w-64 max-w-full overflow-hidden">
      <div className="absolute inset-x-2 top-2 aspect-[2/1] rounded-t-full border-[18px] border-b-0 border-secondary" />
      <div
        className="absolute bottom-0 left-1/2 h-1.5 w-[43%] origin-left rounded-full bg-primary"
        style={{ transform: `rotate(${degrees + 180}deg)` }}
      />
      <div className="absolute bottom-0 left-1/2 size-5 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent" />
      <div className="absolute inset-x-0 bottom-1 text-center font-display text-4xl font-black text-primary">
        {value}<span className="text-lg">{suffix}</span>
      </div>
    </div>
  );
}