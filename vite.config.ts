import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const SITE = 'https://simonolawuyi.com';

/** Pages that get their own URL so search engines can index them. Each is the app's index.html with its
 *  own title, description and canonical link; the router picks the page from the path. */
const PAGES = [
  {
    path: 'mcp-setup',
    title: 'Blender & Roblox Studio MCP Setup Guide (Claude, Gemini, Codex) — Simon Olawuyi',
    description: 'Step-by-step guide with screenshots to connect Blender and Roblox Studio to Claude Code, Claude Desktop, Gemini CLI and Codex over MCP, plus a copy-paste setup prompt.',
  },
  {
    path: 'thoughts',
    title: 'AI Thoughts — Simon Olawuyi',
    description: 'Writing by Simon Olawuyi on AI, ChatGPT vs Claude, and where it is all going.',
  },
];

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function pageCopies() {
  let outDir = 'dist';
  return {
    name: 'page-copies',
    apply: 'build' as const,
    configResolved(c: { build: { outDir: string } }) { outDir = c.build.outDir; },
    closeBundle() {
      const html = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8');
      for (const p of PAGES) {
        const url = `${SITE}/${p.path}/`;
        const page = html
          .replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(p.description)}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(p.title)}`)
          .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(p.description)}`)
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`);
        fs.mkdirSync(path.join(outDir, p.path), { recursive: true });
        fs.writeFileSync(path.join(outDir, p.path, 'index.html'), page);
      }
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3001,
        host: '0.0.0.0',
      },
      plugins: [react(), pageCopies()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
