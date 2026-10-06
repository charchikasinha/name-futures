type DoodleGardenProps = {
  compact?: boolean;
  surface?: "blue" | "blush";
};

export function DoodleGarden({ compact = false, surface = "blue" }: DoodleGardenProps) {
  const plantFill = surface === "blue" ? "fill-primary-foreground" : "fill-primary";
  const plantLine = surface === "blue" ? "stroke-secondary" : "stroke-primary-foreground";
  const heartFill = surface === "blue" ? "fill-secondary" : "fill-primary";

  return (
    <svg
      viewBox="0 0 760 520"
      role="img"
      aria-label="Playful filled jungle animals, hearts, and tropical leaves"
      className={compact ? "h-36 w-full" : "h-full min-h-72 w-full"}
    >
      <g className={`${plantFill} ${plantLine}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
        <path d="M61 457c10-70 8-134-7-191l14-3c17 61 19 126 8 196Z" />
        <path d="M60 323C22 315 5 288 8 247c39 6 59 31 52 76Z" />
        <path d="M70 355c40-25 72-19 96 18-39 25-71 19-96-18Z" />
        <path d="M683 457c-5-76 4-146 28-211l14 5c-23 62-32 131-27 207Z" />
        <path d="M708 300c-31-23-34-52-10-87 34 25 37 54 10 87Z" />
        <path d="M700 357c-43-13-72 1-87 42 43 12 72-2 87-42Z" />
        <path d="M110 131c18-45 51-66 99-61-20 42-53 62-99 61Z" />
        <path d="M137 104c-10-31 0-57 31-76 15 32 5 57-31 76Z" />
        <path d="M621 128c-11-37 3-66 41-86 12 39-2 67-41 86Z" />
      </g>

      <g className={`${heartFill} stroke-accent`} strokeWidth="3" strokeLinejoin="round">
        <path d="M284 94c0-23 29-29 40-9 11-20 40-14 40 9 0 22-40 45-40 45s-40-23-40-45Z" />
        <path d="M535 87c0-14 18-18 25-6 7-12 25-8 25 6 0 14-25 28-25 28s-25-14-25-28Z" />
        <path d="M676 145c0-10 13-13 18-4 5-9 18-6 18 4 0 10-18 20-18 20s-18-10-18-20Z" />
      </g>

      {/* giraffe */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path className="fill-secondary stroke-primary-foreground" strokeWidth="5" d="M123 430c10-79 12-139 5-181l19-64c4-18 19-31 38-31 25 0 42 22 37 46l-13 57 38 170h-26l-48-151-8 154Z" />
        <path className="fill-secondary stroke-primary-foreground" strokeWidth="5" d="M147 177c-6-31 12-57 46-66 30 19 34 48 10 72Z" />
        <path className="stroke-accent" strokeWidth="8" d="m163 139-11-25m41 19 17-24" />
        <g className="fill-accent">
          <path d="m145 218 18-10 13 18-18 15Z" /><path d="m154 260 20 4-3 23-21-2Z" /><path d="m151 313 22-8 9 20-23 10Z" /><path d="m185 205 18 5-5 21-17-4Z" />
        </g>
        <circle className="fill-primary" cx="177" cy="157" r="4" />
      </g>

      {/* leopard */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path className="fill-secondary stroke-primary-foreground" strokeWidth="5" d="M281 385c-7-49 27-87 80-87 57 0 91 31 87 82l-22 40h-29l10-34c-28 15-58 16-88 3l-4 32h-29Z" />
        <path className="fill-secondary stroke-primary-foreground" strokeWidth="5" d="M298 311 284 276l38 16m91 8 35-28-2 45" />
        <path className="stroke-accent" strokeWidth="5" d="M443 361c35 3 47 23 35 59" />
        <g className="fill-accent">
          <circle cx="329" cy="338" r="8" /><circle cx="371" cy="320" r="7" /><circle cx="409" cy="347" r="9" /><circle cx="355" cy="373" r="6" /><circle cx="396" cy="385" r="6" />
        </g>
        <circle className="fill-primary" cx="330" cy="322" r="4" /><circle className="fill-primary" cx="386" cy="319" r="4" />
        <path className="fill-accent stroke-accent" strokeWidth="3" d="m351 338 11-7 11 7-11 9Z" />
      </g>

      {/* hippo */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path className="fill-secondary stroke-primary-foreground" strokeWidth="5" d="M485 378c0-49 37-79 89-79 55 0 92 33 88 82l-17 40h-31l7-30c-27 13-58 14-91 2l-6 28h-31Z" />
        <circle className="fill-secondary stroke-primary-foreground" strokeWidth="5" cx="541" cy="306" r="15" /><circle className="fill-secondary stroke-primary-foreground" strokeWidth="5" cx="612" cy="307" r="15" />
        <path className="fill-accent" d="M529 356c20 15 70 15 89 0-4 31-82 32-89 0Z" />
        <circle className="fill-primary" cx="550" cy="335" r="4" /><circle className="fill-primary" cx="600" cy="335" r="4" />
        <circle className="fill-secondary" cx="554" cy="368" r="4" /><circle className="fill-secondary" cx="594" cy="368" r="4" />
      </g>

      {/* crocodile and monkey peeking through */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path className="fill-secondary stroke-primary-foreground" strokeWidth="5" d="M238 455c53-36 105-38 157-7l56-20-30 31 31 18-61-3c-48 24-99 20-153-19Z" />
        <path className="stroke-accent" strokeWidth="5" d="m279 448 14 12 14-13 14 13 14-12" />
        <circle className="fill-primary" cx="374" cy="450" r="4" />
        <circle className="fill-secondary stroke-primary-foreground" strokeWidth="5" cx="520" cy="190" r="47" />
        <circle className="fill-secondary stroke-primary-foreground" strokeWidth="5" cx="475" cy="190" r="23" />
        <circle className="fill-secondary stroke-primary-foreground" strokeWidth="5" cx="565" cy="190" r="23" />
        <path className="fill-accent" d="M486 211c20 20 50 20 69 0-6 35-62 35-69 0Z" />
        <circle className="fill-primary" cx="505" cy="181" r="5" /><circle className="fill-primary" cx="537" cy="181" r="5" />
      </g>
    </svg>
  );
}

export function EdgeDoodles({ side = "left" }: { side?: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 150 420"
      className={`pointer-events-none absolute top-28 -z-0 hidden h-[26rem] w-32 opacity-90 xl:block ${side === "left" ? "-left-28" : "-right-28 -scale-x-100"}`}
    >
      <g className="fill-primary stroke-primary-foreground" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M76 420c-2-99 8-190 31-273l13 4c-22 81-31 171-29 269Z" />
        <path d="M105 233c-48-14-72-43-70-87 49 12 72 41 70 87Z" />
        <path d="M94 298c-38-4-65 15-80 57 43 4 70-15 80-57Z" />
      </g>
      <path className="fill-primary stroke-accent" strokeWidth="3" d="M26 73c0-15 19-19 26-6 7-13 26-9 26 6 0 14-26 30-26 30S26 87 26 73Z" />
      <path className="fill-secondary stroke-accent" strokeWidth="3" d="M52 345c0-13 16-16 22-5 6-11 22-8 22 5 0 12-22 25-22 25s-22-13-22-25Z" />
    </svg>
  );
}