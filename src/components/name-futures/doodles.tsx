export function DoodleGarden({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      viewBox="0 0 760 520"
      role="img"
      aria-label="Playful jungle animals and tropical leaves"
      className={compact ? "h-36 w-full" : "h-full min-h-72 w-full"}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7">
        <path d="M76 452c16-92 12-168-18-238M64 318c-38-4-57-29-58-70 42 5 62 27 58 70Zm8 27c41-20 70-11 89 27-43 17-72 8-89-27Z" />
        <path d="M670 451c-4-111 7-199 37-264M690 252c-32-17-40-45-23-83 38 20 45 47 23 83Zm-10 73c-42-9-67 7-77 49 45 7 71-9 77-49Z" />
        <path d="M135 414c4-90 15-167 34-232l42 7-3 87 49 130" />
        <path d="M157 181c-5-31 10-53 43-66 27 21 30 47 9 77" />
        <path d="M163 149l-20-28M202 127l19-25" />
        <path d="M173 223h20M170 257h23" strokeDasharray="1 19" />
        <path d="M340 398c-34-37-29-87 5-112 38-27 94-13 111 32 13 35-4 76-36 91" />
        <path d="M351 293l-10-34 36 19M431 286l26-25 3 40" />
        <circle cx="374" cy="332" r="4" fill="currentColor" />
        <circle cx="425" cy="332" r="4" fill="currentColor" />
        <path d="M390 356c10 8 19 8 29 0M389 350l14-7 15 7" />
        <path d="M516 405c-27-17-34-52-17-78 22-34 78-30 96 4 17 31 0 69-32 78" />
        <path d="M515 333c-28-11-38-31-27-58 29 3 45 18 48 46M574 324c8-28 26-39 55-32-1 28-18 44-51 49" />
        <path d="M530 367c16 13 32 14 49 1" />
        <path d="M281 111c0-22 28-27 38-9 10-18 38-13 38 9 0 20-38 42-38 42s-38-22-38-42Z" />
        <path d="M538 115c0-14 18-18 25-6 7-12 25-8 25 6 0 13-25 27-25 27s-25-14-25-27Z" />
        <path d="M89 95c15-38 43-56 84-53M119 74c-9-25-2-46 22-62 14 26 7 47-22 62Z" />
      </g>
    </svg>
  );
}