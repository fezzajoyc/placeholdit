/**
 * 填充文案(filler text)生成纯逻辑(Node 可测,无 DOM)。
 *
 * 与经典 lorem ipsum 的区别:句式来自"开头语 + 主语 + 谓语 + 补足语"的模板组合,
 * 开头语池大,且强制相邻两句开头不同——读起来像真实排版的节奏,
 * 适合给客户看占位排版,而不是满屏 "Lorem ipsum"。
 *
 * 确定性:相同 seed → 完全相同输出。非法输入(非有限 count、空词表)→ null / 空串。
 */

import { mulberry32 } from "./fakedata";

export const FILLER_MAX_ITEMS = 50;
export type FillerFormat = "plain" | "markdown" | "html";

const OPENERS = [
  "Meanwhile,", "In practice,", "For now,", "Beyond that,", "At this point,",
  "Later on,", "In the meantime,", "From there,", "As a result,", "By contrast,",
  "Along the way,", "In the end,", "After that,", "Up close,", "On balance,",
  "Early on,", "Over time,", "In short,", "Step by step,", "Little by little,",
];

const SUBJECTS = [
  "the layout", "the draft", "the column", "the spacing", "the sample page",
  "the headline", "the footer", "the sidebar", "the grid", "the typeface",
  "the margin", "the team", "the preview", "the template", "the section",
  "the baseline grid", "the wireframe", "the cover page",
];

const VERBS = [
  "settles into", "grows toward", "holds", "carries", "frames",
  "shapes", "balances", "guides", "anchors", "supports",
  "keeps", "gains", "deserves", "needs", "takes on",
];

const OBJECTS = [
  "a steady rhythm", "its final shape", "a cleaner structure", "the reading flow",
  "a calmer tone", "the next revision", "a softer contrast", "every paragraph break",
  "the whole spread", "a consistent width", "the page margins", "its intended weight",
  "a natural pace", "the surrounding content", "a clearer hierarchy",
];

const TAILS = [
  "before the next pass", "until the copy lands", "under review", "for now",
  "without extra tweaks", "in the printed version", "on smaller screens",
  "once the images arrive", "with room to spare", "by the final deadline",
  "after a second look", "when the grid tightens up",
];

function sentence(rng: () => number, banks: {
  openers: string[]; subjects: string[]; verbs: string[]; objects: string[]; tails: string[];
}, lastOpener: string | null): { text: string; opener: string } {
  let opener = banks.openers[Math.floor(rng() * banks.openers.length)];
  // 变化性保证:相邻两句开头不得重复;极小池时退化允许
  let tries = 0;
  while (opener === lastOpener && banks.openers.length > 1 && tries < 8) {
    opener = banks.openers[Math.floor(rng() * banks.openers.length)];
    tries++;
  }
  const roll = rng();
  const core =
    `${banks.subjects[Math.floor(rng() * banks.subjects.length)]} ` +
    `${banks.verbs[Math.floor(rng() * banks.verbs.length)]} ` +
    `${banks.objects[Math.floor(rng() * banks.objects.length)]}`;
  const body = roll < 0.55 ? `${core} ${banks.tails[Math.floor(rng() * banks.tails.length)]}` : core;
  const text = `${opener} ${body}.`;
  return { text: text.charAt(0).toUpperCase() + text.slice(1), opener };
}

export type FillerOpts = {
  seed?: number;
  /** 每段句数(仅 paragraphs 用),钳制 1–10 */
  sentencesPerParagraph?: number;
};

/**
 * 生成 n 句填充文案(单个字符串,空格连接)。非有限/超界 count 钳制到 1–50。
 * count 非有限 → null。
 */
export function fillerSentences(count: number, opts: FillerOpts = {}): string | null {
  if (!Number.isFinite(count)) return null;
  const n = Math.min(FILLER_MAX_ITEMS, Math.max(1, Math.trunc(count)));
  const rng = mulberry32(opts.seed ?? Date.now());
  const banks = { openers: OPENERS, subjects: SUBJECTS, verbs: VERBS, objects: OBJECTS, tails: TAILS };
  const out: string[] = [];
  let last: string | null = null;
  for (let i = 0; i < n; i++) {
    const s = sentence(rng, banks, last);
    out.push(s.text);
    last = s.opener;
  }
  return out.join(" ");
}

/**
 * 生成 n 段填充文案。每段句数钳制 1–10;段与段之间同一种子流连续取词,
 * 相同 seed 输出完全相同。count 非有限 → null。
 */
export function fillerParagraphs(count: number, opts: FillerOpts = {}): string[] | null {
  if (!Number.isFinite(count)) return null;
  const n = Math.min(FILLER_MAX_ITEMS, Math.max(1, Math.trunc(count)));
  const per = Math.min(10, Math.max(1, Math.trunc(opts.sentencesPerParagraph ?? 4)));
  const rng = mulberry32(opts.seed ?? Date.now());
  const banks = { openers: OPENERS, subjects: SUBJECTS, verbs: VERBS, objects: OBJECTS, tails: TAILS };
  const paragraphs: string[] = [];
  let last: string | null = null;
  for (let p = 0; p < n; p++) {
    const lines: string[] = [];
    for (let i = 0; i < per; i++) {
      const s = sentence(rng, banks, last);
      lines.push(s.text);
      last = s.opener;
    }
    paragraphs.push(lines.join(" "));
  }
  return paragraphs;
}

/** 段落数组 → 目标格式。plain/markdown 用空行分隔,html 输出 <p> 标签。 */
export function formatFiller(paragraphs: string[], format: string): string | null {
  if (format === "plain" || format === "markdown") return paragraphs.join("\n\n");
  if (format === "html") return paragraphs.map((p) => `<p>${p}</p>`).join("\n");
  return null;
}
