"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { logoSvg, LOGO_PALETTES, LOGO_SHAPES } from "../_lib/logo";
import { ErrorNote, Field, Note, NumIn, SolidButton, Sel, Tabs, TextIn, pick } from "./engine-ui";

/**
 * 极简 logo 引擎:纯函数 logoSvg 产出 SVG,浏览器端负责预览与 SVG/PNG 下载。
 * 圆/方/三角/六边形 + 单字母 + 配色预设,给 MVP 一个"能用"的字标。
 */

const SHAPE_LABELS: Record<string, Record<string, string>> = {
  circle: { en: "Circle", zh: "圆形", ja: "円", es: "Círculo", pt: "Círculo" },
  square: { en: "Square", zh: "方形", ja: "四角", es: "Cuadrado", pt: "Quadrado" },
  triangle: { en: "Triangle", zh: "三角形", ja: "三角", es: "Triángulo", pt: "Triângulo" },
  hex: { en: "Hexagon", zh: "六边形", ja: "六角形", es: "Hexágono", pt: "Hexágono" },
};

const S = {
  letter: { en: "Letter or character", zh: "字母或字符", ja: "文字", es: "Letra o carácter", pt: "Letra ou caractere" },
  letterPlaceholder: { en: "e.g. P — only the first character is used", zh: "例如 P——只取第一个字符", ja: "例:P — 先頭の 1 文字のみ使用", es: "p. ej. P — solo se usa el primer carácter", pt: "ex. P — apenas o primeiro caractere é usado" },
  shape: { en: "Shape", zh: "形状", ja: "図形", es: "Forma", pt: "Forma" },
  fg: { en: "Letter color", zh: "字母颜色", ja: "文字色", es: "Color de la letra", pt: "Cor da letra" },
  bg: { en: "Shape color", zh: "底形颜色", ja: "図形の色", es: "Color de la forma", pt: "Cor da forma" },
  size: { en: "Export size (px, 16–1024)", zh: "导出尺寸(像素,16–1024)", ja: "書き出しサイズ(px、16〜1024)", es: "Tamaño de exportación (px, 16–1024)", pt: "Tamanho de exportação (px, 16–1024)" },
  palettes: { en: "Palette presets", zh: "配色预设", ja: "配色プリセット", es: "Paletas predefinidas", pt: "Paletas predefinidas" },
  format: { en: "Format", zh: "格式", ja: "形式", es: "Formato", pt: "Formato" },
  download: { en: "Download", zh: "下载", ja: "ダウンロード", es: "Descargar", pt: "Baixar" },
  copySvg: { en: "Copy SVG", zh: "复制 SVG", ja: "SVG をコピー", es: "Copiar SVG", pt: "Copiar SVG" },
  invalid: {
    en: "Type at least one character and use hex colors like #RRGGBB or #RGB. Export size stays between 16 and 1024.",
    zh: "请至少输入一个字符,颜色使用 #RRGGBB 或 #RGB 格式;导出尺寸在 16–1024 之间。",
    ja: "1 文字以上入力し、色は #RRGGBB または #RGB 形式で指定してください。書き出しサイズは 16〜1024 です。",
    es: "Escribe al menos un carácter y usa colores hex como #RRGGBB o #RGB. El tamaño de exportación queda entre 16 y 1024.",
    pt: "Digite pelo menos um caractere e use cores hex como #RRGGBB ou #RGB. O tamanho de exportação fica entre 16 e 1024.",
  },
  note: {
    en: "A quick single-letter mark for MVPs, staging sites and side projects — geometric shape, one character, your colors. Download the SVG for crisp scaling or the PNG for avatars and favicons.",
    zh: "给 MVP、演示站和副业项目用的快速单字标:几何底形 + 一个字符 + 你的配色。SVG 无限缩放,PNG 适合头像和 favicon。",
    ja: "MVP・ステージング・サイドプロジェクト向けのクイックな一文字ロゴです。図形 + 1 文字 + 好きな色。SVG は拡大に強く、PNG はアバターや favicon に便利です。",
    es: "Una marca rápida de una letra para MVPs, staging y proyectos personales: forma geométrica, un carácter y tus colores. Descarga el SVG para escalar sin pérdida o el PNG para avatares y favicons.",
    pt: "Uma marca rápida de uma letra para MVPs, staging e projetos paralelos: forma geométrica, um caractere e suas cores. Baixe o SVG para escalar sem perdas ou o PNG para avatares e favicons.",
  },
};

