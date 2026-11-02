import { z } from "zod";
import { PLACEHOLDER_MAX, placeholderSvg } from "../tools/_lib/placeholder";
import { fakeData, formatFakeData, FAKE_CATEGORIES } from "../tools/_lib/fakedata";
import { logoSvg, LOGO_SHAPES, LOGO_MIN_SIZE, LOGO_MAX_SIZE } from "../tools/_lib/logo";
import { fillerSentences, fillerParagraphs, formatFiller } from "../tools/_lib/filler";

/**
 * Placeholdit MCP 工具注册表:把 tools/_lib 的纯函数暴露为 AI 可执行工具。
 * 站上的同名工具在浏览器里跑(交互式),这里跑同一份经过测试的实现——
 * 人和 AI 用同一套逻辑,而不是两套各写各的。
 */

const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });
const err = (t: string) => ({ content: [{ type: "text" as const, text: t }], isError: true as const });

export type McpToolDef = {
  name: string;
  title: string;
  description: string;
  schema: Record<string, any>;
  run: (args: any) => { content: { type: "text"; text: string }[]; isError?: boolean };
};

export const MCP_TOOLS: McpToolDef[] = [
  {
    name: "placeholder_svg",
    title: "Placeholder image SVG",
    description:
      `Generate a placeholder image as an SVG string: dimensions 1–${PLACEHOLDER_MAX}px each, #RGB/#RRGGBB background and text colors, an optional centered label (empty = "W×H") and an optional corner radius (clamped to half the shorter side). Pure string output — no network, no upload.`,
    schema: {
      width: z.number().int().min(1).max(PLACEHOLDER_MAX).describe("image width in px"),
      height: z.number().int().min(1).max(PLACEHOLDER_MAX).describe("image height in px"),
      bg: z.string().describe("background color, #RGB or #RRGGBB"),
      color: z.string().describe("text color, #RGB or #RRGGBB"),
      text: z.string().default("").describe("centered label; empty uses WIDTH×HEIGHT"),
      radius: z.number().min(0).default(0).describe("corner radius in px, clamped to min(w,h)/2"),
    },
    run: (a) => {
      const svg = placeholderSvg({
        width: a.width,
        height: a.height,
        bg: a.bg,
        color: a.color,
        text: a.text ?? "",
        radius: a.radius ?? 0,
      });
      return svg ? text(svg) : err("invalid input: dimensions must be 1–5000 and colors #RGB or #RRGGBB");
    },
  },
  {
    name: "fake_data",
    title: "Fake test data",
    description:
      "Generate rule-based fake data for tests and mockups: person, company, address, filler words, uuid (v4 layout), color (hex+rgb) or ip. Rule-based patterns, NOT realistic identities — emails always use the reserved example.com/example.net domains. Same numeric seed reproduces the exact same rows.",
    schema: {
      category: z.enum(FAKE_CATEGORIES).describe("which kind of rows to generate"),
      count: z.number().int().min(1).max(50).describe("rows to generate, 1–50"),
      seed: z.number().optional().describe("optional seed for reproducible output"),
      format: z.enum(["json", "csv", "plain"]).default("json").describe("output serialization"),
    },
    run: (a) => {
      const rows = fakeData(a.category, a.count, { seed: a.seed });
      if (!rows) return err(`unknown category: ${a.category}`);
      const out = formatFakeData(rows, a.format ?? "json");
      return out === null ? err(`unknown format: ${a.format}`) : text(out);
    },
  },
  {
    name: "logo_svg",
    title: "Single-letter dummy logo",
    description:
      "Generate a minimal single-letter logo as SVG: one character (first grapheme; CJK and emoji work) centered on a circle, square, triangle or hexagon backdrop with your colors. Quick marks for MVPs and staging — not a replacement for a designed logo.",
    schema: {
      letter: z.string().min(1).describe("character to feature; only the first grapheme is used"),
      shape: z.enum(LOGO_SHAPES),
      fg: z.string().describe("letter color, #RGB or #RRGGBB"),
      bg: z.string().describe("backdrop color, #RGB or #RRGGBB"),
      size: z.number().int().min(LOGO_MIN_SIZE).max(LOGO_MAX_SIZE).default(128).describe("square canvas size in px"),
    },
    run: (a) => {
      const svg = logoSvg(a.letter, a.shape, a.fg, a.bg, a.size ?? 128);
      return svg
        ? text(svg)
        : err("invalid input: letter must have at least one character, colors must be #RGB/#RRGGBB, size 16–1024");
    },
  },
  {
    name: "filler_text",
    title: "Varied filler text",
    description:
      "Filler sentences or paragraphs with VARIED openers — deliberately not a repeated Lorem ipsum. Optional seed makes output deterministic (same seed → same text). Formats: plain, markdown (blank-line separated) or html (<p> wrapped). For layouts and demos, not publishable copy.",
    schema: {
      mode: z.enum(["sentences", "paragraphs"]).default("paragraphs"),
      count: z.number().int().min(1).max(50).describe("number of sentences or paragraphs, 1–50"),
      sentences_per_paragraph: z.number().int().min(1).max(10).default(4).describe("paragraphs mode only"),
      seed: z.number().optional().describe("optional seed for reproducible output"),
      format: z.enum(["plain", "markdown", "html"]).default("plain"),
    },
    run: (a) => {
      if (a.mode === "sentences") {
        const s = fillerSentences(a.count, { seed: a.seed });
        return s === null ? err("invalid count") : text(s);
      }
      const ps = fillerParagraphs(a.count, {
        seed: a.seed,
        sentencesPerParagraph: a.sentences_per_paragraph ?? 4,
      });
      if (!ps) return err("invalid count");
      const out = formatFiller(ps, a.format ?? "plain");
      return out === null ? err(`unknown format: ${a.format}`) : text(out);
    },
  },
];
