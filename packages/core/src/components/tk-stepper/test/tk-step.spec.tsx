import { newSpecPage } from '@stencil/core/testing';
import { TkStep } from '../tk-step';

describe('tk-step', () => {
  it('keeps its slotted content intact', async () => {
    const page = await newSpecPage({
      components: [TkStep],
      html: `<tk-step header="Step 1">Inner content</tk-step>`,
    });

    expect(page.root.textContent).toContain('Inner content');
  });
});
