"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { fillerParagraphs, fillerSentences, formatFiller } from "../_lib/filler";
import { Field, Note, NumIn, Sel, SolidButton, Tabs, TextIn, pick } from "./engine-ui";

/**
 * 填充文案引擎(lorem-pill):varied openers 的句子/段落生成,
 * 种子可选(可复现),输出 plain / markdown / html。
 */

const S = {
  mode: { en: "Generate", zh: "生成", ja: "生成", es: "Generar", pt: "Gerar" },
  sentences: { en: "Sentences", zh: "句子", ja: "文", es: "Frases", pt: "Frases" },
  paragraphs: { en: "Paragraphs", zh: "段落", ja: "段落", es: "Párrafos", pt: "Parágrafos" },
  count: { en: "How many (1–50)", zh: "数量(1–50)", ja: "件数(1〜50)", es: "Cuántos (1–50)", pt: "Quantos (1–50)" },
  perParagraph: { en: "Sentences per paragraph (1–10)", zh: "每段句数(1–10)", ja: "1 段落の文数(1〜10)", es: "Frases por párrafo (1–10)", pt: "Frases por parágrafo (1–10)" },
  seed: { en: "Seed (optional — same seed, same text)", zh: "种子(可选——同一种子,同一文本)", ja: "シード(任意 — 同じシードなら同じ文章)", es: "Semilla (opcional: misma semilla, mismo texto)", pt: "Semente (opcional — mesma semente, mesmo texto)" },
  seedPlaceholder: { en: "e.g. 7 — empty = fresh each time", zh: "例如 7——留空则每次随机", ja: "例:7 — 空欄なら毎回新しく", es: "p. ej. 7 — vacío = nuevo cada vez", pt: "ex. 7 — vazio = novo a cada vez" },
  format: { en: "Output format", zh: "输出格式", ja: "出力形式", es: "Formato de salida", pt: "Formato de saída" },
  result: { en: "Result", zh: "结果", ja: "結果", es: "Resultado", pt: "Resultado" },
  invalid: {
    en: "Counts must be whole numbers between 1 and 50 (sentences per paragraph 1–10); the seed, if given, must be a number.",
    zh: "数量请输入 1–50 的整数(每段句数 1–10);种子(如填)必须是数字。",
    ja: "件数は 1〜50 の整数(1 段落の文数は 1〜10)、シード(入力する場合)は数値で入力してください。",
    es: "Las cantidades deben ser enteros entre 1 y 50 (frases por párrafo 1–10); la semilla, si la pones, debe ser un número.",
    pt: "As quantidades devem ser inteiras entre 1 e 50 (frases por parágrafo 1–10); a semente, se informada, deve ser um número.",
  },
  note: {
    en: "Varied sentence openers instead of a repeated “Lorem ipsum” — filler text that reads like real layout rhythm. Same seed always reproduces the same text, so your mockups stay stable across screenshots.",
    zh: "开头语各不相同的填充文案,不再满屏重复 “Lorem ipsum”,读起来像真实排版的节奏。同一种子永远得到同一文本,截图和演示可复现。",
    ja: "“Lorem ipsum” の繰り返しではなく、文の始まりが毎回違う埋め込みテキスト。本番に近いレイアウトのリズムで確認できます。同じシードなら常に同じ文章なので、スクリーンショットも再現されます。",
    es: "Inicio de frase variado en lugar del “Lorem ipsum” repetido: texto de relleno con el ritmo de una maqueta real. La misma semilla reproduce siempre el mismo texto, así tus mockups se mantienen estables.",
    pt: "Inícios de frase variados em vez do “Lorem ipsum” repetido: texto de preenchimento com o ritmo de um layout real. A mesma semente reproduz sempre o mesmo texto, então seus mockups ficam estáveis.",
  },
};

const FORMATS = [
  { id: "plain", label: "Plain" },
  { id: "markdown", label: "Markdown" },
  { id: "html", label: "HTML" },
];

export function LoremPillEngine() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("paragraphs");
  const [count, setCount] = useState("3");
  const [per, setPer] = useState("4");
  const [seed, setSeed] = useState("7");
  const [format, setFormat] = useState("plain");

  const seedNum = seed.trim() === "" ? undefined : Number(seed);
  const invalidSeed = seed.trim() !== "" && !Number.isFinite(seedNum);

  const output = useMemo(() => {
    if (invalidSeed) return "";
    if (mode === "sentences") {
      const s = fillerSentences(Number(count), { seed: seedNum });
      return s ?? "";
    }
    const ps = fillerParagraphs(Number(count), { seed: seedNum, sentencesPerParagraph: Number(per) });
    return ps ? formatFiller(ps, format) ?? "" : "";
  }, [mode, count, per, seedNum, invalidSeed, format]);

  const shuffle = () => setSeed(String(Math.floor(Math.random() * 1_000_000)));

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "sentences", label: pick(locale, S.sentences) },
          { id: "paragraphs", label: pick(locale, S.paragraphs) },
        ]}
        value={mode}
        onChange={setMode}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.count)}>
          <NumIn value={count} onChange={setCount} aria={pick(locale, S.count)} placeholder="3" />
        </Field>
        {mode === "paragraphs" ? (
          <Field label={pick(locale, S.perParagraph)}>
            <NumIn value={per} onChange={setPer} aria={pick(locale, S.perParagraph)} placeholder="4" />
          </Field>
        ) : (
          <Field label={pick(locale, S.format)}>
            <Sel value={format} onChange={setFormat} aria={pick(locale, S.format)}>
              {FORMATS.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </Sel>
          </Field>
        )}
        <Field label={pick(locale, S.seed)}>
          <div className="flex gap-2">
            <TextIn value={seed} onChange={setSeed} aria={pick(locale, S.seed)} mono placeholder={pick(locale, S.seedPlaceholder)} className="min-w-0 flex-1" />
            <SolidButton onClick={shuffle} aria={pick(locale, S.seed)}>
              ↻
            </SolidButton>
          </div>
        </Field>
      </div>

      {mode === "paragraphs" && (
        <div className="mt-4 max-w-xs">
          <Field label={pick(locale, S.format)}>
            <Sel value={format} onChange={setFormat} aria={pick(locale, S.format)}>
              {FORMATS.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </Sel>
          </Field>
        </div>
      )}

      {output ? (
        <>
          <span className="mb-1.5 mt-4 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.result)}</span>
          <textarea
            className={`field bg-[var(--color-surface)] ${format === "html" ? "mono" : ""}`}
            rows={12}
            readOnly
            value={output}
            aria-label={pick(locale, S.result)}
          />
          <div className="mt-3">
            <CopyButton value={() => output} />
          </div>
        </>
      ) : (
        <div className="mt-5">
          <Note>{pick(locale, S.invalid)}</Note>
        </div>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.note)}</Note>
      </div>
    </ToolPanel>
  );
}
