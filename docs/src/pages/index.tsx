import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/Landing/Features';
import '@takeoff-ui/core/dist/core/core.css';
import Frameworks from '../components/Landing/Frameworks';
import DesignSystem from '../components/Landing/DesignSystem/DesignSystem';
import PageHeader from '../components/PageHeader/PageHeader';
import Contributors from '../components/Landing/Contributors';
import V2Banner from '../components/Landing/V2Banner/V2Banner';
import React from 'react';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`}>
      <PageHeader />
      <main>
        <V2Banner />
        <HomepageFeatures />
        <Frameworks />
        <DesignSystem />
        <section className="section-image">
          <div className={'holder'}>
            <div className={'image'}></div>
          </div>
        </section>
        <Contributors />
      </main>
      <div className="bg-point top-right">&nbsp;</div>
      <div className="bg-point middle-right">&nbsp;</div>
      <div className="bg-point middle-left">&nbsp;</div>
    </Layout>
  );
}
