import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";
import { MCP_TOOLS } from "@/mcp/tools";

async function connect() {
  const server = createServer();
  const client = new Client({ name: "test", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

const out = (r: { content: { text: string }[] }) => r.content[0].text;

describe("placeholdit MCP server", () => {
  it("exposes the full tool registry (4 pure string/data tools)", async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    expect(tools.length).toBe(MCP_TOOLS.length);
    const names = new Set(tools.map((t) => t.name));
    for (const expected of ["placeholder_svg", "fake_data", "logo_svg", "filler_text"]) {
      expect(names.has(expected), expected).toBe(true);
    }
    await client.close();
  });

  it("generates a placeholder SVG with dimensions, colors, escaped label and radius", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "placeholder_svg",
      arguments: { width: 600, height: 400, bg: "#7c5cff", color: "#fff", text: "Hero & <banner>", radius: 24 },
    });
    const svg = out(r as any);
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg.endsWith("</svg>")).toBe(true);
    expect(svg).toContain('width="600"');
    expect(svg).toContain('height="400"');
    expect(svg).toContain('viewBox="0 0 600 400"');
    expect(svg).toContain('fill="#7c5cff"');
    expect(svg).toContain('rx="24"');
    expect(svg).toContain("&lt;banner&gt;");
    expect(svg).toContain("Hero &amp;");
    expect(svg).not.toContain("<banner>");
    await client.close();
  });

  it("defaults the placeholder label to W×H and rejects invalid input at both layers", async () => {
    const client = await connect();
    const def = await client.callTool({
      name: "placeholder_svg",
      arguments: { width: 320, height: 180, bg: "#111", color: "#ffffff" },
    });
    expect(out(def as any)).toContain(">320×180</text>");

    // 逻辑层:schema 合法但形状极值下仍然有效;非法颜色 → isError
    const bad = await client.callTool({
      name: "placeholder_svg",
      arguments: { width: 600, height: 400, bg: "blue", color: "#ffffff" },
    });
    expect((bad as any).isError).toBe(true);

    // schema 层:宽度 0 → 协议校验失败,返回 isError
    const schemaErr = await client.callTool({
      name: "placeholder_svg",
      arguments: { width: 0, height: 400, bg: "#111111", color: "#ffffff" },
    });
    expect((schemaErr as any).isError).toBe(true);
    await client.close();
  });

  it("fake_data: same seed reproduces identical rows; count and categories work", async () => {
    const client = await connect();
    const a = await client.callTool({
      name: "fake_data",
      arguments: { category: "person", count: 5, seed: 42 },
    });
    const b = await client.callTool({
      name: "fake_data",
      arguments: { category: "person", count: 5, seed: 42 },
    });
    expect(out(a as any)).toBe(out(b as any));

    const parsed = JSON.parse(out(a as any));
    expect(parsed).toHaveLength(5);
    expect(Object.keys(parsed[0]).sort()).toEqual(["email", "firstName", "fullName", "lastName", "username"].sort());
    expect(parsed[0].email).toMatch(/@example\.(com|net)$/);

    const uuid = await client.callTool({
      name: "fake_data",
      arguments: { category: "uuid", count: 3, seed: 7 },
    });
    const uuids = JSON.parse(out(uuid as any)).map((r: any) => r.uuid);
    for (const u of uuids) {
      expect(u).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    }
    await client.close();
  });

  it("fake_data: csv has a header row and the format round-trips the requested count", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "fake_data",
      arguments: { category: "color", count: 4, seed: 1, format: "csv" },
    });
    const lines = out(r as any).split("\r\n");
    expect(lines).toHaveLength(5);
    expect(lines[0]).toBe("hex,rgb");
    for (const line of lines.slice(1)) {
      expect(line).toMatch(/^#[0-9a-f]{6},"rgb\(\d+, \d+, \d+\)"$/);
    }
    await client.close();
  });

  it("fake_data: honest description — schema rejects out-of-range counts", async () => {
    const client = await connect();
    const big = await client.callTool({ name: "fake_data", arguments: { category: "person", count: 51 } });
    expect((big as any).isError).toBe(true);
    const zero = await client.callTool({ name: "fake_data", arguments: { category: "person", count: 0 } });
    expect((zero as any).isError).toBe(true);
    await client.close();
  });

  it("logo_svg: renders the requested shape and rejects unknown ones", async () => {
    const client = await connect();
    for (const shape of ["circle", "square", "triangle", "hex"]) {
      const r = await client.callTool({
        name: "logo_svg",
        arguments: { letter: "P", shape, fg: "#ffffff", bg: "#7c5cff", size: 128 },
      });
      const svg = out(r as any);
      expect(svg.startsWith("<svg")).toBe(true);
      expect(svg.endsWith("</svg>")).toBe(true);
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(svg).toContain(">P</text>");
    }
    const tri = out((await client.callTool({
      name: "logo_svg",
      arguments: { letter: "P", shape: "triangle", fg: "#ffffff", bg: "#7c5cff" },
    })) as any);
    expect(tri).toContain("<polygon");
    expect(tri).toContain('y="79.4"'); // 三角形视觉重心下移:128 × 0.62

    const bad = await client.callTool({
      name: "logo_svg",
      arguments: { letter: "P", shape: "star", fg: "#ffffff", bg: "#7c5cff" },
    });
    expect((bad as any).isError).toBe(true);
    await client.close();
  });

  it("filler_text: deterministic with a seed, varied openers, no lorem ipsum echo", async () => {
    const client = await connect();
    const a = await client.callTool({
      name: "filler_text",
      arguments: { mode: "paragraphs", count: 3, sentences_per_paragraph: 3, seed: 11 },
    });
    const b = await client.callTool({
      name: "filler_text",
      arguments: { mode: "paragraphs", count: 3, sentences_per_paragraph: 3, seed: 11 },
    });
    expect(out(a as any)).toBe(out(b as any));

    const text = out(a as any);
    const paragraphs = text.split("\n\n");
    expect(paragraphs).toHaveLength(3);
    expect(text.toLowerCase()).not.toContain("lorem ipsum");

    const html = await client.callTool({
      name: "filler_text",
      arguments: { mode: "paragraphs", count: 2, seed: 3, format: "html" },
    });
    expect(out(html as any)).toMatch(/^<p>.+<\/p>(\n<p>.+<\/p>)+$/);

    const sents = await client.callTool({
      name: "filler_text",
      arguments: { mode: "sentences", count: 4, seed: 5 },
    });
    const sentences = out(sents as any).split(". ");
    // 每句以"开头语,"起势(开头语可能含空格,如 "Early on,"),且互不雷同
    for (const sen of sentences) {
      expect(sen).toMatch(/^[A-Z][a-zA-Z ]+, /);
    }
    const openers = sentences.map((sen) => sen.split(",")[0]);
    expect(new Set(openers).size).toBeGreaterThan(1);
    await client.close();
  });
});
