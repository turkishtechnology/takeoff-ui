import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Gif from '../components/Landing/Gif/gif';

export default function ContributionGuide() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`${siteConfig.title}`}>
      <header className={'page-header'}>
        <div className="container">
          <Gif />
          <h1>Contribution Guide</h1>
          <p className={'description'}>
            TakeOff simplifies the process of building web applications. It
            provides comprehensive and flexible design system and ui library.
          </p>
        </div>
      </header>
      <main className="release-notes">
        <section className="container">
          <h1>Page is being prepared</h1>
        </section>
      </main>
      <div className="bg-point top-right">&nbsp;</div>
      <div className="bg-point middle-right">&nbsp;</div>
      <div className="bg-point middle-left">&nbsp;</div>
    </Layout>
  );
}
