import { TkDivider, TkButton, TkCard } from '@takeoff-ui/react';

function Divider() {
  return (
    <div>
      <TkDivider mx={32} />
      <TkDivider my={48}>Custom Vertical Spacing</TkDivider>
      <TkDivider mx={32} my={48}>
        Custom Both Spacing
      </TkDivider>
    </div>
  );
}

export default Divider;
