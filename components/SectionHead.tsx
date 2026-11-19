import React from 'react';

/** Every page opens the same way: a small green label, a modest title, an optional line of
 *  intro and an optional action on the right. Kept small so the content, not the headings, fills the page. */
const SectionHead: React.FC<{ eyebrow: string; title: string; intro?: string; action?: React.ReactNode; dark?: boolean; level?: 1 | 2 }> = ({ eyebrow, title, intro, action, dark, level = 1 }) => (
  <div className="reveal section-head">
    <div>
      <div className="eyebrow">{eyebrow}</div>
      {level === 1 ? <h1 className="section-title">{title}</h1> : <h2 className="section-title sub">{title}</h2>}
      {intro && <p className="section-intro" style={{ color: dark ? '#a1a1aa' : '#555' }}>{intro}</p>}
    </div>
    {action}
  </div>
);

/** A labelled group inside a section (e.g. Products / Games / Asset packs). */
export const GroupHead: React.FC<{ title: string; count?: number; note?: string; action?: React.ReactNode; dark?: boolean }> = ({ title, count, note, action, dark }) => (
  <div className="group-head" style={{ borderColor: dark ? 'var(--charcoal-line)' : '#e8e8e8' }}>
    <h3 style={{ color: dark ? '#fafafa' : '#0a0a0a' }}>
      {title}
      {count !== undefined && <span className="group-count">{count}</span>}
    </h3>
    {note && <span className="group-note">{note}</span>}
    {action && <span style={{ marginLeft: 'auto' }}>{action}</span>}
  </div>
);

export default SectionHead;
