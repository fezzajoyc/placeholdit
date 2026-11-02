"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { SITE } from "@/lib/site";
import { placeholderSvg, placeholderUrlPattern } from "../_lib/placeholder";
import { ErrorNote, Field, Note, NumIn, SolidButton, Sel, Tabs, TextIn, pick } from "./engine-ui";

/**
 * 占位图引擎(featured):纯函数 placeholderSvg / placeholderUrlPattern 产出,
 * 浏览器端负责预览(data URI)、复制 SVG、下载 SVG/PNG(canvas 转码)、复制 URL 模式。
 */

const S = {
  width: { en: "Width (px)", zh: "宽度(像素)", ja: "幅(px)", es: "Ancho (px)", pt: "Largura (px)" },
  height: { en: "Height (px)", zh: "高度(像素)", ja: "高さ(px)", es: "Alto (px)", pt: "Altura (px)" },
  bg: { en: "Background", zh: "背景色", ja: "背景", es: "Fondo", pt: "Fundo" },
  color: { en: "Text color", zh: "文字颜色", ja: "文字色", es: "Color del texto", pt: "Cor do texto" },
  label: { en: "Label (optional)", zh: "文字(可选)", ja: "ラベル(任意)", es: "Texto (opcional)", pt: "Texto (opcional)" },
  radius: { en: "Corner radius (0 = square)", zh: "圆角(0 = 直角)", ja: "角丸(0 = 四角)", es: "Esquinas redondeadas (0 = rectas)", pt: "Cantos arredondados (0 = reto)" },
  format: { en: "Format", zh: "格式", ja: "形式", es: "Formato", pt: "Formato" },
  download: { en: "Download", zh: "下载", ja: "ダウンロード", es: "Descargar", pt: "Baixar" },
  copySvg: { en: "Copy SVG", zh: "复制 SVG", ja: "SVG をコピー", es: "Copiar SVG", pt: "Copiar SVG" },
  urlTitle: { en: "URL pattern", zh: "URL 模式", ja: "URL パターン", es: "Patrón de URL", pt: "Padrão de URL" },
  urlNote: {
    en: "This is the route pattern the Placeholdit hotlink service accepts (like placehold.co). Copy it now and keep it in your CSS or mockups — direct hotlinking from placeholdit.app is on the roadmap.",
    zh: "这是 Placeholdit 热链服务将采用的路由模式(与 placehold.co 风格一致)。现在就可以把它写进 CSS 或设计稿——placeholdit.app 的直接热链功能在路线图上。",
    ja: "これは Placeholdit のホットリンク用ルートパターンです(placehold.co と同じ書式)。今のうちに CSS やモックアップに保存しておくと便利です。placeholdit.app からの直接ホットリンクはロードマップ上にあります。",
    es: "Este es el patrón de ruta que aceptará el servicio de hotlink de Placeholdit (estilo placehold.co). Guárdalo en tu CSS o maquetas: el hotlink directo desde placeholdit.app está en la hoja de ruta.",
    pt: "Este é o padrão de rota que o serviço de hotlink do Placeholdit aceitará (estilo placehold.co). Guarde-o no seu CSS ou mockups — o hotlink direto de placeholdit.app está no roteiro.",
  },
  presets: { en: "Quick sizes", zh: "常用尺寸", ja: "よく使うサイズ", es: "Tamaños rápidos", pt: "Tamanhos rápidos" },
  invalid: {
    en: "Enter whole dimensions between 1 and 5000, and hex colors like #RRGGBB or #RGB.",
    zh: "宽高请输入 1–5000 的整数,颜色请使用 #RRGGBB 或 #RGB 格式。",
    ja: "寸法は 1〜5000 の整数、色は #RRGGBB または #RGB 形式で入力してください。",
    es: "Usa dimensiones enteras de 1 a 5000 y colores hex como #RRGGBB o #RGB.",
    pt: "Use dimensões inteiras de 1 a 5000 e cores hex como #RRGGBB ou #RGB.",
  },
  rasterFail: {
    en: "PNG rendering isn't available in this browser — the SVG download still works.",
    zh: "当前浏览器无法渲染 PNG——SVG 下载仍然可用。",
    ja: "このブラウザでは PNG を描画できません。SVG のダウンロードは利用できます。",
    es: "Este navegador no puede renderizar PNG; la descarga en SVG sigue funcionando.",
    pt: "Este navegador não consegue renderizar PNG; o download em SVG continua funcionando.",
  },
  localNote: {
    en: "Everything is generated locally in your browser: the SVG is pure markup you can paste into any project, and the PNG is rendered on a canvas without any upload.",
    zh: "全部在浏览器本地生成:SVG 是可直接粘贴进项目的纯标记,PNG 由画布即时渲染,没有任何上传。",
    ja: "すべてブラウザ内で生成されます。SVG はそのまま貼り付けられる純粋なマークアップで、PNG はキャンバスで描画され、アップロードは一切ありません。",
    es: "Todo se genera localmente en tu navegador: el SVG es marcado puro que puedes pegar en cualquier proyecto, y el PNG se renderiza en un canvas sin subidas.",
    pt: "Tudo é gerado localmente no seu navegador: o SVG é marcação pura que você pode colar em qualquer projeto, e o PNG é renderizado num canvas sem nenhum upload.",
  },
};

