import styles from './design-system.module.css';
import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function DesignSystem() {
  const { colorMode } = useColorMode();

  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <span>40+ Component</span>
            <span>Ready to use</span>
          </div>
          <p className={styles.sectionDesc}>Easy to create a cohesive, scalable, and unique user interface while ensuring that your project remains efficient throughout.</p>
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.figmaLogo}>{colorMode === 'dark' ? <img src="img/figma-icon-dark.svg" alt="Figma" /> : <img src="img/figma-icon.svg" alt="Figma" />}</div>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Takeoff Design System</h3>
              <p className={styles.cardDesc}>
                Our design system offers a comprehensive library of over 40 pre-built components, designed to meet a wide range of needs across various projects. Each component is
                crafted with flexibility in mind, allowing for easy customization and theming. With access to more than 50,000 variables, you can adapt every aspect of the
                components to match your specific brand and design requirements.
              </p>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.previewImage} data-position="first">
              {colorMode === 'dark' ? <img src="img/design-system-preview-dark.svg" alt="Colors" /> : <img src="img/design-system-preview.svg" alt="Colors" />}
            </div>
            <div className={styles.previewImage} data-position="second">
              {colorMode === 'dark' ? <img src="img/design-system-preview-dark.svg" alt="Typography" /> : <img src="img/design-system-preview.svg" alt="Typography" />}
            </div>
            <div className={styles.previewImage} data-position="third">
              {colorMode === 'dark' ? <img src="img/design-system-preview-dark.svg" alt="Buttons" /> : <img src="img/design-system-preview.svg" alt="Buttons" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
