/**
 * 规则式假数据生成纯逻辑(Node 可测,无 DOM)。
 *
 * 诚实定位:这是"规则 + 词表"的合成模式,不是 faker.js 式的仿真身份。
 * 邮箱一律落在保留域 example.com / example.net(RFC 2606),不会指向真实收件箱;
 * 姓名/公司/地址来自通用词表随机组合,用于测试与占位,不代表真实人物或地点。
 *
 * 确定性:传入相同 seed → 输出完全相同(可复现测试数据);省略 seed → 每次不同。
 * 非法类别 → null;count 取整后钳制到 1–50;非有限 count → null。
 */

export const FAKE_MIN = 1;
export const FAKE_MAX = 50;

export const FAKE_CATEGORIES = [
  "person", "company", "address", "lorem", "uuid", "color", "ip",
] as const;
export type FakeCategory = (typeof FAKE_CATEGORIES)[number];

export type FakeRow = Record<string, string>;

/* ------------------------------------------------------------------ */
/* 可复现 PRNG:mulberry32(32 位,快,统计性质够用)                    */
/* ------------------------------------------------------------------ */

export function mulberry32(seed: number): () => number {
  // 任意有限数 → 32 位种子(异或混合,避免 0.5、负数、大数直接截断退化)
  let a = 0;
  if (Number.isFinite(seed)) {
    a = Math.trunc(seed) | 0;
    a = Math.imul(a ^ (a >>> 16), 2246822507) | 0;
    a = Math.imul(a ^ (a >>> 13), 3266489909) | 0;
    a ^= a >>> 16;
  }
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ */
/* 词表:通用、可拼音化的英文名与常见词,不指向真实个人                  */
/* ------------------------------------------------------------------ */

const FIRST = [
  "Ava", "Ben", "Clara", "Dean", "Elena", "Felix", "Grace", "Hugo", "Iris", "Jonas",
  "Kira", "Liam", "Mona", "Nico", "Olga", "Pablo", "Quinn", "Rosa", "Sam", "Tessa",
  "Uma", "Viktor", "Wren", "Ximena", "Yara", "Zane", "Ada", "Boris", "Cleo", "Dario",
  "Edith", "Farid", "Greta", "Hana", "Ivan", "June", "Kofi", "Lena", "Marco", "Nora",
];

const LAST = [
  "Alvarez", "Baker", "Chen", "Dietrich", "Eriksen", "Fischer", "Garcia", "Hansen",
  "Ibrahim", "Jensen", "Keller", "Lindqvist", "Moreau", "Novak", "Okafor", "Petrov",
  "Quintero", "Rossi", "Silva", "Tanaka", "Ueda", "Vargas", "Weber", "Xu", "Yilmaz",
  "Zhang", "Aoki", "Bianchi", "Costa", "Duarte", "Egan", "Fontaine", "Gomez", "Haddad",
  "Ito", "Jokinen", "Kim", "Laurent", "Meyer", "Nakamura",
];

const COMPANY_A = ["Bright", "North", "Vertex", "Blue", "Core", "Loop", "Peak", "Star", "Nova", "Iron"];
const COMPANY_B = ["Labs", "Works", "Systems", "Digital", "Studio", "Forge", "Stack", "Line", "Wave", "Craft"];
const COMPANY_SUFFIX = ["Inc", "LLC", "GmbH", "Ltd", "Co"];
const MATERIAL = ["modular", "scalable", "reliable", "lightweight", "portable", "secure"];
const NOUN = ["toolkits", "workflows", "platforms", "pipelines", "dashboards", "interfaces"];

const STREET = [
  "Maple Street", "Cedar Avenue", "Harbor Lane", "Foundry Road", "Willow Court",
  "Beacon Street", "Granite Way", "Orchard Lane", "Summit Drive", "Meadow Row",
  "Cobble Street", "Juniper Avenue", "Lantern Way", "Quarry Road", "Alder Lane",
];

const CITY = [
  "Fairview", "Riverton", "Oakdale", "Millbrook", "Greystone",
  "Lakewood", "Hillcrest", "Stonebridge", "Clearwater", "Ashford",
  "Brookfield", "Elmwood", "Kingsport", "Newhaven", "Westfield",
];

const LOREM_WORDS = [
  "placeholder", "mockup", "wireframe", "draft", "layout", "sample", "template",
  "preview", "stub", "content", "brief", "outline", "spacing", "balance", "rhythm",
  "column", "margin", "baseline", "texture", "contrast", "accent", "structure",
];

const EXAMPLE_DOMAINS = ["example.com", "example.net"];

/* ------------------------------------------------------------------ */
/* 生成器                                                              */
/* ------------------------------------------------------------------ */

type Rng = () => number;

const intOf = (rng: Rng, min: number, max: number) => min + Math.floor(rng() * (max - min + 1));
const pickOf = <T,>(rng: Rng, arr: readonly T[]): T => arr[Math.floor(rng() * arr.length)];
const lower = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function personRow(rng: Rng): FakeRow {
  const first = pickOf(rng, FIRST);
  const last = pickOf(rng, LAST);
  const domain = pickOf(rng, EXAMPLE_DOMAINS);
  const n = intOf(rng, 1, 99);
  const styles = [
    `${lower(first)}.${lower(last)}${n}`,
    `${lower(first)}${lower(last)}`,
    `${lower(first[0])}${lower(last)}${intOf(rng, 10, 999)}`,
  ];
  return {
    firstName: first,
    lastName: last,
    fullName: `${first} ${last}`,
    email: `${styles[0]}@${domain}`,
    username: styles[intOf(rng, 0, 2)],
  };
}

function companyRow(rng: Rng): FakeRow {
  const a = pickOf(rng, COMPANY_A);
  const b = pickOf(rng, COMPANY_B);
  const name = `${a} ${b} ${pickOf(rng, COMPANY_SUFFIX)}`;
  const domain = `${lower(a)}${lower(b)}.example.com`;
  return {
    name,
    domain,
    email: `hello@${domain}`,
    catchPhrase: `${pickOf(rng, MATERIAL)} ${pickOf(rng, NOUN)}`,
    employees: String(intOf(rng, 2, 500)),
  };
}

function addressRow(rng: Rng): FakeRow {
  return {
    street: `${intOf(rng, 1, 9800)} ${pickOf(rng, STREET)}`,
    city: pickOf(rng, CITY),
    postalCode: String(intOf(rng, 1000, 99999)),
    country: pickOf(rng, ["United States", "Canada", "United Kingdom", "Australia", "Ireland"]),
  };
}

function loremRow(rng: Rng): FakeRow {
  const words = Array.from({ length: intOf(rng, 3, 6) }, () => pickOf(rng, LOREM_WORDS));
  const sentence =
    `${pickOf(rng, LOREM_WORDS)} ${words.slice(1).join(" ")} ` +
    `${pickOf(rng, ["fits the layout", "fills the column", "balances the grid", "marks the spot"])}.`;
  return { words: words.join(" "), sentence: sentence.charAt(0).toUpperCase() + sentence.slice(1) };
}

/** UUID v4 格式:版本位 4、变体位 8/9/a/b 按规范置位;随机性来自种子化 PRNG。 */
function uuidRow(rng: Rng): FakeRow {
  const hex = "0123456789abcdef";
  const g = () => Array.from({ length: 4 }, () => hex[intOf(rng, 0, 15)]).join("");
  const body = `${g()}${g()}-${g()}-4${g().slice(1)}-${pickOf(rng, ["8", "9", "a", "b"])}${g().slice(1)}-${g()}${g()}${g()}`;
  return { uuid: body };
}

function colorRow(rng: Rng): FakeRow {
  const h = () => intOf(rng, 0, 255).toString(16).padStart(2, "0");
  const r = intOf(rng, 0, 255), g = intOf(rng, 0, 255), b = intOf(rng, 0, 255);
  return {
    hex: `#${h()}${h()}${h()}`,
    rgb: `rgb(${r}, ${g}, ${b})`,
  };
}

function ipRow(rng: Rng): FakeRow {
  // 文档示例常用 TEST-NET-3(203.0.113.0/24)之外的一般私有序列会撞真实网段;
  // 这里取 1–223 首字节(排除组播/保留),仅作展示占位。
  const octet = (min: number, max: number) => String(intOf(rng, min, max));
  return { ipv4: `${octet(20, 220)}.${octet(0, 255)}.${octet(0, 255)}.${octet(1, 254)}` };
}

const GENERATORS: Record<FakeCategory, (rng: Rng) => FakeRow> = {
  person: personRow,
  company: companyRow,
  address: addressRow,
  lorem: loremRow,
  uuid: uuidRow,
  color: colorRow,
  ip: ipRow,
};

export type FakeDataOpts = { seed?: number };

/**
 * 生成 count 条假数据。非法类别或非有限 count → null;
 * count 取整后钳制到 1–50。相同 seed → 逐字节相同的输出。
 */
export function fakeData(
  category: string,
  count: number,
  opts: FakeDataOpts = {},
): FakeRow[] | null {
  if (!(FAKE_CATEGORIES as readonly string[]).includes(category)) return null;
  if (!Number.isFinite(count)) return null;
  const n = Math.min(FAKE_MAX, Math.max(FAKE_MIN, Math.trunc(count)));
  const rng = mulberry32(opts.seed ?? Date.now());
  const gen = GENERATORS[category as FakeCategory];
  return Array.from({ length: n }, () => gen(rng));
}

/* ------------------------------------------------------------------ */
/* 输出格式:JSON / CSV(RFC 4180)/ plain                              */
/* ------------------------------------------------------------------ */

function csvField(v: string): string {
  return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

/**
 * 格式化假数据行。items 为空数组时:json → "[]",csv/plain → ""。
 * 非法 format → null。
 */
export function formatFakeData(
  items: FakeRow[],
  format: string,
): string | null {
  if (format === "json") return JSON.stringify(items, null, 2);
  if (format === "csv") {
    if (items.length === 0) return "";
    const head = Object.keys(items[0]);
    const rows = items.map((r) => head.map((h) => csvField(r[h] ?? "")).join(","));
    return [head.join(","), ...rows].join("\r\n");
  }
  if (format === "plain") {
    return items.map((r) => Object.values(r).join(" | ")).join("\n");
  }
  return null;
}
