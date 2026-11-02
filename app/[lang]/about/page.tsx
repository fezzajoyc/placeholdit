import { dict } from "@/lib/i18n";
import { isLocale, LOCALES, type Locale } from "@/lib/site";
import { ALL_TOOLS } from "@/tools/registry";
import { Container, Prose, SectionHead } from "@/components/ui";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const CONTENT: Partial<Record<Locale, string[]>> = {
  en: [
    "Placeholdit is a small family of browser tools for the moment before real assets exist: a placeholder image in your exact dimensions and colors, fake data for your database seeds, a one-letter logo for the staging site, and filler text that does not put your reviewers to sleep.",
    "Everything is computed locally. The SVG strings, PNG rasterization, seeded generators and text templates all run as plain JavaScript in your tab — there is no backend to touch your inputs, no account to create, and no image ever leaves your device.",
    "We are honest about what the tools are: fake data is rule-based word combinations rather than realistic identities, emails land on reserved example.com domains, and the filler text is invented rhythm, not publishable copy. What you see described on each page is exactly what the code does.",
  ],
  zh: [
    "Placeholdit 是一小簇浏览器工具,服务“真实素材到位之前”的那一刻:按你给的尺寸与配色画占位图、给数据库种子造假数据、给演示环境出一个单字母 logo,以及不让人昏昏欲睡的填充文案。",
    "一切都在本地计算。SVG 字符串、PNG 栅格化、带种子的生成器和文案模板,都是在你标签页里运行的纯 JavaScript——没有后端碰你的输入,不需要注册账号,任何图片都不会离开你的设备。",
    "我们对工具的边界保持诚实:假数据是规则词表组合,不是仿真身份;邮箱一律落在保留域 example.com;填充文案是编排出来的节奏,不是可发布的正文。每个页面上写的,就是代码实际做的事。",
  ],
  ja: [
    "Placeholdit は「本物の素材が用意できるまでのその瞬間」のための、小さなブラウザツール集です。指定の寸法と配色のプレースホルダー画像、データベースのシード用フェイクデータ、ステージング用の一文字ロゴ、そしてレビューアーを眠らせない埋め込みテキスト。",
    "すべてローカルで計算されます。SVG 文字列、PNG のラスタライズ、シード付きジェネレーター、テキストテンプレートは、タブの中で動く純粋な JavaScript です。入力に触れるバックエンドはなく、アカウントも不要で、画像が端末の外に出ることもありません。",
    "道具の境界には正直です。フェイクデータは語彙のルール組み合わせであって実在の人物ではなく、メールは予約済み example.com ドメインに落ち、埋め込みテキストは演出されたリズムであって公開可能な文ではありません。各ページに書かれた通りにだけ、コードは動きます。",
  ],
  es: [
    "Placeholdit es una pequeña familia de herramientas de navegador para el momento en que los recursos reales aún no existen: una imagen de marcador con tus medidas y colores exactos, datos falsos para las semillas de tu base de datos, un logo de una letra para el entorno de staging y texto de relleno que no duerme a quien revisa.",
    "Todo se calcula localmente. Las cadenas SVG, la rasterización a PNG, los generadores con semilla y las plantillas de texto son JavaScript puro ejecutándose en tu pestaña: no hay backend que toque tus datos, no hay cuenta que crear y ninguna imagen sale de tu dispositivo.",
    "Somos honestos con lo que son las herramientas: los datos falsos son combinaciones de palabras basadas en reglas, no identidades realistas; los correos caen en dominios reservados example.com; y el texto de relleno es ritmo inventado, no copy publicable. Lo que dice cada página es exactamente lo que hace el código.",
  ],
  pt: [
    "O Placeholdit é uma pequena família de ferramentas de navegador para o momento em que os recursos reais ainda não existem: uma imagem de marcador com suas medidas e cores exatas, dados falsos para as sementes do seu banco, um logo de uma letra para o ambiente de staging e texto de preenchimento que não põe ninguém para dormir.",
    "Tudo é calculado localmente. As strings SVG, a rasterização em PNG, os geradores com semente e os templates de texto são JavaScript puro rodando na sua aba — não há backend tocando seus dados, não há conta para criar e nenhuma imagem sai do seu aparelho.",
    "Somos honestos sobre o que as ferramentas são: os dados falsos são combinações de palavras baseadas em regras, não identidades realistas; os e-mails caem nos domínios reservados example.com; e o texto de preenchimento é ritmo inventado, não texto publicável. O que cada página descreve é exatamente o que o código faz.",
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const t = dict(lang as Locale);
  return (
    <Container className="max-w-3xl py-12">
      <SectionHead title={t.nav.about} />
      <Prose paragraphs={CONTENT[lang as Locale] ?? CONTENT.en!} />
      <p className="mt-6 text-[14px] text-[var(--color-sub)]">
        {ALL_TOOLS.length} tools · {LOCALES.length} languages
      </p>
    </Container>
  );
}
