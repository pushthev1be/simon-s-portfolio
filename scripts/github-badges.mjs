// github-badges.mjs — reads a GitHub user's achievements and progress and writes public/badges.json for the
// portfolio's /github-badges/ page. Run locally with `node scripts/github-badges.mjs [username]`; the
// "GitHub badges" workflow runs it daily.
//
// Sources:
//   - Earned badges + tiers: the profile's achievements tab (github.com/<user>?tab=achievements). GitHub has no
//     official achievements API, so this is the only source of truth for what is actually earned.
//   - Progress counts: the public REST API (search). Set GITHUB_TOKEN for a higher rate limit.
//
// It only reads. It never opens, merges or co-authors anything: farming badges with fake activity breaks
// GitHub's acceptable-use rules on inauthentic activity.
import fs from 'node:fs';
import path from 'node:path';

const USER = process.argv[2] || process.env.GITHUB_BADGES_USER || 'pushthev1be';
const OUT = path.resolve(process.cwd(), 'public', 'badges.json');
const TOKEN = process.env.GITHUB_TOKEN || '';

// Thresholds GitHub uses for each tier (default, bronze x2, silver x3, gold x4), as documented by the community.
const BADGES = [
  {
    id: 'pull-shark', name: 'Pull Shark',
    how: 'Open a pull request that gets merged.',
    tiers: [2, 16, 128, 1024], unit: 'merged pull requests',
  },
  {
    id: 'pair-extraordinaire', name: 'Pair Extraordinaire',
    how: 'Co-author commits in a merged pull request (a "Co-authored-by:" trailer naming you, or you naming a real collaborator).',
    tiers: [1, 10, 24, 48], unit: 'co-authored merged pull requests',
  },
  {
    id: 'quickdraw', name: 'Quickdraw',
    how: 'Close an issue or pull request within 5 minutes of opening it.',
    tiers: [1], unit: 'times',
  },
  {
    id: 'yolo', name: 'YOLO',
    how: 'Merge a pull request without a code review.',
    tiers: [1], unit: 'times',
  },
  {
    id: 'starstruck', name: 'Starstruck',
    how: 'Own a repository that other people star.',
    tiers: [16, 128, 512, 4096], unit: 'stars on your most-starred repository',
  },
  {
    id: 'galaxy-brain', name: 'Galaxy Brain',
    how: 'Have answers accepted in GitHub Discussions.',
    tiers: [2, 8, 16, 32], unit: 'accepted answers',
  },
  {
    id: 'public-sponsor', name: 'Public Sponsor',
    how: 'Sponsor an open-source maintainer through GitHub Sponsors.',
    tiers: [1], unit: 'sponsorships',
  },
];

const headers = { 'User-Agent': 'portfolio-badges-script', Accept: 'application/vnd.github+json' };
if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

async function api(url) {
  const r = await fetch(`https://api.github.com${url}`, { headers });
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  return r.json();
}

// What the profile actually shows: name -> { tier (1-4), image }
async function earned() {
  const r = await fetch(`https://github.com/${USER}?tab=achievements`, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await r.text();
  const out = {};
  for (const card of html.split('class="achievement-card').slice(1)) {
    const block = card.slice(0, card.indexOf('</summary>'));
    const name = block.match(/<h3[^>]*>([^<]+)<\/h3>/)?.[1]?.trim();
    if (!name) continue;
    const tier = Number(block.match(/achievement-tier-label[^>]*>x(\d)/)?.[1] || 1);
    const image = block.match(/<img src="([^"]+)"/)?.[1] || '';
    out[name] = { tier, image };
  }
  return out;
}

async function progress() {
  const p = {};
  const merged = await api(`/search/issues?q=${encodeURIComponent(`author:${USER} type:pr is:merged`)}&per_page=1`);
  p['pull-shark'] = merged.total_count;
  // Approximation: commits by the user that carry a Co-authored-by trailer (GitHub counts merged PRs, not commits).
  const co = await api(`/search/commits?q=${encodeURIComponent(`author:${USER} "co-authored-by"`)}&per_page=1`);
  p['pair-extraordinaire'] = co.total_count;
  let stars = 0;
  for (let page = 1; page <= 5; page++) {
    const repos = await api(`/users/${USER}/repos?per_page=100&page=${page}`);
    for (const r of repos) if (!r.fork) stars = Math.max(stars, r.stargazers_count);
    if (repos.length < 100) break;
  }
  p.starstruck = stars;
  return p;
}

const have = await earned();
let counts = {};
try { counts = await progress(); } catch (e) { console.warn('progress counts skipped:', e.message); }

const badges = BADGES.map(b => {
  const e = have[b.name];
  const tier = e ? e.tier : 0;
  const count = counts[b.id] ?? null;
  const next = tier < b.tiers.length ? b.tiers[tier] : null;
  return {
    ...b,
    earned: Boolean(e), tier, image: e?.image || '',
    count, next,
    approximate: b.id === 'pair-extraordinaire',
  };
});
// Earned badges GitHub shows that this list doesn't know about (new or retired ones)
for (const [name, e] of Object.entries(have)) {
  if (!BADGES.some(b => b.name === name)) {
    badges.push({ id: name.toLowerCase().replace(/\W+/g, '-'), name, how: '', tiers: [], unit: '', earned: true, tier: e.tier, image: e.image, count: null, next: null });
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ user: USER, updated: new Date().toISOString(), badges }, null, 2) + '\n');
console.log(`wrote ${OUT}: ${badges.filter(b => b.earned).map(b => `${b.name} x${b.tier}`).join(', ') || 'no badges'}`);
