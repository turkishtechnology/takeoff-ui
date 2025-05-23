import { TkToggle } from '@takeoff-ui/react';

function Toggle() {
  return (
    <div>
      <TkToggle />

      <TkToggle label="Disabled" disabled value={true} />
      <TkToggle label="Invalid" invalid value={true} />
    </div>
  );
}

export default Toggle;
