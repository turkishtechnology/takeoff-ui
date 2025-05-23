import { TkBadge } from '@takeoff-ui/react';

function Badge() {
  return (
    <div>
      <TkBadge variant="danger" type="filled" dot>
        <div
          style={{ width: '24px', height: '24px', background: 'lightgrey' }}
        ></div>
      </TkBadge>
      <TkBadge variant="secondary" size="small" type="filled" count="4" rounded>
        <div
          style={{ width: '24px', height: '24px', background: 'lightgrey' }}
        ></div>
      </TkBadge>
    </div>
  );
}

export default Badge;
