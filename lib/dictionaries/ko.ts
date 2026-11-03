import type { Dictionary } from "../i18n";

// 한국어(ko) — 합니다체로 통일, 불필요한 외래어 표기 지양.
// 계약: 키 구조는 en과 완전히 동일(tests/seo.test.ts), 값은 한국어로 번역.
const ko: Dictionary = {
  brand: "Placeholdit",
  tagline: "플레이스홀더 이미지와 가짜 데이터를 브라우저에서 생성합니다. 여기서 하는 모든 일은 기기를 떠나지 않습니다.",
  metaDesc:
    "브라우저에서 생성하는 플레이스홀더 이미지와 가짜 데이터 — SVG/PNG 즉시 미리보기, 규칙 기반 테스트 데이터, 새로운 필러 텍스트. 업로드도 가입도 없습니다.",

  nav: {
    tools: "전체 도구",
    categories: "카테고리",
    about: "소개",
    menu: "메뉴",
    language: "언어",
  },

  home: {
    heroTitle: "플레이스홀더 이미지와 가짜 데이터, 브라우저에서 바로 생성",
    heroSub:
      "{n}개의 개발자 도구: 플레이스홀더 이미지, 가짜 데이터, 더미 로고, 필러 텍스트. 모두 브라우저에서 로컬 실행 — 빠르고 무료이며 가입도 업로드도 없습니다.",
    browseAll: "전체 도구 보기",
    pinned: "고정됨",
    pin: "상단에 고정",
    unpin: "고정 해제",
    popular: "인기 도구",
    categoriesTitle: "카테고리",
    featuredTitle: "인기 도구",
    trustLocal: "파일은 기기에만 보관됩니다",
    trustFree: "무료, 계정 불필요",
    trustFast: "즉시 실행, 오프라인 작동",
    rotating: [
      "브랜드 색상의 600×400 플레이스홀더 — 실제 스크린샷을 기다리지 않습니다",
      "시드가 있는 가짜 데이터: 테스트마다 같은 UUID와 사용자",
      "기하학 바탕의 한 글자 로고로 스테이징 환경도 바로 완성",
      "문장 시작이 매번 다른 필러 텍스트 — Lorem ipsum 반복은 이제 그만",
    ],
    statsLabels: { tools: "도구", languages: "개 언어", uploads: "업로드", accounts: "계정" },
    eyebrow: "평생 무료",
    heroCtaSecondary: "이용 방법",
    statsTools: "도구 {n}개",
    statsLanguages: "{n}개 언어",
    statsUploads: "업로드 0건",
    statsAccounts: "계정 0개",
    categoriesSub: "개발자 한 분야, 네 가지 도구, 모두 기기에서 실행됩니다.",
    popularSub: "가장 많이 열어보는 도구입니다.",
    privacyTitle: "파일은 절대 기기를 떠나지 않습니다.",
    privacySub:
      "업로드 단계가 아예 없습니다. 도구는 브라우저에서 실행되는 JavaScript일 뿐입니다 — 정책상 약속이 아니라, 애초에 그렇게 만들어진 구조입니다.",
    privacyPoint1T: "로컬 처리",
    privacyPoint1D:
      "파일은 브라우저의 File API로 읽어 메모리 안에서 처리합니다. 어디로도 전송되지 않습니다.",
    privacyPoint2T: "계정 없음",
    privacyPoint2D: "가입도, 이메일도, 저장되는 기록도 없습니다. 도구를 열고 바로 쓰면 됩니다.",
    privacyPoint3T: "설계부터 정직하게",
    privacyPoint3D:
      "브라우저에서 정말 불가능한 일이라면 그렇다고 말합니다. 가능한 척하지 않습니다.",
    privacyLink: "전체 개인정보 노트 읽기",
    endTitle: "도구를 고르면, 바로 작동합니다.",
    endSub: "네 가지 도구, 15개 언어, 업로드 0, 설치 필요 없음.",
  },

  tools: {
    title: "전체 도구",
    subtitle: "브라우저에서 도는 무료 도구 {count}개. 업로드도, 가입도 없습니다.",
    filterPlaceholder: "도구 검색…",
    count: "도구 {count}개",
    empty: "“{query}”에 해당하는 도구가 없습니다.",
  },

  categories: {
    pdf: { name: "PDF", desc: "어디에도 업로드하지 않고 PDF를 합치고, 나누고, 변환하고, 편집합니다." },
    image: { name: "이미지", desc: "브라우저 안에서 이미지를 압축하고, 크기를 조정하고, 자르고, 변환합니다." },
    text: { name: "텍스트", desc: "입력하는 즉시 텍스트를 세고, 정리하고, 정렬하고, 변환합니다." },
    developer: { name: "개발", desc: "플레이스홀더 이미지, 가짜 데이터, 더미 로고, 필러 텍스트 — 모두 로컬 생성." },
    seo: { name: "SEO", desc: "메타 태그, 스키마 마크업, SERP 미리보기 등 온페이지 SEO 도우미." },
    security: { name: "보안", desc: "비밀번호, 해시, 조회 도구 — 기기에서 생성하고 확인합니다." },
    utility: { name: "생활", desc: "단위 변환기, 계산기 등 생활 속 도우미." },
  },

  tool: {
    howTo: "사용 방법",
    faq: "자주 묻는 질문",
    related: "관련 도구",
    nextStep: "다음 단계",
    copyLink: "링크 복사",
    privacyNote:
      "이 도구는 전부 브라우저 안에서 실행됩니다. 데이터는 기기를 떠나지 않으며 어떤 서버로도 업로드되지 않습니다.",
    inCategory: "{category}의 다른 도구",
    backToCategory: "{category} 전체 도구",
  },

  common: {
    openTool: "도구 열기",
    copy: "복사",
    copied: "복사됨",
    download: "다운로드",
    reset: "초기화",
    swap: "바꾸기",
    clear: "지우기",
    error: "문제가 발생했습니다. 입력값을 확인하고 다시 시도해 주세요.",
    input: "입력",
    output: "결과",
    settings: "옵션",
    dropFiles: "파일을 끌어다 놓거나 클릭해서 선택하세요",
    dropFile: "파일을 끌어다 놓거나 클릭해서 선택하세요",
    processing: "처리 중…",
    fileSize: "크기",
    sample: "예시로 써보기",
    uppercase: "대문자",
  },

  unit: {
    from: "변환 전",
    to: "변환 후",
    amount: "값",
    result: "결과",
    common: "자주 쓰는 변환",
    formula: "계산식",
    allUnits: "전체 단위",
  },

  text: {
    stats: {
      words: "단어",
      characters: "글자",
      charsNoSpaces: "공백 제외",
      sentences: "문장",
      paragraphs: "단락",
      lines: "줄",
      readingTime: "읽는 시간",
      readingMinutes: "약 {n}분",
    },
  },

  footer: {
    line: "브라우저에서 도는 무료 도구. 여기서 하는 일은 기기를 떠나지 않습니다.",
    privacy: "개인정보",
    terms: "약관",
    about: "소개",
    badges: "배지",
    language: "언어",
  },

  badge: {
    title: "Placeholdit 배지",
    desc: "사이트, README 또는 문서에 Placeholdit 배지를 달아 보세요. 이곳으로 연결되며 이미지와 데이터가 전부 브라우저에서 생성된다는 점을 알려줍니다.",
    voluntary: "배지 삽입은 완전히 자율입니다 — 마음에 드는 배지를 골라 쓰세요. 허락받을 필요 없습니다.",
    md: "Markdown (README)",
    html: "HTML (웹사이트)",
    thanks: "널리 알려 주셔서 감사합니다 — 하나의 삽입이 도구를 더 많은 사람에게 알려 줍니다.",
  },

  embed: {
    title: "도구 삽입",
    desc: "한 줄로 사이트에 도구를 넣으세요. 방문자의 브라우저에서 실행됩니다.",
  },

    mcp: {
    title: "MCP 서버 — AI가 호출하는 도구",
    desc1: "Placeholdit은 MCP(Model Context Protocol) 서버를 제공합니다: Claude나 Cursor 같은 AI 어시스턴트가 플레이스홀더 SVG, 가짜 테스트 데이터, 필러 텍스트를 직접 생성합니다 — 이 사이트와 동일한 검증된 로직이며 재구현이 아닙니다.",
    desc2: "도구는 사이트의 순수 함수를 실행합니다: 이미지 SVG, 규칙 기반 가짜 데이터(정직한 패턴, 실존하는 신원이 아님), 한 글자 로고, 다채로운 필러 텍스트. npx를 통해 AI 클라이언트의 머신에서 실행되며 우리 서버로는 아무것도 전송되지 않습니다.",
    toolsTitle: "실행 가능한 도구({n}개)",
    requiresNode: "Node.js 18+ 필요. 서버는 stdio로 로컬 실행되며, 호출한 도구 계산만 로컬에서 이루어집니다.",
    privacy: "Node.js 18+ 필요. 서버는 stdio로 로컬 실행되며, 호출한 도구 계산만 로컬에서 이루어집니다.",
  },

    notFound: {
    title: "페이지를 찾을 수 없습니다",
    body: "찾으시는 도구가 존재하지 않습니다. 전체 도구를 둘러보세요.",
    home: "홈으로 가기",
  },
};

export default ko;
