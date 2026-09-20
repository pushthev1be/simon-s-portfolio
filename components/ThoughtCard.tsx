import React, { useState } from 'react';
import { Thought } from '../types';
import { useIsMobile } from '../hooks/useIsMobile';

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

const BODY: React.CSSProperties = { fontSize: 13, color: '#444', lineHeight: 1.85, marginBottom: 14 };
const META: React.CSSProperties = { fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999' };
const LINK: React.CSSProperties = { fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#16a34a' };

export const DownloadLink: React.FC<{ post: Thought; solid?: boolean }> = ({ post, solid }) =>
  post.pdf ? (
    <a href={post.pdf} download className={solid ? 'cta-outline' : undefined} style={solid ? { padding: '10px 18px', fontSize: 10 } : LINK}>
      <i className="fas fa-download" style={{ marginRight: 6 }}></i>Download PDF
    </a>
  ) : null;

/** Renders *italic* spans inside a paragraph. */
const Inline: React.FC<{ text: string }> = ({ text }) => (
  <>{text.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))}</>
);

/** Compact card for the homepage. */
export const ThoughtTeaser: React.FC<{ post: Thought }> = ({ post }) => (
  <article className="reveal work-card" style={{ border: '1px solid #e8e8e8', background: '#fff', padding: 28, display: 'flex', flexDirection: 'column' }}>
    <div style={{ ...META, marginBottom: 12 }}>{formatDate(post.date)}</div>
    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>{post.title}</h3>
    <p style={{ fontSize: 12, color: '#555', lineHeight: 1.7, marginBottom: 20 }}>{post.summary}</p>
    <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #f0f0f0', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <a href={`#/thoughts/${post.slug}`} style={LINK}>Read →</a>
      <DownloadLink post={post} />
    </div>
  </article>
);

/** Full post for the AI Thoughts page. */
const ThoughtCard: React.FC<{ post: Thought; defaultOpen?: boolean }> = ({ post, defaultOpen }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  const isMobile = useIsMobile();
  const sections = post.sections ?? [];

  return (
    <article id={`thought-${post.slug}`} className="reveal work-card" style={{ border: '1px solid #e8e8e8', background: '#fff', scrollMarginTop: 88 }}>
      <div style={{ padding: isMobile ? '24px 20px' : '40px 48px', maxWidth: 820 }}>
        {post.cover && (
          <img src={post.cover} alt="" loading="lazy" style={{ display: 'block', width: '100%', maxWidth: 420, aspectRatio: '786 / 200', objectFit: 'cover', objectPosition: 'top left', border: '1px solid #e8e8e8', marginBottom: 28 }} />
        )}
        <div style={{ ...META, marginBottom: 12 }}>{formatDate(post.date)} · {post.author}</div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: isMobile ? 26 : 34, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.12, marginBottom: 16 }}>{post.title}</h2>
        <p style={{ ...BODY, color: '#666' }}>{post.summary}</p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', margin: '20px 0 8px' }}>
          {sections.length > 0 && (
            <button onClick={() => setOpen(o => !o)} aria-expanded={open} className="cta-primary" style={{ padding: '10px 18px' }}>
              {open ? 'Hide post ↑' : 'Read here ↓'}
            </button>
          )}
          <DownloadLink post={post} solid />
        </div>

        {open && (
          <div style={{ marginTop: 32, paddingTop: 28, borderTop: '1px solid #f0f0f0' }}>
            {post.intro?.map((p, i) => <p key={i} style={BODY}><Inline text={p} /></p>)}
            {sections.map(s => (
              <section key={s.heading} style={{ marginBottom: 24 }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: '#16a34a', marginBottom: 12 }}>{s.heading}</h3>
                {s.paragraphs.map((p, i) => <p key={i} style={BODY}><Inline text={p} /></p>)}
                {s.footnote && <p style={{ fontSize: 11, fontWeight: 700, color: '#777' }}>{s.footnote}</p>}
              </section>
            ))}
            {post.postscript && <p style={{ ...BODY, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}><strong>P.S.</strong> {post.postscript}</p>}
          </div>
        )}
      </div>
    </article>
  );
};

export default ThoughtCard;
