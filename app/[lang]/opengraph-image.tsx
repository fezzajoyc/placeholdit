import { ImageResponse } from "next/og";
import { LOCALES, SITE, isLocale } from "@/lib/site";
import { ALL_TOOLS } from "@/tools/registry";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  isLocale(lang); // 每语言一张,但图内文案固定英文(Satori 默认字体排不了 CJK/阿拉伯文)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          background: "linear-gradient(135deg, #ffffff 0%, #f5f5f7 55%, #f1ecff 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "#7c5cff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="14" width="48" height="36" rx="6" stroke="#fff" strokeWidth="4.5" />
            <circle cx="23" cy="27" r="4.5" fill="#fff" />
            <path d="M14 43l11-9 8 7 6-5 11 8" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, color: "#1d1d1f", letterSpacing: -4, display: "flex" }}>
          {"Placeholder images & fake data"}
        </div>
        <div style={{ fontSize: 36, color: "#6e6e73", display: "flex" }}>Generated locally in your browser</div>
        <div style={{ fontSize: 28, color: "#1a7f37", fontWeight: 600, display: "flex" }}>
          {SITE.domain.replace("https://", "")}
        </div>
      </div>
    ),
    size,
  );
}
