import { TkButton, TkCard, TkDialog } from '@takeoff-ui/react';
import { useState } from 'react';

function Dialog() {
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    setShowDialog(!showDialog);
  };
  return (
    <TkCard>
      <TkButton label="Open Dialog" onClick={handleClick} />
      <TkDialog
        header="Welcome"
        subheader="Basic Dialog Example"
        visible={showDialog}
        onTkVisibleChange={(e) => setShowDialog(e.detail)}
        containerStyle={{ width: '500px' }}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
      </TkDialog>
    </TkCard>
  );
}

export default Dialog;
