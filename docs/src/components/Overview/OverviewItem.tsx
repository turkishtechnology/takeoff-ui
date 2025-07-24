import { TkCard, TkButton, TkBadge } from '@takeoff-ui/react';
import { useColorMode } from '@docusaurus/theme-common';

const OverviewItem = ({ title, href, Svg, SvgDark, isNew }) => {
  const { colorMode } = useColorMode();

  return (
    <a href={href} style={{ color: 'var(--text-darkest)' }}>
      <TkCard>
        <div
          slot="header"
          style={{
            padding: '8px 16px 0',
          }}
          className="flex justify-between"
        >
          <h3 className="mb-0 font-semibold">{title}</h3>
          <TkButton variant="neutral" icon="arrow_outward" size="small" type="text" />
        </div>

        <div className="relative">
          {isNew ? (
            <TkBadge label="new" variant="cyan">
              {colorMode === 'dark' ? <img src={SvgDark} className="w-full" role="img" /> : <img src={Svg} />}
            </TkBadge>
          ) : colorMode === 'dark' ? (
            <img src={SvgDark} className="w-full" role="img" />
          ) : (
            <img src={Svg} />
          )}
        </div>
      </TkCard>
    </a>
  );
};

export default OverviewItem;
