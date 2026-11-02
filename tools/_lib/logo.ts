/**
 * 极简几何 logo 生成纯逻辑(Node 可测,无 DOM)。
 * 一个字母/字符放在几何底形上(circle / square / triangle / hex),
 * 给 MVP、README、占位头像用——不是设计工具,产出是干净的单字标。
 *
 * letter 取第一个字素(Array.from,兼容 CJK 与 emoji);
 * 颜色必须是 #RGB / #RRGGBB;形状未知、letter 为空白、尺寸非法 → null。
 */

import { isHexColor } from "./placeholder";

export const LOGO_SHAPES = ["circle", "square", "triangle", "hex"] as const;
export type LogoShape = (typeof LOGO_SHAPES)[number];

export const LOGO_MIN_SIZE = 16;
export const LOGO_MAX_SIZE = 1024;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** 正六边形顶点(尖顶):中心 (cx,cy),外接圆半径 r。 */
function hexPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 90);
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
  }
  return pts.join(" ");
}

/**
 * 生成 logo SVG 字符串;非法输入 → null:
 * letter 空白、形状不在 LOGO_SHAPES、颜色非 #RGB/#RRGGBB、size 非有限或超出 16–1024。
 * 字号随字形与字符数自适应(三角形的视觉重心偏下,y 单独下移)。
 */
export function logoSvg(
  letter: string,
  shape: string,
  fg: string,
  bg: string,
  size = 128,
): string | null {
  const grapheme = Array.from(letter.trim())[0];
  if (!grapheme) return null;
  if (!(LOGO_SHAPES as readonly string[]).includes(shape)) return null;
  if (!isHexColor(fg) || !isHexColor(bg)) return null;
  if (!Number.isFinite(size)) return null;
  const s = Math.round(size);
  if (s < LOGO_MIN_SIZE || s > LOGO_MAX_SIZE) return null;

  const half = s / 2;
  let backdrop: string;
  let centerY = 0.5; // 文字视觉中心的 y 比例
  switch (shape as LogoShape) {
    case "circle":
      backdrop = `<circle cx="${half}" cy="${half}" r="${half}" fill="${bg}"/>`;
      break;
    case "square":
      backdrop = `<rect width="${s}" height="${s}" rx="${(s * 0.18).toFixed(1)}" fill="${bg}"/>`;
      break;
    case "triangle":
      backdrop =
        `<polygon points="${(s * 0.5).toFixed(2)},${(s * 0.06).toFixed(2)} ` +
        `${(s * 0.94).toFixed(2)},${(s * 0.88).toFixed(2)} ${(s * 0.06).toFixed(2)},${(s * 0.88).toFixed(2)}" fill="${bg}"/>`;
      centerY = 0.62; // 三角形重心在下半部
      break;
    case "hex":
      backdrop = `<polygon points="${hexPoints(half, half, half * 0.96)}" fill="${bg}"/>`;
      break;
  }

  // 字符越多字号越小;单字 ≈ size 的 44%
  const fontSize = Math.max(6, (s * 0.44) / Math.max(1, Math.sqrt(grapheme.length)));
  const textY = (s * centerY).toFixed(1);

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"` +
    ` role="img" aria-label="${escapeXml(grapheme)} logo">` +
    backdrop +
    `<text x="50%" y="${textY}" fill="${fg}"` +
    ` font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"` +
    ` font-size="${fontSize.toFixed(1)}" font-weight="600" text-anchor="middle" dominant-baseline="central">` +
    `${escapeXml(grapheme)}</text></svg>`
  );
}

/** 预设配色(前景,背景)对:给"随便先来一个能用"的用户。 */
export const LOGO_PALETTES: { name: string; fg: string; bg: string }[] = [
  { name: "Ink", fg: "#ffffff", bg: "#1f2430" },
  { name: "Violet", fg: "#ffffff", bg: "#7c5cff" },
  { name: "Teal", fg: "#0b3b36", bg: "#4ad7c2" },
  { name: "Amber", fg: "#402a00", bg: "#ffc247" },
  { name: "Rose", fg: "#ffffff", bg: "#e5486f" },
  { name: "Sky", fg: "#0b2545", bg: "#8fd0ff" },
];
