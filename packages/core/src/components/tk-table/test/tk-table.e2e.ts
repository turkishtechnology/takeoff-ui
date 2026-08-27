import { newE2EPage } from '@stencil/core/testing';

const makeColumns = (count: number) => Array.from({ length: count }, (_, i) => ({ field: `c${i}`, header: `Column ${i}`, width: '160px' }));
const makeData = (rows: number, cols: number) => Array.from({ length: rows }, (_, r) => Object.fromEntries(Array.from({ length: cols }, (_, i) => [`c${i}`, `r${r}c${i}`])));

const setup = async (props: Record<string, unknown>, { width = 900, cols = 12, rows = 30 } = {}) => {
  const page = await newE2EPage();
  const errors: string[] = [];
  page.on('pageerror', err => errors.push(String(err)));
  page.on('console', msg => msg.type() === 'error' && errors.push(msg.text()));

  await page.setViewport({ width, height: 700 });
  await page.setContent('<tk-table></tk-table>');
  await page.evaluate(() => {
    (window as unknown as { __errors: string[] }).__errors = [];
    window.addEventListener('error', e => (window as unknown as { __errors: string[] }).__errors.push(e.message));
  });
  await page.$eval('tk-table', (el, assigned) => Object.assign(el, assigned), { columns: makeColumns(cols), data: makeData(rows, cols), ...props });
  await page.waitForChanges();

  const windowErrors = () => page.evaluate(() => (window as unknown as { __errors: string[] }).__errors);
  return { page, errors, windowErrors };
};

const holderState = () =>
  document.querySelector('tk-table').shadowRoot.querySelector<HTMLElement>('.table-holder').dataset.marker +
  ':' +
  document.querySelector('tk-table').shadowRoot.querySelector('.table-holder').scrollLeft;

describe('tk-table horizontal scroll position', () => {
  it('keeps the scrolled table when the scrollbar moves at runtime', async () => {
    const { page } = await setup({ horizontalScrollPosition: 'bottom' });

    await page.evaluate(() => {
      const holder = document.querySelector('tk-table').shadowRoot.querySelector<HTMLElement>('.table-holder');
      holder.dataset.marker = 'original';
      holder.scrollLeft = 300;
    });
    expect(await page.evaluate(holderState)).toBe('original:300');

    await page.$eval('tk-table', el => ((el as HTMLTkTableElement).horizontalScrollPosition = 'top'));
    await page.waitForChanges();

    expect(await page.evaluate(holderState)).toBe('original:300');
    expect(
      await page.evaluate(() => {
        const bar = document.querySelector('tk-table').shadowRoot.querySelector('.tk-table-top-scrollbar');
        return [bar.classList.contains('hidden'), bar.scrollLeft];
      }),
    ).toEqual([false, 300]);

    await page.$eval('tk-table', el => ((el as HTMLTkTableElement).horizontalScrollPosition = 'bottom'));
    await page.waitForChanges();

    expect(await page.evaluate(holderState)).toBe('original:300');
  });

  it('fills a fixed-height container the same way in every mode', async () => {
    const boxHeight = async (horizontalScrollPosition: string) => {
      const { page } = await setup({ horizontalScrollPosition, containerStyle: { height: '400px' } }, { rows: 3 });
      return page.evaluate(() => {
        const root = document.querySelector('tk-table').shadowRoot;
        const box = root.querySelector('.table-frame.has-top-scrollbar') || root.querySelector('.table-holder');
        return Math.round(box.getBoundingClientRect().height);
      });
    };

    const bottom = await boxHeight('bottom');
    expect(bottom).toBeGreaterThan(300);
    expect(Math.abs((await boxHeight('top')) - bottom)).toBeLessThanOrEqual(1);
    expect(Math.abs((await boxHeight('both')) - bottom)).toBeLessThanOrEqual(1);
  });

  it('shows the top scrollbar once the table overflows without a ResizeObserver loop error', async () => {
    const { page, errors, windowErrors } = await setup({ horizontalScrollPosition: 'top', containerStyle: { height: '400px' } }, { width: 1600, cols: 8 });

    const isHidden = () => page.evaluate(() => document.querySelector('tk-table').shadowRoot.querySelector('.tk-table-top-scrollbar').classList.contains('hidden'));
    expect(await isHidden()).toBe(true);

    await page.setViewport({ width: 800, height: 700 });
    await page.waitForChanges();
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));

    expect(await isHidden()).toBe(false);
    expect([...errors, ...(await windowErrors())].filter(message => /ResizeObserver/.test(message))).toEqual([]);
  });
});
