import React, { useEffect, useRef, useState } from 'react';

/**
 * Home-page background: a dotted, Chrome-dino-style space shooter that plays itself behind the content.
 * A little jet on the left tracks the nearest asteroid, fires, and breaks it into dots; stars drift and
 * shift with the page scroll. Everything is drawn as round dots on a grid (no gradients). Light grey on
 * white so text on top stays readable. Respects prefers-reduced-motion (one still frame) and has a
 * pause button. Fixed behind the page, never takes clicks.
 */

const INK = '#c9ccd1';    // jet, asteroids, score
const STAR = '#dcdee2';   // far stars
const SHOT = '#22c55e';   // bullets (site accent)

// side-view jet facing right ('#' = dot)
const JET = [
  '##......................',
  '###.....................',
  '####.............###....',
  '#####.........#######...',
  '#######################.',
  '########################',
  '.######################.',
  '........########........',
  '..........#####.........',
];

// 3x5 dot font for the score
const DIGITS: Record<string, string[]> = {
  '0': ['###', '#.#', '#.#', '#.#', '###'], '1': ['.#.', '##.', '.#.', '.#.', '###'],
  '2': ['###', '..#', '###', '#..', '###'], '3': ['###', '..#', '###', '..#', '###'],
  '4': ['#.#', '#.#', '###', '..#', '..#'], '5': ['###', '#..', '###', '..#', '###'],
  '6': ['###', '#..', '###', '#.#', '###'], '7': ['###', '..#', '..#', '..#', '..#'],
  '8': ['###', '#.#', '###', '#.#', '###'], '9': ['###', '#.#', '###', '..#', '###'],
  'H': ['#.#', '#.#', '###', '#.#', '#.#'], 'I': ['###', '.#.', '.#.', '.#.', '###'], ' ': ['...', '...', '...', '...', '...'],
};

type Rock = { x: number; y: number; vx: number; vy: number; r: number; cells: [number, number][]; hp: number };
type Shot = { x: number; y: number };
type Dot = { x: number; y: number; vx: number; vy: number; life: number; max: number; green?: boolean };
type Star = { x: number; y: number; far: boolean };

const spriteCells = (rows: string[]) => {
  const out: [number, number][] = [];
  rows.forEach((row, j) => [...row].forEach((c, i) => { if (c === '#') out.push([i, j]); }));
  return out;
};
const JET_CELLS = spriteCells(JET);
const JET_W = Math.max(...JET.map(r => r.length));
const JET_H = JET.length;

/** A lumpy asteroid of radius r (in cells) with a couple of crater holes. */
function rockCells(r: number): [number, number][] {
  const p1 = Math.random() * 6.28, p2 = Math.random() * 6.28;
  const craters = Array.from({ length: r > 4 ? 3 : 1 }, () => {
    const a = Math.random() * 6.28, d = Math.random() * r * 0.5;
    return { x: Math.cos(a) * d, y: Math.sin(a) * d, s: 0.6 + Math.random() * r * 0.18 };
  });
  const cells: [number, number][] = [];
  for (let j = -r - 1; j <= r + 1; j++) {
    for (let i = -r - 1; i <= r + 1; i++) {
      const d = Math.hypot(i, j), th = Math.atan2(j, i);
      const edge = r * (1 + 0.16 * Math.sin(3 * th + p1) + 0.09 * Math.sin(5 * th + p2));
      if (d > edge) continue;
      if (d < edge - 1.2 && craters.some(c => Math.hypot(i - c.x, j - c.y) < c.s)) continue;
      cells.push([i, j]);
    }
  }
  return cells;
}

const SpaceGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, cell = 4, dotR = 1.25;
    let stars: Star[] = [];
    const rocks: Rock[] = [];
    const shots: Shot[] = [];
    const dots: Dot[] = [];
    const jet = { x: 0, y: 0, cool: 0, blink: 0 };
    let score = 0, hi = 0, spawnIn = 0.5, t = 0;
    let lastScroll = window.scrollY;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = w < 768 ? 3 : 4;
      dotR = cell * 0.32;
      // fly in the left margin, clear of the text column (content is 1200 wide with 48px side padding)
      const contentLeft = Math.max(w < 768 ? 20 : 48, (w - 1200) / 2);
      jet.x = Math.max(8, contentLeft - JET_W * cell - 12);
      if (!jet.y) jet.y = h * 0.55;
      const n = Math.round((w * h) / 9000);
      stars = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, far: Math.random() < 0.65 }));
    };

    const spawnRock = (x?: number, y?: number, r?: number, vy?: number) => {
      const rr = r ?? (3 + Math.floor(Math.random() * 5));
      rocks.push({
        x: x ?? w + rr * cell * 2, y: y ?? 96 + Math.random() * (h - 150),
        vx: -(36 + Math.random() * 50) * (w < 768 ? 0.7 : 1), vy: vy ?? (Math.random() - 0.5) * 14,
        r: rr, cells: rockCells(rr), hp: Math.max(1, Math.round(rr / 2)),
      });
    };

    const burst = (x: number, y: number, n: number, speed: number, green = false) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * 6.28, s = speed * (0.3 + Math.random());
        const max = 0.5 + Math.random() * 0.7;
        dots.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: max, max, green });
      }
    };

    const update = (dt: number) => {
      t += dt;
      // stars drift left; scrolling slides them up/down (parallax)
      const scrolled = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      for (const s of stars) {
        s.x -= (s.far ? 10 : 26) * dt;
        s.y -= scrolled * (s.far ? 0.08 : 0.2);
        if (s.x < -4) { s.x = w + 4; s.y = Math.random() * h; }
        if (s.y < -4) s.y += h + 8; else if (s.y > h + 4) s.y -= h + 8;
      }
      // asteroids
      spawnIn -= dt;
      if (spawnIn <= 0 && rocks.length < (w < 768 ? 4 : 7)) {
        spawnRock();
        spawnIn = 0.9 + Math.random() * 1.4;
      }
      for (const r of rocks) { r.x += r.vx * dt; r.y += r.vy * dt; if (r.y < 80 || r.y > h - 30) r.vy *= -1; }
      // jet: line up with the nearest asteroid ahead, fire when it's in line
      const jx = jet.x + JET_W * cell, jy = jet.y + (JET_H * cell) / 2;
      let target: Rock | undefined;
      for (const r of rocks) if (r.x > jx + 10 && r.x < w + 40 && (!target || r.x < target.x)) target = r;
      const want = target ? target.y - (JET_H * cell) / 2 : h * 0.55 + Math.sin(t * 0.8) * 40;
      jet.y += (want - jet.y) * Math.min(1, dt * 2.2);
      jet.y = Math.max(76, Math.min(h - JET_H * cell - 16, jet.y));
      jet.cool -= dt; jet.blink = Math.max(0, jet.blink - dt);
      if (target && Math.abs(target.y - jy) < target.r * cell + 4 && jet.cool <= 0 && target.x < w) {
        shots.push({ x: jx, y: jy });
        jet.cool = 0.26;
      }
      for (const s of shots) s.x += 420 * dt;
      // hits
      for (let i = shots.length - 1; i >= 0; i--) {
        const s = shots[i];
        const hit = rocks.findIndex(r => Math.hypot(s.x - r.x, s.y - r.y) < r.r * cell + 2);
        if (hit >= 0 || s.x > w + 10) shots.splice(i, 1);
        if (hit < 0) continue;
        const r = rocks[hit];
        r.hp -= 1;
        burst(s.x, s.y, 4, 60, true);
        if (r.hp <= 0) {
          rocks.splice(hit, 1);
          burst(r.x, r.y, 14 + r.r * 4, 90);
          score += r.r * 10; hi = Math.max(hi, score);
          if (r.r >= 5) { spawnRock(r.x, r.y - r.r * 2, r.r - 2, -22); spawnRock(r.x, r.y + r.r * 2, r.r - 2, 22); }
        }
      }
      // anything that reaches the jet bounces off its shield
      for (let i = rocks.length - 1; i >= 0; i--) {
        const r = rocks[i];
        if (r.x < -r.r * cell * 2) { rocks.splice(i, 1); continue; }
        if (Math.abs(r.x - (jet.x + JET_W * cell / 2)) < r.r * cell + JET_W * cell / 2 && Math.abs(r.y - jy) < r.r * cell + JET_H * cell / 2) {
          rocks.splice(i, 1);
          burst(r.x, r.y, 18, 80);
          jet.blink = 0.6; score = 0;
        }
      }
      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.x += d.vx * dt; d.y += d.vy * dt; d.vx *= 1 - dt * 1.5; d.vy *= 1 - dt * 1.5;
        d.life -= dt;
        if (d.life <= 0) dots.splice(i, 1);
      }
    };

    // all dots of one colour in a single path
    const pathDots = (pts: [number, number][], color: string, alpha = 1, r = dotR) => {
      if (!pts.length) return;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      for (const [x, y] of pts) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, 6.2832); }
      ctx.fill();
    };
    const snap = (v: number) => Math.round(v / cell) * cell;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pathDots(stars.filter(s => s.far).map(s => [snap(s.x), snap(s.y)]), STAR, 1, dotR * 0.8);
      pathDots(stars.filter(s => !s.far).map(s => [snap(s.x), snap(s.y)]), INK, 0.7, dotR * 0.9);
      const ink: [number, number][] = [];
      for (const r of rocks) {
        const ox = snap(r.x), oy = snap(r.y);
        for (const [i, j] of r.cells) ink.push([ox + i * cell, oy + j * cell]);
      }
      if (jet.blink <= 0 || Math.floor(jet.blink * 12) % 2 === 0) {
        const ox = snap(jet.x), oy = snap(jet.y);
        for (const [i, j] of JET_CELLS) ink.push([ox + i * cell, oy + j * cell]);
        // flickering exhaust
        const n = 2 + Math.floor(Math.random() * 3);
        for (let k = 1; k <= n; k++) ink.push([ox - k * cell, oy + (4 + (k % 2)) * cell]);
      }
      // score, dino style: HI 00420 00120
      const text = `HI ${String(hi).padStart(5, '0')} ${String(score).padStart(5, '0')}`;
      const sc = Math.max(2, cell - 1);
      let sx = w - (w < 768 ? 16 : 32) - text.length * 4 * sc, sy = 80;
      for (const ch of text) {
        (DIGITS[ch] || DIGITS[' ']).forEach((row, j) => [...row].forEach((c, i) => { if (c === '#') ink.push([sx + i * sc, sy + j * sc]); }));
        sx += 4 * sc;
      }
      pathDots(ink, INK);
      pathDots(shots.flatMap(s => [[snap(s.x), snap(s.y)], [snap(s.x) - cell, snap(s.y)], [snap(s.x) - 2 * cell, snap(s.y)]] as [number, number][]), SHOT);
      for (const d of dots) pathDots([[d.x, d.y]], d.green ? SHOT : INK, Math.max(0, d.life / d.max));
      ctx.globalAlpha = 1;
    };

    resize();
    window.addEventListener('resize', resize);
    // a populated first frame
    for (let k = 0; k < 4; k++) spawnRock(w * (0.35 + k * 0.18));
    if (still) { draw(); return () => window.removeEventListener('resize', resize); }

    let raf = 0, last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!pausedRef.current) { update(dt); draw(); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      <button
        onClick={() => setPaused(p => !p)}
        className="game-toggle"
        aria-label={paused ? 'Play the background game' : 'Pause the background game'}
      >
        <i className={`fas fa-${paused ? 'play' : 'pause'}`} style={{ fontSize: 9 }}></i><span className="game-toggle-label">{paused ? 'Play' : 'Pause'} game</span>
      </button>
    </>
  );
};

export default SpaceGame;
