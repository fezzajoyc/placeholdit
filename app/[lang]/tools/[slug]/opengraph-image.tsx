import { ImageResponse } from "next/og";
import { LOCALES, SITE, isCategory, isLocale } from "@/lib/site";
import { ALL_TOOLS, TOOL_BY_SLUG } from "@/tools/registry";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export const alt = "Placeholdit";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => ALL_TOOLS.map((tool) => ({ lang, slug: tool.slug })));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const tool = TOOL_BY_SLUG.get(slug);
  // OG 图固定英文:视觉资产统一品牌声线,且免去 CJK 字体的运行时拉取
  const c = tool ? tool.copy.en : { name: "Placeholdit", h1: "Placeholdit", tagline: SITE.tagline };
  const categoryName = tool && isCategory(tool.category) ? tool.category.toUpperCase() : "";
  const tagline = c.tagline.length > 110 ? `${c.tagline.slice(0, 107)}…` : c.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #ffffff 0%, #f5f5f7 60%, #f1ecff 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* 顶栏:品牌 */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#7c5cff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 64 64" fill="none">
              <rect x="8" y="14" width="48" height="36" rx="6" stroke="#fff" strokeWidth="4.5" />
              <circle cx="23" cy="27" r="4.5" fill="#fff" />
              <path d="M14 43l11-9 8 7 6-5 11 8" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#1d1d1f", letterSpacing: -1 }}>
            {SITE.name}
          </div>
        </div>

        {/* 主体:工具名 + 卖点 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: categoryName ? 40 : 0,
              color: "#6a48f0",
              fontWeight: 600,
              display: "flex",
              letterSpacing: 2,
            }}
          >
            {categoryName}
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#1d1d1f",
              letterSpacing: -3,
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            {c.h1 ?? c.name}
          </div>
          <div style={{ fontSize: 32, color: "#6e6e73", lineHeight: 1.4, display: "flex" }}>
            {tagline}
          </div>
        </div>

        {/* 底栏:域名 + 卖点 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 26, color: "#6e6e73" }}>{SITE.domain.replace("https://", "")}</div>
          <div
            style={{
              display: "flex",
              padding: "12px 26px",
              borderRadius: 999,
              background: "rgba(26,127,55,0.12)",
              color: "#1a7f37",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            100% local
          </div>
        </div>
      </div>
    ),
    size,
  );
}
