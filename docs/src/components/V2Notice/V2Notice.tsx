import React from 'react';
import { TkButton } from '@takeoff-ui/react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './v2-notice.module.css';

export const TAKEOFF_V2_DOCS_URL = 'https://takeoff-v2.app.turkishtechlab.com/';

export function openV2(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Short-form selling points; the landing banner carries the longer versions. */
const HIGHLIGHTS = [
  ['Headless foundation', 'behaviour and styling stay separate, so components bend to your design instead of the other way around.'],
  ['Fully React', 'real React components — no web component wrappers or custom element quirks.'],
  ['Accessible by default', 'keyboard navigation, focus management, and ARIA semantics ship with every component.'],
  ['Compound components', 'compose sub-components to control markup and layout, instead of one wall of props.'],
];

interface IV2NoticeProps {
  /** Overrides the default heading, e.g. on the Installation page. */
  title?: string;
  /** Overrides the default body copy. */
  children?: React.ReactNode;
}

/**
 * Inline callout steering readers of the Takeoff UI v1 docs toward Takeoff UI v2.
 * Used at the top of entry-point pages (Introduction, Installation) where
 * someone is most likely to be starting a brand new project.
 */
export default function V2Notice({ title, children }: IV2NoticeProps): JSX.Element {
  // useBaseUrl resolves against the site baseUrl; a bare relative path would
  // 404 on nested doc routes like /docs/Introduction/. The mark stays red in
  // both themes, like the site logo.
  const mark = useBaseUrl('img/takeoff-v2-mark.svg');

  return (
    <aside className={styles.notice}>
      <div className={styles.mark}>
        <img src={mark} alt="Takeoff UI v2" />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title ?? 'Starting a new project? Use Takeoff UI v2'}</h3>
        <p className={styles.desc}>
          {children ?? (
            <>
              Takeoff UI v2 is the next generation of the design system: a headless, fully accessible React component library built on the same Takeoff design tokens. New projects
              should start there. Takeoff UI v1 remains supported for existing projects, so there is no need to migrate right away.
            </>
          )}
        </p>

        <ul className={styles.highlights}>
          {HIGHLIGHTS.map(([label, detail]) => (
            <li key={label}>
              <strong>{label}</strong> — {detail}
            </li>
          ))}
        </ul>

        <p className={styles.reactOnly}>
          <strong>React only.</strong> Takeoff UI v2 ships a single package, <code>@takeoff-ui/react-spar</code>. Angular and Vue projects should stay on Takeoff UI v1.
        </p>

        <div className={styles.actions}>
          <TkButton label="Go to Takeoff UI v2 docs" icon="arrow_outward" iconPosition="right" size="small" onTkClick={() => openV2(TAKEOFF_V2_DOCS_URL)} />
          <TkButton label="Installation guide" type="outlined" variant="neutral" size="small" onTkClick={() => openV2(`${TAKEOFF_V2_DOCS_URL}docs/installation`)} />
        </div>
      </div>
    </aside>
  );
}
