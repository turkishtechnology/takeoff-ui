import { TkAvatar, TkTooltip } from '@takeoff-ui/react';
import React from 'react';

const contributors = [
  { name: 'Harun Demir', role: 'Frontend Developer', image: 'img/contributors/harun-demir.jpg' },
  { name: 'Ulaş Turan', role: 'Frontend Developer', image: 'img/contributors/ulas-turan.jpeg' },
  { name: 'Pınar Yalçınduran', role: 'Frontend Developer', image: 'img/contributors/pinar-yalcinduran.png' },
  { name: 'Kıvanç Eski', role: 'Frontend Developer', image: 'img/contributors/kivanc-eski.png' },
  { name: 'Atakan Erhan Bayil', role: 'Frontend Developer', image: 'img/contributors/atakan-bayil.JPG' },
  { name: 'Hayrunnisa Çiko', role: 'Frontend Developer', image: 'img/contributors/hayrunnisa-ciko.jpg' },
  { name: 'İbrahim Agah Gürer', role: 'Frontend Developer', image: '' },
  { name: 'Onur Palaz', role: 'Frontend Developer', image: 'img/contributors/onur-palaz.jfif' },
  { name: 'Efe Özdemir', role: 'Full Stack Developer', image: 'img/contributors/efe-ozdemir.jpg' },
];

export default function Contributors() {
  return (
    <section style={{ padding: '2rem 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 16px', width: '100%' }}>
        <h1>Contributors</h1>
        <p style={{ color: 'var(--text-base)' }}>
          This project thrives thanks to the amazing efforts of our contributors. Every feature, fix, and idea is a testament to the power of collaboration. Thank you for helping
          us grow and improve! <a href="docs/CONTRIBUTING">Click here</a> to contribute.
        </p>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          {contributors.map(contributor => (
            <TkTooltip key={contributor.name} header={contributor.name} description={contributor.role} position="top" variant="dark">
              <TkAvatar image={contributor.image} size="base" rounded slot="trigger" />
            </TkTooltip>
          ))}
        </div>
      </div>
    </section>
  );
}
