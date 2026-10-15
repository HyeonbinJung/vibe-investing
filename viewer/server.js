#!/usr/bin/env node
// 스킬 브라우저: skills/ 아래 SKILL.md 문서를 웹에서 탐색하는 의존성 없는 로컬 서버
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(ROOT, "skills");
const PORT = Number(process.env.PORT) || 4300;

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const meta = {};
  if (!match) return meta;
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx > 0) meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
  }
  return meta;
}

function listSkills() {
  const skills = [];
  for (const category of fs.readdirSync(SKILLS_DIR)) {
    const categoryDir = path.join(SKILLS_DIR, category);
    if (!fs.statSync(categoryDir).isDirectory()) continue;
    for (const name of fs.readdirSync(categoryDir)) {
      const skillFile = path.join(categoryDir, name, "SKILL.md");
      if (!fs.existsSync(skillFile)) continue;
      const meta = parseFrontmatter(fs.readFileSync(skillFile, "utf8"));
      const refDir = path.join(categoryDir, name, "references");
      const references = fs.existsSync(refDir)
        ? fs.readdirSync(refDir).filter((f) => f.endsWith(".md")).map((f) => `skills/${category}/${name}/references/${f}`)
        : [];
      skills.push({
        category,
        name: meta.name || name,
        description: meta.description || "",
        path: `skills/${category}/${name}/SKILL.md`,
        references,
      });
    }
  }
  return skills;
}

function send(res, status, body, type) {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/" || url.pathname === "/index.html") {
    return send(res, 200, fs.readFileSync(path.join(__dirname, "index.html")), "text/html; charset=utf-8");
  }
  if (url.pathname === "/api/skills") {
    return send(res, 200, JSON.stringify(listSkills()), "application/json; charset=utf-8");
  }
  if (url.pathname === "/api/doc") {
    const rel = url.searchParams.get("path") || "README.md";
    const file = path.resolve(ROOT, rel);
    // 저장소 밖 경로나 마크다운이 아닌 파일은 거부한다
    if (!file.startsWith(ROOT + path.sep) || !file.endsWith(".md") || !fs.existsSync(file)) {
      return send(res, 404, "문서를 찾을 수 없습니다.", "text/plain; charset=utf-8");
    }
    return send(res, 200, fs.readFileSync(file, "utf8"), "text/markdown; charset=utf-8");
  }
  send(res, 404, "Not found", "text/plain; charset=utf-8");
});

server.listen(PORT, () => {
  console.log(`Vibe Investing 스킬 브라우저: http://localhost:${PORT}`);
});
