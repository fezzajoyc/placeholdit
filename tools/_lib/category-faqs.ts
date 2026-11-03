import type { CategoryId, Locale } from "@/lib/site";
import type { ToolCopy } from "./types";

/**
 * 类目 FAQ 池:工具页 FAQ 不足 6 条时按类目补齐(JSON-LD 同源走 toolCopy)。
 * 内容写"这个类目共同的真问题"(隐私/收费/格式/精度/浏览器支持),不是凑数占位。
 * 只写核心 5 语(en/zh/ja/es/pt);其他 locale toolCopy 本来就走 overlay 或回退 en。
 */
type Faq = { q: string; a: string };

const GLOBAL: Partial<Record<Locale, Faq[]>> = {
  en: [
    { q: "Does Placeholdit send my code anywhere?", a: "No. Placeholdit's placeholder images and test data tools parse and transform entirely in your browser — paste production snippets with confidence, nothing leaves the tab." },
    { q: "Why is there no account or save feature?", a: "By design. Placeholdit is stateless on purpose: your clipboard and your files stay yours, and the tool works the same on a public computer as on your own." },
    { q: "How large an input can Placeholdit handle?", a: "Only your machine's memory limits it. placeholder images and test data processing is local, so multi-megabyte inputs work without any request-size cap." },
  ],
  zh: [
    { q: "Placeholdit会把我的代码发送到别处吗?", a: "不会。Placeholdit的占位图与测试数据工具完全在浏览器里解析和转换 — 可以放心粘贴生产片段,数据不出标签页。" },
    { q: "为什么没有账号和保存功能?", a: "这是刻意设计。Placeholdit坚持无状态:剪贴板和文件始终属于你,在公共电脑上和自己电脑上体验完全一致。" },
    { q: "能处理多大的输入?", a: "只受你机器内存限制。占位图与测试数据处理全部本地运行,几 MB 的输入也没有请求大小上限。" },
  ],
  ja: [
    { q: "Placeholditはコードをどこかに送信しますか?", a: "いいえ。Placeholditのplaceholder images and test dataツールは完全にブラウザ内で解析・変換します。本番コードの断片も安心して貼り付けられます。" },
    { q: "アカウントや保存機能がないのはなぜ?", a: "意図的な設計です。Placeholditはステートレスを貫いており、クリップボードとファイルは常にユーザーのもの。公用 PC でも自分の PC でも同じ動作をします。" },
    { q: "どれくらい大きい入力まで対応しますか?", a: "実質的な上限は端末のメモリのみ。placeholder images and test data処理はローカル実行のため、数 MB の入力でもリクエストサイズ制限はありません。" },
  ],
  es: [
    { q: "¿Placeholdit envía mi código a algún sitio?", a: "No. Las herramientas de placeholder images and test data de Placeholdit analizan y transforman por completo en tu navegador — pega fragmentos de producción con confianza, nada sale de la pestaña." },
    { q: "¿Por qué no hay cuenta ni guardado?", a: "Es deliberado. Placeholdit no guarda estado: tu portapapeles y tus archivos siguen siendo tuyos, y funciona igual en un ordenador público que en el tuyo." },
    { q: "¿Cuánto soporta de entrada?", a: "Solo la memoria de tu máquina. El procesamiento de placeholder images and test data es local, así que entradas de varios megabytes funcionan sin límite de tamaño." },
  ],
  pt: [
    { q: "O Placeholdit envia meu código para algum lugar?", a: "Não. As ferramentas de placeholder images and test data do Placeholdit analisam e transformam tudo no seu navegador — cole trechos de produção sem medo, nada sai da aba." },
    { q: "Por que não há conta nem salvamento?", a: "É de propósito. O Placeholdit não mantém estado: sua área de transferência e seus arquivos continuam seus, e funciona igual num computador público ou no seu." },
    { q: "Qual o limite de entrada?", a: "Apenas a memória da sua máquina. O processamento de placeholder images and test data é local, então entradas de vários megabytes funcionam sem limite de requisição." },
  ],
};

const BY_CATEGORY: Partial<Record<CategoryId, Partial<Record<Locale, Faq[]>>>> = {

};

/** 取某类目的补充 FAQ 池(global 池 + 类目池,en 缺省回退) */
export function categoryFaqPool(category: CategoryId, locale: Locale): Faq[] {
  const extra = BY_CATEGORY[category]?.[locale] ?? BY_CATEGORY[category]?.en ?? [];
  const global = GLOBAL[locale] ?? GLOBAL.en ?? [];
  return [...extra, ...global];
}
