import { defineTool } from "../_lib/types";
import { DummyLogoEngine } from "../_engines/dummy-logo-engine";

export default defineTool({
  slug: "dummy-logo-maker",
  category: "developer",
  icon: "palette",
  engine: { component: DummyLogoEngine, props: {} },
  copy: {
    en: {
      name: "Dummy Logo Maker",
      tagline:
        "Instant single-letter logos on geometric backdrops: circle, square, triangle or hexagon with palette presets — download crisp SVG or PNG before your brand exists.",
      intro: [
        "Before the real brand lands, staging sites, slide decks and MVP shells still need a mark. This maker puts one character on a geometric backdrop — circle, square, triangle or hexagon — with a hand-picked palette row so the first result already looks deliberate.",
        "Type any character: Latin letters, a CJK glyph or even an emoji's first code point all work, because the letter is taken as the first grapheme of what you enter and centered with an adaptive font size.",
        "Download the SVG for pixel-perfect scaling in navigation bars and splash screens, or the PNG for avatars and favicons. Everything is computed in your browser — no design tool, no upload, no signup.",
      ],
      steps: [
        "Type the letter or character to feature — only the first character is used.",
        "Pick a backdrop shape and tune the letter and shape colors, or tap a palette preset.",
        "Set the export size between 16 and 1024 pixels.",
        "Download SVG or PNG, or copy the SVG markup straight into your project.",
      ],
      faqs: [
        {
          q: "Is this a replacement for a real logo?",
          a: "No — it is a deliberate stand-in. Use it while the brand is still in progress, for staging environments, internal tools and side projects that need a clean mark today.",
        },
        {
          q: "Which characters work?",
          a: "Any single character: letters, digits, CJK glyphs and most emoji. The generator takes the first grapheme of your input and ignores the rest.",
        },
        {
          q: "Why SVG and PNG?",
          a: "SVG scales to any size without artifacts, which suits nav bars and responsive layouts. PNG is the safe bitmap for favicons, avatars and places that reject vectors.",
        },
      ],
    },
    zh: {
      name: "极简 Logo 生成器",
      tagline:
        "几秒做出单字母几何 logo:圆形、方形、三角形或六边形底形加配色预设,品牌还没定稿也能先拿到干净的 SVG / PNG 标识。",
      intro: [
        "真正的品牌定稿之前,演示站、幻灯片和 MVP 外壳依然需要一个标识。这个生成器把一个字符放在几何底形上——圆、方、三角或六边形——并配好一组精选配色,第一个结果就不像临时凑数。",
        "支持任意字符:拉丁字母、中日韩文字,甚至 emoji 的首个码点都可以,因为字母取自输入的第一个字素,并以自适应字号居中。",
        "SVG 用于导航栏和启动页的像素级缩放,PNG 用于头像和 favicon。全部在浏览器里计算——不用设计软件、没有上传、无需注册。",
      ],
      steps: [
        "输入要展示的字母或字符——只取第一个字符。",
        "选择底形,调整字母与底形颜色,或点击配色预设。",
        "设置 16–1024 像素之间的导出尺寸。",
        "下载 SVG 或 PNG,或直接把 SVG 代码复制进项目。",
      ],
      faqs: [
        {
          q: "这能替代真正的 logo 吗?",
          a: "不能——它是有意的替身。品牌还在进行中时,给演示环境、内部工具和副业项目先用一个干净的标识。",
        },
        {
          q: "支持哪些字符?",
          a: "任意单个字符:字母、数字、中日韩文字和多数 emoji。生成器取输入的第一个字素,其余忽略。",
        },
        {
          q: "为什么要 SVG 和 PNG 两种?",
          a: "SVG 无级缩放不糊,适合导航栏和响应式布局;PNG 是 favicon、头像等不接受矢量场合的稳妥位图。",
        },
      ],
    },
    ja: {
      name: "ダミーロゴメーカー",
      tagline:
        "一文字を幾何学図形に載せた即席ロゴ:円・四角・三角・六角形と配色プリセット。ブランド確定前でもきれいな SVG / PNG をすぐ入手できます。",
      intro: [
        "本格的なブランドが決まる前でも、ステージング環境・スライド・MVP の外殻にはマークが必要です。このメーカーは 1 文字を幾何学図形 — 円・四角・三角・六角形 — に載せ、厳選した配色プリセット付きなので、最初の結果から意図的に見えます。",
        "どんな文字でも入力できます:ラテン文字、CJK の文字、絵文字の先頭コードポイントまで。入力の最初の字素を取り、適応するフォントサイズで中央に配置します。",
        "SVG はナビゲーションバーやスプラッシュ画面の拡大縮小に、PNG はアバターと favicon に。すべてブラウザ内で計算され、アップロードも登録も不要です。",
      ],
      steps: [
        "表示したい文字を入力します — 先頭の 1 文字のみ使用されます。",
        "図形を選び、文字色と図形の色を調整するか、配色プリセットをタップします。",
        "書き出しサイズを 16〜1024 ピクセルの間で設定します。",
        "SVG か PNG をダウンロード、または SVG コードをプロジェクトにコピーします。",
      ],
      faqs: [
        {
          q: "本物のロゴの代わりになりますか?",
          a: "なりません — 意図的な代用品です。ブランドが進行中の間、ステージング環境・社内ツール・サイドプロジェクトに今日きれいなマークが必要なときに使います。",
        },
        {
          q: "どんな文字が使えますか?",
          a: "任意の 1 文字:英数字、CJK の文字、大半の絵文字。入力の最初の字素だけを取り、残りは無視します。",
        },
        {
          q: "なぜ SVG と PNG の両方?",
          a: "SVG は劣化なく拡大縮小でき、ナビバーやレスポンシブレイアウトに向きます。PNG は favicon・アバターなどベクターを拒否する場所向けの安全なビットマップです。",
        },
      ],
    },
    es: {
      name: "Creador de logos dummy",
      tagline:
        "Logos instantáneos de una letra sobre formas geométricas: círculo, cuadrado, triángulo o hexágono con paletas predefinidas — descarga SVG o PNG antes de tener marca.",
      intro: [
        "Antes de que llegue la marca real, los sitios de staging, las presentaciones y los esqueletos de un MVP igual necesitan un símbolo. Este creador pone un carácter sobre una forma geométrica — círculo, cuadrado, triángulo o hexágono — con una fila de paletas elegidas a mano para que el primer resultado ya se vea intencional.",
        "Escribe cualquier carácter: letras latinas, un glifo CJK o incluso el primer code point de un emoji, porque la letra es el primer grafema de lo que escribas, centrado con un tamaño adaptativo.",
        "Descarga el SVG para escalar sin artefactos en barras de navegación y pantallas de inicio, o el PNG para avatares y favicons. Todo se calcula en tu navegador: sin herramienta de diseño, sin subidas, sin registro.",
      ],
      steps: [
        "Escribe la letra o carácter a destacar — solo se usa el primer carácter.",
        "Elige la forma de fondo y ajusta los colores de letra y forma, o toca una paleta predefinida.",
        "Fija el tamaño de exportación entre 16 y 1024 píxeles.",
        "Descarga SVG o PNG, o copia el marcado SVG directo a tu proyecto.",
      ],
      faqs: [
        {
          q: "¿Sustituye a un logo de verdad?",
          a: "No — es un sustituto deliberado. Úsalo mientras la marca sigue en camino, para entornos de staging, herramientas internas y proyectos personales que hoy necesitan un símbolo limpio.",
        },
        {
          q: "¿Qué caracteres funcionan?",
          a: "Cualquiera de un solo carácter: letras, dígitos, glifos CJK y la mayoría de los emoji. El generador toma el primer grafema de tu entrada e ignora el resto.",
        },
        {
          q: "¿Por qué SVG y PNG?",
          a: "El SVG escala a cualquier tamaño sin artefactos, ideal para barras de navegación y layouts responsivos. El PNG es el bitmap seguro para favicons, avatares y sitios que rechazan vectores.",
        },
      ],
    },
    pt: {
      name: "Criador de logo dummy",
      tagline:
        "Logos instantâneos de uma letra sobre formas geométricas: círculo, quadrado, triângulo ou hexágono com paletas predefinidas — baixe SVG ou PNG antes da marca existir.",
      intro: [
        "Antes da marca real chegar, sites de staging, apresentações e esqueletos de MVP ainda precisam de um símbolo. Este criador coloca um caractere sobre uma forma geométrica — círculo, quadrado, triângulo ou hexágono — com uma fileira de paletas escolhidas à mão para o primeiro resultado já parecer intencional.",
        "Digite qualquer caractere: letras latinas, um glifo CJK ou até o primeiro code point de um emoji, porque a letra é o primeiro grafema do que você digitar, centralizado com tamanho adaptativo.",
        "Baixe o SVG para escalar sem artefatos em barras de navegação e telas de abertura, ou o PNG para avatares e favicons. Tudo é calculado no seu navegador — sem ferramenta de design, sem upload, sem cadastro.",
      ],
      steps: [
        "Digite a letra ou caractere a destacar — apenas o primeiro caractere é usado.",
        "Escolha a forma de fundo e ajuste as cores da letra e da forma, ou toque numa paleta predefinida.",
        "Defina o tamanho de exportação entre 16 e 1024 pixels.",
        "Baixe SVG ou PNG, ou copie a marcação SVG direto para o seu projeto.",
      ],
      faqs: [
        {
          q: "Isto substitui um logo de verdade?",
          a: "Não — é um substituto deliberado. Use enquanto a marca está em andamento, para ambientes de staging, ferramentas internas e projetos paralelos que precisam de um símbolo limpio hoje.",
        },
        {
          q: "Quais caracteres funcionam?",
          a: "Qualquer caractere único: letras, dígitos, glifos CJK e a maioria dos emoji. O gerador pega o primeiro grafema da sua entrada e ignora o resto.",
        },
        {
          q: "Por que SVG e PNG?",
          a: "O SVG escala a qualquer tamanho sem artefatos, ideal para barras de navegação e layouts responsivos. O PNG é o bitmap seguro para favicons, avatares e lugares que rejeitam vetores.",
        },
      ],
    },
  },
  related: ["placeholder-image", "fake-data-generator", "lorem-pill"],
});
