import { TkCard, TkIcon } from '@takeoff-ui/react';
import { useColorMode } from '@docusaurus/theme-common';

type OverviewItemProps = {
  title: string;
  href: string;
  Svg: string;
  SvgDark: string;
};

const OverviewItem = ({ title, href, Svg, SvgDark }: OverviewItemProps) => {
  const { colorMode } = useColorMode();
  const src = colorMode === 'dark' ? SvgDark : Svg;

  return (
    <a
      href={href}
      className="block w-full h-full min-w-0 rounded-2xl no-underline hover:no-underline text-[color:var(--text-darkest)] hover:text-[color:var(--text-darkest)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:[outline:2px_solid_var(--primary-500)] focus-visible:[outline-offset:2px]"
    >
      <TkCard className="w-full h-full">
        <div slot="header" className="pt-2 px-4 pb-0 flex justify-between items-center">
          <h3 className="mb-0 font-semibold">{title}</h3>
          {/* decorative "opens page" affordance — the whole card is the link */}
          <TkIcon icon="arrow_outward" variant="neutral" aria-hidden="true" />
        </div>

        <div className="relative">
          <img src={src} className="w-full" alt="" loading="lazy" />
        </div>
      </TkCard>
    </a>
  );
};

export default OverviewItem;