const FORMATS = [
  { id: "svg", label: "SVG" },
  { id: "png", label: "PNG" },
];

const PRESETS: { label: string; w: string; h: string }[] = [
  { label: "OG 1200×630", w: "1200", h: "630" },
  { label: "Banner 728×90", w: "728", h: "90" },
  { label: "Avatar 256", w: "256", h: "256" },
  { label: "Thumb 320×180", w: "320", h: "180" },
  { label: "Square 500", w: "500", h: "500" },
];

export function PlaceholderImageEngine() {
  const { locale } = useI18n();
  const [width, setWidth] = useState("600");
  const [height, setHeight] = useState("400");
  const [bg, setBg] = useState("#7c5cff");
  const [color, setColor] = useState("#ffffff");
  const [text, setText] = useState("");
  const [radius, setRadius] = useState("0");
  const [format, setFormat] = useState("svg");
  const [rasterError, setRasterError] = useState(false);

  const svg = useMemo(
    () =>
      placeholderSvg({
        width: Number(width),
        height: Number(height),
        bg: bg.trim(),
        color: color.trim(),
        text,
        radius: Number(radius),
      }),
    [width, height, bg, color, text, radius],
  );

  const urlPattern = useMemo(
    () =>
      placeholderUrlPattern({
        width: Number(width),
        height: Number(height),
        bg: bg.trim(),
        color: color.trim(),
        text,
        radius: Number(radius),
      }),
    [width, height, bg, color, text, radius],
  );

  const dataUri = svg ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` : "";

  const downloadSvg = () => {
    if (!svg) return;
    downloadBlob(new Blob([svg], { type: "image/svg+xml" }), `placeholder-${Math.round(Number(width))}x${Math.round(Number(height))}.svg`);
  };

  const downloadPng = async () => {
    if (!svg) return;
    const w = Math.round(Number(width));
    const h = Math.round(Number(height));
    try {
      setRasterError(false);
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("svg load failed"));
        img.src = dataUri;
      });
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("no 2d context");
      ctx.drawImage(img, 0, 0, w, h);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("toBlob failed");
      downloadBlob(blob, `placeholder-${w}x${h}.png`);
    } catch {
      setRasterError(true);
    }
  };

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.width)}>
          <NumIn value={width} onChange={setWidth} aria={pick(locale, S.width)} placeholder="600" />
        </Field>
        <Field label={pick(locale, S.height)}>
          <NumIn value={height} onChange={setHeight} aria={pick(locale, S.height)} placeholder="400" />
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
        <Field label={pick(locale, S.color)}>
          <div className="flex gap-2">
            <input
              type="color"
              className="h-10 w-12 shrink-0 rounded-lg border hairline bg-transparent p-1"
              value={/^#[0-9a-fA-F]{6}$/.test(color.trim()) ? color.trim() : "#ffffff"}
              onChange={(e) => setColor(e.target.value)}
              aria-label={pick(locale, S.color)}
            />
            <TextIn value={color} onChange={setColor} aria={pick(locale, S.color)} mono placeholder="#RRGGBB" />
          </div>
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.label)}>
          <TextIn value={text} onChange={setText} aria={pick(locale, S.label)} placeholder="600×400" spellCheck={false} />
        </Field>
        <Field label={pick(locale, S.radius)}>
          <NumIn value={radius} onChange={setRadius} aria={pick(locale, S.radius)} placeholder="0" />
        </Field>
      </div>

      <div className="mt-4">
        <span className="mb-1.5 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.presets)}</span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setWidth(p.w);
                setHeight(p.h);
              }}
              className="rounded-full border hairline px-3 py-1 text-[12.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {svg ? (
        <>
          <div className="mt-5 overflow-hidden rounded-xl border hairline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUri} alt={text || `${Math.round(Number(width))}×${Math.round(Number(height))}`} className="block max-h-72 w-full bg-[var(--color-surface)] object-contain" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="w-32">
              <Sel value={format} onChange={setFormat} aria={pick(locale, S.format)}>
                {FORMATS.map((f) => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </Sel>
            </div>
            <SolidButton onClick={format === "svg" ? downloadSvg : downloadPng}>
              {pick(locale, S.download)} {format.toUpperCase()}
            </SolidButton>
            <CopyButton value={() => svg} label={pick(locale, S.copySvg)} />
          </div>

          {urlPattern && (
            <div className="mt-5 rounded-xl border hairline bg-[var(--color-surface)] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[13px] font-semibold">{pick(locale, S.urlTitle)}</span>
                <CopyButton value={() => `${SITE.domain}${urlPattern}`} />
              </div>
              <code className="mono mt-2 block overflow-x-auto whitespace-nowrap text-[12.5px] text-[var(--color-ink)]">
                {SITE.domain}{urlPattern}
              </code>
              <div className="mt-2">
                <Note>{pick(locale, S.urlNote)}</Note>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="mt-5">
          <ErrorNote>{pick(locale, S.invalid)}</ErrorNote>
        </div>
      )}

      {rasterError && (
        <div className="mt-3">
          <ErrorNote>{pick(locale, S.rasterFail)}</ErrorNote>
        </div>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.localNote)}</Note>
      </div>
    </ToolPanel>
  );
}
