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
  return metric(`score:${name}:${area}`, 4, 38);
}

export function getGrade(score: number) {
  if (score >= 30) return "D+";
  if (score >= 22) return "D";
  if (score >= 13) return "D-";
  return "F";
}

export function getRating(score: number) {
  if (score >= 28) return "Sell";
  if (score >= 16) return "Strong Sell";
  return "Junk Bond";
}

export function getCareerData(name: string) {
  const industries = ["Tech", "Finance", "Law", "Medicine", "Creative / Arts", "Politics"].map(
    (label) => ({ label, score: metric(`career:${name}:${label}`, 3, 35) }),
  );
  const headlines = [
    "Open to work · Open to anything",
    "Aspiring Influencer (est. 2041)",
    "Reply-all specialist",
    "Interim Assistant to the Regional Intern",
  ];
  const headline = headlines[metric(`headline:${name}`, 0, headlines.length - 1)] ?? "Open to work · Open to anything";
  return {
    industries,
    headline,
    cSuiteCount: metric(`csuite:${name}`, 0, 3),
  };
}

export function getSchoolData(name: string, area: string) {
  return {
    academicScore: metric(`school:${name}:${area}`, 8, 40),
    reading: metric(`reading:${area}`, 18, 48),
    math: metric(`math:${area}`, 14, 45),
    giftedProgram: metric(`gifted:${area}`, 9, 39),
    collisions: metric(`collision:${name}:${area}`, 3, 9),
  };
}

export function getLifespanData(name: string) {
  const years = metric(`lifespan:${name}`, 58, 71);
  const quips = [
    "Peaks early. Plans accordingly.",
    "Will outlive their houseplants, barely.",
    "Enough time to unsubscribe from almost everything.",
  ];
  return { years, quip: quips[stableHash(name) % quips.length] ?? quips[0] };
}

export function getHappinessData(name: string) {
  const score = metric(`happy:${name}`, 5, 35);
  const moods = ["Mildly damp", "Permanent Monday", "Cautiously disappointed"];
  const mood = moods[stableHash(`mood:${name}`) % moods.length] ?? "Cautiously disappointed";
  return { score, mood };
}

export function getLoveData(name: string) {
  const start = stableHash(`love:${name}`) % COMPATIBLE_NAMES.length;
  return {
    probability: metric(`romance:${name}`, 2, 24),
    matches: [0, 1, 2].map((offset) => COMPATIBLE_NAMES[(start + offset * 5) % COMPATIBLE_NAMES.length] ?? "Avery"),
  };
}

export function getOfficeholders(name: string, area: string) {
  const firstName = name.trim().split(/\s+/)[0]?.toLocaleLowerCase() ?? "";
  const displayFirstName = firstName ? `${firstName.charAt(0).toLocaleUpperCase()}${firstName.slice(1)}` : "Baby";
  const presidents = PRESIDENTS.filter(
    (president) => president.split(" ")[0]?.toLocaleLowerCase() === firstName,
  );
  const surnames = ["Santos", "Patel", "Nguyen", "Brooks", "Kim", "Rivera", "Okafor", "Chen"];
  const roles = ["Mayor", "Governor", "Council Member"];
  const count = metric(`officials:${name}:${area}`, 1, 3);
  const locals = Array.from({ length: count }, (_, index) => ({
    name: `${displayFirstName} ${surnames[metric(`${area}:${index}`, 0, surnames.length - 1)]}`,
    role: roles[index] ?? "Council Member",
  }));
  return {
    presidents,
    locals,
    odds: `1 in ${metric(`president:${name}`, 20_000_000, 900_000_000).toLocaleString("en-US")}`,
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