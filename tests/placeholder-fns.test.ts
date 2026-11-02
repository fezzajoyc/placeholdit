import { describe, expect, it } from "vitest";
import {
  PLACEHOLDER_MAX,
  placeholderSvg,
  placeholderUrlPattern,
  isHexColor,
} from "@/tools/_lib/placeholder";
import {
  fakeData,
  formatFakeData,
  mulberry32,
  FAKE_CATEGORIES,
  FAKE_MAX,
  FAKE_MIN,
} from "@/tools/_lib/fakedata";
import { logoSvg, LOGO_SHAPES, LOGO_MIN_SIZE, LOGO_MAX_SIZE, LOGO_PALETTES } from "@/tools/_lib/logo";
import { fillerSentences, fillerParagraphs, formatFiller } from "@/tools/_lib/filler";

/* ------------------------------------------------------------------ */
/* placeholderSvg: dimensions, colors, escaping, radius, validity      */
/* ------------------------------------------------------------------ */

const BASE = { width: 800, height: 400, bg: "#111827", color: "#ffffff", text: "" };

describe("placeholderSvg: radius", () => {
  it("omits rx for radius 0 and undefined", () => {
    expect(placeholderSvg(BASE)!).not.toContain("rx=");
    expect(placeholderSvg({ ...BASE, radius: 0 })!).not.toContain("rx=");
  });

  it("emits rx/ry for a positive radius", () => {
    const svg = placeholderSvg({ ...BASE, radius: 24 })!;
    expect(svg).toContain('rx="24"');
    expect(svg).toContain('ry="24"');
  });

  it("clamps radius to half the shorter side (full pill)", () => {
    const svg = placeholderSvg({ ...BASE, radius: 9999 })!;
    expect(svg).toContain('rx="200"');
  });

  it("treats negative and non-finite radius as square", () => {
    expect(placeholderSvg({ ...BASE, radius: -5 })!).not.toContain("rx=");
    expect(placeholderSvg({ ...BASE, radius: Number.NaN })!).not.toContain("rx=");
  });

  it("still accepts radius without changing the dimension contract", () => {
    const svg = placeholderSvg({ width: 120, height: 120, bg: "#fff", color: "#000", text: "A", radius: 60 })!;
    expect(svg).toContain('width="120"');
    expect(svg).toContain('rx="60"');
  });
});

describe("placeholderSvg: validity matrix", () => {
  it("rejects 0, negative and >5000 dimensions", () => {
    expect(placeholderSvg({ ...BASE, width: 0 })).toBeNull();
    expect(placeholderSvg({ ...BASE, height: -1 })).toBeNull();
    expect(placeholderSvg({ ...BASE, width: PLACEHOLDER_MAX + 1 })).toBeNull();
    expect(placeholderSvg({ ...BASE, width: PLACEHOLDER_MAX })).not.toBeNull();
  });

  it("rejects non-finite and fractional-rounding dimensions via Math.round", () => {
    expect(placeholderSvg({ ...BASE, width: Number.NaN })).toBeNull();
    expect(placeholderSvg({ ...BASE, height: Infinity })).toBeNull();
    expect(placeholderSvg({ ...BASE, width: 600.4 })!).toContain('width="600"');
  });

  it("rejects bad colors and non-string colors", () => {
    expect(placeholderSvg({ ...BASE, bg: "blue" })).toBeNull();
    expect(placeholderSvg({ ...BASE, color: "#12345" })).toBeNull();
    expect(placeholderSvg({ ...BASE, color: undefined as unknown as string })).toBeNull();
  });

  it("survives extreme text lengths without NaN font sizes (1×1 included)", () => {
    const tiny = placeholderSvg({ width: 1, height: 1, bg: "#000", color: "#fff", text: "X".repeat(40) })!;
    const size = Number(/font-size="([\d.]+)"/.exec(tiny)![1]);
    expect(Number.isFinite(size)).toBe(true);
    expect(size).toBeGreaterThanOrEqual(1);
  });
});

