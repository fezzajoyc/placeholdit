import type { Dictionary } from "../i18n";

const ja: Dictionary = {
  brand: "Placeholdit",
  tagline: "プレースホルダー画像とフェイクデータをブラウザで生成。ここで行うことは端末から出ません。",
  metaDesc:
    "ブラウザ内でプレースホルダー画像とフェイクデータを生成 — SVG/PNG の即時プレビュー、ルールベースのテストデータ、新鮮な埋め込みテキスト。アップロード不要・登録不要。",

  nav: {
    tools: "すべてのツール",
    categories: "カテゴリー",
    about: "このサイトについて",
    menu: "メニュー",
    language: "言語",
  },

  home: {
    heroTitle: "プレースホルダー画像とフェイクデータは、ブラウザで生成",
    heroSub:
      "{n} 個の開発者ツール:プレースホルダー画像・フェイクデータ・ダミーロゴ・埋め込みテキスト。すべてブラウザ内でローカル実行 — 高速・無料・登録不要・アップロードなし。",
    browseAll: "すべてのツールを見る",
    pinned: "ピン留め",
    pin: "トップに固定",
    unpin: "固定を解除",
    popular: "人気のツール",
    categoriesTitle: "カテゴリー",
    featuredTitle: "人気のツール",
    trustLocal: "ファイルは端末内に留存",
    trustFree: "無料・アカウント不要",
    trustFast: "即時処理・オフライン対応",
    rotating: [
      "ブランドカラーの 600×400 プレースホルダー — 実スクリーンショットを待たない",
      "シード付きフェイクデータ:テストのたびに同じ UUID とユーザー",
      "一文字の幾何学ロゴで、ステージング環境もすぐそれらしく",
      "文頭が毎回違う埋め込みテキスト — Lorem ipsum の再演はもうない",
    ],
    statsLabels: { tools: "ツール", languages: "言語", uploads: "アップロード", accounts: "アカウント" },
    eyebrow: "ずっと無料",
    heroCtaSecondary: "仕組みを見る",
    statsTools: "{n} 個のツール",
    statsLanguages: "{n} 言語",
    statsUploads: "アップロード 0 回",
    statsAccounts: "アカウント 0 個",
    categoriesSub: "開発者カテゴリー、4 つのツール、すべてあなたのデバイスで実行。",
    popularSub: "いちばん使われているツール。",
    privacyTitle: "ファイルは、あなたのデバイスから出ません。",
    privacySub: "アップロードという工程が存在しません。ツールはブラウザ内で動く JavaScript そのものです。ポリシーではなく構造の話です。",
    privacyPoint1T: "ローカル処理",
    privacyPoint1D: "ファイルはブラウザの File API で読み込み、メモリ内で処理されます。送信は一切ありません。",
    privacyPoint2T: "アカウント不要",
    privacyPoint2D: "登録もメールも履歴もありません。開いてすぐ使えます。",
    privacyPoint3T: "誠実な設計",
    privacyPoint3D: "ブラウザでできないことは、できないとはっきり書きます。",
    privacyLink: "プライバシーの詳細を読む",
    endTitle: "ツールを選んで、すぐ使える。",
    endSub: "4 つのツール、15 言語、アップロード 0、インストール不要。",
  },

  tools: {
    title: "すべてのツール",
    subtitle: "{count} 個の無料ブラウザツールを検索。アップロード不要・登録不要。",
    filterPlaceholder: "ツールを検索…",
    count: "{count} 個のツール",
    empty: "「{query}」に一致するツールはありません。",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF の結合・分割・変換・編集をどこにもアップロードせずに行えます。" },
    image: { name: "画像", desc: "画像の圧縮・リサイズ・切り抜き・形式変換をブラウザ内で。" },
    text: { name: "テキスト", desc: "文字数・整形・並べ替え・変換を入力しながら即時に。" },
    developer: { name: "開発者", desc: "プレースホルダー画像・フェイクデータ・ダミーロゴ・埋め込みテキストをローカル生成。" },
    seo: { name: "SEO", desc: "メタタグ・構造化データ・SERP プレビューなどの SEO ヘルパー。" },
    security: { name: "セキュリティ", desc: "パスワード・ハッシュ・各種ルックアップを端末内で生成・検証。" },
    utility: { name: "ユーティリティ", desc: "単位変換・電卓・日常のちょっとしたツール。" },
  },

  tool: {
    howTo: "使い方",
    faq: "よくある質問",
    related: "関連ツール",
    nextStep: "次のステップ",
    copyLink: "リンクをコピー",
    privacyNote:
      "このツールは完全にブラウザ内で動作します。データは端末から出ず、サーバーへアップロードされることはありません。",
    inCategory: "{category}のその他のツール",
    backToCategory: "{category}のすべてのツール",
  },

  common: {
    openTool: "ツールを開く",
    copy: "コピー",
    copied: "コピーしました",
    download: "ダウンロード",
    reset: "リセット",
    swap: "入れ替え",
    clear: "クリア",
    error: "エラーが発生しました。入力を確認して再試行してください。",
    input: "入力",
    output: "結果",
    settings: "オプション",
    dropFiles: "ここにファイルをドロップ、またはクリックして選択",
    dropFile: "ここにファイルをドロップ、またはクリックして選択",
    processing: "処理中…",
    fileSize: "サイズ",
    sample: "サンプルを試す",
    uppercase: "大文字",
  },

  unit: {
    from: "変換前",
    to: "変換後",
    amount: "数値",
    result: "結果",
    common: "よく使う変換",
    formula: "計算式",
    allUnits: "すべての単位",
  },

  text: {
    stats: {
      words: "単語数",
      characters: "文字数",
      charsNoSpaces: "空白除く",
      sentences: "文の数",
      paragraphs: "段落",
      lines: "行数",
      readingTime: "読了時間",
      readingMinutes: "約 {n} 分",
    },
  },

  footer: {
    line: "無料のブラウザツール。ここでの操作は端末の外に出ません。",
    privacy: "プライバシー",
    terms: "利用規約",
    about: "このサイトについて",
    badges: "バッジ",
    language: "言語",
  },

  badge: {
    title: "Placeholdit バッジ",
    desc: "Placeholdit バッジをサイト・README・ドキュメントに。ここへリンクし、プレースホルダー画像とフェイクデータが完全にブラウザ内で生成されることを伝えます。",
    voluntary: "設置は完全に任意です。プロジェクトを気に入ったらお好きなバッジをどうぞ。許可は不要です。",
    md: "Markdown(README)",
    html: "HTML(ウェブサイト)",
    thanks: "広めていただきありがとうございます。すべての設置が、ファイルを尊重するツールの発見につながります。",
  },

    embed: {
    title: "ツールを埋め込む",
    desc: "1 行であなたのサイトにツールを。訪問者のブラウザ内で動きます。",
  },

    mcp: {
    title: "MCP サーバー——AI から呼び出せるツール",
    desc1: "Placeholdit は MCP(Model Context Protocol)サーバーを同梱しています。Claude や Cursor などの AI アシスタントが、プレースホルダー SVG・フェイクテストデータ・埋め込みテキストを直接生成 — 本サイトと同じテスト済みロジックで、再実装ではありません。",
    desc2: "ツールは本サイトの純粋関数を実行します:画像 SVG・ルールベースのフェイクデータ(誠実な語彙パターンで、実在の人物ではありません)・一文字ロゴ・変化のある埋め込みテキスト。npx 経由で AI クライアントのマシン上で実行され、当社サーバーには送信されません。",
    toolsTitle: "実行可能なツール({n} 個)",
    requiresNode: "Node.js 18+ が必要です。サーバーは stdio でローカル実行。呼び出したツール計算のみローカルで行われます。",
    privacy: "Node.js 18+ が必要です。サーバーは stdio でローカル実行。呼び出したツール計算のみローカルで行われます。",
  },

    notFound: {
    title: "ページが見つかりません",
    body: "お探しのツールは存在しません。すべてのツールからお探しください。",
    home: "ホームへ戻る",
  },
};

export default ja;
