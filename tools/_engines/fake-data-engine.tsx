"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Icon } from "@/components/icons";
import { fakeData, formatFakeData, FAKE_CATEGORIES } from "../_lib/fakedata";
import { ErrorNote, Field, Note, NumIn, SolidButton, Tabs, TextIn, pick } from "./engine-ui";

/**
 * 假数据引擎:纯函数 fakeData + formatFakeData。
 * 类别切换 + 数量(1–50)+ 可选种子(可复现)+ JSON/CSV/纯文本输出。
 */

const CAT_LABELS: Record<string, Record<string, string>> = {
  person: { en: "Person", zh: "人物", ja: "人物", es: "Persona", pt: "Pessoa" },
  company: { en: "Company", zh: "公司", ja: "会社", es: "Empresa", pt: "Empresa" },
  address: { en: "Address", zh: "地址", ja: "住所", es: "Dirección", pt: "Endereço" },
  lorem: { en: "Filler words", zh: "填充词句", ja: "埋め込み語", es: "Palabras de relleno", pt: "Palavras de preenchimento" },
  uuid: { en: "UUID v4", zh: "UUID v4", ja: "UUID v4", es: "UUID v4", pt: "UUID v4" },
  color: { en: "Hex color", zh: "十六进制色", ja: "16進カラー", es: "Color hex", pt: "Cor hex" },
  ip: { en: "IP address", zh: "IP 地址", ja: "IP アドレス", es: "Dirección IP", pt: "Endereço IP" },
};

const S = {
  count: { en: "How many (1–50)", zh: "数量(1–50)", ja: "件数(1〜50)", es: "Cuántos (1–50)", pt: "Quantos (1–50)" },
  seed: { en: "Seed (optional — same seed, same data)", zh: "种子(可选——同一种子,同一结果)", ja: "シード(任意 — 同じシードなら同じ結果)", es: "Semilla (opcional: misma semilla, mismos datos)", pt: "Semente (opcional — mesma semente, mesmos dados)" },
  seedPlaceholder: { en: "e.g. 42 — leave empty for fresh randomness", zh: "例如 42——留空则每次随机", ja: "例:42 — 空欄なら毎回新しく乱数", es: "p. ej. 42 — vacío = aleatorio cada vez", pt: "ex. 42 — vazio = aleatório a cada vez" },
  newSeed: { en: "Random seed", zh: "随机种子", ja: "ランダムシード", es: "Semilla al azar", pt: "Semente aleatória" },
  format: { en: "Output format", zh: "输出格式", ja: "出力形式", es: "Formato de salida", pt: "Formato de saída" },
  download: { en: "Download", zh: "下载", ja: "ダウンロード", es: "Descargar", pt: "Baixar" },
  result: { en: "Result", zh: "结果", ja: "結果", es: "Resultado", pt: "Resultado" },
  invalid: {
    en: "Pick a category and a whole count between 1 and 50. The seed, if given, must be a number.",
    zh: "请选择类别,数量输入 1–50 的整数;种子(如填)必须是数字。",
    ja: "カテゴリーを選び、件数は 1〜50 の整数で入力してください。シード(入力する場合)は数値です。",
    es: "Elige una categoría y una cantidad entera entre 1 y 50. La semilla, si la pones, debe ser un número.",
    pt: "Escolha uma categoria e uma quantidade inteira entre 1 e 50. A semente, se informada, deve ser um número.",
  },
  honest: {
    en: "Rule-based patterns, not realistic identities: names, companies and addresses are random word combinations for tests and mockups. Emails always use the reserved example.com / example.net domains, so nothing can reach a real inbox.",
    zh: "这是规则词表组合,不是真实身份:姓名、公司、地址都是随机词组,用于测试与占位。邮箱一律落在保留域 example.com / example.net,不会发进任何真实收件箱。",
    ja: "ルールベースのパターンであり、実在の人物ではありません。名前・会社・住所は語のランダム組み合わせで、テストとモック用です。メールは必ず予約済みドメイン example.com / example.net を使うため、実際の受信箱には届きません。",
    es: "Patrones basados en reglas, no identidades realistas: nombres, empresas y direcciones son combinaciones aleatorias de palabras para pruebas y maquetas. Los correos usan siempre los dominios reservados example.com / example.net, así que nada llega a una bandeja real.",
    pt: "Padrões baseados em regras, não identidades realistas: nomes, empresas e endereços são combinações aleatórias de palavras para testes e mockups. Os e-mails usam sempre os domínios reservados example.com / example.net, então nada chega a uma caixa real.",
  },
};

const FORMATS = [
  { id: "json", label: "JSON" },
  { id: "csv", label: "CSV" },
  { id: "plain", label: "Plain text" },
];

const EXT: Record<string, string> = { json: "json", csv: "csv", plain: "txt" };

export function FakeDataEngine() {
  const { locale } = useI18n();
  const [category, setCategory] = useState("person");
  const [count, setCount] = useState("10");
  const [seed, setSeed] = useState("42");
  const [format, setFormat] = useState("json");

  const seedNum = seed.trim() === "" ? undefined : Number(seed);
  const invalidSeed = seed.trim() !== "" && !Number.isFinite(seedNum);

  const rows = useMemo(
    () => (invalidSeed ? null : fakeData(category, Number(count), { seed: seedNum })),
    [category, count, seedNum, invalidSeed],
  );

  const output = useMemo(() => (rows ? formatFakeData(rows, format) ?? "" : ""), [rows, format]);

  const download = () => {
    downloadBlob(new Blob([output], { type: "text/plain;charset=utf-8" }), `${category}-fake.${EXT[format] ?? "txt"}`);
  };

  const catLabel = (id: string) => pick(locale, CAT_LABELS[id] ?? { en: id });

  return (
    <ToolPanel>
      <Tabs
        options={FAKE_CATEGORIES.map((id) => ({ id, label: catLabel(id) }))}
        value={category}
        onChange={setCategory}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.count)}>
          <NumIn value={count} onChange={setCount} aria={pick(locale, S.count)} placeholder="10" />
        </Field>
        <Field label={pick(locale, S.seed)}>
          <div className="flex gap-2">
            <TextIn value={seed} onChange={setSeed} aria={pick(locale, S.seed)} mono placeholder={pick(locale, S.seedPlaceholder)} className="min-w-0 flex-1" />
            <SolidButton
              onClick={() => setSeed(String(Math.floor(Math.random() * 1_000_000)))}
              aria={pick(locale, S.newSeed)}
            >
              <span className="inline-flex items-center">
                <Icon name="shuffle" size={15} />
              </span>
            </SolidButton>
          </div>
        </Field>
      </div>

      {rows && rows.length > 0 ? (
        <>
          <div className="mt-4">
            <Tabs options={FORMATS} value={format} onChange={setFormat} />
            <span className="mb-1.5 mt-2 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.result)}</span>
            <textarea
              className="field mono bg-[var(--color-surface)]"
              rows={12}
              readOnly
              value={output}
              aria-label={pick(locale, S.result)}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <SolidButton onClick={download}>{pick(locale, S.download)} {EXT[format]?.toUpperCase()}</SolidButton>
            <CopyButton value={() => output} />
          </div>
        </>
      ) : (
        <div className="mt-5">
          <ErrorNote>{pick(locale, S.invalid)}</ErrorNote>
        </div>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.honest)}</Note>
      </div>
    </ToolPanel>
  );
}
