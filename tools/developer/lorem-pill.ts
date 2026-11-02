import { defineTool } from "../_lib/types";
import { LoremPillEngine } from "../_engines/lorem-pill-engine";

export default defineTool({
  slug: "lorem-pill",
  category: "developer",
  icon: "text",
  engine: { component: LoremPillEngine, props: {} },
  copy: {
    en: {
      name: "Filler Text Generator",
      h1: "Filler text without the Lorem ipsum echo",
      tagline:
        "Sentence and paragraph filler with varied openers instead of a repeated Lorem ipsum — plain, markdown or HTML output, seeded so mockups stay reproducible.",
      intro: [
        "Classic Lorem ipsum has one problem beyond being fake Latin: every mockup shows the same six words, so clients stop seeing the layout and start seeing the wallpaper. This generator composes filler sentences from varied openers, subjects and verbs, so consecutive lines never start the same way.",
        "Choose sentences or paragraphs, set the count, and export as plain text, markdown paragraphs or wrapped HTML <p> tags — whatever the paste target expects.",
        "An optional numeric seed makes the text reproducible: the same seed always yields the same filler, so screenshots, demos and design reviews stay comparable across days.",
      ],
      steps: [
        "Pick sentences or paragraphs and how many you need (1–50).",
        "For paragraphs, set how many sentences each one carries (1–10).",
        "Optionally enter a seed to lock the exact text, or leave it empty for fresh filler each time.",
        "Choose plain, markdown or HTML output, then copy it into your mockup or template.",
      ],
      faqs: [
        {
          q: "Why not Lorem ipsum?",
          a: "It repeats the same fragment everywhere, which trains reviewers to skim past content. Varied openers keep the eye moving through the actual layout — and no fake Latin words get mistaken for real copy.",
        },
        {
          q: "What does the seed do?",
          a: "The generator is deterministic: the same seed reproduces the exact same sentences. Use it when a design review needs the same placeholder text on two different days.",
        },
        {
          q: "Is this real content I can publish?",
          a: "No. It is filler for layouts, templates and demos — plausible English rhythm, invented meaning. Replace it with real copy before anything ships.",
        },
      ],
    },
    zh: {
      name: "填充文案生成器",
      h1: "不再满屏 Lorem ipsum 的填充文案",
      tagline:
        "句子与段落填充,开头语各不相同,告别重复的 Lorem ipsum——支持纯文本、Markdown、HTML 输出,可加种子让原型文本可复现。",
      intro: [
        "经典 Lorem ipsum 除了是假拉丁文,还有个更大的问题:每张原型都是同样六个词,客户看到的不再是版式,而是壁纸。这个生成器用不同的开头语、主语和谓语组装填充句,相邻两句绝不以同一个词开头。",
        "选择句子或段落,设定数量,输出纯文本、Markdown 段落或带 <p> 标签的 HTML——粘贴目标要什么就给什么。",
        "可选的数字种子让文本可复现:同一种子永远得到同样的填充文案,设计评审和演示截图跨天对比也不走样。",
      ],
      steps: [
        "选择句子或段落,以及需要的数量(1–50)。",
        "段落模式下,设置每段包含的句数(1–10)。",
        "可选输入种子锁定文本;留空则每次生成新的填充内容。",
        "选择纯文本、Markdown 或 HTML 输出,复制进原型或模板。",
      ],
      faqs: [
        {
          q: "为什么不用 Lorem ipsum?",
          a: "它到处都是同一段话,评审者会练成略读。多变的开头语让视线真正扫过版式,也不会有人把假拉丁文误认成真实文案。",
        },
        {
          q: "种子是干什么的?",
          a: "生成器是确定性的:相同种子重现完全相同的句子。设计评审需要跨天看到同一份占位文本时用它。",
        },
        {
          q: "能当作正式内容发布吗?",
          a: "不能。这是给版式、模板和演示用的填充文本——节奏像真话,意思是编的。上线前请替换成真实文案。",
        },
      ],
    },
    ja: {
      name: "埋め込みテキストジェネレーター",
      h1: "Lorem ipsum の繰り返しに頼らない埋め込みテキスト",
      tagline:
        "文頭が毎回変わる文章・段落の埋め込みテキストを生成。プレーン / Markdown / HTML で出力でき、シード指定でプロトタイプの文章を再現できます。",
      intro: [
        "古典的な Lorem ipsum の問題は偽のラテン語であることだけではありません。どのモックアップも同じ 6 語なので、クライアントはレイアウトではなく壁紙を見るようになります。このジェネレーターは変化のある文頭・主語・動詞から埋め込み文を組み立て、連続する行が同じ語で始まりません。",
        "文か段落を選び、件数を決め、プレーンテキスト・Markdown 段落・<p> タグ付き HTML として書き出せます。貼り付ける先の形式に合わせてください。",
        "数値シードを指定するとテキストは再現可能になります。同じシードは常に同じ文を返すので、スクリーンショットやデザインレビューを日をまたいで比較できます。",
      ],
      steps: [
        "文か段落を選び、必要な件数(1〜50)を設定します。",
        "段落の場合、1 段落あたりの文数(1〜10)を決めます。",
        "必要ならシードを入力してテキストを固定、空欄なら毎回新しい文が生成されます。",
        "出力形式をプレーン・Markdown・HTML から選び、モックアップやテンプレートに貼り付けます。",
      ],
      faqs: [
        {
          q: "なぜ Lorem ipsum ではないのですか?",
          a: "同じ断片がどこにでも繰り返し現れるため、見る人が本文を流し読みする癖がつきます。変化のある文頭は視線を実際のレイアウトに誘導し、偽ラテン語が本文と誤認されることもありません。",
        },
        {
          q: "シードは何をするものですか?",
          a: "ジェネレーターは決定論的です。同じシードはまったく同じ文を再現します。別の日に同じプレースホルダー文を見せたいデザインレビューで使います。",
        },
        {
          q: "このまま公開できるコンテンツですか?",
          a: "いいえ。レイアウト・テンプレート・デモ用の埋め込みテキストで、リズムは本物らしく、意味は架空です。公開前に実際のコピーに置き換えてください。",
        },
      ],
    },
    es: {
      name: "Generador de texto de relleno",
      h1: "Texto de relleno sin el eco del Lorem ipsum",
      tagline:
        "Frases y párrafos de relleno con inicios variados en vez del Lorem ipsum repetido — salida en texto, markdown o HTML, con semilla para mockups reproducibles.",
      intro: [
        "El Lorem ipsum clásico tiene un problema además de ser un falso latín: todas las maquetas muestran las mismas seis palabras, así que el cliente deja de ver el layout y empieza a ver el empapelado. Este generador compone frases de relleno con inicios, sujetos y verbos variados, de modo que dos líneas seguidas nunca empiecen igual.",
        "Elige frases o párrafos, fija la cantidad y exporta como texto plano, párrafos markdown o etiquetas HTML <p> — lo que espere el destino del pegado.",
        "Una semilla numérica opcional hace el texto reproducible: la misma semilla siempre produce el mismo relleno, así las capturas, demos y revisiones de diseño siguen siendo comparables.",
      ],
      steps: [
        "Elige frases o párrafos y cuántos necesitas (1–50).",
        "En párrafos, define cuántas frases lleva cada uno (1–10).",
        "Opcionalmente escribe una semilla para fijar el texto exacto, o déjala vacía para relleno nuevo cada vez.",
        "Elige salida en texto, markdown o HTML y cópialo en tu maqueta o plantilla.",
      ],
      faqs: [
        {
          q: "¿Por qué no Lorem ipsum?",
          a: "Repite el mismo fragmento en todas partes, lo que enseña a los revisores a saltarse el contenido. Los inicios variados mantienen la mirada recorriendo el layout real — y nadie confunde palabras en falso latín con copia real.",
        },
        {
          q: "¿Qué hace la semilla?",
          a: "El generador es determinista: la misma semilla reproduce exactamente las mismas frases. Úsala cuando una revisión necesita el mismo texto de marcador en dos días distintos.",
        },
        {
          q: "¿Es contenido real que puedo publicar?",
          a: "No. Es relleno para layouts, plantillas y demos — ritmo plausible en inglés, significado inventado. Sustitúyelo por copia real antes de publicar nada.",
        },
      ],
    },
    pt: {
      name: "Gerador de texto de preenchimento",
      h1: "Texto de preenchimento sem o eco do Lorem ipsum",
      tagline:
        "Frases e parágrafos de preenchimento com inícios variados em vez do Lorem ipsum repetido — saída em texto, markdown ou HTML, com semente para mockups reproduzíveis.",
      intro: [
        "O Lorem ipsum clássico tem um problema além de ser falso latim: todo mockup mostra as mesmas seis palavras, então o cliente para de ver o layout e passa a ver o papel de parede. Este gerador compõe frases de preenchimento com inícios, sujeitos e verbos variados, então duas linhas seguidas nunca começam igual.",
        "Escolha frases ou parágrafos, defina a quantidade e exporte como texto simples, parágrafos markdown ou tags HTML <p> — o que o destino da colagem esperar.",
        "Uma semente numérica opcional torna o texto reproduzível: a mesma semente sempre gera o mesmo preenchimento, então screenshots, demos e revisões de design continuam comparáveis.",
      ],
      steps: [
        "Escolha frases ou parágrafos e quantos precisa (1–50).",
        "Para parágrafos, defina quantas frases cada um carrega (1–10).",
        "Opcionalmente digite uma semente para travar o texto exato, ou deixe vazio para preenchimento novo a cada vez.",
        "Escolha saída em texto, markdown ou HTML e copie para o seu mockup ou template.",
      ],
      faqs: [
        {
          q: "Por que não Lorem ipsum?",
          a: "Ele repete o mesmo fragmento em todo lugar, o que ensina os revisores a passar os olhos por cima. Inícios variados mantêm o olhar percorrendo o layout real — e ninguém confunde falso latim com texto real.",
        },
        {
          q: "O que a semente faz?",
          a: "O gerador é determinístico: a mesma semente reproduz exatamente as mesmas frases. Use quando uma revisão de design precisa do mesmo texto de marcador em dias diferentes.",
        },
        {
          q: "É conteúdo real que posso publicar?",
          a: "Não. É preenchimento para layouts, templates e demos — ritmo plausível em inglês, significado inventado. Substitua por texto real antes de publicar qualquer coisa.",
        },
      ],
    },
  },
  related: ["placeholder-image", "fake-data-generator", "dummy-logo-maker"],
});
