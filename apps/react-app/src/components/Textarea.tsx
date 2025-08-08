import { TkTextarea } from '@takeoff-ui/react';

function Textarea() {
  return (
    <div>
      <TkTextarea label="Error" placeholder="Error" invalid={true} error="Bu alan zorunludur" />
      <TkTextarea label="Readonly" placeholder="Readonly" readonly />
      <TkTextarea label="Disabled" placeholder="Disabled" disabled />
    </div>
  );
}

export default Textarea;
