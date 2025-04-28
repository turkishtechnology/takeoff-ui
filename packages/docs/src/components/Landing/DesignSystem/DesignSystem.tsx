import clsx from 'clsx';
import styles from './design-system.module.css';
import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function DesignSystem() {
  const { colorMode } = useColorMode();

  return (
    <>
      <section className="pt-8">
        <div className="container">
          <div className="row">
            <div className="col col--6">
              <h1>29+ Component Ready to use</h1>
            </div>
            <div className="col col--6">
              <p className={styles.titleDesc}>
                Easy to create a cohesive, scalable, and unique user interface
                while ensuring that your project remains efficient throughout.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className={clsx('row', styles.designSystem)}>
            <div className="col col--4">
              <div className={styles.figmaLogo}>
                {colorMode === 'dark' ? (
                  <img src="img/figma-icon-dark.svg" />
                ) : (
                  <img src="img/figma-icon.svg" />
                )}
              </div>
              <h3> Takeoff Design System</h3>
              <p className={styles.designSystemDesc}>
                Our design system offers a comprehensive library of over 40
                pre-built components, designed to meet a wide range of needs
                across various projects. Each component is crafted with
                flexibility in mind, allowing for easy customization and
                theming. With access to more than 50,000 variables, you can
                adapt every aspect of the components to match your specific
                brand and design requirements.
              </p>
            </div>
            <div className="col col--8">
              <div className={styles.previewImage}></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
