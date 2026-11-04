"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";

/** Engine 局部 UI 的小共用件:文案挑选器 + 输入控件(样式全部走主题变量)。 */

/** Pick a string from an inline per-locale record (engine-local UI strings). */
export function pick(locale: Locale, rec: Record<string, string>): string {
  return rec[locale] ?? rec.en;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <span className="block text-[13px] font-medium text-[var(--color-sub)]">{label}</span>
      {children}
    </div>
  );
}

export function NumIn({
  value,
  onChange,
  aria,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  aria: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="number"
      inputMode="decimal"
      className={`field bare mono ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={aria}
    />
  );
}

export function TextIn({
  value,
  onChange,
  aria,
  placeholder,
  mono = false,
  className = "",
  spellCheck = false,
}: {
  value: string;
  onChange: (v: string) => void;
  aria: string;
  placeholder?: string;
  mono?: boolean;
  className?: string;
  spellCheck?: boolean;
}) {
  return (
    <input
      type="text"
      className={`field ${mono ? "mono" : ""} ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={aria}
      spellCheck={spellCheck}
    />
  );
}

export function Sel({
  value,
  onChange,
  aria,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  aria: string;
  children: ReactNode;
}) {
  return (
    <select className="field" value={value} onChange={(e) => onChange(e.target.value)} aria-label={aria}>
      {children}
    </select>
  );
}

/** Segmented pill tabs, styled like the site's chip buttons. */
export function Tabs({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-2" role="tablist">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="tab"
          aria-selected={value === o.id}
          onClick={() => onChange(o.id)}
          className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
            value === o.id
              ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
              : "hairline hover:bg-[var(--color-surface)]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="text-[13px] leading-5 text-[var(--color-sub)]">{children}</p>;
}

/** 错误/警示条(底色走 .error-bg 主题变量,不硬编码 rgba)。 */
export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <p className="error-bg rounded-xl px-3.5 py-2.5 text-[13px] leading-5 text-[var(--color-ink)]">
      {children}
    </p>
  );
}

/** 主按钮(实心)。 */
export function SolidButton({
  onClick,
  children,
  aria,
}: {
  onClick: () => void;
  children: ReactNode;
  aria?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={aria}
      className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white transition-opacity hover:opacity-90"
    >
      {children}
    </button>
  );
}
