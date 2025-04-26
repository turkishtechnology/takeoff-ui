import { useColorMode } from '@docusaurus/theme-common';
import Gif from '../Landing/Gif/gif';

export default function PageHeader(): JSX.Element {
  const { colorMode } = useColorMode();
  return (
    <header className={'page-header'}>
      <div className="container">
        <Gif />

        {colorMode === 'dark' ? (
          <img src="img/hero/hero-logo-dark.svg" />
        ) : (
          <img src="img/hero/hero-logo.svg" />
        )}
        <p className={'description'}>
          TakeOff simplifies the process of building web applications. It
          provides comprehensive and flexible design system and ui library that
          ensures high performance, scalability, and ease of use.{' '}
        </p>
      </div>
    </header>
  );
}
