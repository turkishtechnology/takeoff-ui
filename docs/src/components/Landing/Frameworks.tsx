import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './Frameworks.module.css';

type FrameworkItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  SvgDark: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FrameworkList: FrameworkItem[] = [
  {
    title: 'React',
    Svg: require('@site/static/img/framework-section/framework-react.svg').default,
    SvgDark: require('@site/static/img/framework-section/framework-react-dark.svg').default,
    description: (
      <>
        TakeOff seamlessly integrates with React, giving developers access to a robust library of reusable components tailored for the React ecosystem. Create dynamic UIs
        effortlessly.
      </>
    ),
  },
  {
    title: 'Angular',
    Svg: require('@site/static/img/framework-section/framework-angular.svg').default,
    SvgDark: require('@site/static/img/framework-section/framework-angular-dark.svg').default,
    description: (
      <>
        Angular developers can take advantage of TakeOff's comprehensive design system, providing consistent and scalable components that accelerate development and ensure a smooth
        user experience.
      </>
    ),
  },
  {
    title: 'Vue',
    Svg: require('@site/static/img/framework-section/framework-vue.svg').default,
    SvgDark: require('@site/static/img/framework-section/framework-vue-dark.svg').default,
    description: (
      <>
        Vue and TakeOff together offer a powerful combination of simplicity and performance. Use our versatile component library to streamline development and create interactive
        applications with ease.
      </>
    ),
  },
];

function Framework({ title, Svg, SvgDark, description }: FrameworkItem) {
  const { colorMode } = useColorMode();
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {colorMode === 'dark' ? <SvgDark className={styles.iconFramework} role="img" /> : <Svg className={styles.iconFramework} role="img" />}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{description}</p>
      </div>
      <div className={styles.cardFooter}>
        <a className={styles.arrowButton} aria-label={`${title} documentation`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Frameworks() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <span>Multiple Library</span>
            <span>Solutions</span>
          </div>
          <p className={styles.sectionDesc}>TakeOff is designed to be versatile and adaptable, offering seamless integration with the most popular front-end frameworks.</p>
        </div>
        <div className={styles.cardGrid}>
          {FrameworkList.map((props, idx) => (
            <Framework key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
