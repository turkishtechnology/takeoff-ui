import clsx from 'clsx';
import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

type FrameworkItem = {
  title: string;
  SvgStencil: React.ComponentType<React.ComponentProps<'svg'>>;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  SvgStencilDark: React.ComponentType<React.ComponentProps<'svg'>>;
  SvgDark: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FrameworkList: FrameworkItem[] = [
  {
    title: 'React',
    SvgStencil: require('@site/static/img/framework-section/framework-stencil.svg').default,
    Svg: require('@site/static/img/framework-section/framework-react.svg').default,
    SvgStencilDark: require('@site/static/img/framework-section/framework-stencil-dark.svg').default,
    SvgDark: require('@site/static/img/framework-section/framework-react-dark.svg').default,
    description: (
      <>
        TakeOff seamlessly integrates with React, giving developers access to a robust library of reusable components tailored for the React ecosystem. Create dynamic UIs
        effortlessly.
      </>
    ),
  },
  {
    title: 'Vue',
    SvgStencil: require('@site/static/img/framework-section/framework-stencil.svg').default,
    Svg: require('@site/static/img/framework-section/framework-vue.svg').default,
    SvgStencilDark: require('@site/static/img/framework-section/framework-stencil-dark.svg').default,
    SvgDark: require('@site/static/img/framework-section/framework-vue-dark.svg').default,
    description: (
      <>
        Angular developers can take advantage of TakeOff’s comprehensive design system, providing consistent and scalable components that accelerate development and ensure a smooth
        user experience.
      </>
    ),
  },
  {
    title: 'Angular',
    SvgStencil: require('@site/static/img/framework-section/framework-stencil.svg').default,
    Svg: require('@site/static/img/framework-section/framework-angular.svg').default,
    SvgStencilDark: require('@site/static/img/framework-section/framework-stencil-dark.svg').default,
    SvgDark: require('@site/static/img/framework-section/framework-angular-dark.svg').default,
    description: (
      <>
        Vue and TakeOff together offer a powerful combination of simplicity and performance. Use our versatile component library to streamline development and create interactive
        applications with ease.
      </>
    ),
  },
];

function Framework({ title, SvgStencil, Svg, SvgStencilDark, SvgDark, description }: FrameworkItem) {
  const { colorMode } = useColorMode();
  return (
    <div className={clsx('col col--4')}>
      <div className="framework">
        <div>
          {colorMode === 'dark' ? (
            <>
              <SvgStencilDark className="frameworkSvg" role="img" />
              <SvgDark className="frameworkSvg" role="img" />
            </>
          ) : (
            <>
              <SvgStencil className="frameworkSvg" role="img" />
              <Svg className="frameworkSvg" role="img" />
            </>
          )}
        </div>
        <div>
          <h2>{title}</h2>
          <p className="frameworkDesc">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Frameworks() {
  return (
    <section className="section-frameworks">
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <h1>Multiple Library Solutions</h1>
          </div>
          <div className="col col--6">
            <p className="titleDesc">TakeOff is designed to be versatile and adaptable, offering seamless integration with the most popular front-end frameworks.</p>
          </div>
        </div>
        <div className="row">
          {FrameworkList.map((props, idx) => (
            <Framework key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
