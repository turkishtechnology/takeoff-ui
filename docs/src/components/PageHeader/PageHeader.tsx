import { useColorMode } from '@docusaurus/theme-common';
import Gif from '../Landing/Gif/gif';

export default function PageHeader(): JSX.Element {
  const { colorMode } = useColorMode();
  return (
    <header className={'page-header'}>
      <div className="container">
        <Gif />

        {colorMode === 'dark' ? <img src="img/hero/hero-logo-dark.svg" /> : <img src="img/hero/hero-logo.svg" />}
        <p className={'description'}>
          Takeoff UI is a design system of framework-agnostic web components built with Stencil.js. Use the same UI foundation across React, Vue, and Angular so teams ship faster
          with consistent UX.{' '}
        </p>
      </div>
    </header>
  );
}
