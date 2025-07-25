import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import '@takeoff-ui/core/dist/core/core.css';
import { releases } from '../data/releases';
import ReleaseItem from '../components/ReleaseItem/ReleaseItem';
import Gif from '../components/Landing/Gif/gif';
import React from 'react';

export default function ReleaseNotes() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`${siteConfig.title}`}>
      <header className={'page-header'}>
        <div className="container">
          <Gif />
          <h1>Release Notes</h1>
          <p className={'description'}>TakeOff simplifies the process of building web applications. It provides comprehensive and flexible design system and ui library.</p>
        </div>
      </header>
      <main className="release-notes">
        <section>
          {releases.map((item, index) => {
            return <ReleaseItem data={item} key={'release-item' + index} />;
          })}
        </section>
      </main>
      <div className="bg-point top-right">&nbsp;</div>
      <div className="bg-point middle-right">&nbsp;</div>
      <div className="bg-point middle-left">&nbsp;</div>
    </Layout>
  );
}
