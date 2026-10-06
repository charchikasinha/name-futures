export type IndustryScore = { label: string; score: number };

const PRESIDENTS = [
  "George Washington", "John Adams", "Thomas Jefferson", "James Madison", "James Monroe",
  "John Quincy Adams", "Andrew Jackson", "Martin Van Buren", "William Henry Harrison",
  "John Tyler", "James K. Polk", "Zachary Taylor", "Millard Fillmore", "Franklin Pierce",
  "James Buchanan", "Abraham Lincoln", "Andrew Johnson", "Ulysses S. Grant",
  "Rutherford B. Hayes", "James A. Garfield", "Chester A. Arthur", "Grover Cleveland",
  "Benjamin Harrison", "William McKinley", "Theodore Roosevelt", "William Howard Taft",
  "Woodrow Wilson", "Warren G. Harding", "Calvin Coolidge", "Herbert Hoover",
  "Franklin D. Roosevelt", "Harry S. Truman", "Dwight D. Eisenhower", "John F. Kennedy",
  "Lyndon B. Johnson", "Richard Nixon", "Gerald Ford", "Jimmy Carter", "Ronald Reagan",
  "George H. W. Bush", "Bill Clinton", "George W. Bush", "Barack Obama", "Donald Trump",
  "Joe Biden",
] as const;

const COMPATIBLE_NAMES = [
  "Avery", "Milo", "Sage", "Riley", "Nora", "Theo", "Juniper", "Ellis", "Cleo", "Remy",
  "Iris", "August", "Wren", "Rowan", "Luca", "Maeve", "Quinn", "Otis",
];

export function stableHash(value: string) {
  let hash = 2166136261;
  for (const char of value.toLocaleLowerCase().trim()) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function metric(seed: string, min: number, max: number) {
  return min + (stableHash(seed) % (max - min + 1));
}

export function getNameScore(name: string, area: string) {
  return metric(`score:${name}:${area}`, 58, 96);
}

export function getGrade(score: number) {
  if (score >= 90) return "A+";
  if (score >= 84) return "A";
  if (score >= 76) return "B+";
  if (score >= 68) return "B";
  return "C+";
}

export function getRating(score: number) {
  if (score >= 84) return "Strong Buy";
  if (score >= 70) return "Hold";
  return "Speculative";
}

export function getCareerData(name: string) {
  const industries = ["Tech", "Finance", "Law", "Medicine", "Creative / Arts", "Politics"].map(
    (label) => ({ label, score: metric(`career:${name}:${label}`, 43, 97) }),
  );
  const headlines = [
    "Founder · Ex-Unicorn · Thought Leader",
    "Chief Vibes Officer · Keynote Pending",
    "Partner · Amateur Ceramicist · Disruptor",
    "Building quietly · Posting loudly",
  ];
  return {
    industries,
    headline: headlines[metric(`headline:${name}`, 0, headlines.length - 1)] ?? headlines[0],
    cSuiteCount: metric(`csuite:${name}`, 8, 812),
  };
}

export function getSchoolData(name: string, area: string) {
  return {
    academicScore: metric(`school:${name}:${area}`, 61, 96),
    reading: metric(`reading:${area}`, 68, 96),
    math: metric(`math:${area}`, 64, 94),
    giftedProgram: metric(`gifted:${area}`, 72, 99),
    collisions: Number((metric(`collision:${name}:${area}`, 0, 32) / 10).toFixed(1)),
  };
}

export function getLifespanData(name: string) {
  const years = metric(`lifespan:${name}`, 79, 101);
  const quips = [
    "Enough time to reinvent brunch twice.",
    "Long enough to complain about six new technologies.",
    "A durable asset with excellent grandparent upside.",
  ];
  return { years, quip: quips[stableHash(name) % quips.length] ?? quips[0] };
}

export function getHappinessData(name: string) {
  const score = metric(`happy:${name}`, 62, 98);
  const mood = score >= 88 ? "Unreasonably sunny" : score >= 76 ? "Good snack energy" : "Quietly thriving";
  return { score, mood };
}

export function getLoveData(name: string) {
  const start = stableHash(`love:${name}`) % COMPATIBLE_NAMES.length;
  return {
    probability: metric(`romance:${name}`, 63, 97),
    matches: [0, 1, 2].map((offset) => COMPATIBLE_NAMES[(start + offset * 5) % COMPATIBLE_NAMES.length] ?? "Avery"),
  };
}

export function getOfficeholders(name: string, area: string) {
  const firstName = name.trim().split(/\s+/)[0]?.toLocaleLowerCase() ?? "";
  const presidents = PRESIDENTS.filter(
    (president) => president.split(" ")[0]?.toLocaleLowerCase() === firstName,
  );
  const surnames = ["Santos", "Patel", "Nguyen", "Brooks", "Kim", "Rivera", "Okafor", "Chen"];
  const roles = ["Mayor", "Governor", "Council Member"];
  const count = metric(`officials:${name}:${area}`, 1, 3);
  const locals = Array.from({ length: count }, (_, index) => ({
    name: `${name.split(" ")[0]} ${surnames[metric(`${area}:${index}`, 0, surnames.length - 1)]}`,
    role: roles[index] ?? "Council Member",
  }));
  return {
    presidents,
    locals,
    odds: `1 in ${metric(`president:${name}`, 42000, 990000).toLocaleString("en-US")}`,
  };
}

export function getForecast(name: string, area: string) {
  const score = getNameScore(name, area);
  return {
    score,
    grade: getGrade(score),
    rating: getRating(score),
    career: getCareerData(name),
    school: getSchoolData(name, area),
    lifespan: getLifespanData(name),
    happiness: getHappinessData(name),
    love: getLoveData(name),
    power: getOfficeholders(name, area),
  };
}