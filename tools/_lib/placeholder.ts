/**
 * 占位图生成纯逻辑(Node 可测,无 DOM)。
 * 约定:宽高为 1–5000 的数(四舍五入到整数),颜色必须是 #RGB / #RRGGBB;
 * 文本为空时用默认 "宽×高";文本中的 XML 特殊字符会被转义;
 * radius 为圆角半径,越界值被钳制,非法值按 0 处理(只有宽高/颜色非法才返回 null)。
 * 输入非法 → 返回 null(文档化行为,不抛异常)。
 */

export const PLACEHOLDER_MAX = 5000;

const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/** #RGB / #RRGGBB 校验(占位图、logo 共用) */
export function isHexColor(s: unknown): s is string {
  return typeof s === "string" && HEX_RE.test(s);
}

export type PlaceholderOpts = {
  width: number;
  height: number;
  /** 背景色,#RGB 或 #RRGGBB */
  bg: string;
  /** 文字颜色,#RGB 或 #RRGGBB */
  color: string;
  /** 居中文字;空白时用 "{width}×{height}" */
  text: string;
  /** 圆角半径(px);省略/0 = 直角。超出 min(w,h)/2 的部分被钳制,负数按 0。 */
  radius?: number;
};

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function sanitizeDims(opts: PlaceholderOpts): { width: number; height: number } | null {
  const width = Math.round(opts.width);
  const height = Math.round(opts.height);
  if (!Number.isFinite(width) || width < 1 || width > PLACEHOLDER_MAX) return null;
  if (!Number.isFinite(height) || height < 1 || height > PLACEHOLDER_MAX) return null;
  return { width, height };
}

function sanitizeColors(opts: PlaceholderOpts): boolean {
  return isHexColor(opts.bg) && isHexColor(opts.color);
}

/** 圆角半径:非有限 → 0;负数 → 0;超过 min(w,h)/2 → 钳制到半边(内切圆)。 */
function clampRadius(radius: number | undefined, short: number): number {
  if (typeof radius !== "number" || !Number.isFinite(radius) || radius <= 0) return 0;
  return Math.round(Math.min(radius, short / 2));
}

/**
 * 生成占位图 SVG 字符串。非法输入 → null:
 * 宽高非有限 / 超出 1–5000、颜色非 #RGB / #RRGGBB。radius 非法只钳制,不判非法。
 * 字号随最短边与文字长度自适应,永远是有界有限值(1×1 也不产生 NaN)。
 */
export function placeholderSvg(opts: PlaceholderOpts): string | null {
  const dims = sanitizeDims(opts);
  if (!dims || !sanitizeColors(opts)) return null;
  const { width, height } = dims;
  const short = Math.min(width, height);
  const radius = clampRadius(opts.radius, short);

  const text = opts.text.trim() === "" ? `${width}×${height}` : opts.text;
  // 文字越长字号越小;以最短边的 1/2.2 为上限,以 1 为下限
  const fontSize = Math.max(1, short / Math.max(2.2, text.length * 0.62));

  const rect = radius > 0
    ? `<rect width="100%" height="100%" rx="${radius}" ry="${radius}" fill="${opts.bg}"/>`
    : `<rect width="100%" height="100%" fill="${opts.bg}"/>`;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"` +
    ` viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(text)}">` +
    rect +
    `<text x="50%" y="50%" fill="${opts.color}"` +
    ` font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"` +
    ` font-size="${fontSize.toFixed(1)}" text-anchor="middle" dominant-baseline="central">` +
    `${escapeXml(text)}</text></svg>`
  );
}

/**
 * 站点热链路由的 URL 模式(placehold.co 风格):
 *   /600x400/7c5cff/ffffff?text=Hello&radius=24
 * 颜色不带 # 并转小写;文字经 URI 编码;radius>0 才出现。
 * 宽高/颜色非法 → null(与 placeholderSvg 同一套校验)。
 */
export function placeholderUrlPattern(opts: PlaceholderOpts): string | null {
  const dims = sanitizeDims(opts);
  if (!dims || !sanitizeColors(opts)) return null;
  const { width, height } = dims;

  const strip = (c: string) => c.replace(/^#/, "").toLowerCase();
  let path = `/${width}x${height}/${strip(opts.bg)}/${strip(opts.color)}`;
  const query: string[] = [];
  if (opts.text.trim() !== "") query.push(`text=${encodeURIComponent(opts.text.trim())}`);
  const radius = clampRadius(opts.radius, Math.min(width, height));
  if (radius > 0) query.push(`radius=${radius}`);
  if (query.length > 0) path += `?${query.join("&")}`;
  return path;
}
