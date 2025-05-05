import { TkCard, TkAlert, TkButton } from '@takeoff-ui/react';

function Alert() {
  const messages = ['test 1 2 3 ', 'test 1 2 3 ', 'test 1 2 3 ', 'test 1 2 3 '];
  return (
    <TkCard>
      <TkAlert
        variant="success"
        type="outlined"
        header="Success Filled Alert"
        message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      >
        <div slot="right-action" className="flex gap-3">
          <TkButton label="Action1" variant="info" type="text" />
          <TkButton label="Action1" variant="info" type="text" />
        </div>
      </TkAlert>
      <TkAlert
        variant="info"
        header="Success Outlined Alert"
        message={messages[0]}
        type="outlined"
      >
        <div slot="footer-action">
          <TkButton label="test" />
        </div>
        <div slot="right-action">
          <TkButton label="test" />
        </div>
      </TkAlert>
    </TkCard>
  );
}

export default Alert;