describe("placeholderUrlPattern", () => {
  it("builds a placehold.co-style route with lowercase hex", () => {
    expect(placeholderUrlPattern({ ...BASE })).toBe("/800x400/111827/ffffff");
  });

  it("appends encoded text and radius as query params", () => {
    expect(
      placeholderUrlPattern({ ...BASE, text: "Hello World", radius: 24 }),
    ).toBe("/800x400/111827/ffffff?text=Hello%20World&radius=24");
  });

  it("keeps 3-digit hex and skips empty text", () => {
    expect(placeholderUrlPattern({ ...BASE, bg: "#abc", color: "#000", text: "  " })).toBe(
      "/800x400/abc/000",
    );
  });

  it("shares the svg validation contract", () => {
    expect(placeholderUrlPattern({ ...BASE, width: 0 })).toBeNull();
    expect(placeholderUrlPattern({ ...BASE, bg: "red" })).toBeNull();
  });
});

describe("isHexColor", () => {
  it("accepts #RGB and #RRGGBB, rejects everything else", () => {
    expect(isHexColor("#abc")).toBe(true);
    expect(isHexColor("#a1B2c3")).toBe(true);
    expect(isHexColor("abc")).toBe(false);
    expect(isHexColor("#abcd")).toBe(false);
    expect(isHexColor("")).toBe(false);
    expect(isHexColor(123 as unknown as string)).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/* fakeData: seeded determinism, bounds, format shapes                 */
/* ------------------------------------------------------------------ */

describe("fakeData: seeded determinism", () => {
  it("same seed → byte-identical rows; different seed → different rows", () => {
    const a = fakeData("person", 10, { seed: 42 })!;
    const b = fakeData("person", 10, { seed: 42 })!;
    const c = fakeData("person", 10, { seed: 43 })!;
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
    expect(JSON.stringify(a)).not.toBe(JSON.stringify(c));
  });

  it("without a seed the generator still yields valid rows", () => {
    const rows = fakeData("person", 3)!;
    expect(rows).toHaveLength(3);
    for (const r of rows) expect(r.email).toMatch(/@example\.(com|net)$/);
  });

  it("PRNG stays in [0,1) and is stable", () => {
    const rng = mulberry32(1234);
    const first = rng();
    expect(first).toBeGreaterThanOrEqual(0);
    expect(first).toBeLessThan(1);
    expect(mulberry32(1234)()).toBe(first);
  });
});

describe("fakeData: count bounds and category validation", () => {
  it("clamps counts into 1–50", () => {
    expect(fakeData("uuid", 0, { seed: 1 })!).toHaveLength(FAKE_MIN);
    expect(fakeData("uuid", -7, { seed: 1 })!).toHaveLength(FAKE_MIN);
    expect(fakeData("uuid", 1000, { seed: 1 })!).toHaveLength(FAKE_MAX);
    expect(fakeData("uuid", 25.9, { seed: 1 })!).toHaveLength(25);
  });

  it("returns null for non-finite counts and unknown categories", () => {
    expect(fakeData("person", Number.NaN)).toBeNull();
    expect(fakeData("person", Infinity)).toBeNull();
    expect(fakeData("nope", 5, { seed: 1 })).toBeNull();
    expect(fakeData("", 5, { seed: 1 })).toBeNull();
  });

  it("covers every documented category with a complete field set", () => {
    const expectedKeys: Record<string, string[]> = {
      person: ["firstName", "lastName", "fullName", "email", "username"],
      company: ["name", "domain", "email", "catchPhrase", "employees"],
      address: ["street", "city", "postalCode", "country"],
      lorem: ["words", "sentence"],
      uuid: ["uuid"],
      color: ["hex", "rgb"],
      ip: ["ipv4"],
    };
    expect([...FAKE_CATEGORIES].sort()).toEqual(Object.keys(expectedKeys).sort());
    for (const cat of FAKE_CATEGORIES) {
      const rows = fakeData(cat, 5, { seed: 9 })!;
      for (const r of rows) {
        expect(Object.keys(r).sort()).toEqual([...expectedKeys[cat]].sort());
        for (const v of Object.values(r)) expect(typeof v).toBe("string");
      }
    }
  });

  it("produces valid v4-shaped UUIDs with correct version and variant bits", () => {
    for (const r of fakeData("uuid", 20, { seed: 5 })!) {
      expect(r.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    }
  });

  it("produces hex colors and dotted-quad IPv4", () => {
    for (const r of fakeData("color", 20, { seed: 5 })!) {
      expect(r.hex).toMatch(/^#[0-9a-f]{6}$/);
      expect(r.rgb).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
    }
    for (const r of fakeData("ip", 20, { seed: 5 })!) {
      const octets = r.ipv4.split(".").map(Number);
      expect(octets).toHaveLength(4);
      expect(octets[0]).toBeGreaterThanOrEqual(20);
      expect(octets[0]).toBeLessThanOrEqual(220);
      for (const o of octets) expect(o).toBeLessThanOrEqual(255);
    }
  });
});

describe("formatFakeData", () => {
  it("json pretty-prints rows", () => {
    const rows = fakeData("color", 2, { seed: 1 })!;
    const out = formatFakeData(rows, "json")!;
    expect(JSON.parse(out)).toEqual(rows);
  });

  it("csv emits an RFC-4180 header, CRLF rows and quotes embedded commas", () => {
    const rows = [{ hex: "#fff000", rgb: "rgb(1, 2, 3)" }];
    const out = formatFakeData(rows, "csv")!;
    expect(out).toBe('hex,rgb\r\n#fff000,"rgb(1, 2, 3)"');
  });

  it("doubles quotes inside csv fields", () => {
    const out = formatFakeData([{ a: 'say "hi"' }], "csv")!;
    expect(out).toContain('"say ""hi"""');
  });

  it("plain joins values with a pipe per row", () => {
    const out = formatFakeData([{ a: "1", b: "2" }, { a: "3", b: "4" }], "plain")!;
    expect(out).toBe("1 | 2\n3 | 4");
  });

  it("empty input and unknown formats behave", () => {
    expect(formatFakeData([], "json")).toBe("[]");
    expect(formatFakeData([], "csv")).toBe("");
    expect(formatFakeData([], "plain")).toBe("");
    expect(formatFakeData([{ a: "1" }], "xml")).toBeNull();
  });
});

/* ------------------------------------------------------------------ */
/* logoSvg: letter rendering, shapes, SVG validity                     */
/* ------------------------------------------------------------------ */

describe("logoSvg", () => {
  it("renders each shape as a valid standalone SVG with the letter", () => {
    for (const shape of LOGO_SHAPES) {
      const svg = logoSvg("P", shape, "#ffffff", "#7c5cff", 128)!;
      expect(svg.startsWith("<svg")).toBe(true);
      expect(svg.endsWith("</svg>")).toBe(true);
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(svg).toContain('width="128"');
      expect(svg).toContain('height="128"');
      expect(svg).toContain('viewBox="0 0 128 128"');
      expect(svg).toContain('fill="#7c5cff"');
      expect(svg).toContain('fill="#ffffff"');
      expect(svg).toContain(">P</text>");
    }
    expect(logoSvg("P", "circle", "#ffffff", "#7c5cff")!).toContain("<circle");
    expect(logoSvg("P", "square", "#ffffff", "#7c5cff")!).toContain("<rect");
    expect(logoSvg("P", "triangle", "#ffffff", "#7c5cff")!).toContain("<polygon");
    expect(logoSvg("P", "hex", "#ffffff", "#7c5cff")!).toContain("<polygon");
  });

  it("sinks the text center for triangles (visual centroid), not for circles", () => {
    expect(logoSvg("P", "triangle", "#fff", "#000")!).toContain('y="79.4"');
    expect(logoSvg("P", "circle", "#fff", "#000")!).toContain('y="64.0"');
  });

  it("takes only the first grapheme, including CJK and emoji", () => {
    expect(logoSvg("AB", "circle", "#fff", "#000")!).toContain(">A</text>");
    const cjk = logoSvg("占位", "circle", "#fff", "#000")!;
    expect(cjk).toContain(">占</text>");
    const emoji = logoSvg("🚀x", "circle", "#fff", "#000")!;
    expect(emoji).toContain(">🚀</text>");
  });

  it("escapes XML specials in the letter and aria-label", () => {
    const svg = logoSvg("<", "circle", "#fff", "#000")!;
    expect(svg).toContain("&lt;");
    expect(svg).not.toContain("><</text>");
    expect(svg).toContain('aria-label="&lt; logo"');
  });

  it("rejects empty letters, unknown shapes, bad colors and out-of-range sizes", () => {
    expect(logoSvg("", "circle", "#fff", "#000")).toBeNull();
    expect(logoSvg("   ", "circle", "#fff", "#000")).toBeNull();
    expect(logoSvg("P", "star", "#fff", "#000")).toBeNull();
    expect(logoSvg("P", "circle", "white", "#000")).toBeNull();
    expect(logoSvg("P", "circle", "#fff", "#000", 15)).toBeNull();
    expect(logoSvg("P", "circle", "#fff", "#000", LOGO_MIN_SIZE)).not.toBeNull();
    expect(logoSvg("P", "circle", "#fff", "#000", LOGO_MAX_SIZE)).not.toBeNull();
    expect(logoSvg("P", "circle", "#fff", "#000", LOGO_MAX_SIZE + 1)).toBeNull();
    expect(logoSvg("P", "circle", "#fff", "#000", Number.NaN)).toBeNull();
  });

  it("palette presets are valid pairs that render", () => {
    expect(LOGO_PALETTES.length).toBeGreaterThanOrEqual(4);
    for (const p of LOGO_PALETTES) {
      expect(logoSvg("P", "hex", p.fg, p.bg)).not.toBeNull();
    }
  });
});

/* ------------------------------------------------------------------ */
/* filler: variety, seed determinism, formats                          */
/* ------------------------------------------------------------------ */

describe("fillerSentences", () => {
  it("same seed → identical text; different seed → different text", () => {
    const a = fillerSentences(6, { seed: 11 })!;
    const b = fillerSentences(6, { seed: 11 })!;
    const c = fillerSentences(6, { seed: 12 })!;
    expect(a).toBe(b);
    expect(a).not.toBe(c);
  });

  it("never contains a lorem ipsum echo", () => {
    const t = fillerSentences(20, { seed: 3 })!;
    expect(t.toLowerCase()).not.toContain("lorem ipsum");
    expect(t.toLowerCase()).not.toContain("dolor sit amet");
  });

  it("consecutive sentences never start with the same opener", () => {
    for (const seed of [1, 2, 3, 42, 777]) {
      const sentences = fillerSentences(30, { seed })!.split(/(?<=\.)\s+/);
      const openers = sentences.map((s) => s.split(",")[0]);
      for (let i = 1; i < openers.length; i++) {
        expect(openers[i], `seed ${seed} pair ${i - 1}/${i}`).not.toBe(openers[i - 1]);
      }
      expect(new Set(openers).size).toBeGreaterThanOrEqual(2);
    }
  });

  it("clamps counts and rejects non-finite", () => {
    expect(fillerSentences(0, { seed: 1 })!.split(". ")).toHaveLength(1);
    expect(fillerSentences(1000, { seed: 1 })!.split(". ")).toHaveLength(50);
    expect(fillerSentences(Number.NaN)).toBeNull();
  });
});

describe("fillerParagraphs + formatFiller", () => {
  it("paragraphs honor count and sentences-per-paragraph, deterministically", () => {
    const a = fillerParagraphs(3, { seed: 8, sentencesPerParagraph: 4 })!;
    const b = fillerParagraphs(3, { seed: 8, sentencesPerParagraph: 4 })!;
    expect(a).toEqual(b);
    expect(a).toHaveLength(3);
    for (const p of a) {
      // n 句 → n 个句号(句子内无其它句末标点)
      expect((p.match(/\./g) ?? []).length).toBe(4);
    }
    const fewer = fillerParagraphs(2, { seed: 8, sentencesPerParagraph: 1 })!;
    expect(fewer).toHaveLength(2);
    expect((fewer[0].match(/\./g) ?? []).length).toBe(1);
  });

  it("opener variety spans paragraph boundaries too", () => {
    const ps = fillerParagraphs(4, { seed: 21, sentencesPerParagraph: 3 })!;
    const allOpeners = ps.flatMap((p) => p.split(/(?<=\.)\s+/).map((s) => s.split(",")[0]));
    for (let i = 1; i < allOpeners.length; i++) {
      expect(allOpeners[i]).not.toBe(allOpeners[i - 1]);
    }
  });

  it("formats: plain/markdown blank-line separated, html <p>-wrapped, unknown → null", () => {
    const ps = fillerParagraphs(2, { seed: 4 })!;
    const plain = formatFiller(ps, "plain")!;
    expect(plain).toBe(ps.join("\n\n"));
    expect(formatFiller(ps, "markdown")).toBe(plain);
    expect(formatFiller(ps, "html")).toBe(`<p>${ps[0]}</p>\n<p>${ps[1]}</p>`);
    expect(formatFiller(ps, "yaml")).toBeNull();
  });
});
