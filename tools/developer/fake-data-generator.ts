import { defineTool } from "../_lib/types";
import { FakeDataEngine } from "../_engines/fake-data-engine";

export default defineTool({
  slug: "fake-data-generator",
  category: "developer",
  icon: "shuffle",
  featured: true,
  engine: { component: FakeDataEngine, props: {} },
  copy: {
    en: {
      name: "Fake Data Generator",
      tagline:
        "Rule-based test data on demand: names, emails, companies, addresses, UUID v4, hex colors and IP addresses in JSON, CSV or plain text — seeded and reproducible.",
      intro: [
        "Databases, forms and API clients all need something realistic-looking to chew on. This generator produces rows of synthetic person, company and address records — plus UUIDs, hex colors and IPs — straight from word lists and patterns that run in your browser.",
        "It is deliberately rule-based, not a faker engine trained to mimic real populations: the values are clearly fabricated combinations, and every email lands on the reserved example.com / example.net domains, so nothing can ever reach a real inbox.",
        "Pass an optional numeric seed and the output becomes fully reproducible — the same seed yields byte-identical rows, which is exactly what flaky test fixtures and screenshot diffs need.",
      ],
      steps: [
        "Pick a category: person, company, address, filler words, UUID v4, hex color or IP address.",
        "Set how many rows you need (1–50) and optionally type a seed for reproducible output.",
        "Choose JSON, CSV or plain text and copy the result, or download it as a file.",
        "Need the same data again later? Re-enter the same seed and you get identical rows.",
      ],
      faqs: [
        {
          q: "Are these real people or companies?",
          a: "No. The names, companies and addresses are rule-based word combinations for tests and mockups — not realistic identities — and all emails use the reserved example.com / example.net domains.",
        },
        {
          q: "Why does a seed matter?",
          a: "Without a seed you get fresh randomness on every generation. With a seed, the same number always produces the same rows, so your tests, screenshots and demos stay stable.",
        },
        {
          q: "Is the UUID a valid v4?",
          a: "It follows the v4 layout — version nibble 4 and the RFC variant bits are set correctly — but the randomness comes from the seeded generator, not from your OS entropy.",
        },
      ],
    },
    zh: {
      name: "假数据生成器",
      tagline:
        "规则式测试数据随取随用:姓名、邮箱、公司、地址、UUID v4、十六进制色、IP 地址,输出 JSON / CSV / 纯文本,可加种子完全复现。",
      intro: [
        "数据库、表单和 API 客户端都需要一些看起来像样的数据来调试。这个生成器直接从词表与规则产出人物、公司、地址记录,外加 UUID、十六进制色和 IP 地址,全部在浏览器里完成。",
        "它刻意采用规则词表而不是仿真身份库:数值是明显的随机组合,邮箱一律落在保留域 example.com / example.net,永远不会发进真实收件箱。",
        "传入可选的数字种子后输出完全可复现——同一种子得到逐字节相同的行,这正是测试夹具和截图对比需要的性质。",
      ],
      steps: [
        "选择类别:人物、公司、地址、填充词句、UUID v4、十六进制色或 IP 地址。",
        "设置行数(1–50),可选输入种子以获得可复现的输出。",
        "选择 JSON、CSV 或纯文本,复制结果或下载为文件。",
        "之后需要同一份数据?输入相同种子即可得到完全相同的行。",
      ],
      faqs: [
        {
          q: "这些是真实的人或公司吗?",
          a: "不是。姓名、公司、地址都是规则词表组合,用于测试与占位,不代表真实身份;所有邮箱都使用保留域 example.com / example.net。",
        },
        {
          q: "种子有什么用?",
          a: "不填种子时每次生成都产生新的随机结果;填了种子后,同一个数字永远产出同样的行,测试、截图和演示都能保持稳定。",
        },
        {
          q: "生成的 UUID 是合法的 v4 吗?",
          a: "符合 v4 布局——版本位 4 与 RFC 变体位都按规范置位——但随机性来自种子化生成器,不是系统熵源。",
        },
      ],
    },
    ja: {
      name: "フェイクデータジェネレーター",
      tagline:
        "ルールベースのテストデータを即座に生成:名前・メール・会社・住所・UUID v4・16進カラー・IP を JSON / CSV / テキストで、シード指定なら完全再現できます。",
      intro: [
        "データベース、フォーム、API クライアントの開発には、それっぽいダミーデータが必要です。このジェネレーターは語彙リストとパターンから人物・会社・住所レコードを、UUID・16進カラー・IP とともにブラウザ内で生成します。",
        "意図的にルールベースにしています:実在人口を模倣するのではなく、明らかに合成された語の組み合わせです。メールは必ず予約済みドメイン example.com / example.net を使うため、実際の受信箱に届くことはありません。",
        "数値のシードを渡すと出力は完全に再現可能になります。同じシードは常に同じ行を返すので、不安定なテストフィクスチャやスクリーンショット比較に向いています。",
      ],
      steps: [
        "カテゴリーを選びます:人物・会社・住所・埋め込み語・UUID v4・16進カラー・IP アドレス。",
        "件数(1〜50)を設定し、必要なら再現用のシードを入力します。",
        "JSON・CSV・テキストを選んでコピーするか、ファイルとしてダウンロードします。",
        "後で同じデータが必要になったら、同じシードを入力するだけで同じ行が得られます。",
      ],
      faqs: [
        {
          q: "これは実在の人物や会社ですか?",
          a: "いいえ。名前・会社・住所はテストとモック用のルールベースの語の組み合わせで、実在の身份ではありません。メールはすべて予約済みドメイン example.com / example.net を使います。",
        },
        {
          q: "シードには何の意味がありますか?",
          a: "シードなしでは毎回新しい乱数になります。シードを指定すると同じ数値は常に同じ行を生成するので、テスト・スクリーンショット・デモが安定します。",
        },
        {
          q: "UUID は正しい v4 ですか?",
          a: "v4 のレイアウトに従います — バージョン nibble の 4 と RFC 変体ビットは正しく設定されています — ただし乱数源はシード付きジェネレーターで、OS のエントロピーではありません。",
        },
      ],
    },
    es: {
      name: "Generador de datos falsos",
      tagline:
        "Datos de prueba basados en reglas al instante: nombres, correos, empresas, direcciones, UUID v4, colores hex y direcciones IP en JSON, CSV o texto, con semilla reproducible.",
      intro: [
        "Bases de datos, formularios y clientes de API necesitan datos con apariencia realista para probarse. Este generador produce filas sintéticas de personas, empresas y direcciones — además de UUIDs, colores hex e IPs — a partir de listas de palabras y patrones que corren en tu navegador.",
        "Es deliberadamente basado en reglas, no un motor entrenado para imitar poblaciones reales: los valores son combinaciones claramente fabricadas y cada correo cae en los dominios reservados example.com / example.net, así que nunca llega a una bandeja real.",
        "Con una semilla numérica opcional la salida es totalmente reproducible: la misma semilla produce filas idénticas byte a byte, justo lo que necesitan los fixtures inestables y las comparaciones de capturas.",
      ],
      steps: [
        "Elige una categoría: persona, empresa, dirección, palabras de relleno, UUID v4, color hex o IP.",
        "Define cuántas filas necesitas (1–50) y opcionalmente escribe una semilla para reproducibilidad.",
        "Elige JSON, CSV o texto plano, copia el resultado o descárgalo como archivo.",
        "¿Necesitas los mismos datos más adelante? Vuelve a introducir la misma semilla y obtendrás filas idénticas.",
      ],
      faqs: [
        {
          q: "¿Son personas o empresas reales?",
          a: "No. Los nombres, empresas y direcciones son combinaciones de palabras basadas en reglas para pruebas y maquetas — no identidades realistas — y todos los correos usan los dominios reservados example.com / example.net.",
        },
        {
          q: "¿Para qué sirve la semilla?",
          a: "Sin semilla obtienes aleatoriedad nueva en cada generación. Con una semilla, el mismo número siempre produce las mismas filas, así tus pruebas, capturas y demos se mantienen estables.",
        },
        {
          q: "¿El UUID es un v4 válido?",
          a: "Sigue el formato v4 — el nibble de versión 4 y los bits de variante RFC se ajustan correctamente — pero la aleatoriedad viene del generador con semilla, no de la entropía del sistema.",
        },
      ],
    },
    pt: {
      name: "Gerador de dados falsos",
      tagline:
        "Dados de teste baseados em regras na hora: nomes, e-mails, empresas, endereços, UUID v4, cores hex e IPs em JSON, CSV ou texto — com semente reproduzível.",
      intro: [
        "Bancos de dados, formulários e clientes de API precisam de dados com cara de real para serem testados. Este gerador produz linhas sintéticas de pessoas, empresas e endereços — além de UUIDs, cores hex e IPs — a partir de listas de palavras e padrões que rodam no seu navegador.",
        "É deliberadamente baseado em regras, não um motor treinado para imitar populações reais: os valores são combinações claramente fabricadas e todo e-mail cai nos domínios reservados example.com / example.net, então nada chega a uma caixa real.",
        "Com uma semente numérica opcional a saída fica totalmente reproduzível — a mesma semente gera linhas idênticas byte a byte, exatamente o que fixtures instáveis e comparações de screenshots precisam.",
      ],
      steps: [
        "Escolha uma categoria: pessoa, empresa, endereço, palavras de preenchimento, UUID v4, cor hex ou IP.",
        "Defina quantas linhas precisa (1–50) e, opcionalmente, digite uma semente para reproduzir o resultado.",
        "Escolha JSON, CSV ou texto simples, copie o resultado ou baixe como arquivo.",
        "Precisa dos mesmos dados depois? Insira a mesma semente e receberá linhas idênticas.",
      ],
      faqs: [
        {
          q: "São pessoas ou empresas reais?",
          a: "Não. Os nomes, empresas e endereços são combinações de palavras baseadas em regras para testes e mockups — não identidades realistas — e todos os e-mails usam os domínios reservados example.com / example.net.",
        },
        {
          q: "Para que serve a semente?",
          a: "Sem semente você recebe aleatoriedade nova a cada geração. Com uma semente, o mesmo número sempre produz as mesmas linhas, então testes, screenshots e demos ficam estáveis.",
        },
        {
          q: "O UUID é um v4 válido?",
          a: "Ele segue o formato v4 — o nibble de versão 4 e os bits de variante RFC são definidos corretamente — mas a aleatoriedade vem do gerador com semente, não da entropia do sistema.",
        },
      ],
    },
  },
  related: ["placeholder-image", "dummy-logo-maker", "lorem-pill"],
});
