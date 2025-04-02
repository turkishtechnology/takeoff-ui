import { newSpecPage } from '@stencil/core/testing';
import { TkChips } from '../tk-chips';

describe('tk-chips', () => {
  describe('basic rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [TkChips],
        html: `<tk-chips label="Test Chip"></tk-chips>`,
      });
      const chip = page.root.shadowRoot.querySelector('.tk-chips');
      expect(chip.textContent).toContain('Test Chip');
    });

    it('should render with custom props', async () => {
      const page = await newSpecPage({
        components: [TkChips],
        html: `<tk-chips label="Custom Chip" variant="success" size="large" type="outlined"></tk-chips>`,
      });
      const chip = page.root.shadowRoot.querySelector('.tk-chips');
      expect(chip).toBeTruthy();
      expect(chip.textContent).toContain('Custom Chip');
      expect(chip.classList.contains('success')).toBe(true);
      expect(chip.classList.contains('large')).toBe(true);
      expect(chip.classList.contains('outlined')).toBe(true);
    });

    it('should render with an icon', async () => {
      const page = await newSpecPage({
        components: [TkChips],
        html: `<tk-chips label="Icon Chip" icon="star"></tk-chips>`,
      });
      const icon = page.root.shadowRoot.querySelector('i.material-symbols-outlined');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toBe('star');
    });

    it('should render with a custom icon', async () => {
      const page = await newSpecPage({
        components: [TkChips],
        html: `<tk-chips label="Custom Icon Chip" '></tk-chips>`,
      });
      page.rootInstance.icon = { name: 'star', style: 'rounded', fill: true, color: 'red' };
      await page.waitForChanges();

      const icon = page.root.shadowRoot.querySelector('i');

      expect(icon.textContent).toBe('star');
      expect(icon.classList.contains('material-symbols-rounded')).toBe(true);
      expect(icon.classList.contains('fill')).toBe(true);
      expect(icon.style.color).toBe('red');
    });

    it('should render with a close button when removable is true', async () => {
      const page = await newSpecPage({
        components: [TkChips],
        html: `<tk-chips label="Removable Chip" removable="true"></tk-chips>`,
      });
      const closeButton = page.root.shadowRoot.querySelector('i.material-symbols-outlined');
      expect(closeButton).toBeTruthy();
      expect(closeButton.textContent).toBe('close');
    });
  });

  describe('event handling', () => {
    it('should emit tk-remove event when close button is clicked', async () => {
      const page = await newSpecPage({
        components: [TkChips],
        html: `<tk-chips label="Removable Chip" removable="true"></tk-chips>`,
      });
      const removeSpy = jest.fn();
      page.root.addEventListener('tk-remove', removeSpy);

      const closeButton: HTMLElement = page.root.shadowRoot.querySelector('i.material-symbols-outlined');
      closeButton.click();

      expect(removeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: 'Removable Chip',
        }),
      );
    });

    it('should remove the chip when close button is clicked and autoSelfDestroy is true', async () => {
      const page = await newSpecPage({
        components: [TkChips],
        html: `<tk-chips label="Removable Chip" removable="true" auto-self-destroy="true"></tk-chips>`,
      });
      const closeButton: HTMLElement = page.root.shadowRoot.querySelector('i.material-symbols-outlined');
      closeButton.click();
      await page.waitForChanges();
      const chip = document.querySelector('tk-chips');
      expect(chip).toBeFalsy();
    });

    it('should not remove the chip when close button is clicked and autoSelfDestroy is false', async () => {
      const page = await newSpecPage({
        components: [TkChips],
        html: `<tk-chips label="Removable Chip" removable="true" auto-self-destroy="false"></tk-chips>`,
      });
      const closeButton: HTMLElement = page.root.shadowRoot.querySelector('i.material-symbols-outlined');
      closeButton.click();
      await page.waitForChanges();
      expect(page.root).toBeTruthy();
    });
  });

  describe('disabled state', () => {
    it('should add disabled class when disabled is true', async () => {
      const page = await newSpecPage({
        components: [TkChips],
        html: `<tk-chips label="Disabled Chip" disabled="true"></tk-chips>`,
      });
      const chip = page.root.shadowRoot.querySelector('.tk-chips');
      expect(chip.classList.contains('disabled')).toBe(true);
    });
  });
});
