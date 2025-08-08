import { newSpecPage } from '@stencil/core/testing';
import { TkDropdown } from '../tk-dropdown';
import { h } from '@stencil/core';

// Basic Rendering
describe('tk-dropdown', () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });
  describe('basic rendering', () => {
    it('should not render when it is not open', async () => {
      const page = await newSpecPage({
        components: [TkDropdown],
        html: `<tk-dropdown></tk-dropdown>`,
      });

      expect(page.root).toBeTruthy();
      expect(page.root.querySelector('.tk-dropdown-panel')).toBeFalsy();
    });
    it('should render emptyMessage', async () => {
      const page = await newSpecPage({
        components: [TkDropdown],
        html: `<tk-dropdown empty-message="test message">
      <button slot="trigger" /></tk-dropdown>`,
      });
      await page.waitForChanges();

      const button = page.root.querySelector('button');
      button.click();
      await page.waitForChanges();

      const holder = page.root.querySelector('.tk-dropdown-item-holder');
      expect(holder.textContent).toBe('test message');
    });
    it('should render hasEmptyDataSlot', async () => {
      const page = await newSpecPage({
        components: [TkDropdown],
        html: `<tk-dropdown>
        <div slot="empty-data" />
      <button slot="trigger" /></tk-dropdown>`,
      });
      await page.waitForChanges();

      const button = page.root.querySelector('button');
      button.click();
      await page.waitForChanges();

      const slot = page.root.querySelector('[slot="empty-data"]');
      expect(slot).toBeTruthy();
    });
  });
  // State
  describe('state handling', () => {
    it('should handle different optionsAlign', async () => {
      const optionsAligns = ['left', 'center', 'right'];
      for (const optionAlign of optionsAligns) {
        const page = await newSpecPage({
          components: [TkDropdown],
          html: `<tk-dropdown options-align="${optionAlign}">
          <button slot="trigger" />,
        </tk-dropdown>`,
        });

        await page.waitForChanges();

        const dropdown = page.rootInstance;
        dropdown.options = [1, 2, 3];
        const button = page.root.querySelector('button');
        button.click();
        await page.waitForChanges();

        const item = page.root.querySelector('.tk-dropdown-item');
        expect(item.classList.contains(optionAlign)).toBe(true);
      }
    });
    it('should handle optionHtml', async () => {
      const page = await newSpecPage({
        components: [TkDropdown],
        template: () => (
          <tk-dropdown
            options={[
              {
                code: 'SAW',
                name: 'Sabiha Gökçen Havalimanı',
              },
              { code: 'ESB', name: 'Esenboğa Havalimanı' },
              { code: 'AYT', name: 'Antalya Havalimanı' },
            ]}
            optionHtml={(item: { name: any; code: any }) => {
              return `<div class="flex justify-between gap-4">
                          <div style="font-weight: bold;">${item.name}</div>
                          <div style="color: var(--primary-base)">${item.code}</div>
                      </div>`;
            }}
          >
            <button slot="trigger"></button>
          </tk-dropdown>
        ),
      });
      await page.waitForChanges();

      const button = page.root.querySelector('button');
      button.click();
      await page.waitForChanges();

      const item = page.root.querySelector('.tk-dropdown-item');
      expect(item.innerHTML).toBeTruthy();
    });
    it('should handle isGrouped state', async () => {
      const page = await newSpecPage({
        components: [TkDropdown],
        template: () => (
          <tk-dropdown
            groupNameKey="code"
            options={[
              {
                code: 'SAW',
                name: 'Sabiha Gökçen Havalimanı',
              },
              { code: 'ESB', name: 'Esenboğa Havalimanı' },
              { code: 'AYT', name: 'Antalya Havalimanı' },
            ]}
          >
            <button slot="trigger"></button>
          </tk-dropdown>
        ),
      });
      await page.waitForChanges();

      const button = page.root.querySelector('button');
      button.click();
      await page.waitForChanges();

      const label = page.root.querySelector('.tk-dropdown-group-label');
      expect(label).toBeTruthy();
    });
    it('should handle optionLabelKey state', async () => {
      const page = await newSpecPage({
        components: [TkDropdown],
        template: () => (
          <tk-dropdown
            optionLabelKey="code"
            options={[
              {
                code: 'SAW',
                name: 'Sabiha Gökçen Havalimanı',
              },
              { code: 'ESB', name: 'Esenboğa Havalimanı' },
              { code: 'AYT', name: 'Antalya Havalimanı' },
            ]}
          >
            <button slot="trigger"></button>
          </tk-dropdown>
        ),
      });
      await page.waitForChanges();

      const button = page.root.querySelector('button');
      button.click();
      await page.waitForChanges();

      const item = page.root.querySelector('.tk-dropdown-item');
      expect(item.innerHTML).toBe('SAW');
    });
  });
  // Event
  describe('event handling', () => {
    it('should close when the trigger is clicked twice', async () => {
      const page = await newSpecPage({
        components: [TkDropdown],
        html: `<tk-dropdown>
      <button slot="trigger" /></tk-dropdown>`,
      });
      await page.waitForChanges();

      const button = page.root.querySelector('button');
      button.click();
      await page.waitForChanges();

      button.click();
      await page.waitForChanges();

      expect(page.root).toBeTruthy();
      expect(page.root.querySelector('.tk-dropdown-panel')).toBeFalsy();
    });
    it('should emit tk-item-click when item is clicked', async () => {
      const page = await newSpecPage({
        components: [TkDropdown],
        html: `<tk-dropdown> <button slot="trigger" /></tk-dropdown>`,
      });

      const clickSpy = jest.fn();

      const dropdown = page.root;
      dropdown.options = [1, 2, 3];

      const button = page.root.querySelector('button');
      button.click();

      await page.waitForChanges();

      const item = page.root.querySelector('.tk-dropdown-item') as HTMLElement;

      page.root.addEventListener('tk-item-click', clickSpy);

      item.click();

      await page.waitForChanges();

      expect(clickSpy).toHaveBeenCalled();
    });
    it('should disconnect resizeObserver', async () => {
      const page = await newSpecPage({
        components: [TkDropdown],
        html: `<tk-dropdown> <button slot="trigger" /></tk-dropdown>`,
      });
      const dropdown = page.rootInstance;
      dropdown.resizeObserver = { disconnect: jest.fn() } as any;

      dropdown.disconnectedCallback();

      expect(dropdown.resizeObserver.disconnect);
    });
  });
});
