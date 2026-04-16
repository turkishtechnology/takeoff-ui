import { TkCard, TkButton } from '@takeoff-ui/react';

function Button() {
  return (
    <TkCard>
      <TkButton label="Cancel" variant="primary" type="text" dataTestid="1" />
      <TkButton label="Cancel" variant="primary" type="outlined" />
      <TkButton label="Cancel" variant="primary" type="filled" />
    </TkCard>
  );
}

export default Button;
