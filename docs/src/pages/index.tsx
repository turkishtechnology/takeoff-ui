import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/Landing/Features';
import '@takeoff-ui/core/dist/core/core.css';
import Frameworks from '../components/Landing/Frameworks';
import DesignSystem from '../components/Landing/DesignSystem/DesignSystem';
import PageHeader from '../components/PageHeader/PageHeader';
import Contributors from '../components/Landing/Contributors';
// import FAQs from "../components/Landing/FAQs";
import React from 'react';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`}>
      <PageHeader />
      <main>
        <HomepageFeatures />
        <Frameworks />
        <DesignSystem />
        <section>
          <div className="container">
            <br /> <br />
            <div className="row">
              <div className="col col--6">
                <h1>Powered By Takeoff UI</h1>
              </div>
            </div>
            <div className="row">
              <div className="col col--12">
                <div
                  style={{
                    color: 'var(--text-base)',
                  }}
                  className="flex-nowrap text-[32px]"
                >
                  <span>Integrated in 17+ Production Environments </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-image">
          <div className={'holder'}>
            <div className={'image'}></div>
          </div>
        </section>
        <Contributors />
        {/* TODO: Sorular hazırlandığında açılacak */}
        {/* <FAQs /> */}
      </main>
      <div className="bg-point top-right">&nbsp;</div>
      <div className="bg-point middle-right">&nbsp;</div>
      <div className="bg-point middle-left">&nbsp;</div>
    </Layout>
  );
}
