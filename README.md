# Placeholdit

占位图与假数据,全部在浏览器里生成。15 语静态站(Next.js 16),零后端。

## 工具(4)

- **placeholder-image**(featured):宽高/配色/文字/圆角 → 实时预览,下载 SVG/PNG,复制 URL 模式(为热链路由预留格式)。
- **fake-data-generator**:规则式假数据(人物/公司/地址/填充词/UUID v4/十六进制色/IP),1–50 条,JSON/CSV/纯文本,种子可复现;邮箱落在保留域 example.com/example.net。
- **dummy-logo-maker**:单字母几何 logo(圆/方/三角/六边形 + 配色预设),下载 SVG/PNG。
- **lorem-pill**:开头语各不相同的填充文案(句子/段落),plain/markdown/HTML,种子确定性。

纯逻辑在 `tools/_lib/`(placeholder.ts、fakedata.ts、logo.ts、filler.ts),引擎在 `tools/_engines/`,MCP 工具在 `mcp/tools.ts`(`npx placeholdit-mcp`)。

## 开发

```bash
npm install
npx tsc --noEmit   # 类型
npm test           # vitest:纯函数矩阵 + 注册表 + SEO 面 + MCP 协议
npm run build      # next build
npm run build:mcp  # esbuild 打包 MCP stdio server
```

域名拍板后配 `.env.local`(NEXT_PUBLIC_SITE_DOMAIN),跑 `BASE=<url> npm run audit:seo` 门禁,再按 docs/launch-runbook.md 提交。
