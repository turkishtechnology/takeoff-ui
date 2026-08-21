import { newSpecPage } from '@stencil/core/testing';
import { TkTabs } from '../tk-tabs';
import { TkTabsItem } from '../tk-tabs-item';

describe('tk-tabs', () => {
  it('activates the tab from the activeIndex prop', async () => {
    const page = await newSpecPage({
      components: [TkTabs, TkTabsItem],
      html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item><tk-tabs-item label="Two">Two</tk-tabs-item></tk-tabs>`,
    });

    page.root.activeIndex = 1;
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('.tab-header.active .tk-tabs-item-label')?.textContent).toBe('Two');
  });

  describe('rendering', () => {
    it('renders headers, panels and default classes', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item><tk-tabs-item label="Two">Two</tk-tabs-item></tk-tabs>`,
      });

      const root = page.root.shadowRoot.querySelector('.tk-tabs');
      expect(root.classList.contains('tk-tabs-horizontal')).toBe(true);
      expect(root.classList.contains('tk-tabs-base')).toBe(true);
      expect(root.classList.contains('tk-tabs-basic')).toBe(true);
      expect(root.classList.contains('tk-tabs-primary')).toBe(true);

      const headers = page.root.shadowRoot.querySelectorAll('.tab-header');
      expect(headers).toHaveLength(2);
      expect(headers[0].classList.contains('active')).toBe(true);
      expect(headers[1].classList.contains('active')).toBe(false);

      const panels = page.root.shadowRoot.querySelectorAll('.tab-panel');
      expect(panels).toHaveLength(2);
      expect(panels[0].classList.contains('active')).toBe(true);
      expect(panels[1].classList.contains('hidden')).toBe(true);
      expect(panels[0].querySelector('slot')).not.toBeNull();
      expect(panels[1].querySelector('slot')).toBeNull();
    });

    it('assigns slot names to direct tab items', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item><tk-tabs-item label="Two">Two</tk-tabs-item></tk-tabs>`,
      });

      const items = page.root.querySelectorAll('tk-tabs-item');
      expect(items[0].getAttribute('slot')).toBe('tab-content-0');
      expect(items[1].getAttribute('slot')).toBe('tab-content-1');
    });

    it('applies orientation, size, type, variant and spread classes', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs orientation="vertical" size="small" type="divided" variant="info" spread-headers="true"><tk-tabs-item label="One">One</tk-tabs-item></tk-tabs>`,
      });

      const root = page.root.shadowRoot.querySelector('.tk-tabs');
      expect(root.classList.contains('tk-tabs-vertical')).toBe(true);
      expect(root.classList.contains('tk-tabs-small')).toBe(true);
      expect(root.classList.contains('tk-tabs-divided')).toBe(true);
      expect(root.classList.contains('tk-tabs-info')).toBe(true);
      expect(page.root.shadowRoot.querySelector('.tab-headers').classList.contains('spread')).toBe(true);
    });

    it('aligns headers and applies custom styles', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs align-headers="center"><tk-tabs-item label="One">One</tk-tabs-item></tk-tabs>`,
      });

      page.root.containerStyle = { backgroundColor: 'red' };
      page.root.headerContainerStyle = { gap: '4px' };
      page.root.contentStyle = { padding: '8px' };
      await page.waitForChanges();

      const headers = page.root.shadowRoot.querySelector('.tab-headers') as HTMLElement;
      expect(headers.style.justifyContent).toBe('center');
      expect(headers.style.gap).toBe('4px');
      expect((page.root.shadowRoot.querySelector('.tk-tabs') as HTMLElement).style.backgroundColor).toBe('red');
      expect((page.root.shadowRoot.querySelector('.tab-content') as HTMLElement).style.padding).toBe('8px');
    });

    it('renders data-testid attributes when dataTestid is provided', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs data-testid="tabs"><tk-tabs-item label="One">One</tk-tabs-item></tk-tabs>`,
      });

      const shadowRoot = page.root.shadowRoot;
      expect(shadowRoot.querySelector('[data-testid="tabs-container"]')).not.toBeNull();
      expect(shadowRoot.querySelector('[data-testid="tabs-headers"]')).not.toBeNull();
      expect(shadowRoot.querySelector('[data-testid="tabs-item-0"]')).not.toBeNull();
      expect(shadowRoot.querySelector('[data-testid="tabs-item-0-label"]')).not.toBeNull();
      expect(shadowRoot.querySelector('[data-testid="tabs-panel-0"]')).not.toBeNull();
      expect(shadowRoot.querySelector('[data-testid="tabs-panel-0-content"]')).not.toBeNull();
    });
  });

  describe('tab selection', () => {
    it('selects a tab on header click and emits tk-tab-change', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item><tk-tabs-item label="Two">Two</tk-tabs-item></tk-tabs>`,
      });

      const changeSpy = jest.fn();
      page.root.addEventListener('tk-tab-change', changeSpy);

      const headers = page.root.shadowRoot.querySelectorAll('.tab-header');
      (headers[1] as HTMLElement).click();
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toBe(1);
      expect(page.root.activeIndex).toBe(1);
      expect(page.root.shadowRoot.querySelectorAll('.tab-header')[1].classList.contains('active')).toBe(true);
    });

    it('does not select a disabled tab', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item><tk-tabs-item label="Two" disabled>Two</tk-tabs-item></tk-tabs>`,
      });

      const changeSpy = jest.fn();
      page.root.addEventListener('tk-tab-change', changeSpy);

      const headers = page.root.shadowRoot.querySelectorAll('.tab-header');
      expect(headers[1].classList.contains('tk-tab-header-disabled')).toBe(true);

      (headers[1] as HTMLElement).click();
      await page.waitForChanges();

      expect(changeSpy).not.toHaveBeenCalled();
      expect(page.root.activeIndex).toBe(0);
    });

    it('emits tk-tab-click instead of selecting when controlled', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs controlled="true"><tk-tabs-item label="One">One</tk-tabs-item><tk-tabs-item label="Two">Two</tk-tabs-item></tk-tabs>`,
      });

      const clickSpy = jest.fn();
      const changeSpy = jest.fn();
      page.root.addEventListener('tk-tab-click', clickSpy);
      page.root.addEventListener('tk-tab-change', changeSpy);

      const headers = page.root.shadowRoot.querySelectorAll('.tab-header');
      (headers[1] as HTMLElement).click();
      await page.waitForChanges();

      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(clickSpy.mock.calls[0][0].detail).toBe(1);
      expect(changeSpy).not.toHaveBeenCalled();
      expect(page.root.shadowRoot.querySelectorAll('.tab-header')[0].classList.contains('active')).toBe(true);
    });

    it('emits tk-tab-change when activeIndex changes programmatically', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item><tk-tabs-item label="Two">Two</tk-tabs-item></tk-tabs>`,
      });

      const changeSpy = jest.fn();
      page.root.addEventListener('tk-tab-change', changeSpy);

      page.root.activeIndex = 1;
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toBe(1);
    });

    it('reverts and warns when an invalid activeIndex is provided', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item><tk-tabs-item label="Two">Two</tk-tabs-item></tk-tabs>`,
      });

      page.root.activeIndex = 5;
      await page.waitForChanges();

      expect(warnSpy).toHaveBeenCalledWith('Invalid tab index provided');
      expect(page.root.activeIndex).toBe(0);
      expect(page.root.shadowRoot.querySelectorAll('.tab-header')[0].classList.contains('active')).toBe(true);

      warnSpy.mockRestore();
    });
  });

  describe('closable and extendable tabs', () => {
    it('closes a tab and selects the previous one', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs is-closable="true" active-index="1"><tk-tabs-item label="One">One</tk-tabs-item><tk-tabs-item label="Two">Two</tk-tabs-item></tk-tabs>`,
      });

      const changeSpy = jest.fn();
      page.root.addEventListener('tk-tab-change', changeSpy);

      const closeIcon = page.root.shadowRoot.querySelectorAll('.tab-header')[1].querySelector('tk-icon');
      expect(closeIcon).not.toBeNull();

      (closeIcon as HTMLElement).click();
      await page.waitForChanges();

      expect(page.root.shadowRoot.querySelectorAll('.tab-header')).toHaveLength(1);
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toBe(0);
      expect(page.root.activeIndex).toBe(0);
    });

    it('keeps the active tab when closing a later tab', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs is-closable="true"><tk-tabs-item label="One">One</tk-tabs-item><tk-tabs-item label="Two">Two</tk-tabs-item><tk-tabs-item label="Three">Three</tk-tabs-item></tk-tabs>`,
      });

      const closeIcon = page.root.shadowRoot.querySelectorAll('.tab-header')[2].querySelector('tk-icon');
      (closeIcon as HTMLElement).click();
      await page.waitForChanges();

      const headers = page.root.shadowRoot.querySelectorAll('.tab-header');
      expect(headers).toHaveLength(2);
      expect(headers[0].classList.contains('active')).toBe(true);
    });

    it('adds a new tab and activates it when extendable', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs is-extendable="true"><tk-tabs-item label="One">One</tk-tabs-item></tk-tabs>`,
      });

      const changeSpy = jest.fn();
      page.root.addEventListener('tk-tab-change', changeSpy);

      const addIcon = page.root.shadowRoot.querySelector('.tk-tabs-item-add-icon');
      expect(addIcon).not.toBeNull();

      (page.rootInstance as any).addTab();
      await page.waitForChanges();

      expect(page.root.querySelectorAll('tk-tabs-item')).toHaveLength(2);
      const headers = page.root.shadowRoot.querySelectorAll('.tab-header');
      expect(headers).toHaveLength(2);
      expect(headers[1].classList.contains('active')).toBe(true);
      expect(headers[1].textContent).toContain('Tab label');
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toBe(1);
    });
  });

  describe('tab item updates', () => {
    it('updates the header when a tab item label changes', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item><tk-tabs-item label="Two">Two</tk-tabs-item></tk-tabs>`,
      });

      const items = page.root.querySelectorAll('tk-tabs-item');
      (items[1] as any).label = 'Updated';
      await page.waitForChanges();

      expect(page.root.shadowRoot.querySelectorAll('.tk-tabs-item-label')[1].textContent).toBe('Updated');
    });

    it('updates disabled state and badge through tab item props', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item><tk-tabs-item label="Two">Two</tk-tabs-item></tk-tabs>`,
      });

      const items = page.root.querySelectorAll('tk-tabs-item');
      (items[1] as any).disabled = true;
      (items[1] as any).badged = true;
      (items[1] as any).badgeCount = 3;
      await page.waitForChanges();

      const header = page.root.shadowRoot.querySelectorAll('.tab-header')[1];
      expect(header.classList.contains('tk-tab-header-disabled')).toBe(true);
      const badge = header.querySelector('tk-badge');
      expect(badge).not.toBeNull();
      expect(badge.getAttribute('count')).toBe('3');
    });

    it('ignores tk-update events without a tab item in the path', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item></tk-tabs>`,
      });

      const instance = page.rootInstance as any;
      expect(() => instance.handleTabUpdate({ composedPath: () => [] })).not.toThrow();
    });

    it('does not let nested tab updates leak into the outer tabs', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs id="outer"><tk-tabs-item label="Outer"><tk-tabs id="inner"><tk-tabs-item label="Inner">Inner</tk-tabs-item></tk-tabs></tk-tabs-item></tk-tabs>`,
      });

      const innerItem = page.root.querySelector('#inner tk-tabs-item');
      (innerItem as any).label = 'Inner Updated';
      await page.waitForChanges();

      const outerLabel = page.root.shadowRoot.querySelector('.tk-tabs-item-label');
      expect(outerLabel.textContent).toBe('Outer');

      const inner = page.root.querySelector('#inner');
      expect(inner.shadowRoot.querySelector('.tk-tabs-item-label').textContent).toBe('Inner Updated');
    });
  });

  describe('badges, tooltips and icons', () => {
    it('renders a badge with defaults for the active tab', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One" badged="true" badge-label="New">One</tk-tabs-item><tk-tabs-item label="Two" badged="true" badge-label="Old">Two</tk-tabs-item></tk-tabs>`,
      });

      const badges = page.root.shadowRoot.querySelectorAll('tk-badge');
      expect(badges).toHaveLength(2);
      expect(badges[0].getAttribute('label')).toBe('New');
      expect(badges[0].getAttribute('variant')).toBe('primary');
      expect(badges[1].getAttribute('variant')).toBe('neutral');
      expect(badges[0].getAttribute('type')).toBe('filledlight');
      expect(badges[0].getAttribute('size')).toBe('base');
    });

    it('renders a badge with custom badgeOptions and small size for xsmall tabs', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs size="xsmall"><tk-tabs-item label="One" badged="true" badge-label="New">One</tk-tabs-item></tk-tabs>`,
      });

      const item = page.root.querySelector('tk-tabs-item');
      (item as any).badgeOptions = { variant: 'success', type: 'filled', rounded: false };
      await page.waitForChanges();

      const badge = page.root.shadowRoot.querySelector('tk-badge');
      expect(badge.getAttribute('variant')).toBe('success');
      expect(badge.getAttribute('type')).toBe('filled');
      expect(badge.getAttribute('size')).toBe('small');
    });

    it('renders a tooltip when tooltipOptions has an icon', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item></tk-tabs>`,
      });

      const item = page.root.querySelector('tk-tabs-item');
      (item as any).tooltipOptions = { icon: 'info', header: 'Header', description: 'Description' };
      await page.waitForChanges();

      const tooltip = page.root.shadowRoot.querySelector('tk-tooltip');
      expect(tooltip).not.toBeNull();
      expect(tooltip.getAttribute('header')).toBe('Header');
      expect(tooltip.getAttribute('position')).toBe('bottom');
      expect(tooltip.getAttribute('variant')).toBe('dark');
      const triggerIcon = tooltip.querySelector('tk-icon');
      expect(triggerIcon.getAttribute('icon')).toBe('info');
    });

    it('does not render a tooltip when tooltipOptions has no icon', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item></tk-tabs>`,
      });

      const item = page.root.querySelector('tk-tabs-item');
      (item as any).tooltipOptions = { header: 'Header', description: 'Description' };
      await page.waitForChanges();

      expect(page.root.shadowRoot.querySelector('tk-tooltip')).toBeNull();
    });

    it('renders tab icons with variant based on type and active state', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs type="divided"><tk-tabs-item label="One" icon="home">One</tk-tabs-item><tk-tabs-item label="Two" icon="star">Two</tk-tabs-item></tk-tabs>`,
      });

      const headers = page.root.shadowRoot.querySelectorAll('.tab-header');
      const activeIcon = headers[0].querySelector('tk-icon');
      const inactiveIcon = headers[1].querySelector('tk-icon');
      expect(activeIcon.getAttribute('icon')).toBe('home');
      expect(activeIcon.getAttribute('variant')).toBe('primary');
      expect(inactiveIcon.getAttribute('variant')).toBe('neutral');
    });

    it('renders left and right icons for multi icon options', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item></tk-tabs>`,
      });

      const item = page.root.querySelector('tk-tabs-item');
      (item as any).icon = { left: 'home', right: { name: 'star' } };
      await page.waitForChanges();

      const icons = page.root.shadowRoot.querySelectorAll('.tab-header tk-icon');
      expect(icons).toHaveLength(2);
      expect(icons[0].getAttribute('icon')).toBe('home');
      expect(icons[1].getAttribute('icon')).toBe('star');
    });
  });

  describe('lifecycle', () => {
    it('removes the tk-update listener on disconnect', async () => {
      const page = await newSpecPage({
        components: [TkTabs, TkTabsItem],
        html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item></tk-tabs>`,
      });

      const removeSpy = jest.spyOn(page.root, 'removeEventListener');
      page.rootInstance.disconnectedCallback();

      expect(removeSpy).toHaveBeenCalledWith('tk-update', expect.any(Function));
    });
  });
});
