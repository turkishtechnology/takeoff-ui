import { TkBreadcrumb } from '@takeoff-ui/react';

function Breadcrumb() {
  const items = [
    { label: 'Home', href: '/', isExternal: true },
    { label: 'Library', href: '/library', isExternal: true },
    { label: 'Data' },
  ];

  return <TkBreadcrumb model={items} type="outlined" />;
}

export default Breadcrumb;
