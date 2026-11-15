import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { MoreGuides } from './Guides';

type Badge = {
  id: string; name: string; how: string; tiers: number[]; unit: string;
  earned: boolean; tier: number; image: string; count: number | null; next: number | null; approximate?: boolean;
};
type Data = { user: string; updated: string; badges: Badge[] };

const label: React.CSSProperties = { fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 12 };
const h2: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(26px,3.4vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 14 };
const body: React.CSSProperties = { fontSize: 13, color: '#444', lineHeight: 1.75 };
const TIER = ['Not yet', 'Earned', 'Bronze', 'Silver', 'Gold'];

const Card: React.FC<{ b: Badge }> = ({ b }) => {
  const pct = b.next && b.count != null ? Math.min(100, Math.round((b.count / b.next) * 100)) : b.earned ? 100 : 0;
  return (
    <div style={{ border: '1px solid #e8e8e8', padding: 18, opacity: b.earned ? 1 : 0.7 }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        {b.image
          ? <img src={b.image} alt={`${b.name} badge`} width={64} height={64} loading="lazy" />
          : <div style={{ width: 64, height: 64, border: '1px dashed #ccc', display: 'grid', placeItems: 'center', fontSize: 10, color: '#aaa' }}>locked</div>}
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800 }}>{b.name}</div>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: b.earned ? '#16a34a' : '#999' }}>
            {b.tiers.length > 1 && b.earned ? `${TIER[b.tier] ?? 'Earned'} · x${b.tier}` : b.earned ? 'Earned' : 'Not yet'}
          </div>
        </div>
      </div>
      <p style={{ ...body, marginTop: 12 }}>{b.how}</p>
      {b.tiers.length > 1 && (
        <p style={{ fontSize: 11, color: '#888', marginTop: 6 }}>Tiers: {b.tiers.join(' / ')} {b.unit}</p>
      )}
      {b.count != null && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 11, color: '#555' }}>
            {b.approximate ? '≈ ' : ''}{b.count.toLocaleString()} {b.unit}
            {b.next ? ` · next tier at ${b.next.toLocaleString()}` : b.earned ? ' · top tier' : ''}
          </div>
          <div style={{ height: 4, background: '#eee', marginTop: 6 }}><div style={{ width: `${pct}%`, height: '100%', background: '#16a34a' }} /></div>
        </div>
      )}
    </div>
  );
};

const GithubBadgesPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [data, setData] = useState<Data | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    fetch('/badges.json').then(r => r.json()).then(setData).catch(() => setFailed(true));
  }, []);

  return (
    <main style={{ padding: isMobile ? '104px 20px 80px' : '128px 48px 112px', minHeight: '70vh' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <a href="/" style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999' }}>← Back to home</a>
        <header style={{ padding: '28px 0 28px', borderBottom: '1px solid #e8e8e8', marginBottom: 24 }}>
          <div style={label}>GitHub</div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(38px,6vw,64px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>GitHub achievements</h1>
          <p style={{ ...body, marginTop: 18, maxWidth: 680 }}>
            Badges earned through my normal workflow: an AI coding agent opens pull requests, I review and merge them, and the agent is
            credited as co-author. A small script reads my profile every day and shows what each badge needs and how close the next tier is.
            {data && <> Last checked {new Date(data.updated).toLocaleDateString()} for <a href={`https://github.com/${data.user}?tab=achievements`} target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a', fontWeight: 700 }}>@{data.user}</a>.</>}
          </p>
        </header>

        {failed && <p style={body}>Couldn't load the badge data.</p>}
        {data && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {[...data.badges].sort((a, b) => Number(b.earned) - Number(a.earned)).map(b => <Card key={b.id} b={b} />)}
            </div>
            <section style={{ padding: '40px 0 0' }}>
              <div style={label}>How it works</div>
              <h2 style={h2}>The automation</h2>
              <p style={body}>
                <code>scripts/github-badges.mjs</code> reads the achievements tab (GitHub has no official achievements API) and counts progress with the
                public REST API: merged pull requests, co-authored commits and the most-starred repository. A GitHub Action runs it daily and commits
                the result, which redeploys this page. It only reads: farming badges with fake pull requests or co-authors breaks GitHub's rules on
                inauthentic activity. The co-author count is an estimate, since GitHub counts merged pull requests, not commits.
              </p>
            </section>
          </>
        )}
        <MoreGuides current="badges" />
      </div>
    </main>
  );
};

export default GithubBadgesPage;
