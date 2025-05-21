import { TkIcon } from '@takeoff-ui/react';
import { useState } from 'react';

function Icon() {
  return (
    <div>
      <TkIcon icon="flight" />
      <TkIcon icon="hotel" />
      <TkIcon icon="directions_car" />
      <TkIcon icon="local_dining" />

      <TkIcon icon="flight" variant="primary" />
      <TkIcon icon="flight" variant="secondary" />
      <TkIcon icon="flight" variant="neutral" />
      <TkIcon icon="flight" variant="info" />
      <TkIcon icon="flight" variant="success" />
      <TkIcon icon="flight" variant="warning" />
      <TkIcon icon="flight" variant="danger" />
      <TkIcon icon="flight" variant="white" />

      <TkIcon icon="flight" sign variant="primary" />
      <TkIcon icon="flight" sign variant="secondary" />
      <TkIcon icon="flight" sign variant="neutral" />
      <TkIcon icon="flight" sign variant="info" />
      <TkIcon icon="flight" sign variant="success" />
      <TkIcon icon="flight" sign variant="warning" />
      <TkIcon icon="flight" sign variant="danger" />
      <TkIcon icon="flight" sign variant="white" />

      <TkIcon icon="flight" size="small" />
      <TkIcon icon="flight" size="base" />
      <TkIcon icon="flight" size="large" />
      <TkIcon icon="flight" size="xlarge" />
      <TkIcon icon="flight" size="xxlarge" />

      <TkIcon icon="flight" sign size="small" />
      <TkIcon icon="flight" sign size="base" />
      <TkIcon icon="flight" sign size="large" />
      <TkIcon icon="flight" sign size="xlarge" />
      <TkIcon icon="flight" sign size="xxlarge" />

      <TkIcon icon="star" iconType="outlined" />
      <TkIcon icon="star" iconType="rounded" />
      <TkIcon icon="star" iconType="sharp" />

      <TkIcon icon="flight" color="#FF5722" />
      <TkIcon icon="flight" color="#2196F3" />
      <TkIcon icon="flight" color="#4CAF50" />
      <TkIcon
        icon="flight"
        sign
        backgroundColor="#F5F5F5"
        borderColor="#2196F3"
        iconColor="#2196F3"
      />
      <TkIcon
        icon="flight"
        sign
        backgroundColor="#FFF9C4"
        borderColor="#FFC107"
        iconColor="#FFC107"
      />
    </div>
  );
}

export default Icon;
