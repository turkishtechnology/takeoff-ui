import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Gif from '../components/Landing/Gif/gif';

export default function Contact() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`${siteConfig.title}`}>
      <header className="page-header">
        <div className="container">
          <Gif />
          <h1>Contact Us</h1>
          <p className="description">TakeOff simplifies the process of building web applications. It provides comprehensive and flexible design system and UI library.</p>
        </div>
      </header>

      <main className="contact">
        <section className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div>
              <h2>Team Email</h2>
              <p>
                <a href="mailto:takeoffui@thy.com">takeoffui@thy.com</a>
              </p>
            </div>
            <div>
              <h2>Direct Contacts</h2>
              <ul className="list-none pl-0">
                <li>
                  <strong>Payment and Loyalty Solutions Directorate</strong>
                </li>
                <li>
                  <strong>Emel Fırtına:</strong> Project Manager —<a href="mailto:efirtina@thy.com"> efirtina@thy.com</a>
                </li>
                <li>
                  <strong>Emre Arslan:</strong> Designer —<a href="mailto:earslan1@thy.com"> earslan1@thy.com</a>
                </li>
                <li>
                  <strong>Harun Demir:</strong> Frontend Developer —<a href="mailto:harundemir@thy.com"> harundemir@thy.com</a>
                </li>
                <li>
                  <strong>Ulaş Turan:</strong> Frontend Developer —<a href="mailto:kgbuturan@thy.com"> kgbuturan@thy.com</a>
                </li>
                <li>
                  <strong>Pınar Yalçınduran:</strong> Frontend Developer —<a href="mailto:pyalcinduran@thy.com"> pyalcinduran@thy.com</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
