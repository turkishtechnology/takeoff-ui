import React from 'react';
import { TkButton } from '@takeoff-ui/react';
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { TAKEOFF_V2_DOCS_URL } from '../../V2Notice/V2Notice';
import styles from './v2-banner.module.css';

/** Selling points of v2 over v1, shown as a grid under the headline. */
const HIGHLIGHTS = [
  {
    title: 'Headless foundation',
    desc: 'Behaviour and styling are separate layers, so you can restyle or rebuild a component without fighting the library.',
  },
  {
    title: 'Built for React',
    desc: 'Real React components — no web component wrappers, no custom element quirks. Refs, props, and state work the way you expect.',
  },
  {
    title: 'Accessibility built in',
    desc: 'Keyboard navigation, focus management, and ARIA semantics ship with the components instead of being left to each project.',
  },
  {
    title: 'Compound components',
    desc: 'Composable sub-components let you control markup and layout, rather than configuring everything through a single wall of props.',
  },
];

/**
 * Landing-page announcement for the Takeoff UI v2 release. Sits directly under
 * the hero so it is the first thing a visitor reads before the v1 sections.
 */
export default function V2Banner(): JSX.Element {
  const { colorMode } = useColorMode();
  // useBaseUrl resolves against the site baseUrl so the mark also loads when
  // this component is reused outside the site root.
  const markLight = useBaseUrl('img/takeoff-v2-mark.svg');
  const markDark = useBaseUrl('img/takeoff-v2-mark-dark.svg');
  const mark = colorMode === 'dark' ? markDark : markLight;

  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.banner}>
          <div className={styles.header}>
            <div className={styles.headerText}>
              <span className={styles.badge}>
                <img src={mark} alt="" />
                New release
              </span>
              <h2 className={styles.title}>Takeoff UI v2 is now available</h2>
              <p className={styles.desc}>
                Takeoff UI v2 is the next generation of the design system — a headless, fully accessible React component library built on the same Takeoff design tokens you already
                use. If you are starting a new project, start with v2.
              </p>
              <p className={styles.reactOnly}>
                <strong>React only.</strong> Takeoff UI v2 ships a single package, <code>@takeoff-ui/react-spar</code>. If your project is on Angular or Vue, stay on Takeoff UI v1.
              </p>
            </div>
            <div className={styles.visual}>
              <img src={mark} alt="Takeoff UI v2" />
            </div>
          </div>

          <ul className={styles.highlights}>
            {HIGHLIGHTS.map(item => (
              <li className={styles.highlight} key={item.title}>
                <h3 className={styles.highlightTitle}>{item.title}</h3>
                <p className={styles.highlightDesc}>{item.desc}</p>
              </li>
            ))}
          </ul>

          <div className={styles.footer}>
            <div className={styles.actions}>
              <TkButton mode="link" href={TAKEOFF_V2_DOCS_URL} target="_blank" label="Explore Takeoff UI v2" icon="arrow_outward" iconPosition="right" type="filled" />
            </div>
            <p className={styles.note}>Already building with Takeoff UI v1? It stays supported, and these docs remain the reference for your existing projects.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
