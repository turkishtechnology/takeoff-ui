import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Simple',
    Svg: require('@site/static/img/simple.svg').default,
    description: (
      <>
        TakeOff makes development effortless with a clear and simple design system. Spend less time building and more time innovating with easily accessible and reusable
        components.
      </>
    ),
  },
  {
    title: 'Flexible',
    Svg: require('@site/static/img/flexible.svg').default,
    description: (
      <>
        Our system adapts to your project’s needs. Whether you’re creating a small web app or a large-scale enterprise solution, TakeOff ensures flexibility and scalability for
        every project.
      </>
    ),
  },
  {
    title: 'Framework Agnostic',
    Svg: require('@site/static/img/framework-agnostic.svg').default,
    description: <>TakeOff is designed to work with any framework, giving developers the freedom to choose the best technology for their projects. Build without limitations.</>,
  },
  {
    title: 'Powered By Stencil',
    Svg: require('@site/static/img/powered-by-stencil.svg').default,
    description: <>TakeOff is designed to work with any framework, giving developers the freedom to choose the best technology for their projects. Build without limitations.</>,
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className={styles.feature}>
        <div>
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div>
          <h2>{title}</h2>
          <p className={styles.featureDesc}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
