import {
  TkCard,
  TkButton,
  TkDrawer,
  TkBadge,
  TkTabs,
  TkTabsItem,
  TkCheckbox,
} from '@takeoff-ui/react';
import { useState, useRef } from 'react';

function Drawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDrawer2, setShowDrawer2] = useState(false);

  const handleClick = () => {
    setShowDrawer(true);
  };

  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>(
    'right',
  );

  const handleClick2 = (dir?: 'top' | 'bottom' | 'left' | 'right') => {
    if (dir) {
      setPosition(dir);
    }
    setShowDrawer2(true);
  };

  const [width, setWidth] = useState('200px');
  const [preventDismiss, setPreventDismiss] = useState(false);
  return (
    <>
      <div className="mb-4">
        <TkCheckbox
          label="Prevent Dismiss by Clicking Outside"
          value={preventDismiss}
          onTkChange={(e) => setPreventDismiss(e.detail)}
        />
      </div>
      <TkButton label="Open Drawer" onTkClick={() => setShowDrawer(true)} />
      <TkDrawer
        header="Prevent Dismiss Drawer"
        open={showDrawer}
        preventDismiss={preventDismiss}
        onTkDrawerClose={() => setShowDrawer(false)}
      >
        <div slot="content">
          <p>
            {preventDismiss
              ? 'Clicking outside the drawer will not close it. Please use the close button.'
              : 'Clicking outside the drawer will close it.'}
          </p>
        </div>
      </TkDrawer>
    </>
  );
}

export default Drawer;
