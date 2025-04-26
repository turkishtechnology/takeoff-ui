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
          <p className="description">
            TakeOff simplifies the process of building web applications. It
            provides comprehensive and flexible design system and UI library.
          </p>
        </div>
      </header>

      <main className="contact">
        <section className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div>
              <h2>Our Microsoft Teams Link</h2>
              <p>
                <a
                  href="https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fchannel%2F19%3A0nXc9kArhdOj5OZMqW1vEKb27I_eifVafanAKKhGYjI1%40thread.tacv2%2FGeneral%3FgroupId%3D5a0cad67-57e7-4b91-b45e-8b6a3d0d1514%26tenantId%3D745a1b8b-9958-4d1e-ac1c-f741f0ff4eba&type=channel&deeplinkId=0c9c3d4c-fed2-495a-a476-97fb6eb5ae08&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here to open Microsoft Teams
                </a>
              </p>
              <p>
                Or email us at{' '}
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
                  <strong>Emel Fırtına:</strong> Project Manager —
                  <a href="mailto:efirtina@thy.com"> efirtina@thy.com</a>
                </li>
                <li>
                  <strong>Emre Arslan:</strong> Designer —
                  <a href="mailto:earslan1@thy.com"> earslan1@thy.com</a>
                </li>
                <li>
                  <strong>Harun Demir:</strong> Frontend Developer —
                  <a href="mailto:harundemir@thy.com"> harundemir@thy.com</a>
                </li>
                <li>
                  <strong>Ulaş Turan:</strong> Frontend Developer —
                  <a href="mailto:kgbuturan@thy.com"> kgbuturan@thy.com</a>
                </li>
                <li>
                  <strong>Pınar Yalçınduran:</strong> Frontend Developer —
                  <a href="mailto:pyalcinduran@thy.com">
                    {' '}
                    pyalcinduran@thy.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
