import { newSpecPage } from '@stencil/core/testing';
import { TkTabsItem } from '../tk-tabs-item';

describe('tk-tabs-item', () => {
  it('emits tk-update when the label changes', async () => {
    const page = await newSpecPage({
      components: [TkTabsItem],
      html: `<tk-tabs-item label="One">Panel</tk-tabs-item>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-update', spy);
    page.root.label = 'Two';
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.label).toBe('Two');
  });

  it('renders slotted content in the shadow root', async () => {
    const page = await newSpecPage({
      components: [TkTabsItem],
      html: `<tk-tabs-item label="One">Panel</tk-tabs-item>`,
    });

    expect(page.root.shadowRoot.querySelector('slot')).not.toBeNull();
    expect(page.root.textContent).toContain('Panel');
  });

  it('emits tk-update when the icon changes', async () => {
    const page = await newSpecPage({
      components: [TkTabsItem],
      html: `<tk-tabs-item label="One">Panel</tk-tabs-item>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-update', spy);
    page.root.icon = 'home';
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.icon).toBe('home');
  });

  it('emits tk-update when disabled changes', async () => {
    const page = await newSpecPage({
      components: [TkTabsItem],
      html: `<tk-tabs-item label="One">Panel</tk-tabs-item>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-update', spy);
    page.root.disabled = true;
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.disabled).toBe(true);
  });

  it('emits tk-update when badged changes', async () => {
    const page = await newSpecPage({
      components: [TkTabsItem],
      html: `<tk-tabs-item label="One">Panel</tk-tabs-item>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-update', spy);
    page.root.badged = true;
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.badged).toBe(true);
  });

  it('emits tk-update when badgeLabel changes', async () => {
    const page = await newSpecPage({
      components: [TkTabsItem],
      html: `<tk-tabs-item label="One">Panel</tk-tabs-item>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-update', spy);
    page.root.badgeLabel = 'New';
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.badgeLabel).toBe('New');
  });

  it('emits tk-update when badgeCount changes', async () => {
    const page = await newSpecPage({
      components: [TkTabsItem],
      html: `<tk-tabs-item label="One">Panel</tk-tabs-item>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-update', spy);
    page.root.badgeCount = 5;
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.badgeCount).toBe(5);
  });

  it('emits tk-update when badgeOptions changes', async () => {
    const page = await newSpecPage({
      components: [TkTabsItem],
      html: `<tk-tabs-item label="One">Panel</tk-tabs-item>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-update', spy);
    const badgeOptions = { variant: 'success' };
    page.root.badgeOptions = badgeOptions;
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.badgeOptions).toEqual(badgeOptions);
  });

  it('emits tk-update when tooltipOptions changes', async () => {
    const page = await newSpecPage({
      components: [TkTabsItem],
      html: `<tk-tabs-item label="One">Panel</tk-tabs-item>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-update', spy);
    const tooltipOptions = { icon: 'info', header: 'Header' };
    page.root.tooltipOptions = tooltipOptions;
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.tooltipOptions).toEqual(tooltipOptions);
  });

  it('includes the full detail payload in tk-update', async () => {
    const page = await newSpecPage({
      components: [TkTabsItem],
      html: `<tk-tabs-item label="One" icon="home" badged="true" badge-label="New" badge-count="2">Panel</tk-tabs-item>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-update', spy);
    page.root.label = 'Two';
    await page.waitForChanges();

    expect(spy.mock.calls[0][0].detail).toEqual(
      expect.objectContaining({
        label: 'Two',
        icon: 'home',
        badged: true,
        badgeLabel: 'New',
        badgeCount: '2',
      }),
    );
  });
});
