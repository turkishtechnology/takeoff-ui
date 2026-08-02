import { useMemo, useState } from 'react';
import { TkInput } from '@takeoff-ui/react';
import OverviewItem from './OverviewItem';
import { overviewItems, overviewCategories } from '../../data/overview-items';

const OverviewHolder = () => {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  // Build ordered groups from the taxonomy, plus an automatic "Other" bucket
  // for any component missing from overviewCategories (so nothing is dropped).
  const groups = useMemo(() => {
    const byTitle = new Map(overviewItems.map(item => [item.title, item]));
    const used = new Set<string>();
    const ordered = overviewCategories.map(cat => {
      const items = cat.titles.map(t => byTitle.get(t)).filter(Boolean) as typeof overviewItems;
      items.forEach(i => used.add(i.title));
      return { name: cat.name, items };
    });
    const other = overviewItems.filter(i => !used.has(i.title));
    return other.length ? [...ordered, { name: 'Other', items: other }] : ordered;
  }, []);

  const visible = groups.map(g => ({ ...g, items: g.items.filter(i => i.title.toLowerCase().includes(q)) })).filter(g => g.items.length > 0);

  const total = visible.reduce((n, g) => n + g.items.length, 0);

  return (
    <div>
      <div className="max-w-sm mb-10">
        <TkInput value={query} onTkChange={e => setQuery(e.detail ?? '')} placeholder="Search components…" icon="search" iconPosition="left" />
      </div>

      {total === 0 ? (
        <p className="text-[color:var(--ifm-color-emphasis-600)]">No components match “{query.trim()}”.</p>
      ) : (
        visible.map(group => (
          <section key={group.name} className="mb-12">
            <h2 className="text-lg font-semibold mb-5 text-[color:var(--text-darkest)]">{group.name}</h2>
            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(min(232px,100%),1fr))]">
              {group.items.map(item => (
                <OverviewItem key={`${item.href}-${item.title}`} {...item} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default OverviewHolder;