export function DummyLogoEngine() {
  const { locale } = useI18n();
  const [letter, setLetter] = useState("P");
  const [shape, setShape] = useState("circle");
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#7c5cff");
  const [size, setSize] = useState("128");
  const [format, setFormat] = useState("svg");

  const svg = useMemo(
    () => logoSvg(letter, shape, fg.trim(), bg.trim(), Number(size)),
    [letter, shape, fg, bg, size],
  );

  const dataUri = svg ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` : "";

  const downloadSvg = () => {
    if (!svg) return;
    downloadBlob(new Blob([svg], { type: "image/svg+xml" }), `logo-${letter.trim() || "x"}.svg`);
  };

  const downloadPng = async () => {
    if (!svg) return;
    const px = Math.round(Number(size)) || 128;
    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("svg load failed"));
        img.src = dataUri;
      });
      const canvas = document.createElement("canvas");
      canvas.width = px;
      canvas.height = px;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("no 2d context");
      ctx.drawImage(img, 0, 0, px, px);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("toBlob failed");
      downloadBlob(blob, `logo-${letter.trim() || "x"}.png`);
    } catch {
      // 渲染失败时保持 SVG 可用,不吞错误提示
      downloadSvg();
    }
  };

  const shapeLabel = (id: string) => pick(locale, SHAPE_LABELS[id] ?? { en: id });

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.letter)}>
          <TextIn value={letter} onChange={setLetter} aria={pick(locale, S.letter)} placeholder={pick(locale, S.letterPlaceholder)} spellCheck={false} />
        </Field>
        <Field label={pick(locale, S.size)}>
          <NumIn value={size} onChange={setSize} aria={pick(locale, S.size)} placeholder="128" />
        </Field>
      </div>

      <div className="mt-4">
        <span className="mb-1.5 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.shape)}</span>
        <Tabs options={LOGO_SHAPES.map((id) => ({ id, label: shapeLabel(id) }))} value={shape} onChange={setShape} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.fg)}>
          <div className="flex gap-2">
            <input
              type="color"
              className="h-10 w-12 shrink-0 rounded-lg border hairline bg-transparent p-1"
              value={/^#[0-9a-fA-F]{6}$/.test(fg.trim()) ? fg.trim() : "#ffffff"}
              onChange={(e) => setFg(e.target.value)}
              aria-label={pick(locale, S.fg)}
            />
            <TextIn value={fg} onChange={setFg} aria={pick(locale, S.fg)} mono placeholder="#RRGGBB" />
          </div>
        </Field>
        <Field label={pick(locale, S.bg)}>
          <div className="flex gap-2">
            <input
              type="color"
              className="h-10 w-12 shrink-0 rounded-lg border hairline bg-transparent p-1"
              value={/^#[0-9a-fA-F]{6}$/.test(bg.trim()) ? bg.trim() : "#7c5cff"}
              onChange={(e) => setBg(e.target.value)}
              aria-label={pick(locale, S.bg)}
            />
            <TextIn value={bg} onChange={setBg} aria={pick(locale, S.bg)} mono placeholder="#RRGGBB" />
          </div>
        </Field>
      </div>

      <div className="mt-4">
        <span className="mb-1.5 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.palettes)}</span>
        <div className="flex flex-wrap gap-2">
          {LOGO_PALETTES.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => {
                setFg(p.fg);
                setBg(p.bg);
              }}
              className="inline-flex items-center gap-2 rounded-full border hairline px-3 py-1.5 text-[12.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              <span className="inline-block h-4 w-4 rounded-full border hairline" style={{ background: p.bg }} aria-hidden="true" />
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {svg ? (
        <>
          <div className="mt-5 flex justify-center rounded-xl border hairline bg-[var(--color-surface)] p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUri} alt={`${letter.trim()} logo`} className="h-32 w-32" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="w-32">
              <Sel value={format} onChange={setFormat} aria={pick(locale, S.format)}>
                <option value="svg">SVG</option>
                <option value="png">PNG</option>
              </Sel>
            </div>
            <SolidButton onClick={format === "svg" ? downloadSvg : downloadPng}>
              {pick(locale, S.download)} {format.toUpperCase()}
            </SolidButton>
            <CopyButton value={() => svg} label={pick(locale, S.copySvg)} />
          </div>
        </>
      ) : (
        <div className="mt-5">
          <ErrorNote>{pick(locale, S.invalid)}</ErrorNote>
        </div>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.note)}</Note>
      </div>
    </ToolPanel>
  );
}
