import { newSpecPage } from '@stencil/core/testing';
import { TkDropdown } from '../tk-dropdown';

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
  });

  describe('state handling', () => {
    it('should handle isGrouped state', async () => {
      const page = await newSpecPage({
        components: [TkDropdown],
        html: `<tk-dropdown group-name-key="code"><button slot="trigger"></button></tk-dropdown>`,
      });
      page.root.options = [
        {
          code: 'SAW',
          name: 'Sabiha Gökçen Havalimanı',
        },
        { code: 'ESB', name: 'Esenboğa Havalimanı' },
        { code: 'AYT', name: 'Antalya Havalimanı' },
      ];
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
        html: `<tk-dropdown option-label-key="code"><button slot="trigger"></button></tk-dropdown>`,
      });
      page.root.options = [
        {
          code: 'SAW',
          name: 'Sabiha Gökçen Havalimanı',
        },
        { code: 'ESB', name: 'Esenboğa Havalimanı' },
        { code: 'AYT', name: 'Antalya Havalimanı' },
      ];
      await page.waitForChanges();

      const button = page.root.querySelector('button');
      button.click();
      await page.waitForChanges();

      const item = page.root.querySelector('.tk-dropdown-item');
      expect(item.innerHTML).toBe('SAW');
    });
  });

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
  });
});
