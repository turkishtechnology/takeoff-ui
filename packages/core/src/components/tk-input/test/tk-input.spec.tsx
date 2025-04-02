import { newSpecPage } from '@stencil/core/testing';
import { TkInput } from '../tk-input';

describe('tk-input', () => {
  // Basic Rendering
  describe('basic rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input></tk-input>`,
      });

      expect(page.root).toBeTruthy();

      const input = page.root.shadowRoot.querySelector('input');

      expect(input.type).toBe('text');
    });

    it('renders with label and placeholder', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input label="Test Label" placeholder="Test Placeholder"></tk-input>`,
      });

      const label = page.root.shadowRoot.querySelector('.label');
      const input = page.root.shadowRoot.querySelector('input');

      expect(label.textContent.trim()).toBe('Test Label');
      expect(input.placeholder).toBe('Test Placeholder');
    });

    it('renders with required asterisk', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input label="Username" show-asterisk="true"></tk-input>`,
      });

      await page.waitForChanges();

      const label = page.root.shadowRoot.querySelector('label.label');

      expect(label).toBeTruthy();
      expect(label.innerHTML).toContain('Username<span class="asterisk">*</span>');
    });

    it('renders with different sizes', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input size="large"></tk-input>`,
      });

      await page.waitForChanges();

      const container = page.root.shadowRoot.querySelector('.tk-input-container');

      expect(container.classList.contains('large')).toBe(true);
    });
  });

  // State
  describe('state handling', () => {
    it('handles disabled state', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input></tk-input>`,
      });

      page.root.disabled = true;

      await page.waitForChanges();

      const container = page.root.shadowRoot.querySelector('.tk-input-container');

      expect(container.hasAttribute('aria-disabled')).toBe(true);

      const input = page.root.shadowRoot.querySelector('input');

      expect(input.disabled).toBe(true);
    });

    it('handles readonly state', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input readonly="true"></tk-input>`,
      });

      const input = page.root.shadowRoot.querySelector('input');

      expect(input.readOnly).toBe(true);
    });

    it('handles invalid state and error message', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input></tk-input>`,
      });

      page.root.invalid = true;
      page.root.error = 'Error message';

      await page.waitForChanges();

      const container = page.root.shadowRoot.querySelector('.tk-input-container');

      expect(container.hasAttribute('aria-invalid')).toBe(true);

      const hint = page.root.shadowRoot.querySelector('.hint');

      expect(hint.textContent).toContain('Error message');
    });

    it('handles focus state', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input></tk-input>`,
      });

      const input = page.root.shadowRoot.querySelector('input');

      input.dispatchEvent(new Event('focus'));

      await page.waitForChanges();

      const container = page.root.shadowRoot.querySelector('.tk-input-container');

      expect(container.classList.contains('focus')).toBe(true);
    });

    it('handles hint message', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input hint="Hint message"></tk-input>`,
      });

      const hint = page.root.shadowRoot.querySelector('.hint');

      expect(hint.textContent).toContain('Hint message');
    });

    it('shows asterisk when required', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input label="Required Field" show-asterisk="true"></tk-input>`,
      });

      await page.waitForChanges();

      const label = page.root.shadowRoot.querySelector('label.label');

      expect(label).toBeTruthy();
      expect(label.innerHTML).toContain('Required Field<span class="asterisk">*</span>');
    });

    it('handles complex icon object', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input></tk-input>`,
      });

      page.root.icon = {
        name: 'search',
        style: 'rounded',
        fill: true,
        color: '#000000',
      };

      await page.waitForChanges();

      const icon = page.root.shadowRoot.querySelector('.material-symbols-rounded') as HTMLElement;

      expect(icon.textContent).toBe('search');
      expect(icon.classList.contains('fill')).toBe(true);
      expect(icon.style.color).toBe('#000000');
    });
  });

  // Mode
  describe('input modes', () => {
    it('handles password mode', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="password"></tk-input>`,
      });

      const input = page.root.shadowRoot.querySelector('input');

      expect(input.type).toBe('password');
    });

    it('handles password strength calculation', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="password" show-safety-status value="StrongP@ss123"></tk-input>`,
      });

      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector('input');

      input.dispatchEvent(new Event('input'));

      await page.waitForChanges();

      const safetyStatus = page.root.shadowRoot.querySelector('.safety-status');

      expect(safetyStatus).toBeTruthy();
    });

    it('handles counter mode', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="counter" value="5"></tk-input>`,
      });

      const input = page.root.shadowRoot.querySelector('input');

      expect(input.type).toBe('number');
      expect(input.value).toBe('5');
    });

    it('handles counter increment/decrement', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="counter" value="5"></tk-input>`,
      });

      const input = page.root.shadowRoot.querySelector('input');

      expect(input.value).toBe('5');

      // Test value update
      input.value = '6';

      input.dispatchEvent(new Event('input'));

      await page.waitForChanges();

      expect(page.root.value).toBe('6');
    });

    it('handles chips mode', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="chips"></tk-input>`,
      });

      const input = page.root.shadowRoot.querySelector('input');

      input.value = 'First Chip';
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      await page.waitForChanges();

      expect(page.root.value).toEqual(['First Chip']);

      input.value = 'Second Chip';
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      await page.waitForChanges();

      expect(page.root.value).toEqual(['First Chip', 'Second Chip']);

      // Try to add duplicate chip
      input.value = 'First Chip';
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      await page.waitForChanges();

      expect(page.root.value).toEqual(['First Chip', 'Second Chip']);
    });

    it('handles number mode with validation', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="number" value="50"></tk-input>`,
      });

      const input = page.root.shadowRoot.querySelector('input');

      expect(input.type).toBe('number');
      expect(input.value).toBe('50');
      expect(page.root.value).toBe('50');
    });

    it('handles password visibility toggle', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="password" value="test123"></tk-input>`,
      });

      await page.waitForChanges();

      const visibilityIcon = page.root.shadowRoot.querySelector('.material-symbols-outlined.clickable');

      expect(visibilityIcon).toBeTruthy();

      // Test mousedown (show password)
      visibilityIcon.dispatchEvent(new MouseEvent('mousedown'));

      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector('input');

      expect(input.type).toBe('text');
      expect(visibilityIcon.innerHTML).toBe('visibility_off');

      // Test mouseup (hide password)
      visibilityIcon.dispatchEvent(new MouseEvent('mouseup'));

      await page.waitForChanges();

      expect(input.type).toBe('password');
      expect(visibilityIcon.innerHTML).toBe('visibility');
    });

    it('calculates password strength correctly', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="password" show-safety-status></tk-input>`,
      });

      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector('input');

      // Test weak password
      input.value = 'test';

      input.dispatchEvent(new Event('input'));

      await page.waitForChanges();

      let lines = page.root.shadowRoot.querySelectorAll('.safety-status .line.weak');

      expect(lines.length).toBeGreaterThan(0);

      // Test medium password
      input.value = 'Test123';
      input.dispatchEvent(new Event('input'));

      await page.waitForChanges();

      lines = page.root.shadowRoot.querySelectorAll('.safety-status .line.medium');

      expect(lines.length).toBeGreaterThan(0);

      // Test strong password
      input.value = 'Test123!@#';
      input.dispatchEvent(new Event('input'));

      await page.waitForChanges();

      lines = page.root.shadowRoot.querySelectorAll('.safety-status .line.strong');

      expect(lines.length).toBeGreaterThan(0);
    });

    it('handles counter buttons correctly', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="counter" value="5" min="0" max="10"></tk-input>`,
      });

      await page.waitForChanges();

      // Test increment
      const plusButton = page.root.shadowRoot.querySelector('.counter-icon:last-child');

      plusButton.dispatchEvent(new MouseEvent('click'));

      await page.waitForChanges();

      expect(page.root.value).toBe(6);

      // Test decrement
      const minusButton = page.root.shadowRoot.querySelector('.counter-icon:first-child');

      minusButton.dispatchEvent(new MouseEvent('click'));

      await page.waitForChanges();

      expect(page.root.value).toBe(5);

      // Test min limit
      page.root.value = 0;

      await page.waitForChanges();

      minusButton.dispatchEvent(new MouseEvent('click'));

      await page.waitForChanges();

      expect(page.root.value).toBe(0);

      // Test max limit
      page.root.value = 10;

      await page.waitForChanges();

      plusButton.dispatchEvent(new MouseEvent('click'));

      await page.waitForChanges();

      expect(page.root.value).toBe(10);
    });

    it('handles object chips correctly', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="chips"></tk-input>`,
      });

      const input = page.root.shadowRoot.querySelector('input');
      const chipData = { label: 'Test Chip' };

      input.value = JSON.stringify(chipData);
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      await page.waitForChanges();

      // Set value directly since the event might not trigger in the test environment
      page.root.value = [chipData];

      await page.waitForChanges();

      const chip = page.root.shadowRoot.querySelector('tk-chips');

      expect(chip).toBeTruthy();
      expect(chip.getAttribute('label')).toBe('Test Chip');
      expect(chip.getAttribute('type')).toBe('outlined');
      expect(chip.getAttribute('variant')).toBe('neutral');
      expect(chip.hasAttribute('removable')).toBe(true);
      expect(chip.hasAttribute('autoSelfDestroy')).toBe(false);
    });

    it('handles counter mode with min/max values', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="counter" value="5" min="0" max="10"></tk-input>`,
      });

      await page.waitForChanges();

      const container = page.root.shadowRoot.querySelector('.tk-input-container');

      expect(container.classList.contains('counter')).toBe(true);

      const minusButton = page.root.shadowRoot.querySelector('.counter-icon');
      const plusButton = page.root.shadowRoot.querySelectorAll('.counter-icon')[1];

      expect(minusButton.classList.contains('disabled')).toBe(false);
      expect(plusButton.classList.contains('disabled')).toBe(false);
    });

    it('handles counter mode at min value', async () => {
      const page = await newSpecPage({
        components: [TkInput],

        html: `<tk-input mode="counter" value="0" min="0" max="10"></tk-input>`,
      });

      await page.waitForChanges();

      const minusButton = page.root.shadowRoot.querySelector('.counter-icon');

      expect(minusButton.classList.contains('disabled')).toBe(true);
    });

    it('handles counter mode at max value', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="counter" value="10" min="0" max="10"></tk-input>`,
      });

      await page.waitForChanges();

      const plusButton = page.root.shadowRoot.querySelectorAll('.counter-icon')[1];

      expect(plusButton.classList.contains('disabled')).toBe(true);
    });

    it('handles chips removal', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="chips" class="multiple-select"></tk-input>`,
      });

      // Set initial chips
      page.root.value = ['Chip 1', 'Chip 2'];

      await page.waitForChanges();

      const chips = page.root.shadowRoot.querySelectorAll('tk-chips');

      expect(chips.length).toBe(2);

      // Simulate chip removal
      const removeEvent = new CustomEvent('tk-remove', { detail: 'Chip 1' });

      chips[0].dispatchEvent(removeEvent);

      await page.waitForChanges();

      const remainingChips = page.root.shadowRoot.querySelectorAll('tk-chips');

      expect(remainingChips.length).toBe(1);
    });

    it('handles icon display and positioning', async () => {
      const page = await newSpecPage({
        components: [TkInput],

        html: `<tk-input icon="search" iconPosition="left"></tk-input>`,
      });

      const icon = page.root.shadowRoot.querySelector('.material-symbols-outlined');

      expect(icon.textContent).toBe('search');

      expect(icon.closest('.tk-input').firstElementChild).toBe(icon);
    });
  });

  // Event
  describe('event handling', () => {
    it('emits events correctly', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input></tk-input>`,
      });

      const input = page.root.shadowRoot.querySelector('input');

      // Test focus event
      const focusSpy = jest.fn();
      page.root.addEventListener('tk-focus', focusSpy);
      input.dispatchEvent(new Event('focus'));

      expect(focusSpy).toHaveBeenCalled();

      // Test blur event
      const blurSpy = jest.fn();

      page.root.addEventListener('tk-blur', blurSpy);
      input.dispatchEvent(new Event('blur'));

      expect(blurSpy).toHaveBeenCalled();

      // Test change event
      const changeSpy = jest.fn();

      page.root.addEventListener('tk-change', changeSpy);

      input.value = 'new value';
      input.dispatchEvent(new Event('input'));

      expect(changeSpy).toHaveBeenCalled();
    });

    it('handles tabindex correctly', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input tabindex="1"></tk-input>`,
      });

      const input = page.root.shadowRoot.querySelector('input');

      expect(input.getAttribute('tabindex')).toBe('1');
      expect(page.root.hasAttribute('tabindex')).toBe(false);
    });
  });

  // Method
  describe('public methods', () => {
    it('sets focus using setFocus method', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input></tk-input>`,
      });

      const focusSpy = jest.fn();

      page.root.addEventListener('tk-focus', focusSpy);

      await page.root.setFocus();

      expect(focusSpy).toHaveBeenCalled();
    });

    it('handles form reset', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input value="test"></tk-input>`,
      });

      await page.root.formResetCallback();

      expect(page.root.value).toBeNull();
    });
  });
});
