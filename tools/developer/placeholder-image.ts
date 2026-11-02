import { defineTool } from "../_lib/types";
import { PlaceholderImageEngine } from "../_engines/placeholder-image-engine";

export default defineTool({
  slug: "placeholder-image",
  category: "developer",
  icon: "image",
  featured: true,
  engine: { component: PlaceholderImageEngine, props: {} },
  copy: {
    en: {
      name: "Placeholder Image Generator",
      tagline:
        "Design placeholder images in your browser: set size, colors, label and corner radius, preview instantly, then download SVG or PNG or copy the URL pattern.",
      intro: [
        "Every mockup needs a rectangle that says 600×400 before the real screenshot exists. This generator draws that rectangle — with your dimensions, background, label and optional rounded corners — and shows the result live as you type.",
        "Two exports cover both worlds: SVG for crisp scaling in mockups and docs, PNG rendered on a canvas for avatars and favicons. You also get the URL pattern that the Placeholdit hotlink route accepts, so you can wire up image paths today and swap the domain in later.",
        "Nothing is uploaded. The image is built as an SVG string in your browser and the PNG is rasterized locally — no server, no account, no watermark.",
      ],
      steps: [
        "Enter the width and height you need, or tap a quick-size preset like OG 1200×630.",
        "Pick the background and text colors, optionally type a label and set a corner radius.",
        "Watch the live preview, then choose SVG or PNG and download it — or copy the SVG markup.",
        "Copy the URL pattern to keep the exact image recipe in your CSS, docs or issue tracker.",
      ],
      faqs: [
        {
          q: "Can I hotlink images from this URL today?",
          a: "Not yet. The pattern is the exact route shape the upcoming hotlink service accepts — save it now and your mockups will keep working when the direct routes ship.",
        },
        {
          q: "What is the maximum size?",
          a: "Width and height each accept 1 to 5000 pixels. The PNG export renders at exactly those dimensions on your device.",
        },
        {
          q: "Which format should I download?",
          a: "SVG for anything that rescales — mockups, READMEs, design systems. PNG when the target only accepts bitmaps, like favicons or chat avatars.",
        },
      ],
    },
    zh: {
      name: "占位图生成器",
      tagline:
        "在浏览器里做占位图:宽高、配色、文字、圆角随改随看,导出 SVG 或 PNG,还能复制 URL 模式,给将来的热链路由留好格式。",
      intro: [
        "每个原型都需要一块写着 600×400 的矩形,等真正的截图到位。这个生成器画的就是那块矩形——尺寸、背景、文字、圆角都随输入实时更新。",
        "两种导出覆盖两类场景:SVG 用于无限缩放的原型和文档,PNG 由本地画布渲染,适合头像和 favicon。同时给出 Placeholdit 热链路由接受的 URL 模式,今天就能把图片路径写好,将来换域名即可。",
        "全程无上传:图片在浏览器里以 SVG 字符串生成,PNG 在本地栅格化——没有服务器、没有账号、没有水印。",
      ],
      steps: [
        "输入所需宽高,或点击常用尺寸预设(如 OG 1200×630)。",
        "选择背景色与文字色,可选填文字并设置圆角半径。",
        "查看实时预览,选择 SVG 或 PNG 下载,或直接复制 SVG 代码。",
        "复制 URL 模式,把这张图的配方保存进 CSS、文档或 issue。",
      ],
      faqs: [
        {
          q: "现在能直接从 URL 热链图片吗?",
          a: "还不能。这个模式就是即将上线的热链服务的路由格式——现在保存好,等直链路由上线后原型无需改动。",
        },
        {
          q: "最大尺寸是多少?",
          a: "宽高各自接受 1–5000 像素。PNG 导出会在你的设备上按该尺寸精确渲染。",
        },
        {
          q: "该下载哪种格式?",
          a: "需要缩放的场景选 SVG——原型、README、设计系统;目标只接受位图(如 favicon、聊天头像)时选 PNG。",
        },
      ],
    },
    ja: {
      name: "プレースホルダー画像ジェネレーター",
      tagline:
        "ブラウザ内でプレースホルダー画像を作成。サイズ・配色・ラベル・角丸をその場でプレビューし、SVG / PNG をダウンロード、URL パターンもコピーできます。",
      intro: [
        "本物のスクリーンショットが用意できるまで、あらゆるモックアップには 600×400 の四角形が必要です。このジェネレーターはその四角形を、寸法・背景・ラベル・角丸つきで、入力に合わせて即座に描きます。",
        "書き出しは 2 種類:拡大に強い SVG はモックアップやドキュメント向き、キャンバスで描画する PNG はアバターや favicon 向きです。さらに Placeholdit のホットリンクルートが受け付ける URL パターンも発行するので、画像パスを今書いておいて後からドメインだけ差し替えられます。",
        "アップロードは一切ありません。画像はブラウザ内で SVG 文字列として組み立てられ、PNG もローカルでラスタライズされます。",
      ],
      steps: [
        "必要な幅と高さを入力するか、OG 1200×630 などのサイズプリセットをタップします。",
        "背景色と文字色を選び、必要ならラベルと角丸の半径を指定します。",
        "ライブプレビューを確認し、SVG か PNG をダウンロード、または SVG コードをコピーします。",
        "URL パターンをコピーして、CSS・ドキュメント・issue に画像のレシピを保存します。",
      ],
      faqs: [
        {
          q: "今すぐこの URL から画像をホットリンクできますか?",
          a: "まだです。このパターンは今後公開するホットリンクサービスが受け付けるルートの形そのものです。今保存しておけば、直リンク対応後もモックアップはそのまま使えます。",
        },
        {
          q: "最大サイズは?",
          a: "幅・高さとも 1〜5000 ピクセルです。PNG 書き出しはその寸法で端末内に描画されます。",
        },
        {
          q: "どちらの形式でダウンロードすべき?",
          a: "拡大縮小するなら SVG(モックアップ・README・デザインシステム)。favicon やチャットアバターなどビットマップしか受け付けない場所は PNG です。",
        },
      ],
    },
    es: {
      name: "Generador de imágenes de marcador",
      tagline:
        "Crea imágenes de marcador en tu navegador: tamaño, colores, texto y esquinas redondeadas con vista previa al instante; descarga SVG o PNG o copia el patrón de URL.",
      intro: [
        "Toda maqueta necesita un rectángulo que diga 600×400 hasta que exista la captura real. Este generador dibuja ese rectángulo — con tus dimensiones, fondo, texto y esquinas redondeadas opcionales — y muestra el resultado en vivo mientras escribes.",
        "Dos exportaciones cubren ambos mundos: SVG para escalar sin pérdida en maquetas y documentos, PNG renderizado en un canvas para avatares y favicons. También obtienes el patrón de URL que aceptará la ruta de hotlink de Placeholdit, para que puedas escribir las rutas de imagen hoy y cambiar el dominio más tarde.",
        "Nada se sube. La imagen se construye como cadena SVG en tu navegador y el PNG se rasteriza localmente: sin servidor, sin cuenta, sin marca de agua.",
      ],
      steps: [
        "Introduce el ancho y alto que necesites, o toca un preajuste como OG 1200×630.",
        "Elige los colores de fondo y de texto, y opcionalmente escribe un texto y define el radio de las esquinas.",
        "Mira la vista previa en vivo, elige SVG o PNG y descárgalo, o copia el marcado SVG.",
        "Copia el patrón de URL para guardar la receta exacta en tu CSS, documentación o issues.",
      ],
      faqs: [
        {
          q: "¿Puedo enlazar imágenes directamente desde esta URL hoy?",
          a: "Aún no. El patrón es exactamente la forma de ruta que aceptará el próximo servicio de hotlink: guárdalo ahora y tus maquetas seguirán funcionando cuando lleguen las rutas directas.",
        },
        {
          q: "¿Cuál es el tamaño máximo?",
          a: "Ancho y alto aceptan de 1 a 5000 píxeles cada uno. La exportación PNG se renderiza a esas dimensiones exactas en tu dispositivo.",
        },
        {
          q: "¿Qué formato debo descargar?",
          a: "SVG para todo lo que se reescala: maquetas, READMEs, sistemas de diseño. PNG cuando el destino solo acepta mapas de bits, como favicons o avatares de chat.",
        },
      ],
    },
    pt: {
      name: "Gerador de imagem de marcador",
      tagline:
        "Crie imagens de marcador no navegador: tamanho, cores, texto e cantos arredondados com pré-visualização instantânea; baixe SVG ou PNG ou copie o padrão de URL.",
      intro: [
        "Todo mockup precisa de um retângulo escrito 600×400 até a captura de tela real existir. Este gerador desenha esse retângulo — com suas dimensões, fundo, texto e cantos arredondados opcionais — e mostra o resultado ao vivo enquanto você digita.",
        "Duas exportações cobrem os dois mundos: SVG para escalar sem perdas em mockups e documentos, PNG renderizado num canvas para avatares e favicons. Você também recebe o padrão de URL que a rota de hotlink do Placeholdit aceitará, para escrever os caminhos de imagem hoje e trocar o domínio depois.",
        "Nada é enviado. A imagem é montada como string SVG no seu navegador e o PNG é rasterizado localmente — sem servidor, sem conta, sem marca d'água.",
      ],
      steps: [
        "Digite a largura e a altura de que precisa, ou toque num predefinido como OG 1200×630.",
        "Escolha as cores de fundo e de texto e, opcionalmente, escreva um texto e defina o raio dos cantos.",
        "Veja a pré-visualização ao vivo, escolha SVG ou PNG e baixe, ou copie a marcação SVG.",
        "Copie o padrão de URL para guardar a receita exata no seu CSS, documentação ou issues.",
      ],
      faqs: [
        {
          q: "Posso fazer hotlink de imagens desta URL hoje?",
          a: "Ainda não. O padrão é exatamente o formato de rota que o futuro serviço de hotlink aceitará: guarde-o agora e seus mockups continuarão funcionando quando as rotas diretas chegarem.",
        },
        {
          q: "Qual é o tamanho máximo?",
          a: "Largura e altura aceitam de 1 a 5000 pixels cada. A exportação PNG é renderizada exatamente nessas dimensões no seu aparelho.",
        },
        {
          q: "Qual formato devo baixar?",
          a: "SVG para tudo que é redimensionado: mockups, READMEs, design systems. PNG quando o destino só aceita bitmap, como favicons ou avatares de chat.",
        },
      ],
    },
  },
  related: ["fake-data-generator", "dummy-logo-maker", "lorem-pill"],
});
