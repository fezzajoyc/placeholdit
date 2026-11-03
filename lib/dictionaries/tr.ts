// tr — Türkçe sözlük. Anahtar şekli en ile birebir aynıdır (tests/seo.test.ts derin karşılaştırır).
const tr = {
  brand: "Placeholdit",
  tagline: "Yer tutucu görseller ve sahte veriler tarayıcınızda üretilir. Burada yaptığınız hiçbir şey cihazınızdan ayrılmaz.",
  metaDesc:
    "Yer tutucu görseller ve sahte veriler tarayıcınızda üretilir: anında SVG/PNG önizleme, kural tabanlı test verileri ve taze dolgu metni. Yükleme yok, kayıt yok.",

  nav: {
    tools: "Tüm araçlar",
    categories: "Kategoriler",
    about: "Hakkında",
    menu: "Menü",
    language: "Dil",
  },

  home: {
    heroTitle: "Yer tutucu görseller ve sahte veriler, tarayıcınızda üretilir",
    heroSub:
      "{n} geliştirici aracı: yer tutucu görseller, sahte veriler, dummy logolar ve dolgu metni. Her şey tarayıcınızda yerel çalışır — anında, ücretsiz, kayıtsız ve yüklemesiz.",
    browseAll: "Tüm araçlara göz at",
    categoriesTitle: "Kategoriler",
    featuredTitle: "Popüler araçlar",
    trustLocal: "Dosyalar cihazında kalır",
    trustFree: "Ücretsiz, hesap yok",
    trustFast: "Anında, çevrimdışı bile çalışır",
    rotating: [
      "Marka renklerinizde 600×400 bir yer tutucu — gerçek ekran görüntüsünü beklemeden",
      "Tohumlu sahte veri: her test koşusunda aynı UUID'ler ve kullanıcılar",
      "Geometrik zemin üzerine tek harfli logo — staging ortamı hemen hazır",
      "Her cümlesi farklı başlayan dolgu metni — aynı Lorem ipsum bir kez daha yok",
    ],
    statsLabels: { tools: "araç", languages: "dil", uploads: "yükleme", accounts: "hesap" },
    eyebrow: "Sonsuza kadar ücretsiz",
    heroCtaSecondary: "Nasıl çalışır",
    statsTools: "{n} araç",
    statsLanguages: "{n} dil",
    statsUploads: "0 yükleme",
    statsAccounts: "0 hesap",
    categoriesSub: "Tek bir geliştirici ailesi, dört araç — hepsi cihazınızda çalışır.",
    popularSub: "En çok açılan araçlar.",
    privacyTitle: "Dosyaların asla cihazından çıkmaz.",
    privacySub:
      "Yükleme adımı yok. Araçlar tarayıcında çalışan JavaScript kodlarıdır — bu bir politika vaadi değil, nasıl inşa edildiklerinin sonucudur.",
    privacyPoint1T: "Yerel işleme",
    privacyPoint1D:
      "Dosyalar tarayıcının kendi File API'siyle okunur ve bellekte işlenir. Hiçbir şey hiçbir yere gönderilmez.",
    privacyPoint2T: "Hesap yok",
    privacyPoint2D: "Kayıt yok, e-posta yok, saklanan geçmiş yok. Aracı aç ve kullan.",
    privacyPoint3T: "Tasarımdan dürüst",
    privacyPoint3D:
      "Bir şey gerçekten tarayıcıda yapılamıyorsa, yapılabiliyormuş gibi göstermek yerine bunu söyleriz.",
    privacyLink: "Tüm gizlilik notunu oku",
    endTitle: "Bir araç seç. Gerisi kendiliğinden.",
    endSub: "Dört araç, on beş dil, sıfır yükleme, kuruluma gerek yok.",
  },

  tools: {
    title: "Tüm araçlar",
    subtitle: "{count} ücretsiz tarayıcı aracı. Yükleme yok, kayıt yok.",
    filterPlaceholder: "Araçlarda ara…",
    count: "{count} araç",
    empty: "“{query}” ile eşleşen araç yok.",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF dosyalarını hiçbir yere yüklemeden birleştir, böl, dönüştür ve düzenle." },
    image: { name: "Görsel", desc: "Görselleri doğrudan tarayıcında sıkıştır, yeniden boyutlandır, kırp ve dönüştür." },
    text: { name: "Metin", desc: "Metni yazarken anında say, temizle, sırala ve dönüştür." },
    developer: { name: "Geliştirici", desc: "Yer tutucu görseller, sahte veriler, basit logolar ve dolgu metni — tamamen yerel üretilir." },
    seo: { name: "SEO", desc: "Meta etiketleri, schema işaretlemesi, SERP önizlemesi ve diğer sayfa içi SEO yardımcıları." },
    security: { name: "Güvenlik", desc: "Şifreler, karma (hash) değerleri ve sorgular — cihazında üretilir, cihazında denetlenir." },
    utility: { name: "Yardımcı Araçlar", desc: "Birim dönüştürücüler, hesap makineleri ve günlük yardımcılar." },
  },

  tool: {
    howTo: "Nasıl kullanılır",
    faq: "Sık sorulan sorular",
    related: "İlgili araçlar",
    privacyNote:
      "Bu araç tamamen tarayıcında çalışır. Verilerin asla cihazından çıkmaz — hiçbir sunucuya yüklenmez.",
    inCategory: "{category} kategorisinde daha fazlası",
    backToCategory: "Tüm {category} araçları",
  },

  common: {
    openTool: "Aracı aç",
    copy: "Kopyala",
    copied: "Kopyalandı",
    download: "İndir",
    reset: "Sıfırla",
    swap: "Değiştir",
    clear: "Temizle",
    error: "Bir şeyler ters gitti. Girdini kontrol edip tekrar dene.",
    input: "Girdi",
    output: "Sonuç",
    settings: "Seçenekler",
    dropFiles: "Dosyaları buraya bırak veya tıklayarak seç",
    dropFile: "Dosyayı buraya bırak veya tıklayarak seç",
    processing: "İşleniyor…",
    fileSize: "Boyut",
    sample: "Örneği dene",
    uppercase: "BÜYÜKHARF",
  },

  unit: {
    from: "Kaynak",
    to: "Hedef",
    amount: "Miktar",
    result: "Sonuç",
    common: "Sık kullanılan dönüşümler",
    formula: "Formül",
    allUnits: "Tüm birimler",
  },

  text: {
    stats: {
      words: "Kelime",
      characters: "Karakter",
      charsNoSpaces: "Boşluksuz",
      sentences: "Cümle",
      paragraphs: "Paragraf",
      lines: "Satır",
      readingTime: "Okuma süresi",
      readingMinutes: "{n} dk okuma",
    },
  },

  footer: {
    line: "Ücretsiz tarayıcı araçları. Burada yaptığın hiçbir şey cihazından çıkmaz.",
    privacy: "Gizlilik",
    terms: "Kullanım Koşulları",
    about: "Hakkında",
    badges: "Rozetler",
    language: "Dil",
  },

  badge: {
    title: "Placeholdit rozetleri",
    desc: "Sitenize, README'nize veya dokümanlarınıza bir Placeholdit rozeti koyun. Buraya bağlanır ve görsellerin ve verilerin tamamen tarayıcıda üretildiğini söyler.",
    voluntary: "Yerleştirme tamamen isteğe bağlıdır — projeyi seviyorsan bir rozet seç. İzin almaya gerek yok.",
    md: "Markdown (README)",
    html: "HTML (web sitesi)",
    thanks: "Duyulmamıza yardım ettiğin için teşekkürler — her yerleştirme, dosyalarına saygı duyan araçları daha çok kişinin keşfetmesini sağlar.",
  },

  embed: {
    title: "Bu aracı gömün",
    desc: "Tek satırla bu aracı sitenize ekleyin — ziyaretçinin tarayıcısında çalışır.",
  },

    mcp: {
    title: "MCP sunucusu — AI erişimli araçlar",
    desc1: "Placeholdit bir MCP (Model Context Protocol) sunucusuyla gelir: Claude veya Cursor gibi yapay zekâ asistanları yer tutucu SVG'ler, sahte test verileri ve dolgu metnini doğrudan üretebilir — sitesindeki aynı test edilmiş mantık, yeniden yazım değil.",
    desc2: "Araçlar sitenin saf fonksiyonlarını çalıştırır: görsel SVG'leri, kural tabanlı sahte veri (dürüst desenler, gerçekçi kimlikler değil), tek harfli logolar ve çeşitli dolgu metni. Yürütme npx ile yapay zekâ istemcisinin makinesinde olur — sunucularımıza hiçbir şey gönderilmez.",
    toolsTitle: "Çalıştırılabilir araçlar ({n})",
    requiresNode: "Node.js 18+ gerekir. Sunucu stdio üzerinden yerel çalışır; yalnızca yaptığınız çağrılar makinenizde hesaplanır.",
    privacy: "Node.js 18+ gerekir. Sunucu stdio üzerinden yerel çalışır; yalnızca yaptığınız çağrılar makinenizde hesaplanır.",
  },

    notFound: {
    title: "Sayfa bulunamadı",
    body: "Aradığın araç mevcut değil. Onun yerine tüm araçlara göz at.",
    home: "Ana sayfaya git",
  },
};

export default tr;
