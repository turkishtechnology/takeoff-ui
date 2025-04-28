import { TkAvatar, TkTooltip } from '@takeoff-ui/react';
import React from 'react';

export default function Contributors() {
  return (
    <section>
      <div className="container">
        <h1>Contributors</h1>
        <p style={{ color: 'var(--text-base)' }}>
          This project thrives thanks to the amazing efforts of our
          contributors. Every feature, fix, and idea is a testament to the power
          of collaboration. Thank you for helping us grow and improve!{' '}
          <a href="contribution-guide">Click here</a> to contribute.
        </p>
        <div className="flex gap-2">
          <TkTooltip
            header="Harun Demir"
            description="Frontend Developer"
            position="top"
            variant="dark"
          >
            <TkAvatar
              image="img/contributors/harun-demir.jpg"
              size="xlarge"
              rounded
              slot="trigger"
            />
          </TkTooltip>
          <TkTooltip
            header="Ulaş Turan"
            description="Frontend Developer"
            position="top"
            variant="dark"
          >
            <TkAvatar
              image="img/contributors/ulas-turan.jpeg"
              size="xlarge"
              rounded
              slot="trigger"
            />
          </TkTooltip>
          <TkTooltip
            header="Onur Palaz"
            description="Frontend Developer"
            position="top"
            variant="dark"
          >
            <TkAvatar
              image="img/contributors/onur-palaz.jfif"
              size="xlarge"
              rounded
              slot="trigger"
            />
          </TkTooltip>
          <TkTooltip
            header="Efe Özdemir"
            description="Full Stack Developer"
            position="top"
            variant="dark"
          >
            <TkAvatar
              image="img/contributors/efe-ozdemir.jpg"
              size="xlarge"
              rounded
              slot="trigger"
            />
          </TkTooltip>
          <TkTooltip
            header="Pınar Yalçınduran"
            description="Frontend Developer"
            position="top"
            variant="dark"
          >
            <TkAvatar
              image="img/contributors/pinar-yalcinduran.png"
              size="xlarge"
              rounded
              slot="trigger"
            />
          </TkTooltip>
          <TkTooltip
            header="İbrahim Agah Gürer"
            description="Frontend Developer"
            position="top"
            variant="dark"
          >
            <TkAvatar image="" size="xlarge" rounded slot="trigger" />
          </TkTooltip>
        </div>
      </div>
    </section>
  );
}
